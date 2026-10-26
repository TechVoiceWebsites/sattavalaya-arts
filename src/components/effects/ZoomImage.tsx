import { useEffect, useRef, type ImgHTMLAttributes } from "react";

/**
 * Apple-style image: starts zoomed in, eases back to 1.0 as it enters view.
 */
export function ZoomImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) img.classList.add("zoom-frame-img-in");
        });
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const { className = "", ...rest } = props;
  return (
    <div ref={wrapRef} className="zoom-frame">
      <img ref={imgRef} {...rest} className={`zoom-frame-img w-full h-full object-cover ${className}`} />
    </div>
  );
}
