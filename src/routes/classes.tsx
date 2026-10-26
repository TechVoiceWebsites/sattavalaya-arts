import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import veenaImg from "@/assets/Veena.png";
import veenaClass from "@/assets/Veena classes.webp";
import yoga from "@/assets/YogaPose.webp";
import nataraja from "@/assets/Natarajasana.webp";
import meditation from "@/assets/Meditation.webp";
import YogaClass from "@/assets/Yoga class.webp";
import classvideo from "@/assets/D_rendered_video_in_aspe.mp4";



const CINEMATIC_EASE = "ease-[cubic-bezier(0.19,1,0.22,1)]"; // Expo Out - Buttery Smooth

function useIndividualReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
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
        rootMargin: "0px 0px -50px 0px",
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

/* 2. CINEMATIC 3D LIFT: கார்டுகள், பத்திகள் மற்றும் பட்டன்கள் 3D வடிவில் மிதந்து வரும் */
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
        return "-translate-x-16 translate-y-6 scale-95 opacity-0 blur-sm -rotate-2";
      case "right":
        return "translate-x-16 translate-y-6 scale-95 opacity-0 blur-sm rotate-2";
      case "zoom":
        return "scale-75 opacity-0 blur-md";
      case "bottom":
      default:
        return "translate-y-16 scale-[0.96] opacity-0 blur-sm";
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

/* 3. CINEMATIC IMAGE REVEAL: புகைப்படங்கள் விரிந்து ஒளிரும் எஃபெக்ட் */
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
        className={`h-full w-full transform-gpu transition-all duration-[1600ms] ${CINEMATIC_EASE} ${
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
          className={`h-full w-full transform-gpu transition-all duration-[2400ms] ${CINEMATIC_EASE} ${
            visible
              ? "scale-100 brightness-100 blur-0"
              : "scale-[1.3] brightness-50 blur-md"
          }`}
        >
          <img src={src} alt={alt} className={`block h-full w-full ${className}`} />
        </div>
      </div>
      
      {/* பளபளப்பான கிளாஸ் ஒளிக்கீற்று (Light Sheen sweep) */}
      <div
        style={{ transitionDelay: `${delay + 250}ms` }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent transform-gpu transition-transform duration-[1800ms] ${CINEMATIC_EASE} ${
          visible ? "translate-x-full translate-y-full" : "-translate-x-full -translate-y-full"
        }`}
      />
    </div>
  );
}

/* ---------- ROUTE CONFIG ---------- */

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Veena & Yoga | Sattvalaya Arts" },
      {
        name: "description",
        content:
          "Veena classes (Beginner, Intermediate, Advanced) and Yoga sessions (Ashtanga, Vinyasa, Pranayama) at Sattvalaya Arts.",
      },
      { property: "og:image", content: veenaClass },
    ],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  return (
    <div className="px-5 sm:px-8 py-16 bg-white overflow-x-clip">
      <div className="mx-auto max-w-6xl space-y-32">
        <HeroVideo />

        <Header />

        {/* ==================== VEENA SECTION ==================== */}
        <section id="veena" className="scroll-mt-24 space-y-16">
          <SectionTitle eyebrow="Carnatic Tradition" title="Veena Classes" />

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <CinematicLift direction="left" delay={150}>
              <div className="space-y-6 text-ink/80 leading-relaxed text-[15.5px] p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 border border-orange-100 shadow-xl">
                <CinematicLift direction="left" delay={250}>
                  <p className="border-l-4 border-[#ff7a18] pl-4 font-medium text-ink">
                    Veena is one of the most ancient and revered stringed instruments of India — an
                    instrument that embodies grace, depth, devotion, and meditative beauty. Learning
                    Veena is not only a musical journey, but also a path toward discipline, inner
                    harmony, and cultural connection.
                  </p>
                </CinematicLift>

                <CinematicLift direction="left" delay={400}>
                  <p>
                    At Sattvalaya Arts, students are introduced to the rich tradition of Carnatic music
                    through a nurturing and structured learning experience that honors both classical
                    foundations and artistic expression.
                  </p>
                </CinematicLift>
              </div>
            </CinematicLift>

            <div className="relative flex justify-center items-center">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none"
                style={{ background: "radial-gradient(circle, #ff9933 0%, #e9a04a 50%, transparent 75%)" }}
              />
              <CinematicLift direction="right" delay={300} className="w-full flex justify-center">
                <img
                  src={veenaImg}
                  alt="Veena"
                  className="relative w-full max-w-[480px] object-contain animate-float drop-shadow-[0_20px_35px_rgba(212,162,76,0.35)]"
                />
              </CinematicLift>
            </div>
          </div>

          {/* About Veena Card */}
          <CinematicLift direction="bottom" delay={200}>
            <div className="glass-card rounded-[3rem] p-9 lg:p-14 border border-amber-200/90 bg-white/95 shadow-2xl relative overflow-hidden">
              <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl" />

              <div>
                <CinematicShutter delay={100}>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-vermilion mb-6">
                    About Veena
                  </h3>
                </CinematicShutter>
              </div>

              <div className="space-y-6 text-ink/85 text-[15.5px] leading-relaxed">
                <CinematicLift direction="bottom" delay={200}>
                  <p>
                    The Veena, regarded as the National Musical Instrument of India, traces its origins
                    back to around 1500 BCE. Revered as a divine instrument, it is one of the three
                    principal instruments mentioned in Vedic literature, alongside the Venu (flute) and
                    Mridanga (drum).
                  </p>
                </CinematicLift>

                <CinematicLift direction="bottom" delay={320}>
                  <p>
                    Ancient Sanskrit treatises on music describe the Veena in remarkable detail. In the{" "}
                    <em>Natyasastra</em>, Bharata Muni refers to the Chitra Veena with seven strings and
                    the Vipanchi Veena with nine strings. He also explains the theory of the 22 Śruti-s
                    (microtones) in an octave using experimental Veenas as models.
                  </p>
                </CinematicLift>

                <CinematicLift direction="bottom" delay={440}>
                  <p className="font-semibold text-ink text-base">
                    Veena is considered a complete instrument because it beautifully encompasses the
                    essential elements of Indian classical music:
                  </p>
                </CinematicLift>

                {/* 3 Pillars Cards */}
                <div className="grid sm:grid-cols-3 gap-5 pt-3">
                  {[
                    ["Śruti", "pitch"],
                    ["Laya", "rhythm"],
                    ["Sahitya", "expression"],
                  ].map(([t, d], i) => (
                    <CinematicLift key={t} direction="bottom" delay={150 * (i + 1)}>
                      <div className="rounded-2xl p-6 bg-gradient-to-b from-[#FFFDF9] to-[#FFF6EA] border border-amber-200/80 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                        <div className="font-display text-2xl font-bold text-vermilion group-hover:scale-105 transition-transform">{t}</div>
                        <div className="text-xs uppercase tracking-widest text-ink/65 font-bold mt-1.5">{d}</div>
                      </div>
                    </CinematicLift>
                  ))}
                </div>

                <CinematicLift direction="bottom" delay={300}>
                  <p className="pt-3">
                    Its hallmark is its mellow, resonant tone that naturally creates a calming and
                    meditative atmosphere. For centuries, playing Veena has been regarded as a form of
                    yoga — a sacred practice that unites concentration, discipline, devotion, and inner
                    peace. The instrument is deeply associated with Goddess Saraswati, the embodiment of
                    wisdom, music, and the arts.
                  </p>
                </CinematicLift>
              </div>
            </div>
          </CinematicLift>

          {/* Divinity of Veena (Shloka) */}
          <div className="space-y-6 pt-6">
            <div className="text-center">
              <div>
                <CinematicShutter delay={100}>
                  <h3 className="font-display text-3xl sm:text-4xl text-center font-extrabold text-gradient-gold">
                    The Divinity of Veena
                  </h3>
                </CinematicShutter>
              </div>
              <div>
                <CinematicShutter delay={250}>
                  <p className="text-center text-xs uppercase tracking-[0.25em] text-vermilion/90 mt-2.5 font-bold">
                    From the Sangeeta Ratnakara
                  </p>
                </CinematicShutter>
              </div>
            </div>

            <CinematicLift direction="zoom" delay={200}>
              <div className="glass-card rounded-[3rem] p-9 lg:p-14 border border-orange-200/90 bg-gradient-to-r from-amber-50/70 via-white to-orange-50/70 shadow-2xl text-center relative overflow-hidden">
                <pre className="font-display italic text-lg sm:text-xl text-ink/90 whitespace-pre-wrap leading-loose font-semibold select-none">
                  {`Darsana sparsane chasya bhoga svargapavargade |
Punito viprahatyadi patakaih patitam janam ||
Danda sambhuruma tantri kakubhah kamalapatih |
Indra patrika brahma tumbam nabhih sarasvati ||
Dorako vasukirjiva sudhamsuh sarika ravih |
Sarvadevamayi tasmad veeneyam sarvamangala ||`}
                </pre>

                <div className="mt-8 pt-7 border-t border-orange-200 text-left text-ink/80 leading-relaxed text-[15px]">
                  <CinematicLift direction="bottom" delay={350}>
                    <p>
                      These verses express that merely seeing or touching the Veena can bring joy, purity,
                      and spiritual upliftment. Each part of the instrument symbolizes a divine presence:
                      the <em>danda</em> (stem) represents Lord Shiva, the string is Devi Uma (Parvati),
                      the shoulder is Lord Vishnu, the bridge is Lakshmi, the gourd is Brahma, and the
                      navel represents Sarasvati. The connecting wires symbolize Vasuki, the resonator is
                      the moon, and the pegs signify the sun.
                    </p>
                  </CinematicLift>
                </div>
              </div>
            </CinematicLift>
          </div>

          {/* Veena Class Structure */}
          <div className="space-y-10 pt-8">
            <div className="text-center">
              <div>
                <CinematicShutter delay={100}>
                  <h3 className="font-display text-3xl sm:text-4xl text-center font-extrabold text-vermilion">
                    Class Structure
                  </h3>
                </CinematicShutter>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-7">
              <LevelCard
                title="Foundation Course"
                tag="Beginner Level"
                subtitle="Perfect start for your musical journey"
                delay={150}
                points={[
                  "Introduction to Veena structure and tuning",
                  "Fretting and strumming techniques",
                  "Basic Swaras (notes) and Alankars (exercises)",
                  "Music theory fundamentals",
                ]}
              >
                Perfect for those starting their musical journey. Learn the fundamentals of Veena
                playing including proper posture, hand positioning, and basic techniques.
              </LevelCard>

              <LevelCard
                title="Advanced Techniques"
                tag="Intermediate Level"
                subtitle="Build upon your foundation with confidence"
                delay={300}
                points={[
                  "Adi Tala Varnams and Kritis",
                  "Improved hand coordination",
                  "Deeper understanding of melody and rhythm",
                  "Expression and musical maturity",
                ]}
              >
                Students begin learning simple compositions — Adi Tala Varnams and Kritis.
                Emphasis on tonal clarity, gamakas, rhythm alignment, and expression.
              </LevelCard>

              <LevelCard
                title="Performance Mastery"
                tag="Advanced Level"
                subtitle="Prepare for professional performance"
                delay={450}
                points={[
                  "Complex Varnams and diverse repertoire",
                  "Mastery of Raga and Tala",
                  "Ornamentation and improvisation",
                  "Solo recital preparation",
                ]}
              >
                Complex Varnams, mastery of gamakas, ornamentation, and creative improvisation.
                Designed to prepare students for solo recitals and ensemble performance.
              </LevelCard>
            </div>
          </div>
        </section>

        {/* ==================== YOGA SECTION ==================== */}
        <section id="yoga" className="scroll-mt-24 space-y-16">
          <SectionTitle eyebrow="Mind · Body · Spirit" title="Yoga at Sattvalaya Arts" />

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            {/* 4 Yoga Images Grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { img: yoga, wrapperClass: "rounded-[2rem] aspect-[3/4]" },
                { img: nataraja, wrapperClass: "rounded-[2rem] aspect-[4/5] mt-8" },
                { img: meditation, wrapperClass: "rounded-[2rem] aspect-[3/4]" },
                { img: YogaClass, wrapperClass: "rounded-[2rem] aspect-[4/5] mt-8" },
              ].map((item, i) => (
                <CinematicImageReveal
                  key={i}
                  src={item.img}
                  alt="Yoga practice"
                  delay={120 * (i + 1)}
                  wrapperClassName={item.wrapperClass}
                  className="object-cover"
                />
              ))}
            </div>

            <CinematicLift direction="right" delay={200}>
              <div className="space-y-5 text-ink/85 leading-relaxed text-[15.5px] p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40 border border-orange-100 shadow-xl">
                <CinematicLift direction="right" delay={250}>
                  <p>
                    In today's world, yoga is often viewed simply as a form of physical exercise or a
                    series of postures (asanas). In reality, yoga is a holistic practice that nurtures
                    the connection between mind, body, and spirit. The word <em>Yoga</em> comes from the
                    Sanskrit root <em>yuj</em>, meaning "to unite" or "to connect," reflecting its
                    deeper purpose of creating harmony within oneself.
                  </p>
                </CinematicLift>

                <CinematicLift direction="right" delay={380}>
                  <p>
                    Yoga offers benefits for people of all ages and backgrounds. A consistent practice
                    can support physical health, mental clarity, emotional balance, and overall
                    well-being. Studies have shown that yoga may help reduce stress, anxiety, and
                    fatigue while improving flexibility, strength, posture, breath awareness, and
                    nervous system regulation.
                  </p>
                </CinematicLift>

                <CinematicLift direction="right" delay={500}>
                  <p>
                    Beyond the physical practice, yoga provides an opportunity to slow down, reconnect
                    inwardly, and cultivate greater mindfulness in daily life.
                  </p>
                </CinematicLift>

                <CinematicLift direction="right" delay={620}>
                  <p className="border-l-4 border-[#ff7a18] pl-4 font-bold text-ink bg-orange-100/50 py-2.5 rounded-r-xl">
                    At Sattvalaya Arts, yoga is approached not merely as exercise, but as a lifelong
                    practice that supports balance, awareness, and inner well-being.
                  </p>
                </CinematicLift>
              </div>
            </CinematicLift>
          </div>

          {/* Meet Your Instructor */}
          <CinematicLift direction="bottom" delay={150}>
            <div className="glass-card rounded-[3rem] p-9 lg:p-14 border border-amber-200/90 bg-white/95 shadow-2xl">
              <div>
                <CinematicShutter delay={100}>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-vermilion mb-5">
                    Meet Your Instructor
                  </h3>
                </CinematicShutter>
              </div>

              <div className="space-y-5 text-ink/85 leading-relaxed text-[15.5px]">
                <CinematicLift direction="left" delay={200}>
                  <p>
                    Yoga classes at Sattvalaya Arts are led by Rajalakshmi Roshan — a passionate yoga
                    practitioner, Bharatanatyam dancer, and Vainika who has been practicing yoga since
                    the age of 8.
                  </p>
                </CinematicLift>

                <CinematicLift direction="left" delay={350}>
                  <p>
                    With a background in biotechnology and years of experience in movement-based
                    disciplines, Rajalakshmi brings a thoughtful and holistic approach to teaching. Her
                    understanding of breathwork, body alignment, and mindful movement allows her to
                    guide students safely while encouraging strength, flexibility, balance, and inner
                    calm.
                  </p>
                </CinematicLift>

                <CinematicLift direction="left" delay={500}>
                  <p className="font-bold text-ink">
                    <strong>Certified in Ashtanga and Vinyasa yoga</strong>, she blends the discipline
                    and structure of Ashtanga with the fluidity and flow of Vinyasa, creating classes
                    that are both grounding and energizing.
                  </p>
                </CinematicLift>
              </div>
            </div>
          </CinematicLift>

          {/* Yoga Class Structure */}
          <div className="space-y-10 pt-6">
            <div className="text-center">
              <div>
                <CinematicShutter delay={100}>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-vermilion mb-2.5">
                    Class Structure
                  </h3>
                </CinematicShutter>
              </div>
              <CinematicLift direction="bottom" delay={250}>
                <p className="text-ink/75 font-semibold text-base">Each 60-minute session includes:</p>
              </CinematicLift>
            </div>

            <div className="grid md:grid-cols-3 gap-7">
              <LevelCard title="Pranayama" tag="Breathwork" delay={150}>
                Calm the mind and energize the body through guided breath practice.
              </LevelCard>
              <LevelCard title="Asana Flow" tag="Movement" delay={300}>
                A guided flow of postures designed to improve flexibility, build strength, enhance
                balance, and reduce daily stress.
              </LevelCard>
              <LevelCard title="Relaxation" tag="Awareness" delay={450}>
                Mindful awareness practices to support overall well-being and inner stillness.
              </LevelCard>
            </div>

            <CinematicLift direction="bottom" delay={300}>
              <p className="text-center text-ink/70 text-sm italic font-medium">
                All ages and experience levels are welcome — no prior yoga experience is required.
              </p>
            </CinematicLift>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =====================================================================
   HERO VIDEO COMPONENT
   ===================================================================== */

function HeroVideo() {
  return (
    <CinematicLift direction="zoom" delay={100}>
      <section className="relative overflow-hidden rounded-[3rem] h-[320px] sm:h-[460px] lg:h-[560px] shadow-2xl border border-black/10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover scale-105"
        >
          <source src={classvideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
          <div className="text-center text-white max-w-xl">
            <div>
              <CinematicShutter delay={150}>
                <p className="uppercase tracking-[0.35em] text-xs sm:text-sm font-extrabold text-orange-200 mb-2">
                  Sattvalaya Arts
                </p>
              </CinematicShutter>
            </div>

            <div>
              <CinematicShutter delay={300}>
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
                  Learn Veena &amp; Yoga
                </h1>
              </CinematicShutter>
            </div>

            <CinematicLift direction="bottom" delay={450}>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed font-medium">
                Discover the timeless beauty of Carnatic Veena and the transformative power of Yoga
                through expert guidance.
              </p>
            </CinematicLift>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <CinematicLift direction="zoom" delay={600}>
                <a
                  href="#veena"
                  className="rounded-full bg-gradient-to-r from-orange-600 to-[#c2410c] px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl hover:scale-108 hover:shadow-[0_0_30px_#ff7a18] transition-all duration-300 block"
                >
                  Explore Veena
                </a>
              </CinematicLift>

              <CinematicLift direction="zoom" delay={750}>
                <a
                  href="#yoga"
                  className="rounded-full border border-white/90 bg-white/10 backdrop-blur-md px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white hover:text-black hover:scale-108 transition-all duration-300 shadow-lg block"
                >
                  Explore Yoga
                </a>
              </CinematicLift>
            </div>
          </div>
        </div>
      </section>
    </CinematicLift>
  );
}

/* =====================================================================
   HEADER COMPONENT
   ===================================================================== */

function Header() {
  return (
    <header className="text-center space-y-4">
      <div>
        <CinematicShutter delay={100}>
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion font-black mb-1">
            What We Teach
          </div>
        </CinematicShutter>
      </div>

      <div>
        <CinematicShutter delay={250}>
          <h1 className="font-display text-5xl sm:text-6xl font-black text-gradient-gold">
            Our Classes
          </h1>
        </CinematicShutter>
      </div>

      <CinematicLift direction="bottom" delay={400}>
        <p className="max-w-2xl mx-auto text-ink/80 text-base sm:text-lg font-medium leading-relaxed">
          A nurturing, structured learning experience in Veena and Yoga — honoring tradition while
          welcoming every level.
        </p>
      </CinematicLift>

      <div className="pt-3 flex justify-center gap-4 text-sm">
        <CinematicLift direction="zoom" delay={550}>
          <a
            href="#veena"
            className="rounded-full px-8 py-2.5 font-bold text-white shadow-xl transition-all duration-300 hover:scale-108 hover:shadow-orange-400/40 block"
            style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}
          >
            Veena
          </a>
        </CinematicLift>

        <CinematicLift direction="zoom" delay={700}>
          <a
            href="#yoga"
            className="rounded-full px-8 py-2.5 font-bold border border-temple-gold/70 text-ink bg-white hover:bg-orange-50 shadow-md transition-all duration-300 hover:scale-108 block"
          >
            Yoga
          </a>
        </CinematicLift>
      </div>
    </header>
  );
}

/* =====================================================================
   SECTION TITLE COMPONENT
   ===================================================================== */

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center space-y-2">
      <div>
        <CinematicShutter delay={100}>
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion font-black">
            {eyebrow}
          </div>
        </CinematicShutter>
      </div>

      <div>
        <CinematicShutter delay={250}>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gradient-gold">
            {title}
          </h2>
        </CinematicShutter>
      </div>
    </div>
  );
}

/* =====================================================================
   LEVEL CARD (STAGGERED LIST & BUTTON POP)
   ===================================================================== */

function LevelCard({
  title,
  tag,
  subtitle,
  children,
  points,
  delay = 0,
}: {
  title: string;
  tag: string;
  subtitle?: string;
  children: React.ReactNode;
  points?: string[];
  delay?: number;
}) {
  return (
    <CinematicLift direction="bottom" delay={delay} className="h-full">
      <div className="glass-card rounded-[2.5rem] p-8 border border-amber-200/80 bg-white/95 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full group">
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-vermilion font-black mb-1.5">
            {tag}
          </div>

          <div>
            <CinematicShutter delay={delay + 100}>
              <h4 className="font-display text-2xl font-bold text-ink mb-2 group-hover:text-vermilion transition-colors">
                {title}
              </h4>
            </CinematicShutter>
          </div>

          {subtitle ? (
            <CinematicLift direction="left" delay={delay + 180}>
              <div className="text-sm font-bold text-orange-600 mb-4">{subtitle}</div>
            </CinematicLift>
          ) : null}

          <div className="text-sm text-ink/80 leading-relaxed font-normal">{children}</div>

          {points && points.length > 0 && (
            <ul className="mt-5 space-y-2.5 text-sm text-ink/80 font-medium">
              {points.map((pt, idx) => (
                <CinematicLift key={idx} direction="left" delay={delay + 200 + idx * 80}>
                  <li className="flex items-start gap-2.5">
                    <span className="text-vermilion font-bold text-base">✦</span> {pt}
                  </li>
                </CinematicLift>
              ))}
            </ul>
          )}
        </div>

        <CinematicLift direction="zoom" delay={delay + 350} className="w-full mt-8">
          <a
            href="/contact"
            className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-[#c2410c] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/40 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Enroll Now →
          </a>
        </CinematicLift>
      </div>
    </CinematicLift>
  );
}