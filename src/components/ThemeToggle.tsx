import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="
        fixed top-3 right-3 xs:top-4 xs:right-4 z-50
        w-12 h-12 xs:w-14 xs:h-14 sm:w-12 sm:h-12 rounded-full
        bg-card/80 backdrop-blur-md
        border border-border/50
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110 hover:border-accent/50
        hover:shadow-lg hover:shadow-accent/20
        active:scale-90
        touch-manipulation
        group
      "
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <div className="relative w-5 h-5 xs:w-6 xs:h-6">
        <Sun
          className={`
            absolute inset-0 w-5 h-5 xs:w-6 xs:h-6 text-accent
            transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
            ${isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}
          `}
          strokeWidth={1.5}
        />
        <Moon
          className={`
            absolute inset-0 w-5 h-5 xs:w-6 xs:h-6 text-accent
            transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
            ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}
          `}
          strokeWidth={1.5}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
