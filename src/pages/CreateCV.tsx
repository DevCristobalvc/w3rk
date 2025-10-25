import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import CVForm from "@/components/CV/CVForm";
import TemplatePicker from "@/components/CV/TemplatePicker";

type SourceMode = "upload" | "scratch";

const TEMPLATES = [
  {
    id: "neo",
    name: "Neo Minimal",
    tags: ["Clean", "One-column"],
    previewBg:
      "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700",
  },
  {
    id: "grid",
    name: "Grid Pro",
    tags: ["2-column", "Sections"],
    previewBg:
      "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/30",
  },
  {
    id: "folio",
    name: "Folio Bold",
    tags: ["Creative", "Headlines"],
    previewBg:
      "bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/30",
  },
];

export default function CreateCV() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);

  const [mode, setMode] = useState<SourceMode>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedTpl, setSelectedTpl] = useState("neo");

  const canContinueStep1 = useMemo(() => {
    if (mode === "upload") return !!file;
    return fullName.trim().length > 1 || summary.trim().length > 10;
  }, [mode, file, fullName, summary]);

  const goNext = () => setStep(2);
  const goBack = () => setStep(1);

  const handleFinish = () => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("tpl", selectedTpl);
    if (mode === "scratch") {
      params.set("name", fullName);
      if (headline) params.set("headline", headline);
    }
    navigate(`/cv-builder?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkBg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Crear CV
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Dos pasos: elige el origen y selecciona la plantilla.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {step === 2 && (
              <Button variant="ghost" className="rounded-xl" onClick={goBack}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
              </Button>
            )}

            {step === 1 ? (
              <Button
                className="rounded-xl"
                onClick={goNext}
                disabled={!canContinueStep1}
              >
                Continuar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="rounded-xl" onClick={handleFinish}>
                Finalizar <Check className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Stepper visual */}
        <div className="mb-6 flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              step >= 1
                ? "border-indigo-500 text-indigo-600"
                : "border-zinc-300 text-zinc-500"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
            <span className="text-sm">1. Origen</span>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              step >= 2
                ? "border-indigo-500 text-indigo-600"
                : "border-zinc-300 text-zinc-500"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
            <span className="text-sm">2. Plantilla</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main card */}
          <Card className="lg:col-span-2 bg-white dark:bg-[#0b0b0b]">
            <CardHeader>
              <CardTitle className="text-base">
                {step === 1
                  ? "Selecciona el origen del CV"
                  : "Elige una plantilla"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 ? (
                <CVForm
                  mode={mode}
                  setMode={setMode}
                  file={file}
                  setFile={setFile}
                  fullName={fullName}
                  setFullName={setFullName}
                  headline={headline}
                  setHeadline={setHeadline}
                  summary={summary}
                  setSummary={setSummary}
                  aiPrompt={aiPrompt}
                  setAiPrompt={setAiPrompt}
                />
              ) : (
                <TemplatePicker
                  templates={TEMPLATES}
                  selectedTpl={selectedTpl}
                  setSelectedTpl={setSelectedTpl}
                  previewData={{ fullName, headline, summary }}
                  mode={mode}
                  file={file}
                />
              )}
            </CardContent>
          </Card>

          {/* Side tips */}
          <Card className="bg-white dark:bg-[#0b0b0b]">
            <CardHeader>
              <CardTitle className="text-base">Consejos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300 space-y-3">
              <p>
                • Para <span className="font-medium">Subir CV</span>, usa PDF o
                DOCX. Extraeremos texto y estructura.
              </p>
              <p>
                • En <span className="font-medium">Crear desde cero</span>,
                brinda un buen resumen y usa la pauta de IA para el tono.
              </p>
              <p>
                • Elige una <span className="font-medium">Plantilla</span> que
                combine con tu perfil (técnico, producto, creativo).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
