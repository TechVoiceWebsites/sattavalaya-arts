import { useEffect, useRef, type ReactNode, type ElementType, type CSSProperties } from "react";

type ScrollRevealProps = {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  threshold?: number;
};

/**
 * Apple-style reveal: fades, slides, and unblurs as it enters the viewport.
 * Pair with `.reveal` utility in styles.css.
 */
export function ScrollReveal({
  as: Tag = "div",
  children,
  delay = 0,
  className = "",
  style,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("reveal-in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
