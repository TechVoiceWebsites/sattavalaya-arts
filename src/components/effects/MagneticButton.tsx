import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Magnetic button: subtly pulls toward the cursor. Apple-product-page feel.
 * Wrap any element (button, link). Adds the `pill-cta` utility by default.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.03)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`pill-cta ${className}`}
    >
      {children}
    </button>
  );
}
