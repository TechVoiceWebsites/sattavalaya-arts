import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

/* =====================================================================
   CINEMATIC LUXURY REVEAL SYSTEM
   - Independent micro-observers: ஒவ்வொரு component-ம் திரையில் படும்போது trigger ஆகும்
   - Cinematic Shutter: கோல்டன் திரை விலகி உரை வெளிப்படும்
   - 3D Kinetic Lift: கார்டுகள் & ஃபீல்டுகள் 3D கோணத்தில் எழுந்து வரும்
   - Replays smoothly on both Scroll Down & Scroll Up
   ===================================================================== */

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

/* 1. CINEMATIC SHUTTER TEXT: தங்க நிற பட்டை விலகி எழுத்துக்களை வெளிப்படுத்தும் */
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

/* 2. CINEMATIC 3D LIFT: கார்டுகள், ஃபீல்டுகள் மற்றும் பட்டன்கள் மிதந்து வரும் */
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
        return "scale-85 opacity-0 blur-md";
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

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sattvalaya Arts" },
      {
        name: "description",
        content:
          "Get in touch about Veena & Yoga classes at Sattvalaya Arts in San Jose, California.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="px-5 sm:px-8 py-16 overflow-x-clip bg-white min-h-screen">
      <div className="mx-auto max-w-5xl space-y-14">
        
        {/* Header Section */}
        <header className="text-center space-y-3">
          <div>
            <CinematicShutter delay={100}>
              <span className="inline-block rounded-full bg-orange-100 border border-orange-300 px-4 py-1 text-xs uppercase tracking-[0.35em] text-vermilion font-bold shadow-xs">
                Reach Out
              </span>
            </CinematicShutter>
          </div>

          <div>
            <CinematicShutter delay={220}>
              <h1 className="font-display text-5xl sm:text-6xl font-black text-gradient-gold">
                Contact Us
              </h1>
            </CinematicShutter>
          </div>

          <CinematicLift direction="bottom" delay={350}>
            <p className="mt-3 text-ink/75 max-w-xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
              Curious about classes, schedules, or trials? Send a note — we'd love to hear from you.
            </p>
          </CinematicLift>
        </header>

        {/* Main Grid: Info Sidebar & Form */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          
          {/* Left Column: Contact Details & Map */}
          <aside className="space-y-5">
            <CinematicLift direction="left" delay={120}>
              <Info label="Location" value="San Jose, California, USA" />
            </CinematicLift>

            <CinematicLift direction="left" delay={220}>
              <Info
                label="Email"
                value="hello@sattvalayaarts.com"
                href="mailto:hello@sattvalayaarts.com"
              />
            </CinematicLift>

            <CinematicLift direction="left" delay={320}>
              <Info label="Phone" value="+1 (213) 304-4799" href="tel:+12133044799" />
            </CinematicLift>

            <CinematicLift direction="left" delay={420}>
              <Info label="Formats" value="In-person · Online · Hybrid" />
            </CinematicLift>

            {/* Location Map Card */}
            <CinematicLift direction="left" delay={520}>
              <div className="glass-card rounded-[2rem] p-6 border border-amber-200/80 bg-white/95 shadow-xl">
                <div className="text-xs uppercase tracking-[0.25em] text-vermilion font-bold mb-3">
                  Location Map
                </div>
                <div className="w-full overflow-hidden rounded-2xl shadow-inner border border-amber-100">
                  <div className="aspect-[16/9] w-full">
                    <iframe
                      title="Sattvalaya Arts — San Jose"
                      src="https://www.google.com/maps?q=37.33874,-121.8852525&z=14&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-3 bg-cream/40 border-t border-amber-100/60">
                    <a
                      href="https://www.google.com/maps/place/San+Jose,+CA/@37.2961565,-121.815771,11z/data=!3m1!4b1!4m6!3m5!1s0x808fcae48af93ff5:0xb99d8c0aca9f717b!8m2!3d37.33874!4d-121.8852525!16zL20vMGYwNHY?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-vermilion hover:underline"
                    >
                      <span>📍</span> Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </CinematicLift>
          </aside>

          {/* Right Column: Contact Form */}
          <CinematicLift direction="right" delay={200}>
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 border border-amber-200/90 bg-white/95 shadow-2xl relative overflow-hidden">
              <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 bg-orange-100/50 rounded-full blur-3xl" />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5 relative z-10"
              >
                {sent ? (
                  <CinematicLift direction="zoom" delay={100} className="text-center py-12">
                    <div className="text-6xl mb-4 animate-bounce">🙏</div>
                    <h3 className="font-display text-3xl font-extrabold text-vermilion">
                      Thank you!
                    </h3>
                    <p className="text-ink/80 font-medium mt-3 text-base">
                      Your message has been received. We'll be in touch soon.
                    </p>
                  </CinematicLift>
                ) : (
                  <>
                    <CinematicLift direction="bottom" delay={150}>
                      <Field label="Name" name="name" placeholder="Your full name" required />
                    </CinematicLift>

                    <CinematicLift direction="bottom" delay={250}>
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </CinematicLift>

                    <CinematicLift direction="bottom" delay={350}>
                      <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (xxx) xxx-xxxx"
                      />
                    </CinematicLift>

                    <CinematicLift direction="bottom" delay={450}>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.2em] text-vermilion font-bold mb-2">
                          Interested in
                        </label>
                        <select
                          name="interest"
                          className="w-full rounded-2xl border border-amber-200/80 bg-cream/50 px-4 py-3.5 text-sm text-ink font-medium focus:outline-none focus:ring-2 focus:ring-vermilion/40 transition shadow-xs"
                        >
                          <option>Veena — Beginner</option>
                          <option>Veena — Intermediate</option>
                          <option>Veena — Advanced</option>
                          <option>Yoga</option>
                          <option>Both Veena &amp; Yoga</option>
                        </select>
                      </div>
                    </CinematicLift>

                    <CinematicLift direction="bottom" delay={550}>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.2em] text-vermilion font-bold mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          placeholder="Tell us about your musical or yoga background, goals, or questions..."
                          className="w-full rounded-2xl border border-amber-200/80 bg-cream/50 px-4 py-3.5 text-sm text-ink font-medium focus:outline-none focus:ring-2 focus:ring-vermilion/40 transition shadow-xs resize-none"
                        />
                      </div>
                    </CinematicLift>

                    <CinematicLift direction="zoom" delay={650} className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-full py-4 text-sm font-bold tracking-wide text-white shadow-xl shadow-orange-300/40 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                        style={{ background: "linear-gradient(135deg,#ff7a18,#c2410c)" }}
                      >
                        Send Message →
                      </button>
                    </CinematicLift>
                  </>
                )}
              </form>
            </div>
          </CinematicLift>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = <span className="text-ink/90 font-medium text-[15px]">{value}</span>;
  return (
    <div className="glass-card rounded-2xl p-5 border border-amber-200/70 bg-white/95 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="text-[11px] uppercase tracking-[0.25em] text-vermilion font-bold mb-1">
        {label}
      </div>
      {href ? (
        <a href={href} className="hover:text-vermilion transition-colors inline-block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-vermilion font-bold mb-2">
        {label}
      </label>
      <input
        {...rest}
        className="w-full rounded-2xl border border-amber-200/80 bg-cream/50 px-4 py-3.5 text-sm text-ink font-medium focus:outline-none focus:ring-2 focus:ring-vermilion/40 transition shadow-xs"
      />
    </div>
  );
}