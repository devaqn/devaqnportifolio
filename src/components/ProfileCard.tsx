import { Github, Mail, MessageCircle, Instagram } from "lucide-react";
import { useRef } from "react";
import LinkButton from "./LinkButton";
import AvatarRing from "./AvatarRing";
import { useMousePosition } from "@/hooks/useMousePosition";

const ProfileCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { x, y, isInside } = useMousePosition(cardRef);

  // 3D transform based on mouse position
  const rotateX = isInside ? y * -8 : 0;
  const rotateY = isInside ? x * 8 : 0;
  const translateZ = isInside ? 20 : 0;
  const scale = isInside ? 1.02 : 1;

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl p-5 xs:p-6 sm:p-8 md:p-10 w-full max-w-[92vw] xs:max-w-[320px] sm:max-w-sm animate-fade-in-up mx-auto"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
        transformStyle: "preserve-3d",
        transition: isInside 
          ? "transform 0.1s ease-out" 
          : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-5 xs:mb-6 sm:mb-8 animate-fade-in-up stagger-1">
        {/* SUBSTITUA AQUI PELO CAMINHO DA SUA IMAGEM */}
        <AvatarRing>
          <img
            src="./public/fotodev.jpeg"
            alt="Foto de perfil"
            className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
          />
        </AvatarRing>
      </div>

      {/* Name & Subtitle */}
      <div className="text-center mb-5 xs:mb-6 sm:mb-8 animate-fade-in-up stagger-2">
        {/* SUBSTITUA AQUI PELO SEU NOME */}
        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-1 xs:mb-1.5 sm:mb-2">
          Devaqn
        </h1>
        {/* SUBSTITUA AQUI PELO SEU SUBTÍTULO */}
        <p className="text-muted-foreground font-light text-[11px] xs:text-xs sm:text-sm md:text-base tracking-wide px-1 xs:px-2">
          Desenvolvedor FullStack | UI/UX
        </p>
      </div>

      {/* Links Section */}
      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
        {/* SUBSTITUA OS LINKS ABAIXO PELOS SEUS */}
        <div className="animate-fade-in-up stagger-3">
          <LinkButton
            href="https://github.com/devaqn"
            icon={Github}
            label="GitHub"
          />
        </div>
        
        <div className="animate-fade-in-up stagger-4">
          <LinkButton
            href="pedromiguelaqn@gmail.com"
            icon={Mail}
            label="E-mail"
          />
        </div>
        
        <div className="animate-fade-in-up stagger-5">
          <LinkButton
            href="https://wa.me/5581998191625"
            icon={MessageCircle}
            label="WhatsApp"
          />
        </div>
        
        <div className="animate-fade-in-up stagger-6">
          <LinkButton
            href="https://instagram.com/pedromiguel.aqn"
            icon={Instagram}
            label="Instagram"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
