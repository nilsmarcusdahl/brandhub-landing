import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "up" | "left" | "right" | "zoom" | "blur";

const hidden: Record<Variant, CSSProperties> = {
  up: { opacity: 0, transform: "translateY(40px)" },
  left: { opacity: 0, transform: "translateX(-48px)" },
  right: { opacity: 0, transform: "translateX(48px)" },
  zoom: { opacity: 0, transform: "scale(0.92)" },
  blur: { opacity: 0, filter: "blur(12px)", transform: "translateY(16px)" },
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms`, ...(shown ? { opacity: 1, transform: "none", filter: "none" } : hidden[variant]) }}
    >
      {children}
    </div>
  );
}
