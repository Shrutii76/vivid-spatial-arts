import { GeometricScene } from "@/components/GeometricScene";
import { HeroText, HeroTitle, HeroSubtitle } from "@/components/ui/hero-text";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-purple">
      {/* 3D Background Scene */}
      <GeometricScene />
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <HeroText>
          <HeroTitle>
            GEOMETRIC
          </HeroTitle>
          <HeroSubtitle>
            3D Wireframe Experience
          </HeroSubtitle>
        </HeroText>
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-background/20 pointer-events-none" />
    </div>
  );
};

export default Index;
