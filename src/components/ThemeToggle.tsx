"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default" | "icon" | "lg";
}

export function ThemeToggle({ className = "", size = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleTheme}
      className={`w-8 h-8 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  );
}
