import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import heroImg from "@/assets/Rajiwith.Veena.webp";
import logo from "@/assets/logo.png";
import veenaClass from "@/assets/Veena classes.webp";
import yogaPose from "@/assets/YogaPose.webp";
import natarajasana from "@/assets/Natarajasana.webp";
import meditation from "@/assets/Meditation.webp";
import gallery1 from "@/assets/Sohanikama.webp";
import gallery2 from "@/assets/Sohanikama-1.webp";



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

/* 3. CINEMATIC IMAGE REVEAL */
function CinematicImageReveal({
  src,
  alt,
  delay = 0,
  className = "",
  wrapperClassName = "",
}: {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  wrapperClassName?: string;
}) {
  const { ref, visible } = useIndividualReveal<HTMLDivElement>(0.12);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`h-full w-full transform-gpu transition-all duration-[1500ms] ${CINEMATIC_EASE} ${
          visible
            ? "[clip-path:inset(0%_round_1.5rem)]"
            : "[clip-path:inset(100%_0%_0%_0%_round_1.5rem)]"
        }`}
      >
        <div
          style={{ transitionDelay: `${delay + 100}ms` }}
          className={`h-full w-full transform-gpu transition-all duration-[2200ms] ${CINEMATIC_EASE} ${
            visible ? "scale-100 brightness-100 blur-0" : "scale-[1.3] brightness-60 blur-sm"
          }`}
        >
          <img src={src} alt={alt} className={`block h-full w-full ${className}`} />
        </div>
      </div>
      <div
        style={{ transitionDelay: `${delay + 200}ms` }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent transform-gpu transition-transform duration-[1600ms] ${CINEMATIC_EASE} ${
          visible ? "translate-x-full translate-y-full" : "-translate-x-full -translate-y-full"
        }`}
      />
    </div>
  );
}

/* ---------- ROUTE CONFIG ---------- */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sattvalaya Arts — Harmony of Sound & Soul" },
      {
        name: "description",
        content:
          "Classical Veena and Yoga in San Jose, CA. Founded by Rajalakshmi Roshan. In-person, online, and hybrid classes for all ages.",
      },
      { property: "og:title", content: "Sattvalaya Arts — Harmony of Sound & Soul" },
      {
        property: "og:description",
        content:
          "Veena & Yoga classes rooted in tradition, taught with care in San Jose, California.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const autoSlideRef = useRef<number | null>(null);

  const testimonials = [
    {
      quote:
        "Learning Veena from Rajalakshmi has been transformative. Her patience, expertise and passion are truly inspiring — I've grown so much in just one year!",
      name: "Priya Sharma",
      role: "Veena Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120",
    },
    {
      quote:
        "The yoga classes have completely changed my life. The combination of Ashtanga and Vinyasa is perfect for building strength and flexibility.",
      name: "Arjun Patel",
      role: "Yoga Practitioner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    },
    {
      quote:
        "The yoga sessions are both challenging and relaxing. I've noticed significant improvements in my posture, breathing and overall well-being.",
      name: "Deepika Raman",
      role: "Yoga Practitioner",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
    },
    {
      quote:
        "Sattvalaya Arts is more than a music school — it's a community. The virtual classes are excellent and I can learn from anywhere in the world.",
      name: "Meera Krishnan",
      role: "Virtual Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120",
    },
    {
      quote:
        "The structured curriculum and personalized attention have helped me progress rapidly. I performed my first recital last month, and it was an unforgettable experience!",
      name: "Vikram Reddy",
      role: "Advanced Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120",
    },
    {
      quote:
        "As a complete beginner, I was nervous about starting. But the supportive environment and excellent teaching methods made learning so enjoyable. I can't wait for each class!",
      name: "Karthik Iyer",
      role: "Beginner Student",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120",
    },
    {
      quote:
        "My daughter has been learning Veena here for two years and her confidence has grown tremendously. The guidance and encouragement from the teacher have been exceptional.",
      name: "Priya Natarajan",
      role: "Parent of Student",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120",
    },
    {
      quote:
        "Despite my busy work schedule, the flexible timings allowed me to pursue my passion for music. Every class is engaging, inspiring and rewarding.",
      name: "Sanjay Menon",
      role: "Working Professional",
      image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=120",
    },
    {
      quote:
        "The attention to detail in technique, theory and classical compositions is outstanding. I feel deeply connected to Carnatic music through these lessons.",
      name: "Lakshmi Narayanan",
      role: "Intermediate Student",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
    },
  ];

  const extendedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (isHovered) return;

    autoSlideRef.current = window.setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3800);

    return () => {
      if (autoSlideRef.current) window.clearInterval(autoSlideRef.current);
    };
  }, [isHovered]);

  const handleTransitionEnd = () => {
    if (currentIndex >= testimonials.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(testimonials.length - 1);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(testimonials.length - 2);
      }, 20);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      setItemsToShow(e.matches ? 3 : 1);
    };
    handle(mq);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handle);
    } else {
      // @ts-ignore
      mq.addListener(handle);
    }
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handle);
      } else {
        // @ts-ignore
        mq.removeListener(handle);
      }
    };
  }, []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center px-5 sm:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-12 w-full">
          
          {/* Left Text Column */}
          <div className="relative z-10 space-y-6">
            <div>
              <CinematicShutter delay={100}>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] bg-cream/70 border border-temple-gold/40 text-vermilion shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-vermilion" /> Est. 2022 · San Jose, CA
                </div>
              </CinematicShutter>
            </div>
            
            <div>
              <CinematicShutter delay={250}>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.9rem] leading-[0.96] tracking-[-0.02em] text-ink">
                  Awaken the Soul Through{" "}
                  <span className="bg-gradient-to-r from-[#ff7a18] via-[#f7a47b] to-[#21a76f] bg-clip-text text-transparent">
                    VEENA &amp; YOGA
                  </span>
                </h1>
              </CinematicShutter>
            </div>

            <CinematicLift direction="bottom" delay={420}>
              <p className="max-w-2xl text-xl sm:text-2xl text-ink/80 leading-relaxed font-normal">
                Master the timeless art of Veena, find balance through Yoga, and immerse yourself in
                India&apos;s living traditions — guided with decades of devotion.
              </p>
            </CinematicLift>

            <div className="pt-2 flex flex-wrap gap-4">
              <CinematicLift direction="zoom" delay={600}>
                <Link
                  to="/classes"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl block"
                  style={{ background: "linear-gradient(135deg,#ff7a18,#f47f3f)" }}
                >
                  Explore Classes
                </Link>
              </CinematicLift>

              <CinematicLift direction="zoom" delay={750}>
                <Link
                  to="/about"
                  className="rounded-full px-8 py-3.5 text-sm font-semibold border border-temple-gold/60 text-ink bg-white/70 hover:bg-cream/70 shadow-sm transition-all duration-300 hover:scale-105 block"
                >
                  Meet the Teacher
                </Link>
              </CinematicLift>
            </div>
          </div>

          {/* Right Fluid Hero Image Column - UNTOUCHED ORIGINAL ANIMATED DESIGN */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff7a18]/25 via-[#f7a047]/20 to-[#21a76f]/15 blur-3xl pointer-events-none" />
            
            <div className="animate-hero-bounce relative w-full max-w-[500px] aspect-square p-2.5 bg-gradient-to-br from-temple-gold/40 via-cream to-[#ff7a18]/40 shadow-2xl backdrop-blur-md overflow-hidden rounded-[2.5rem]">
              <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
                <img
                  src={heroImg}
                  alt="Rajalakshmi Roshan playing Veena"
                  className="h-full w-full object-cover scale-105 transition-transform duration-1000 hover:scale-110"
                />
              </div>
            </div>

            <div className="animate-badge-bounce absolute -bottom-5 -left-4 hidden sm:flex glass-card rounded-2xl px-5 py-3 items-center gap-3.5 shadow-2xl backdrop-blur-md z-20">
              <img src={logo} alt="" className="w-11 h-11 object-contain animate-float" />
              <div className="text-xs">
                <div className="font-semibold text-vermilion tracking-wide">Rajalakshmi Roshan</div>
                <div className="text-ink/65 text-[11px]">Artistic Director</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="px-5 sm:px-8 py-16 sm:py-24 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="About Us"
            title="A Sanctuary for Tradition & Practice"
          />
          
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center mt-12">
            {/* Left Story Column */}
            <div className="space-y-6 text-ink/80 leading-relaxed text-base sm:text-lg">
              {[
                <>
                  Founded in 2022 by <strong className="text-vermilion">Rajalakshmi Roshan</strong>,
                  Sattvalaya Arts began as an initiative to nurture and educate aspiring students in the
                  Veena. Rooted in tradition, the teaching approach guides students through both
                  discipline and discovery.
                </>,
                <>
                  Classes focus on music theory, technique, and the nuanced art of playing the Veena,
                  while fostering creativity and a deep love for the instrument. Each lesson is
                  thoughtfully structured to balance technical precision with expressive growth.
                </>,
                <>
                  In addition to Veena training, Sattvalaya Arts offers yoga and meditation classes that
                  support overall well-being, helping students cultivate balance in body, mind, and
                  spirit.
                </>,
                <>
                  To ensure meaningful learning, class sizes are kept small so every student receives
                  individual attention and personalized guidance throughout their journey.
                </>,
                <>
                  Classes are offered in <strong>San Jose, California</strong>, as well as through
                  online and hybrid formats, welcoming students from around the world.
                </>,
              ].map((text, i) => (
                <CinematicLift key={i} direction="left" delay={120 * (i + 1)}>
                  <p>{text}</p>
                </CinematicLift>
              ))}
            </div>

            {/* Right Interactive Logo Card */}
            <div className="relative">
              <CinematicLift direction="right" delay={300}>
                <div className="glass-card rounded-[2.5rem] p-10 grid place-items-center aspect-square shadow-2xl border border-amber-200/70 bg-white/90">
                  <img
                    src={logo}
                    alt="Sattvalaya Arts logo"
                    className="w-full max-w-xs object-contain animate-float"
                  />
                </div>
              </CinematicLift>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SATTVALAYA APPROACH */}
      <section className="px-5 sm:px-8 py-16 sm:py-24 overflow-hidden bg-[#fffdfa]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Our Philosophy"
            title="The Sattvalaya Approach"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              {
                title: "A Foundation in Classical Veena",
                body: "Learn classical veena through a strong foundation in technique, rhythm, and bhava. Training is guided with respect to tradition while making learning accessible and joyful for all levels.",
                img: veenaClass,
                label: "Veena Practice",
              },
              {
                title: "Holistic Mind-Body Practice",
                body: "Through breath, movement, and mindful awareness, our yoga sessions build strength, flexibility, and inner stillness. The practice fosters balance and clarity, supporting overall well-being in daily life.",
                img: yogaPose,
                label: "Yoga & Flow",
              },
              {
                title: "Flexible Learning for Modern Lifestyles",
                body: "In-person classes in the Bay Area, along with online and hybrid options, make it easy to stay consistent — whether you are a beginner, a returning learner, or learning alongside family.",
                img: meditation,
                label: "Meditation & Rhythm",
              },
            ].map((c, idx) => (
              <CinematicLift key={c.title} direction="bottom" delay={180 * (idx + 1)} className="h-full">
                <div className="group glass-card overflow-hidden rounded-[2.5rem] border border-amber-200/80 bg-white/95 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl h-full flex flex-col justify-between">
                  <div>
                    <div className="relative h-56 w-full overflow-hidden">
                      <img 
                        src={c.img} 
                        alt={c.title} 
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-8">
                      <div className="mb-4 inline-flex rounded-full bg-cream/90 border border-temple-gold/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-xs">
                        {c.label}
                      </div>
                      <h3 className="font-display text-2xl text-vermilion mb-3 leading-snug font-bold">
                        {c.title}
                      </h3>
                      <p className="text-sm text-ink/75 leading-relaxed font-normal">{c.body}</p>
                    </div>
                  </div>
                </div>
              </CinematicLift>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR CLASSES */}
      <section className="px-5 sm:px-8 py-16 sm:py-24 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Our Offerings"
            title="Our Classes"
          />

          <div className="grid md:grid-cols-2 gap-10 mt-14">
            <ClassCard
              img={veenaClass}
              title="Veena"
              subtitle="Carnatic classical tradition"
              body="From the first fret to advanced manodharma — a journey through Adi Tala Varnams, Kritis, gamakas, and the meditative beauty of the divine instrument."
              delay={200}
            />
            <ClassCard
              img={yogaPose}
              title="Yoga"
              subtitle="Ashtanga · Vinyasa · Pranayama"
              body="60-minute sessions of breath, asana, and mindful awareness. Build strength, flexibility, and inner calm. All ages and levels welcome."
              delay={380}
            />
          </div>

          <CinematicLift direction="zoom" delay={550} className="mt-12 text-center">
            <Link
              to="/classes"
              className="inline-flex rounded-full px-9 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}
            >
              View Class Details
            </Link>
          </CinematicLift>
        </div>
      </section>

      {/* 5. GALLERY */}
      <section className="px-5 sm:px-8 py-16 sm:py-24 overflow-hidden bg-[#fffdfa]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Moments"
            title="Gallery"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-14">
            {[gallery1, gallery2, veenaClass, yogaPose, natarajasana, meditation].map((g, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] glass-card shadow-lg border border-amber-200/60">
                <CinematicImageReveal
                  src={g}
                  alt="Gallery Moment"
                  delay={(i % 3) * 140}
                  wrapperClassName="w-full h-full"
                  className="object-cover group-hover:scale-110 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          <CinematicLift direction="zoom" delay={500} className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex rounded-full px-8 py-3 text-sm font-semibold border border-temple-gold/60 text-ink bg-white/70 hover:bg-cream/70 shadow-sm transition-all duration-300 hover:scale-105"
            >
              See full gallery
            </Link>
          </CinematicLift>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Seamless Infinite Step-Pause Carousel) */}
      <section className="px-5 sm:px-8 py-16 sm:py-24 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Students Say"
          />

          {/* Endless Smooth Track - Pause on hover */}
          <div 
            className="overflow-hidden mt-14"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  : "transition-none"
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {extendedTestimonials.map((testimonial, idx) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className="px-3.5 shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <CinematicLift direction="bottom" delay={(idx % 3) * 120} className="h-full">
                    <div className="h-full rounded-[2.5rem] bg-cream/80 p-8 shadow-xl border border-white/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
                      <p className="text-base leading-relaxed text-ink/80 italic font-medium">“{testimonial.quote}”</p>
                      <div className="mt-8 flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="font-semibold text-ink text-lg">{testimonial.name}</div>
                          <div className="text-xs uppercase tracking-[0.25em] text-vermilion font-medium">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CinematicLift>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow Buttons */}
          <CinematicLift direction="zoom" delay={300}>
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                onClick={prevSlide}
                aria-label="Previous Testimonial"
                className="group flex h-13 w-13 items-center justify-center rounded-full bg-white/95 border border-[#D4A24C]/40 text-[#7A1F3D] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-gradient-to-br hover:from-[#ff7a18] hover:to-[#c2410c] hover:text-white hover:shadow-xl hover:shadow-[#ff7a18]/25 active:scale-95"
              >
                <FaChevronLeft className="text-base transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Testimonial"
                className="group flex h-13 w-13 items-center justify-center rounded-full bg-white/95 border border-[#D4A24C]/40 text-[#7A1F3D] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-gradient-to-br hover:from-[#ff7a18] hover:to-[#c2410c] hover:text-white hover:shadow-xl hover:shadow-[#ff7a18]/25 active:scale-95"
              >
                <FaChevronRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </CinematicLift>

        </div>
      </section>
    </>
  );
}

/**
 * Animated Section Header with Cinematic Shutter & Lift
 */
function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="text-center mb-6 space-y-2">
      <div>
        <CinematicShutter delay={100}>
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion/90 mb-1 font-bold">
            {eyebrow}
          </div>
        </CinematicShutter>
      </div>

      <div>
        <CinematicShutter delay={220}>
          <h2 className="font-display text-4xl sm:text-5xl text-ink font-bold">
            <span className="text-gradient-gold">{title}</span>
          </h2>
        </CinematicShutter>
      </div>

      <CinematicLift direction="zoom" delay={340}>
        <div className="mt-4 mx-auto w-24 ornament-divider">
          <span className="text-temple-gold text-lg">❋</span>
        </div>
      </CinematicLift>
    </div>
  );
}

/**
 * Animated Class Card with Cinematic 3D Reveal
 */
function ClassCard({
  img,
  title,
  subtitle,
  body,
  delay,
}: {
  img: string;
  title: string;
  subtitle: string;
  body: string;
  delay: number;
}) {
  return (
    <CinematicLift direction="bottom" delay={delay} className="h-full">
      <div className="glass-card rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 border border-amber-200/80 bg-white/95 shadow-xl transition-all duration-500 h-full flex flex-col justify-between">
        <div>
          <div className="relative h-72 overflow-hidden">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-108 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="font-display text-3xl font-bold tracking-tight">{title}</div>
              <div className="text-xs uppercase tracking-[0.22em] text-temple-gold font-medium mt-1">
                {subtitle}
              </div>
            </div>
          </div>
          <div className="p-8 text-sm sm:text-base text-ink/80 leading-relaxed font-normal">{body}</div>
        </div>
      </div>
    </CinematicLift>
  );
}