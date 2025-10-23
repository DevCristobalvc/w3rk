import { Button } from "@/components/ui/button";
import i18n from "@/i18n";

const LanguageToggle = () => {
  const lang = (i18n.language || "en").slice(0, 2);
  const isSpanish = lang === "es";

  const toggleLang = () => {
    const next = isSpanish ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem("i18nextLng", next);
    document.documentElement.lang = next;
  };

  return (
    <Button
      onClick={toggleLang}
      variant="ghost"
      size="sm"
      aria-pressed={isSpanish}
      className="w-8 h-8 p-0 rounded-full"
      title={isSpanish ? "Cambiar a English" : "Switch to Español"}
    >
      <span
        role="img"
        aria-label={isSpanish ? "Colombia flag" : "United States flag"}
        className="text-[18px] leading-none"
      >
        {isSpanish ? "🇨🇴" : "🇺🇸"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
