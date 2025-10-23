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
        <Sun aria-hidden="true" className="size-6 text-gray-700 dark:text-gray-400"/>
      ) : (
        <Moon aria-hidden="true" className="size-6 text-gray-700 dark:text-gray-400"/>
      )}
    </Button>
  );
};

export default ButtonDarkMode;
