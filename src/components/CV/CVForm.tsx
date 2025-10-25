import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Wand2, Sparkles, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type Props = {
  mode: "upload" | "scratch";
  setMode: (mode: "upload" | "scratch") => void;
  file: File | null;
  setFile: (file: File | null) => void;
  fullName: string;
  setFullName: (v: string) => void;
  headline: string;
  setHeadline: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
  aiPrompt: string;
  setAiPrompt: (v: string) => void;
};

export default function CVForm({
  mode,
  setMode,
  file,
  setFile,
  fullName,
  setFullName,
  headline,
  setHeadline,
  summary,
  setSummary,
  aiPrompt,
  setAiPrompt,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  // 🔹 Función: cuando el usuario sube un archivo
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch("http://localhost:5000/api/extract-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // ✅ Asignar los datos extraídos por IA
      if (data.fullName) setFullName(data.fullName);
      if (data.headline) setHeadline(data.headline);
      if (data.summary) setSummary(data.summary);

      // (Opcional: puedes guardar experience, education, skills más adelante)
    } catch (err) {
      console.error("❌ Error al procesar CV:", err);
      alert("Hubo un error al analizar el CV. Intenta de nuevo.");
    } finally {
      setIsExtracting(false);
    }
  };

  // ✨ Función: generación de resumen con IA (cuando creas desde cero)
  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      setSummary(
        `✨ Resultado generado por IA: ${aiPrompt}\n\nProfesional con experiencia en desarrollo, apasionado por el aprendizaje continuo y las nuevas tecnologías.`
      );
    } catch (err) {
      console.error("Error generando con IA:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* 🔹 Selección de modo (Subir o Crear desde cero) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setMode("upload")}
          className={`rounded-xl border p-4 text-left transition ${
            mode === "upload"
              ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900/40"
              : "hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="text-sm font-medium">Subir CV existente</span>
          </div>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Carga tu PDF/DOCX y deja que la IA lo analice.
          </p>
        </button>

        <button
          onClick={() => setMode("scratch")}
          className={`rounded-xl border p-4 text-left transition ${
            mode === "scratch"
              ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900/40"
              : "hover:border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            <span className="text-sm font-medium">Crear desde cero</span>
          </div>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Genera un CV profesional guiado por IA.
          </p>
        </button>
      </div>

      <Separator className="my-4" />

      {/* 🔹 Si elige subir archivo */}
      {mode === "upload" ? (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Archivo</Label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="rounded-xl"
          />

          {/* Estado de análisis */}
          {isExtracting && (
            <div className="flex items-center text-sm text-indigo-600 gap-2 mt-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analizando tu CV con IA...
            </div>
          )}

          {/* Archivo cargado */}
          {file && (
            <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 mt-2">
              <FileText className="h-4 w-4" />
              {file.name}
              <Badge variant="secondary" className="rounded-full">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Badge>
            </div>
          )}

          <p className="text-xs text-zinc-500 mt-2">
            * Se procesará automáticamente al finalizar la carga.
          </p>
        </div>
      ) : (
        /* 🔹 Si elige crear desde cero */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">
                Nombre completo
              </Label>
              <Input
                id="fullName"
                className="rounded-xl mt-1"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <Label htmlFor="headline" className="text-sm font-medium">
                Titular profesional
              </Label>
              <Input
                id="headline"
                className="rounded-xl mt-1"
                placeholder="p. ej., Desarrollador Full Stack / Diseñador Frontend"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="summary" className="text-sm font-medium">
              Resumen profesional
            </Label>
            <Textarea
              id="summary"
              rows={4}
              className="rounded-xl mt-1"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Resume tu experiencia, habilidades y logros más importantes."
            />
          </div>

          <div>
            <Label htmlFor="ai" className="text-sm font-medium">
              Pauta para IA (opcional)
            </Label>
            <Textarea
              id="ai"
              rows={3}
              className="rounded-xl mt-1"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ejemplo: Quiero un CV con tono profesional enfocado en tecnología y liderazgo..."
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleGenerateAI}
              disabled={!aiPrompt || isGenerating}
              className="mt-2 flex items-center gap-2 rounded-xl"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generar con IA
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-zinc-500">
            * La IA puede ayudarte a mejorar el tono, destacar habilidades y
            optimizar tu presentación profesional.
          </p>
        </div>
      )}
    </>
  );
}
