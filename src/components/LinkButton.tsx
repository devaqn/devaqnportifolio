import { LucideIcon } from "lucide-react";

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}

const LinkButton = ({ href, icon: Icon, label, className = "" }: LinkButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        btn-pill group/btn flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3
        w-full py-2.5 xs:py-3 sm:py-3.5 px-3 xs:px-4 sm:px-6 rounded-full
        text-foreground/90 font-light tracking-wide text-xs xs:text-sm sm:text-base
        ${className}
      `}
    >
      <Icon 
        className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 icon-animated" 
        strokeWidth={1.5} 
      />
      <span>{label}</span>
    </a>
  );
};

export default LinkButton;
