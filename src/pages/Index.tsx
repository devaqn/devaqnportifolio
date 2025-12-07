import ProfileCard from "@/components/ProfileCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { isDark, toggle } = useTheme();

  return (
    <main className="min-h-screen bg-gradient-main vignette flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <AnimatedBackground isDark={isDark} />
      <ThemeToggle isDark={isDark} onToggle={toggle} />
      <div className="relative z-10">
        <ProfileCard />
      </div>
    </main>
  );
};

export default Index;
