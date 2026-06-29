import type { ComponentType } from "react";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

type SocialItem = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  bg: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M380.9 97.1C339 55.2 288.8 32 234.3 32 110.7 32 8 134.7 8 258.3c0 45.5 11.9 89.8 34.5 128.8L0 480l96.9-26.2c37.8 20.7 80.6 31.2 124.1 31.2h0c123.6 0 226.3-102.7 226.3-226.3 0-54.5-21.3-105.6-60.1-144.6zm-146 331.5h-.1c-37.5 0-74.1-10.1-105.6-29l-7.5-4.5-57.4 15.5 15.4-55.9-4.9-7.9c-22.4-36.6-34.2-78.9-34.2-122.7 0-109.7 89.3-199 199-199 53.2 0 103.2 20.7 140.8 58.3 37.4 37.6 58 87.3 58 140.8 0 109.7-89.3 199-199 199zm102.6-138.6c-5.6-2.8-33.1-16.3-38.2-18.2-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.2-17.5 22-3.2 3.7-6.3 4.2-11.9 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.6-2.6 5.6-6.8 8.4-10.2 2.8-3.4 3.7-5.6 5.6-9.3 1.9-3.7.9-7-0.4-9.8-1.3-2.8-11.9-28.7-16.3-39.4-4.3-10.3-8.7-8.9-12.5-9.1-3.2-.2-7-0.2-10.7-0.2-3.7 0-9.8 1.4-15 7-5.1 5.6-19.3 18.9-19.3 46.2 0 27.3 19.8 53.7 22.6 57.4 2.8 3.7 39.1 59.6 94.9 83.7 13.3 5.7 23.7 9.1 31.8 11.7 13.4 4.3 25.6 3.7 35.3 2.3 10.8-1.5 33.1-13.5 37.7-26.5 4.7-13 4.7-24.1 3.3-26.5-1.5-2.4-5.1-3.7-10.7-6.5z" />
    </svg>
  );
}

const socials: SocialItem[] = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook, bg: "bg-[#1877F2]" },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    bg: "bg-[linear-gradient(135deg,#feda75,#fa7e1e_25%,#d62976_50%,#962fbf_75%,#4f5bd5)]",
  },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube, bg: "bg-[#FF0000]" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, bg: "bg-[#0A66C2]" },
];

export function SocialRail() {
  return (
    <>
      {/* Left vertical rail */}
      <nav
        aria-label="Social links"
        className="fixed left-0 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-3"
      >
        {socials.map(({ label, href, icon: Icon, bg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`${bg} group flex h-11 w-12 items-center justify-center rounded-r-full text-white shadow-lg transition-transform duration-200 hover:translate-x-1`}
          >
            <Icon size={20} strokeWidth={2} className="text-white" />
          </a>
        ))}
      </nav>

      {/* WhatsApp floating bubble (bottom-right) */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-110"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>
    </>
  );
}
