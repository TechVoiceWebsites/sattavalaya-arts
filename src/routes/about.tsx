import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import teacher from "@/assets/Teacher.webp";
import raji from "@/assets/Rajiwith.Veena.webp";
import missionBg from "@/assets/Spiritual symbol.webp";
import visionBg from "@/assets/Om symbol.webp";
import directorBg from "@/assets/Veena instrument.webp";



const CINEMATIC_EASE = "ease-[cubic-bezier(0.19,1,0.22,1)]"; // Expo Out - Buttery Smooth

function useIndividualReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ஸ்க்ரோல் செய்து திரைக்குள் வரும்போதும் வெளியேறும்போதும் மாற்றத்தை ஏற்படுத்தும்
        setVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // கண்ணுக்குத் தெரியும் எல்லைக்கு வந்ததும் தொடங்கும்
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
  const { ref, visible } = useIndividualReveal<HTMLElement>(0.15);

  return (
    <Tag ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      {/* பின்னணியில் இருந்து மெல்ல மேலே எழும் உரை */}
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

      {/* சினிமா ஷட்டர் போல மின்னல் வேகத்தில் விலகும் திரை */}
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-[#ff7a18] via-[#F3D58A] to-[#c2410c] transform-gpu transition-transform duration-[1100ms] ${CINEMATIC_EASE} ${
          visible ? "translate-x-full" : "-translate-x-full"
        }`}
      />
    </Tag>
  );
}

/* 2. CINEMATIC 3D LIFT: கார்டுகள் மற்றும் பத்திகள் 3D வடிவில் மிதந்து வரும் */
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
  const { ref, visible } = useIndividualReveal<HTMLElement>(0.12);

  const getTransform = () => {
    if (visible) return "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0 rotate-0";
    switch (direction) {
      case "left":
        return "-translate-x-20 translate-y-6 scale-95 opacity-0 blur-sm -rotate-2";
      case "right":
        return "translate-x-20 translate-y-6 scale-95 opacity-0 blur-sm rotate-2";
      case "zoom":
        return "scale-75 opacity-0 blur-md";
      case "bottom":
      default:
        return "translate-y-20 scale-[0.96] opacity-0 blur-sm";
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

/* 3. CINEMATIC ANAMORPHIC IMAGE: புகைப்படங்கள் விரிந்து ஒளிரும் எஃபெக்ட் */
function CinematicImageReveal({
  src,
  alt,
  shape = "rounded",
  delay = 0,
  className = "",
  wrapperClassName = "",
}: {
  src: string;
  alt: string;
  shape?: "rounded" | "circle";
  delay?: number;
  className?: string;
  wrapperClassName?: string;
}) {
  const { ref, visible } = useIndividualReveal<HTMLDivElement>(0.12);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transform-gpu transition-all duration-[1600ms] ${CINEMATIC_EASE} ${
          shape === "circle"
            ? visible
              ? "[clip-path:circle(100%_at_50%_50%)]"
              : "[clip-path:circle(0%_at_50%_50%)]"
            : visible
              ? "[clip-path:inset(0%_round_1.5rem)]"
              : "[clip-path:inset(100%_0%_0%_0%_round_1.5rem)]"
        }`}
      >
        <div
          style={{ transitionDelay: `${delay + 100}ms` }}
          className={`transform-gpu transition-all duration-[2400ms] ${CINEMATIC_EASE} ${
            visible
              ? "scale-100 brightness-100 blur-0"
              : "scale-[1.35] brightness-50 blur-md"
          }`}
        >
          <img src={src} alt={alt} className={`block ${className}`} />
        </div>
      </div>
      {/* பளபளப்பான கிளாஸ் ஒளிக்கீற்று (Light Sheen sweep) */}
      <div
        style={{ transitionDelay: `${delay + 300}ms` }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent transform-gpu transition-transform duration-[1800ms] ${CINEMATIC_EASE} ${
          visible ? "translate-x-full translate-y-full" : "-translate-x-full -translate-y-full"
        }`}
      />
    </div>
  );
}

/* ---------- Route ---------- */

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rajalakshmi Roshan | Sattvalaya Arts" },
      { name: "description", content: "Meet Rajalakshmi Roshan — Vainika, Bharatanatyam dancer, and yoga practitioner. Artistic Director of Sattvalaya Arts." },
      { property: "og:title", content: "Meet the Artistic Director — Sattvalaya Arts" },
      { property: "og:image", content: teacher },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="px-5 sm:px-8 py-16 overflow-x-clip bg-white">
      <div className="mx-auto max-w-6xl space-y-28">
        
        {/* ---------- 1. HERO SECTION ---------- */}
        <section className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="relative">
              {/* பின்னணி கோல்டன் ஒளி வட்டம் */}
              <div className="absolute -inset-6 rounded-[2.5rem] opacity-60 blur-3xl animate-pulse" />
              
              <CinematicImageReveal
                src={teacher}
                alt="Rajalakshmi Roshan"
                delay={200}
                className="relative rounded-3xl w-full aspect-[4/5] object-cover glass-card p-2 shadow-2xl border border-white/80"
              />
            </div>
          </div>

          <div className="space-y-8 text-ink/80 leading-relaxed text-[15px]">
            <div className="space-y-4">
              <div>
                <CinematicShutter delay={100}>
                  <span className="inline-block rounded-full bg-orange-100 border border-orange-300 px-4 py-1 text-xs uppercase tracking-[0.35em] text-vermilion font-bold shadow-xs">
                    Meet Your Guru
                  </span>
                </CinematicShutter>
              </div>

              <div>
                <CinematicShutter delay={250}>
                  <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
                    The Soul Behind <span className="italic text-gradient-gold">Nataraji Arts</span>
                  </h1>
                </CinematicShutter>
              </div>

              <CinematicLift direction="bottom" delay={400}>
                <p className="text-lg sm:text-xl text-ink/75 max-w-3xl font-medium leading-relaxed">
                  Decades of devotion to Veena, dance and wellness — shared with every student who walks this path.
                </p>
              </CinematicLift>
            </div>

            <div className="space-y-6">
              <CinematicLift direction="left" delay={200}>
                <p className="border-l-4 border-[#ff7a18] pl-4 bg-orange-50/50 py-2 rounded-r-xl">
                  <span className="font-semibold text-ink">Rajalakshmi Roshan</span> is a biotechnologist by profession and a Vainika, Bharatanatyam dancer, and yoga practitioner by passion. Her training began at age 11, and she brings decades of dedication to sharing the divine art of Veena and wellness practices.
                </p>
              </CinematicLift>

              <div>
                <CinematicShutter delay={300}>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    A Vainika, dancer &amp; healer
                  </h2>
                </CinematicShutter>
              </div>

              <CinematicLift direction="right" delay={400}>
                <p>
                  A biotechnologist by profession and a Vainika, Bharatanatyam dancer, and yoga practitioner by passion. With training beginning at age 11, she brings decades of dedication to sharing the divine art of Veena and wellness practices.
                </p>
              </CinematicLift>
            </div>

            {/* வரிசையாக ஒவ்வொன்றாக எழும் பாயிண்ட்டுகள் */}
            <ul className="space-y-3.5 text-ink/85 font-medium">
              {[
                "Trained under Guru Shri V. S. Rangarajan",
                "Certified Ashtanga & Vinyasa yoga instructor",
                "Active performer & cultural educator",
                "Blends classical tradition with modern teaching",
              ].map((point, index) => (
                <CinematicLift
                  as="li"
                  key={point}
                  direction="left"
                  delay={120 * (index + 1)}
                  className="flex items-center gap-3.5 rounded-2xl bg-orange-50/60 border border-orange-100 p-3.5 shadow-xs hover:border-[#ff7a18]/40 transition-colors"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#ff7a18] to-[#c2410c] text-white text-xs font-bold shadow-sm">
                    ✓
                  </span>
                  <span>{point}</span>
                </CinematicLift>
              ))}
            </ul>

            <CinematicLift direction="zoom" delay={300} className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#0e9976] to-[#0d8765] px-9 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Begin Your Journey →
              </Link>
            </CinematicLift>
          </div>
        </section>

        {/* ---------- 2. MISSION & VISION ---------- */}
        <section className="relative overflow-hidden rounded-[3rem] border border-amber-200 bg-white/80 px-6 py-16 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/50 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-8 h-32 w-32 rounded-full bg-amber-200/60 blur-2xl" />

          <div className="mx-auto max-w-4xl text-center">
            <div>
              <CinematicShutter delay={100}>
                <span className="inline-block text-xs uppercase tracking-[0.35em] text-vermilion font-bold mb-3">
                  Our Mission &amp; Vision
                </span>
              </CinematicShutter>
            </div>

            <div>
              <CinematicShutter delay={250}>
                <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-ink leading-tight">
                  Inspiring the Next Generation Through <span className="italic text-gradient-gold">Divine Arts</span> and Holistic Wellness
                </h2>
              </CinematicShutter>
            </div>

            <CinematicLift direction="bottom" delay={400}>
              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-ink/75 font-medium leading-relaxed">
                A space where ancient tradition meets modern aspiration — nurturing artists, healers, and seekers.
              </p>
            </CinematicLift>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Mission Card */}
            <CinematicLift direction="left" delay={200} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <img src={missionBg} alt="Mission background" className="absolute inset-0 h-full w-full object-cover opacity-15 filter brightness-90 transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/10" />
                <div className="relative z-10">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#ff7a18] to-[#e9a04a] text-white mb-6 shadow-lg shadow-orange-300/50">
                    <span className="text-3xl">🎯</span>
                  </div>

                  <div>
                    <CinematicShutter delay={350}>
                      <h3 className="font-display text-3xl font-bold text-ink mb-4">Our Mission</h3>
                    </CinematicShutter>
                  </div>

                  <p className="text-ink/90 leading-relaxed text-[15px]">
                    To share the beauty of the divine Veena with audiences from diverse cultural backgrounds, and to nurture the next generation of Vainikas by fostering a supportive, creative, and joyful learning experience. We aim to cultivate balance and harmony of body, mind, and soul through comprehensive wellness programs.
                  </p>
                </div>
              </div>
            </CinematicLift>

            {/* Vision Card */}
            <CinematicLift direction="right" delay={350} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <img src={visionBg} alt="Vision background" className="absolute inset-0 h-full w-full object-cover opacity-15 filter brightness-90 transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/10" />
                <div className="relative z-10">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#ff7a18] to-[#e9a04a] text-white mb-6 shadow-lg shadow-orange-300/50">
                    <span className="text-3xl">🌟</span>
                  </div>

                  <div>
                    <CinematicShutter delay={500}>
                      <h3 className="font-display text-3xl font-bold text-ink mb-4">Our Vision</h3>
                    </CinematicShutter>
                  </div>

                  <p className="text-ink/90 leading-relaxed text-[15px]">
                    To create a thriving community where traditional Indian classical arts and holistic wellness practices are accessible to all. We envision a space where students not only master technique but also connect deeply with the spiritual and cultural essence of these ancient practices.
                  </p>
                </div>
              </div>
            </CinematicLift>
          </div>
        </section>

        {/* ---------- 3. QUOTE SECTION ---------- */}
        <CinematicLift direction="zoom" delay={150}>
          <section className="relative overflow-hidden rounded-[2.5rem] border border-orange-200 bg-gradient-to-r from-amber-50/70 via-white to-orange-50/70 p-10 sm:p-14 text-center shadow-2xl">
            <div className="pointer-events-none absolute left-6 top-6 text-7xl font-serif text-orange-200/60 select-none">“</div>
            <div className="mx-auto max-w-3xl relative z-10">
              <p className="mb-6 font-display text-2xl sm:text-3xl italic font-semibold text-ink/85 leading-snug">
                "Playing the Veena has been regarded as a form of yoga — a spiritual practice that unites discipline, devotion, and inner harmony."
              </p>
              
              <div>
                <CinematicShutter delay={300}>
                  <div className="font-display text-xs uppercase tracking-[0.35em] text-vermilion font-bold">
                    — Ancient Vedic Wisdom
                  </div>
                </CinematicShutter>
              </div>
            </div>
          </section>
        </CinematicLift>

        {/* ---------- 4. ARTISTIC DIRECTOR ---------- */}
        <CinematicLift direction="bottom" delay={150}>
          <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-14 shadow-2xl">
            <img src={directorBg} alt="Artistic Director background" className="absolute inset-0 h-full w-full object-cover opacity-15 filter brightness-90" />
            <div className="absolute inset-0 bg-ink/10" />
            
            <div className="relative z-10 max-w-4xl">
              <div>
                <CinematicShutter delay={100}>
                  <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-xs uppercase tracking-[0.35em] text-vermilion font-bold">
                    Artistic Director
                  </span>
                </CinematicShutter>
              </div>

              <div>
                <CinematicShutter delay={250}>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink mb-8">
                    A lifelong devotion to the Veena
                  </h2>
                </CinematicShutter>
              </div>

              <div className="space-y-5 text-left text-ink/80 text-base leading-relaxed">
                <CinematicLift direction="left" delay={200}>
                  <p>Rajalakshmi Roshan completed her Veena Arangetram (solo debut performance) in 2005 in Chennai, India, and earned second place in the 2006 Musical Talent Hunt Contest hosted by Anna FM.</p>
                </CinematicLift>
                
                <CinematicLift direction="right" delay={300}>
                  <p>Over the years, Rajalakshmi has performed in numerous Veena concerts across Chennai, sharing her deep love and devotion for this timeless instrument.</p>
                </CinematicLift>
                
                <CinematicLift direction="left" delay={400}>
                  <p>Born and raised in Chennai — widely celebrated as the cultural capital of India — Rajalakshmi grew up immersed in the rich traditions of music and dance. Her strong cultural roots, combined with the blessings and discipline imparted by her guru, have played a defining role in her artistic journey.</p>
                </CinematicLift>
                
                <CinematicLift direction="right" delay={500}>
                  <p>Through Sattvalaya Arts, Rajalakshmi aspires to share the beauty, depth, and versatility of the Veena with audiences from diverse cultural backgrounds. Her vision is to inspire and nurture the next generation of Vainikas by creating a joyful, supportive, and creative learning environment where tradition and passion come together.</p>
                </CinematicLift>
              </div>
            </div>
          </section>
        </CinematicLift>

        {/* ---------- 5. SIGNATURE QUOTE ---------- */}
        <CinematicLift direction="zoom" delay={150}>
          <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#FFFDF9] to-[#FFF6EA] border border-amber-200/80 p-10 sm:p-14 text-center shadow-xl">
            <CinematicImageReveal
              src={raji}
              alt="Rajalakshmi Roshan"
              shape="circle"
              delay={200}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-6 ring-4 ring-temple-gold/40 shadow-xl"
            />
            
            <p className="font-display italic text-2xl sm:text-3xl font-semibold text-ink/85 max-w-2xl mx-auto leading-relaxed">
              "To play the Veena is to listen — to the string, to the breath, to the silence between notes."
            </p>

            <div className="mt-5">
              <CinematicShutter delay={350}>
                <span className="text-xs uppercase tracking-[0.3em] text-vermilion font-bold">
                  — Rajalakshmi Roshan
                </span>
              </CinematicShutter>
            </div>
          </section>
        </CinematicLift>

        {/* ---------- 6. CTA BANNER ---------- */}
        <CinematicLift direction="zoom" delay={100}>
          <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-[#ff7a18] via-[#f78c3b] to-[#f7a047] p-12 sm:p-16 text-center text-white shadow-2xl shadow-orange-300/40">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_40%)]" />
            <div className="pointer-events-none absolute -bottom-10 -right-6 text-[12rem] font-display font-black text-white/10 select-none">
              ॐ
            </div>
            
            <div className="relative z-10 mx-auto max-w-3xl">
              <div>
                <CinematicShutter delay={200}>
                  <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                    Ready to Begin Your Journey?
                  </h2>
                </CinematicShutter>
              </div>

              <CinematicLift direction="bottom" delay={350}>
                <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/95 leading-relaxed font-medium">
                  Join our community and experience the transformative power of music, wellness, and tradition with personalized guidance from our Artistic Director.
                </p>
              </CinematicLift>

              <CinematicLift direction="zoom" delay={500} className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex rounded-full bg-white px-9 py-3.5 text-sm font-bold tracking-wide text-orange-600 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-orange-50 active:scale-95"
                >
                  Get in Touch
                </Link>
              </CinematicLift>
            </div>
          </section>
        </CinematicLift>

      </div>
    </article>
  );
}