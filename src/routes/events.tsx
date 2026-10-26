import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";


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

/* 1. CINEMATIC SHUTTER TEXT: தங்க நிற பட்டை நகர்ந்து எழுத்துக்களை வெளிப்படுத்தும் */
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
          visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-full opacity-0 blur-xs"
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

/* 2. CINEMATIC 3D LIFT: கார்டுகள் & பத்திகள் 3D வடிவில் மிதந்து வரும் */
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

/* ---------- Route Config ---------- */

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Performances — Sattvalaya Arts" },
      { name: "description", content: "Upcoming recitals, workshops, and seasonal yoga sessions at Sattvalaya Arts." },
    ],
  }),
  component: EventsPage,
});

const events = [
  { date: "AUG 16, 2026", title: "Student Recital — Summer Showcase", loc: "Sattvalaya Studio, San Jose", body: "A celebration of progress, featuring solo Veena performances from beginner to advanced students." },
  { date: "SEP 21, 2026", title: "Saraswati Pooja & Open House", loc: "In-person + Live online", body: "Traditional invocation, a short Veena concert, and an open house for prospective students and families." },
  { date: "OCT 12, 2026", title: "Yoga & Pranayama Workshop", loc: "Sattvalaya Studio, San Jose", body: "Half-day workshop on breath, gentle Vinyasa flow, and meditation — for all experience levels." },
  { date: "DEC 14, 2026", title: "Margazhi Veena Recital", loc: "Bay Area Community Hall", body: "An evening of Carnatic compositions honoring the sacred month of Margazhi." },
];

function EventsPage() {
  return (
    <div className="px-5 sm:px-8 py-16 overflow-x-clip bg-white min-h-screen">
      <div className="mx-auto max-w-4xl space-y-14">
        
        {/* Header Section */}
        <header className="text-center space-y-3">
          <div>
            <CinematicShutter delay={100}>
              <span className="inline-block rounded-full bg-orange-100 border border-orange-300 px-4 py-1 text-xs uppercase tracking-[0.35em] text-vermilion font-bold shadow-xs">
                What's Happening
              </span>
            </CinematicShutter>
          </div>

          <div>
            <CinematicShutter delay={220}>
              <h1 className="font-display text-5xl sm:text-6xl font-black text-gradient-gold">
                Events &amp; Performances
              </h1>
            </CinematicShutter>
          </div>

          <CinematicLift direction="bottom" delay={350}>
            <p className="mt-3 text-ink/75 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
              Concerts, recitals, and workshops throughout the year.
            </p>
          </CinematicLift>
        </header>

        {/* Timeline Events List */}
        <ol className="relative border-l-2 border-temple-gold/40 space-y-10 pl-8 ml-4 sm:ml-6">
          {events.map((e, index) => (
            <li key={e.title} className="relative">
              {/* Timeline Pin Indicator */}
              <CinematicLift direction="zoom" delay={index * 120}>
                <span className="absolute -left-[43px] top-4 w-5 h-5 rounded-full bg-gradient-to-r from-[#ff7a18] to-[#c2410c] ring-4 ring-orange-100 shadow-md" />
              </CinematicLift>

              {/* Event Glass Card */}
              <CinematicLift direction="right" delay={150 + index * 100}>
                <div className="glass-card rounded-[2rem] p-7 sm:p-8 border border-amber-200/80 bg-white/95 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                  <div className="inline-block rounded-full bg-orange-50 border border-orange-200/70 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-vermilion font-bold mb-2">
                    {e.date}
                  </div>

                  <div>
                    <CinematicShutter delay={200 + index * 80}>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink hover:text-vermilion transition-colors">
                        {e.title}
                      </h3>
                    </CinematicShutter>
                  </div>

                  <div className="text-sm font-semibold text-orange-600/90 mt-1 flex items-center gap-1.5">
                    <span>📍</span> {e.loc}
                  </div>

                  <p className="text-ink/80 text-[15px] mt-3.5 leading-relaxed font-normal">
                    {e.body}
                  </p>
                </div>
              </CinematicLift>
            </li>
          ))}
        </ol>

        {/* Newsletter / CTA Section */}
        <CinematicLift direction="zoom" delay={150}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#FFFDF9] to-[#FFF6EA] border border-amber-200/80 p-8 sm:p-12 text-center shadow-xl">
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-orange-200/40 blur-2xl" />

            <div>
              <CinematicShutter delay={100}>
                <h2 className="font-display text-3xl font-extrabold text-vermilion">
                  Want updates on future events?
                </h2>
              </CinematicShutter>
            </div>

            <CinematicLift direction="bottom" delay={220}>
              <p className="text-ink/80 text-base font-medium mt-3 max-w-xl mx-auto">
                Reach out and we'll add you to our quarterly newsletter.
              </p>
            </CinematicLift>

            <CinematicLift direction="zoom" delay={350} className="mt-6">
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-gradient-to-r from-orange-500 to-[#c2410c] px-9 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl shadow-orange-300/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                Contact Us →
              </Link>
            </CinematicLift>
          </div>
        </CinematicLift>

      </div>
    </div>
  );
}