import { ReactNode } from "react";

interface AvatarRingProps {
  children: ReactNode;
}

const AvatarRing = ({ children }: AvatarRingProps) => {
  return (
    <div className="avatar-container">
      <div className="avatar-ring-animated">
        <div className="avatar-inner">
          {children}
        </div>
      </div>
      {/* Glow effect */}
      <div className="avatar-glow" />
    </div>
  );
};

export default AvatarRing;
