import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/Rajiwith.Veena.jpg";
import logo from "@/assets/rajiroshanlogo.png";
import veenaClass from "@/assets/VeenaclassatNataRajiArts.jpg";
import yogaPose from "@/assets/TreePose.jpg";
import natarajasana from "@/assets/Natarajasana.jpg";
import meditation from "@/assets/meditation.jpg";
import gallery1 from "@/assets/pexels-sohanikamat-10491559.jpg";
import gallery2 from "@/assets/pexels-sohanikamat-10491567.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sattvalaya Arts — Harmony of Sound & Soul" },
      { name: "description", content: "Classical Veena and Yoga in San Jose, CA. Founded by Rajalakshmi Roshan. In-person, online, and hybrid classes for all ages." },
      { property: "og:title", content: "Sattvalaya Arts — Harmony of Sound & Soul" },
      { property: "og:description", content: "Veena & Yoga classes rooted in tradition, taught with care in San Jose, California." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoSlideRef = useRef<number | null>(null);

  const testimonials = [
    {
      quote: "Learning Veena from Rajalakshmi has been transformative. Her patience, expertise and passion are truly inspiring — I've grown so much in just one year!",
      name: "Priya Sharma",
      role: "Veena Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120",
    },
    {
      quote: "The yoga classes have completely changed my life. The combination of Ashtanga and Vinyasa is perfect for building strength and flexibility.",
      name: "Arjun Patel",
      role: "Yoga Practitioner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    },
    {
      quote: "The yoga sessions are both challenging and relaxing. I've noticed significant improvements in my posture, breathing and overall well-being.",
      name: "Deepika Raman",
      role: "Yoga Practitioner",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
    },
    {
      quote: "Nataraji Arts is more than a music school — it's a community. The virtual classes are excellent and I can learn from anywhere in the world.",
      name: "Meera Krishnan",
      role: "Virtual Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120",
    },
    {
      quote: "The structured curriculum and personalized attention have helped me progress rapidly. I performed my first recital last month, and it was an unforgettable experience!",
      name: "Vikram Reddy",
      role: "Advanced Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120",
    },
    {
      quote: "Taking both Veena and Yoga classes has been the best decision. The holistic approach helps me connect with both my artistic and spiritual sides. Highly recommended!",
      name: "Anjali Desai",
      role: "Yoga & Veena Student",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df9?auto=format&fit=crop&w=240&q=80",
    },
    {
      quote: "As a complete beginner, I was nervous about starting. But the supportive environment and excellent teaching methods made learning so enjoyable. I can't wait for each class!",
      name: "Karthik Iyer",
      role: "Beginner Student",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120",
    },
    {
      quote: "My daughter has been learning Veena here for two years and her confidence has grown tremendously. The guidance and encouragement from the teacher have been exceptional.",
      name: "Priya Natarajan",
      role: "Parent of Student",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120",
    },
    {
      quote: "Despite my busy work schedule, the flexible timings allowed me to pursue my passion for music. Every class is engaging, inspiring and rewarding.",
      name: "Sanjay Menon",
      role: "Working Professional",
      image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=120",
    },
    {
      quote: "The attention to detail in technique, theory and classical compositions is outstanding. I feel deeply connected to Carnatic music through these lessons.",
      name: "Lakshmi Narayanan",
      role: "Intermediate Student",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
    },
  ];

  useEffect(() => {
    autoSlideRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (autoSlideRef.current) window.clearInterval(autoSlideRef.current);
    };
  }, [testimonials.length]);

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3).length === 3
    ? testimonials.slice(activeIndex, activeIndex + 3)
    : [...testimonials.slice(activeIndex), ...testimonials.slice(0, 3 - (testimonials.length - activeIndex))];

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    if (autoSlideRef.current) {
      window.clearInterval(autoSlideRef.current);
      autoSlideRef.current = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
    }
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
    if (autoSlideRef.current) {
      window.clearInterval(autoSlideRef.current);
      autoSlideRef.current = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center px-5 sm:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-12">
          <div className="animate-fade-up relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] bg-cream/70 border border-temple-gold/40 text-vermilion">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion" /> Est. 2022 · San Jose, CA
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-[4.9rem] leading-[0.95] tracking-[-0.02em] text-ink">
              Where the <span className="bg-gradient-to-r from-[#ff7a18] via-[#f7a47b] to-[#21a76f] bg-clip-text text-transparent">Veena</span><br />Sings the Divine
            </h1>
            <p className="mt-4 max-w-2xl text-xl sm:text-2xl text-ink/80 leading-relaxed">
              Master the timeless art of Veena, find balance through Yoga, and immerse yourself in India&apos;s living traditions — guided with decades of devotion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/classes"
                className="rounded-full px-8 py-3 text-sm font-semibold text-cream shadow-xl transition hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#ff7a18,#f47f3f)" }}
              >
                Explore Classes
              </Link>
              <Link to="/about" className="rounded-full px-8 py-3 text-sm font-semibold border border-temple-gold/50 text-ink hover:bg-cream/60 transition">
                Meet the Teacher
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff7a18]/30 via-[#f7a047]/20 to-transparent blur-3xl" />
            <div className="relative w-full max-w-[520px] aspect-square rounded-full border-8 border-cream/80 bg-cream/50 shadow-2xl backdrop-blur-md">
              <div className="absolute inset-0 rounded-full border border-temple-gold/20" />
              <img
                src={heroImg}
                alt="Rajalakshmi Roshan playing Veena"
                className="relative h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:flex glass-card rounded-2xl px-5 py-3 items-center gap-3">
              <img src={logo} alt="" className="w-10 h-10 object-contain" />
              <div className="text-xs">
                <div className="font-semibold text-vermilion">Rajalakshmi Roshan</div>
                <div className="text-ink/60">Artistic Director</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <Section id="about" eyebrow="About Us" title="A Sanctuary for Tradition & Practice">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>Founded in 2022 by <strong className="text-vermilion">Rajalakshmi Roshan</strong>, Sattvalaya Arts began as an initiative to nurture and educate aspiring students in the Veena. Rooted in tradition, the teaching approach guides students through both discipline and discovery.</p>
            <p>Classes focus on music theory, technique, and the nuanced art of playing the Veena, while fostering creativity and a deep love for the instrument. Each lesson is thoughtfully structured to balance technical precision with expressive growth.</p>
            <p>In addition to Veena training, Sattvalaya Arts offers yoga and meditation classes that support overall well-being, helping students cultivate balance in body, mind, and spirit.</p>
            <p>To ensure meaningful learning, class sizes are kept small so every student receives individual attention and personalized guidance throughout their journey.</p>
            <p>Classes are offered in <strong>San Jose, California</strong>, as well as through online and hybrid formats, welcoming students from around the world.</p>
            <Link to="/about" className="inline-flex mt-4 rounded-full px-6 py-2.5 text-sm font-semibold text-cream" style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}>Meet the Teacher</Link>
          </div>
          <div className="relative">
            <div className="glass-card rounded-3xl p-10 grid place-items-center aspect-square">
              <img src={logo} alt="Sattvalaya Arts logo" className="w-full max-w-xs object-contain animate-float" />
            </div>
          </div>
        </div>
      </Section>

      {/* THE SATTVALAYA APPROACH */}
      <Section eyebrow="Our Philosophy" title="The Sattvalaya Approach">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🎵", title: "A Foundation in Classical Veena", body: "Learn classical veena through a strong foundation in technique, rhythm, and bhava. Training is guided with respect to tradition while making learning accessible and joyful for all levels." },
            { icon: "🧘‍♀️", title: "Holistic Mind-Body Practice", body: "Through breath, movement, and mindful awareness, our yoga sessions build strength, flexibility, and inner stillness. The practice fosters balance and clarity, supporting overall well-being in daily life." },
            { icon: "🌍", title: "Flexible Learning for Modern Lifestyles", body: "In-person classes in the Bay Area, along with online and hybrid options, make it easy to stay consistent — whether you are a beginner, a returning learner, or learning alongside family." },
          ].map((c) => (
            <div key={c.title} className="glass-card rounded-3xl p-7 hover:-translate-y-1 transition">
              <div className="text-4xl mb-4">{c.icon}</div>
              <h3 className="font-display text-xl text-vermilion mb-3">{c.title}</h3>
              <p className="text-sm text-ink/75 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OUR CLASSES */}
      <Section eyebrow="Our Offerings" title="Our Classes">
        <div className="grid md:grid-cols-2 gap-8">
          <ClassCard img={veenaClass} title="Veena" subtitle="Carnatic classical tradition" body="From the first fret to advanced manodharma — a journey through Adi Tala Varnams, Kritis, gamakas, and the meditative beauty of the divine instrument." />
          <ClassCard img={yogaPose} title="Yoga" subtitle="Ashtanga · Vinyasa · Pranayama" body="60-minute sessions of breath, asana, and mindful awareness. Build strength, flexibility, and inner calm. All ages and levels welcome." />
        </div>
        <div className="mt-8 text-center">
          <Link to="/classes" className="inline-flex rounded-full px-7 py-3 text-sm font-semibold text-cream" style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}>View Class Details</Link>
        </div>
      </Section>

      {/* GALLERY */}
      <Section eyebrow="Moments" title="Gallery">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[gallery1, gallery2, veenaClass, yogaPose, natarajasana, meditation].map((g, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl glass-card aspect-[4/3]">
              <img src={g} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/gallery" className="inline-flex rounded-full px-7 py-3 text-sm font-semibold border border-temple-gold/50 hover:bg-cream/60 transition">See full gallery</Link>
        </div>
      </Section>

      <Section eyebrow="Testimonials" title="What Students Say">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-[2rem] bg-cream/95 p-8 shadow-xl border border-white/80 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                <p className="text-base leading-relaxed text-ink/80">“{testimonial.quote}”</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="h-16 w-16 rounded-full object-cover border-2 border-cream shadow-sm" />
                  <div>
                    <div className="font-semibold text-ink text-lg">{testimonial.name}</div>
                    <div className="text-sm uppercase tracking-[0.25em] text-vermilion/80">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <button onClick={prevSlide} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff7a18] text-white shadow-xl transition hover:-translate-y-0.5">
              ‹
            </button>
            <button onClick={nextSlide} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff7a18] text-white shadow-xl transition hover:-translate-y-0.5">
              ›
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-5 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion/80 mb-3">{eyebrow}</div>
          <h2 className="font-display text-4xl sm:text-5xl text-ink"><span className="text-gradient-gold">{title}</span></h2>
          <div className="mt-5 mx-auto w-24 ornament-divider"><span className="text-temple-gold">❋</span></div>
        </div>
        {children}
      </div>
    </section>
  );
}

function ClassCard({ img, title, subtitle, body }: { img: string; title: string; subtitle: string; body: string }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="absolute bottom-4 left-5 text-cream">
          <div className="font-display text-3xl">{title}</div>
          <div className="text-xs uppercase tracking-[0.2em] opacity-90">{subtitle}</div>
        </div>
      </div>
      <div className="p-6 text-sm text-ink/75 leading-relaxed">{body}</div>
    </div>
  );
}
