import {
  BookOpen,
  Sparkles,
  Zap,
  Heart,
  Palette,
  Type,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  sparkles: Sparkles,
  zap: Zap,
  heart: Heart,
  palette: Palette,
  type: Type,
  lightbulb: Lightbulb,
};

export function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = (name && ICONS[name]) || Zap;
  return <Cmp className={className} />;
}
