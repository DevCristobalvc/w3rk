import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import OpenAI from "openai";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: UPLOAD_DIR });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/extract-cv", upload.single("file"), async (req, res) => {
  let tmpPath;
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No se subió archivo" });

    tmpPath = file.path;
    const dataBuffer = fs.readFileSync(tmpPath);
    const parsed = await pdfParse(dataBuffer);
    const rawText = parsed.text || "";

    const prompt = `
      Eres un asistente experto en reclutamiento.
      Analiza el siguiente texto de un CV y devuélvelo estrictamente en JSON válido con estos campos:
      {
        "fullName": "",
        "headline": "",
        "summary": "",
        "experience": [{"title": "", "company": "", "years": ""}],
        "education": [{"degree": "", "school": "", "years": ""}],
        "skills": []
      }
      Si falta información, deja cadenas vacías o listas vacías. No agregues texto fuera del JSON.

      Texto del CV:
      ---
      ${rawText}
      ---
    `;

    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const jsonText = completion.output_text ?? "{}";
    let clean;
    try {
      clean = JSON.parse(jsonText);
    } catch {
      const start = jsonText.indexOf("{");
      const end = jsonText.lastIndexOf("}");
      clean =
        start >= 0 && end >= 0
          ? JSON.parse(jsonText.slice(start, end + 1))
          : {};
    }

    res.json(clean);
  } catch (err) {
    console.error("❌ Error /api/extract-cv:", err);
    res.status(500).json({ error: "Error procesando el CV" });
  } finally {
    if (tmpPath) {
      try {
        fs.unlinkSync(tmpPath);
      } catch {}
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor CV Builder corriendo en http://localhost:${PORT}`)
);
