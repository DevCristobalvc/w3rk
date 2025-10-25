import { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Download } from "lucide-react";
import CVPreview from "@/components/CV/CVPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Template = {
  id: string;
  name: string;
  tags: string[];
  previewBg: string;
};

type Props = {
  templates: Template[];
  selectedTpl: string;
  setSelectedTpl: (id: string) => void;
  previewData: {
    fullName: string;
    headline: string;
    summary: string;
  };
  mode: "upload" | "scratch";
  file?: File | null;
};

export default function TemplatePicker({
  templates,
  selectedTpl,
  setSelectedTpl,
  previewData,
  mode,
  file,
}: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);

  // Función para generar el PDF
  const handleDownloadPDF = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${previewData.fullName || "cv"}_${selectedTpl}.pdf`);
  };

  return (
    <>
      {/* Grid de templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => setSelectedTpl(tpl.id)}
            className={`rounded-2xl border p-3 text-left transition group ${
              selectedTpl === tpl.id
                ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900/40"
                : "hover:border-zinc-300"
            }`}
          >
            <div
              className={`h-32 rounded-xl ${tpl.previewBg} mb-3 flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-300`}
            >
              Vista previa
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{tpl.name}</p>
                <div className="mt-1 flex gap-1 flex-wrap">
                  {tpl.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full text-[10px]"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              {selectedTpl === tpl.id && (
                <Check className="h-5 w-5 text-indigo-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Preview + resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card className="bg-white dark:bg-[#0b0b0b]">
          <CardHeader>
            <CardTitle className="text-sm">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
            <p>
              <span className="font-medium">Origen:</span>{" "}
              {mode === "upload" ? "Archivo subido" : "Desde cero"}
            </p>
            {mode === "upload" && file && (
              <p>
                <span className="font-medium">Archivo:</span> {file.name}
              </p>
            )}
            {mode === "scratch" && (
              <>
                <p>
                  <span className="font-medium">Nombre:</span>{" "}
                  {previewData.fullName || "—"}
                </p>
                <p>
                  <span className="font-medium">Titular:</span>{" "}
                  {previewData.headline || "—"}
                </p>
                <p className="line-clamp-2">
                  <span className="font-medium">Resumen:</span>{" "}
                  {previewData.summary || "—"}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Vista previa del CV con el theme */}
        <Card className="bg-white dark:bg-[#0b0b0b] relative">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm">Previsualización</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </CardHeader>

          <CardContent>
            <CVPreview
              fullName={previewData.fullName}
              headline={previewData.headline}
              summary={previewData.summary}
              template={selectedTpl}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
