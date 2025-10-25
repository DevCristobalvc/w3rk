import React from "react";

type Props = {
  fullName: string;
  headline: string;
  summary: string;
  template: string;
};

export default function CVPreview({ fullName, headline, summary, template }: Props) {
  const themes = {
    neo: "bg-white text-gray-900 font-sans border border-gray-200",
    grid: "bg-gradient-to-b from-indigo-50 to-indigo-100 text-gray-800 font-serif border border-indigo-200",
    folio: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-gray-900 font-semibold border border-emerald-300",
  };

  return (
    <div
      id="cv-preview"
      className={`aspect-[8.5/11] w-full rounded-xl shadow-md overflow-hidden p-8 ${themes[template]}`}
    >
      <header className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{fullName || "Tu Nombre"}</h1>
        <p className="text-sm text-gray-600">{headline || "Tu titular profesional"}</p>
      </header>
      <section>
        <h2 className="text-base font-semibold mb-2">Perfil</h2>
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {summary || "Aquí irá el resumen generado por ti o por IA."}
        </p>
      </section>
      <footer className="mt-8 text-xs text-gray-500">
        <p>Generado con W3RK CV Builder</p>
      </footer>
    </div>
  );
}
