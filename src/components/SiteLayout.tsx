import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import logoAsset from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact Us" },
];

/* Decorative mandala */
function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="200" cy="200" r="190" strokeWidth="1" />
      <circle cx="200" cy="200" r="150" strokeWidth="0.8" strokeDasharray="3 6" />
      <circle cx="200" cy="200" r="60" strokeWidth="1" />
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse
          key={i}
          cx="200"
          cy="100"
          rx="16"
          ry="70"
          strokeWidth="1"
          transform={`rotate(${i * 22.5} 200 200)`}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`s${i}`}
          cx="200"
          cy="140"
          rx="9"
          ry="34"
          strokeWidth="1"
          transform={`rotate(${i * 45 + 22.5} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="8" fill="currentColor" />
    </svg>
  );
}

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Page keela scroll pannum bothu matum sticky slide down aaga listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    /* Navbar & Footer thavirthu muzhu page-um pure white-aa maara 'bg-white' */
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* 
        1. INITIAL STATIC/FIXED HEADER (Default Top Position)
        Scroll pannaathapothu normal-aa irukkum
      */}
      <header className="absolute top-0 inset-x-0 z-30 bg-[#FFFAF3] border-b border-[#D4A24C]/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoAsset} 
              alt="Sattvalaya Arts" 
              className="w-14 sm:w-16 h-14 sm:h-16 object-contain rounded-xl bg-white p-2 shadow-sm border border-[#E9DFD0] group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="leading-tight">
              <div className="font-display text-xl sm:text-2xl font-semibold text-[#B8863A]">
                Sattvalaya Arts
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A1F3D]">
                Harmony of Sound &amp; Soul
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {NAV.map((n) => {
              const active = path === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active 
                      ? "text-[#C2410C] font-semibold" 
                      : "text-[#574332] hover:text-[#C2410C]"
                  }`}
                >
                  {n.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-[#C2410C] to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            aria-label="Menu"
            className="md:hidden w-10 h-10 grid place-items-center rounded-xl bg-white/80 border border-[#E9DFD0] text-[#574332] shadow-xs active:scale-95 transition-transform"
            onClick={() => setOpen(true)}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* 
        2. SMOOTH SLIDE-DOWN STICKY HEADER (Page-a keela scroll pannum bothu top-la irunthu slide down aagi varum)
      */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transform-gpu backdrop-blur-xl bg-[#FFFAF3]/95 border-b border-[#D4A24C]/40 shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSticky
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoAsset} 
              alt="Sattvalaya Arts" 
              className="w-12 sm:w-14 h-12 sm:h-14 object-contain rounded-xl bg-white p-1.5 shadow-sm border border-[#E9DFD0] group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="leading-tight">
              <div className="font-display text-lg sm:text-xl font-semibold text-[#B8863A]">
                Sattvalaya Arts
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#7A1F3D]">
                Harmony of Sound &amp; Soul
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {NAV.map((n) => {
              const active = path === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active 
                      ? "text-[#C2410C] font-semibold" 
                      : "text-[#574332] hover:text-[#C2410C]"
                  }`}
                >
                  {n.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-[#C2410C] to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            aria-label="Menu"
            className="md:hidden w-10 h-10 grid place-items-center rounded-xl bg-white/80 border border-[#E9DFD0] text-[#574332] shadow-xs active:scale-95 transition-transform"
            onClick={() => setOpen(true)}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* CURVED GLASSMORPHISM SPRING-SLIDE DRAWER */}
      <div
        className={`fixed inset-0 z-[9999] md:hidden transition-all duration-500 ease-out ${
          open ? "pointer-events-auto visible" : "pointer-events-none invisible delay-500"
        }`}
      >
        <div
          className={`fixed inset-0 bg-[#250812]/50 transition-opacity duration-500 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-full w-[85vw] max-w-[330px] bg-[#FFFBF6] rounded-l-[28px] border-l border-[#D4A24C]/40 shadow-2xl flex flex-col justify-between overflow-hidden transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4A24C]/20 bg-white/50">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <img 
                  src={logoAsset} 
                  alt="Sattvalaya Arts" 
                  className="h-10 w-10 object-contain rounded-xl p-1 bg-white border border-[#E9DFD0] shadow-xs" 
                />
                <div className="leading-tight">
                  <span className="block font-display text-sm font-bold text-[#B8863A]">
                    Sattvalaya Arts
                  </span>
                  <span className="block text-[8px] uppercase tracking-widest text-[#7A1F3D]">
                    Sound &amp; Soul
                  </span>
                </div>
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7A1F3D] border border-[#E9DFD0] shadow-xs active:scale-90 hover:bg-[#C2410C] hover:text-white transition-colors duration-200"
              >
                <span className="text-base font-bold leading-none">✕</span>
              </button>
            </div>

            <nav className="flex flex-col gap-2 p-5">
              {NAV.map((n, idx) => {
                const active = path === n.to;
                const delays = [
                  "delay-[150ms]",
                  "delay-[200ms]",
                  "delay-[250ms]",
                  "delay-[300ms]",
                  "delay-[350ms]",
                  "delay-[400ms]",
                ];

                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-400 ease-out ${
                      open
                        ? `${delays[idx] || "delay-[400ms]"} opacity-100 translate-x-0`
                        : "opacity-0 translate-x-5 delay-0"
                    } ${
                      active
                        ? "bg-gradient-to-r from-[#D4A24C] to-[#E8553F] text-white shadow-md shadow-[#E8553F]/25"
                        : "text-[#544336] bg-white/70 hover:bg-white hover:text-[#C2410C] border border-[#E9DFD0]/60 shadow-xs"
                    }`}
                  >
                    <span>{n.label}</span>
                    <span
                      className={`text-sm transition-transform duration-200 group-hover:translate-x-1 ${
                        active ? "text-white" : "text-[#B8863A]"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area - முழுமையான வெள்ளை நிற பின்னணி */}
      <div className="relative z-10 w-full bg-white px-5 pt-24 md:px-24 lg:px-28">
        <main className="w-full bg-white">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  const words = ["Veena", "Yoga", "Meditation", "Carnatic Music", "Harmony", "Serenity", "Devotion", "Rhythm"];

  return (
    <div className="relative z-10 mt-28">
      {/* Marquee Keyframe */}
      <style>{`
        @keyframes sv-marquee-loop {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .sv-marquee-track {
          display: flex;
          width: max-content;
          animation: sv-marquee-loop 25s linear infinite;
        }
        .sv-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Footer Container */}
      <footer className="relative z-0 overflow-hidden bg-gradient-to-br from-[#5A1630] via-[#7A1F3D] to-[#A32D4F] pt-16 text-white">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#D4A24C] via-[#F3D58A] to-[#E8553F]" />

        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#E8553F]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#D4A24C]/25 blur-3xl" />

        <Mandala className="pointer-events-none absolute -right-32 top-10 h-[34rem] w-[34rem] text-[#F3D58A]/15 animate-[spin_90s_linear_infinite]" />
        <Mandala className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] text-[#F3D58A]/10 [animation:spin_140s_linear_infinite_reverse]" />

        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(#FFE6B8 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />

        {/* Seamless Moving Marquee Strip */}
        <div className="relative mb-12 w-full overflow-hidden border-y border-[#D4A24C]/30 bg-white/5 py-3 backdrop-blur-sm">
          <div className="sv-marquee-track">
            <div className="flex shrink-0 items-center gap-10 pr-10">
              {words.map((w, i) => (
                <span key={`w1-${i}`} className="flex items-center gap-10 font-display text-lg tracking-widest text-[#F3D58A]/90 whitespace-nowrap">
                  {w}
                  <span className="text-[#E8553F]">✦</span>
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
              {words.map((w, i) => (
                <span key={`w2-${i}`} className="flex items-center gap-10 font-display text-lg tracking-widest text-[#F3D58A]/90 whitespace-nowrap">
                  {w}
                  <span className="text-[#E8553F]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Main Content Grid */}
        <div className="relative mx-auto grid max-w-7xl gap-12 pb-14 pl-16 pr-5 sm:pl-20 sm:pr-8 md:grid-cols-12">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <img
                src={logoAsset}
                alt="Sattvalaya Arts"
                className="h-16 w-16 rounded-2xl bg-white object-contain p-2 shadow-xl ring-2 ring-[#F3D58A]/80 transition-transform duration-300 hover:scale-105"
              />
              <div>
                <div className="font-display text-2xl text-[#FFE6B8]">Sattvalaya Arts</div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/70">Harmony of Sound &amp; Soul</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              Nurturing the timeless traditions of Veena and Yoga in the heart of San Jose, California.
              In-person, online, and hybrid classes for all ages.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="mb-2 font-display text-lg text-[#FFE6B8]">Explore</h4>
            <div className="mb-5 h-[2px] w-12 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="group inline-flex items-center gap-2 text-white/80 transition-all duration-300 hover:translate-x-1 hover:text-[#FFE6B8]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#D4A24C] transition-all duration-300 group-hover:w-2.5" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="mb-2 font-display text-lg text-[#FFE6B8]">Get in touch</h4>
            <div className="mb-5 h-[2px] w-12 bg-gradient-to-r from-[#D4A24C] to-transparent" />
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[#F3D58A]">📍</span>
                San Jose, California
              </li>
              <li>
                <a href="mailto:hello@sattvalayaarts.com" className="flex items-center gap-3 transition hover:text-[#FFE6B8]">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[#F3D58A]">✉</span>
                  hello@sattvalayaarts.com
                </a>
              </li>
              <li>
                <a href="tel:+14085551234" className="flex items-center gap-3 transition hover:text-[#FFE6B8]">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[#F3D58A]">☎</span>
                  +1 (408) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-[#D4A24C]/30 bg-[#4A1224]/40 py-5 text-center text-xs tracking-wide text-white/70">
          © {new Date().getFullYear()} Sattvalaya Arts. All rights reserved. ✦ Made with devotion
        </div>
      </footer>
    </div>
  );
}