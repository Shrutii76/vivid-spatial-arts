import { cn } from "@/lib/utils";

interface HeroTextProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroText = ({ children, className }: HeroTextProps) => {
  return (
    <div className={cn(
      "relative z-10 text-center",
      "animate-float",
      className
    )}>
      {children}
    </div>
  );
};

interface HeroTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroTitle = ({ children, className }: HeroTitleProps) => {
  return (
    <h1 className={cn(
      "text-6xl md:text-8xl lg:text-9xl font-bold",
      "text-primary-foreground",
      "tracking-wider",
      "drop-shadow-2xl",
      "animate-pulse-glow",
      className
    )}>
      {children}
    </h1>
  );
};

interface HeroSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroSubtitle = ({ children, className }: HeroSubtitleProps) => {
  return (
    <p className={cn(
      "text-xl md:text-2xl lg:text-3xl",
      "text-primary-foreground/80",
      "font-light tracking-wide",
      "mt-6",
      "animate-fade-in",
      className
    )}>
      {children}
    </p>
  );
};