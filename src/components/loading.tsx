import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
};

export function Loading({ size = "md", text = "Loading...", className }: Readonly<Props>) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center mx-auto gap-2", className)}>
      <div className={cn("animate-spin rounded-full border-b-2 border-teal-600 mx-auto", sizeClasses[size])}></div>
      {text && <span className={cn("text-muted-foreground", textSizes[size])}>{text}</span>}
    </div>
  );
}
