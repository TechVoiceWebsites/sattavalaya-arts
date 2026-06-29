import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import logoAsset from "@/assets/rajiroshanlogo.png";


const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <div className="relative min-h-screen">
      

      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-cream/80 border-b border-temple-gold/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoAsset} alt="Sattvalaya Arts" className="w-12 h-12 object-contain rounded-xl bg-white/90 p-2 shadow-sm" />
            <div className="leading-tight">
              <div className="font-display text-xl sm:text-2xl font-semibold text-gradient-gold">Sattvalaya Arts</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-black">Harmony of Sound &amp; Soul</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = path === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${active ? "text-vermilion" : "text-ink/75 hover:text-vermilion"}`}
                >
                  {n.label}
                  {active && <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-vermilion to-transparent" />}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="ml-3 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-cream shadow-md transition hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#ff7a18,#f47f3f)" }}
            >
              Contact
            </Link>
          </nav>

          <button
            aria-label="Menu"
            className="md:hidden w-10 h-10 grid place-items-center rounded-md text-ink"
            onClick={() => setOpen((o) => !o)}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-temple-gold/20 bg-cream/95 backdrop-blur-xl">
            <div className="px-5 py-3 flex flex-col">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="py-3 text-base font-medium text-ink border-b border-temple-gold/10 last:border-0">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="pt-20 px-5 md:px-24 lg:px-28">
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="relative mt-24 bg-black">
      <footer className="relative border-t border-white/10 bg-black backdrop-blur-md overflow-hidden">
        <div className="mx-auto max-w-7xl pl-16 pr-5 sm:pl-20 sm:pr-8 py-14 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoAsset} alt="" className="w-12 h-12 object-contain rounded-xl bg-white/90 p-2 shadow-sm" />
              <div>
                <div className="font-display text-2xl text-white">Sattvalaya Arts</div>
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Harmony of Sound &amp; Soul</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              Nurturing the timeless traditions of Veena and Yoga in the heart of San Jose, California.
              In-person, online, and hybrid classes for all ages.
            </p>
          </div>

        <div>
          <h4 className="font-display text-lg mb-3 text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-slate-300 hover:text-white transition">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3 text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>San Jose, California</li>
            <li><a href="mailto:hello@sattvalayaarts.com" className="hover:text-white">hello@sattvalayaarts.com</a></li>
            <li><a href="tel:+14085551234" className="hover:text-white">+1 (408) 555-1234</a></li>
            <li className="pt-2 flex gap-3">
              {["facebook","instagram","youtube","linkedin"].map(s => (
                <a key={s} href="#" aria-label={s} className="w-9 h-9 grid place-items-center rounded-full border border-white/10 text-white hover:bg-white/10 hover:text-white transition">
                  <span className="text-xs font-bold">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Sattvalaya Arts. All rights reserved.
      </div>
    </footer>
  </div>
  );
}
