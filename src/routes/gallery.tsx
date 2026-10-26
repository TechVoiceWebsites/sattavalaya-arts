import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import g1 from "@/assets/Rajiwith.Veena.webp";
import g2 from "@/assets/Veena classes.webp";
import g3 from "@/assets/YogaPose.webp";
import g4 from "@/assets/Natarajasana.webp";
import g5 from "@/assets/Meditation.webp";
import g6 from "@/assets/Teacher.webp";
import g7 from "@/assets/Sohanikama.webp";
import g8 from "@/assets/Sohanikama-1.webp";
import g9 from "@/assets/Veena.png";



const CINEMATIC_EASE = "ease-[cubic-bezier(0.19,1,0.22,1)]";

function useIndividualReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* 1. CINEMATIC SHUTTER TEXT */
function CinematicShutter({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, visible } = useIndividualReveal<HTMLElement>(0.12);

  return (
    <Tag ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transform-gpu transition-all duration-[1200ms] ${CINEMATIC_EASE} ${
          visible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-full opacity-0 blur-xs"
        }`}
      >
        {children}
      </div>

      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-[#ff7a18] via-[#F3D58A] to-[#c2410c] transform-gpu transition-transform duration-[1100ms] ${CINEMATIC_EASE} ${
          visible ? "translate-x-full" : "-translate-x-full"
        }`}
      />
    </Tag>
  );
}

/* 2. CINEMATIC 3D LIFT */
function CinematicLift({
  children,
  delay = 0,
  direction = "bottom",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "bottom" | "left" | "right" | "zoom";
  className?: string;
  as?: ElementType;
}) {
  const { ref, visible } = useIndividualReveal<HTMLElement>(0.1);

  const getTransform = () => {
    if (visible) return "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0 rotate-0";
    switch (direction) {
      case "left":
        return "-translate-x-12 translate-y-6 scale-95 opacity-0 blur-sm -rotate-2";
      case "right":
        return "translate-x-12 translate-y-6 scale-95 opacity-0 blur-sm rotate-2";
      case "zoom":
        return "scale-80 opacity-0 blur-md";
      case "bottom":
      default:
        return "translate-y-14 scale-[0.96] opacity-0 blur-sm";
    }
  };

  return (
    <Tag ref={ref} className="perspective-[1400px]">
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transform-gpu transition-all duration-[1400ms] ${CINEMATIC_EASE} ${getTransform()} ${className}`}
      >
        {children}
      </div>
    </Tag>
  );
}

/* 3. CINEMATIC GALLERY CARD REVEAL */
function CinematicGalleryCard({
  src,
  cap,
  isContain = false,
  delay = 0,
}: {
  src: string;
  cap: string;
  isContain?: boolean;
  delay?: number;
}) {
  const { ref, visible } = useIndividualReveal<HTMLElement>(0.12);

  return (
    <figure
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-[2rem] aspect-square glass-card bg-white/70 shadow-lg border border-amber-200/60 transition-all duration-[1300ms] ${CINEMATIC_EASE} hover:-translate-y-2 hover:shadow-2xl ${
        visible
          ? "opacity-100 scale-100 translate-y-0 blur-0"
          : "opacity-0 scale-90 translate-y-12 blur-xs"
      }`}
    >
      {/* Expanding Clip Image Container */}
      <div
        style={{ transitionDelay: `${delay + 60}ms` }}
        className={`h-full w-full transform-gpu transition-all duration-[1500ms] ${CINEMATIC_EASE} ${
          visible
            ? "[clip-path:inset(0%_round_2rem)]"
            : "[clip-path:inset(100%_0%_0%_0%_round_2rem)]"
        }`}
      >
        <div
          style={{ transitionDelay: `${delay + 120}ms` }}
          className={`h-full w-full transform-gpu transition-all duration-[2000ms] ${CINEMATIC_EASE} ${
            visible ? "scale-100 brightness-100 blur-0" : "scale-[1.25] brightness-75 blur-sm"
          }`}
        >
          <img
            src={src}
            alt={cap}
            className={`w-full h-full ${
              isContain ? "object-contain p-6" : "object-cover"
            } transition-transform duration-700 ease-out group-hover:scale-108`}
          />
        </div>
      </div>

      {/* Light Sheen Sweep Effect on Scroll In */}
      <div
        style={{ transitionDelay: `${delay + 200}ms` }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent transform-gpu transition-transform duration-[1600ms] ${CINEMATIC_EASE} ${
          visible ? "translate-x-full translate-y-full" : "-translate-x-full -translate-y-full"
        }`}
      />

      {/* Caption Overlay */}
      <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white text-sm font-medium px-5 py-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="inline-block border-l-2 border-[#ff7a18] pl-2">{cap}</span>
      </figcaption>
    </figure>
  );
}

/* ---------- Data ---------- */

const images = [
  { src: g1, cap: "Rajalakshmi with her Veena" },
  { src: g2, cap: "Veena class in session" },
  { src: g3, cap: "Tree Pose — Vrikshasana" },
  { src: g7, cap: "Carnatic recital" },
  { src: g4, cap: "Natarajasana" },
  { src: g5, cap: "Meditation" },
  { src: g8, cap: "Performance" },
  { src: g6, cap: "Teaching moment" },
  { src: g9, cap: "The divine instrument" },
];

/* ---------- Route Config ---------- */

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Sattvalaya Arts" },
      {
        name: "description",
        content: "Moments from the studio — Veena performances, classes, and yoga sessions.",
      },
      { property: "og:image", content: g1 },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="px-5 sm:px-8 py-16 overflow-x-clip bg-white min-h-screen">
      <div className="mx-auto max-w-6xl space-y-12">
        
        {/* Header Section */}
        <header className="text-center space-y-3">
          <div>
            <CinematicShutter delay={100}>
              <span className="inline-block rounded-full bg-orange-100 border border-orange-300 px-4 py-1 text-xs uppercase tracking-[0.35em] text-vermilion font-bold shadow-xs">
                Moments
              </span>
            </CinematicShutter>
          </div>

          <div>
            <CinematicShutter delay={220}>
              <h1 className="font-display text-5xl sm:text-6xl font-black text-gradient-gold">
                Gallery
              </h1>
            </CinematicShutter>
          </div>

          <CinematicLift direction="bottom" delay={350}>
            <p className="mt-3 text-ink/75 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
              Glimpses from classes, performances, and the quiet practice that shapes them.
            </p>
          </CinematicLift>
        </header>

        {/* Gallery Grid with Staggered Delays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {images.map((img, i) => (
            <CinematicGalleryCard
              key={i}
              src={img.src}
              cap={img.cap}
              isContain={i === images.length - 1}
              delay={(i % 3) * 120}
            />
          ))}
        </div>

      </div>
    </div>
  );
}