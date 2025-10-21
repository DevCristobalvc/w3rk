// src/components/ButtonDarkMode.tsx
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const ButtonDarkMode = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-green-500" />
      ) : (
        <Moon className="h-4 w-4 text-gray-700" />
      )}
    </Button>
  );
};

export default ButtonDarkMode;
