import { useEffect } from "react";

export type Theme = "light";

export function useTheme() {
  const theme: Theme = "light";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    // Always ensure light mode
    root.classList.add("light");
  }, []);

  // No toggle function - always light mode
  const toggleTheme = () => {
    // Do nothing - always light mode
  };

  return { theme, toggleTheme };
}
