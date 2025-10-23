import { Link, useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import asiLogo from "@/assets/asi-logo.png";
import ButtonDark from "@/components/ButtonDarkMode";
import LanguageToggle from "@/components/LanguageToggle/Lenguaje";
import ProfileMenu from "@/components/ProfileHeader";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="border-b border-border backdrop-blur-xl sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={asiLogo} alt="ASI Alliance" className="h-8" />
        </Link>

        {/* Menú principal */}
        <div className="flex items-center gap-6">
          <Link to="/#features">
            <Button
              variant="ghost"
              size="sm"
              className={`text-sm font-light dark:text-gray-300 ${
                location.hash === "#features" ? "text-green-600 dark:text-[#a6eea1]" : ""
              }`}
            >
              {t("nav.features")}
            </Button>
          </Link>

          <Link to="/#about">
            <Button
              variant="ghost"
              size="sm"
              className={`text-sm font-light dark:text-gray-300 ${
                location.hash === "#about" ? "text-green-600 dark:text-[#a6eea1]" : ""
              }`}
            >
              {t("nav.about")}
            </Button>
          </Link>

          {/* Iconos alineados */}
          <div className="flex items-center gap-3">
            {/* Modo oscuro */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full transition">
              <ButtonDark />
            </div>

            {/* Perfil */}
            <ProfileMenu />

            {/* Lenguaje */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full transition">
              <LanguageToggle />
            </div>

            {/* Conectar Billetera */}
            <Link to="/ai-chat">
              <Button
                variant="default"
                size="sm"
                className="gap-2 bg-[#a6eea1] hover:bg-[#91e68b] text-black font-medium transition rounded-lg"
              >
                <Wallet className="h-4 w-4" />
                {t("nav.connect_wallet")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
