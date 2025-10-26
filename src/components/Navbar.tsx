import { Link, useLocation } from "react-router-dom";
import { Wallet, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import asiLogo from "@/assets/asi-logo.png";
import LanguageToggle from "@/components/LanguageToggle/Lenguaje";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/hooks/useWallet";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isConnected, walletName, getShortAddress, connectWallet, disconnectWallet } = useWallet();

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
              className={`text-sm font-medium text-gray-700 hover:text-[#96EA8C] ${
                location.hash === "#features" ? "text-[#96EA8C]" : ""
              }`}
            >
              {t("nav.features")}
            </Button>
          </Link>

          <Link to="/#about">
            <Button
              variant="ghost"
              size="sm"
              className={`text-sm font-medium text-gray-700 hover:text-[#96EA8C] ${
                location.hash === "#about" ? "text-[#96EA8C]" : ""
              }`}
            >
              {t("nav.about")}
            </Button>
          </Link>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            {isConnected ? (
              <div className="flex items-center gap-3">
                {/* Connected Wallet Info */}
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    {walletName}: {getShortAddress()}
                  </span>
                </div>
                
                {/* Profile Menu */}
                <div className="flex items-center gap-2">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  
                  <Link to="/create-cv">
                    <Button variant="ghost" size="sm" className="gap-2 text-[#96EA8C] hover:text-[#7BD474]">
                      <FileText className="h-4 w-4" />
                      CV Builder
                    </Button>
                  </Link>
                  
                  <Button 
                    onClick={disconnectWallet}
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => connectWallet()}
                variant="default"
                size="sm"
                className="gap-2 bg-[#96EA8C] hover:bg-[#7BD474] text-white font-medium transition-colors rounded-lg px-4 py-2"
              >
                <Wallet className="h-4 w-4" />
                {t("nav.connect_wallet")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
