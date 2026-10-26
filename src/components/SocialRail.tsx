import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";

import { FiPhoneCall } from "react-icons/fi";

const socials = [
  {
    name: "Facebook",
    label: "Facebook",
    icon: <FaFacebookF />,
    bgColor: "bg-[#1877F2]",
    link: "https://facebook.com",
    external: true,
  },
  {
    name: "Instagram",
    label: "Instagram",
    icon: <FaInstagram />,
    bgColor: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    link: "https://instagram.com",
    external: true,
  },
  {
    name: "YouTube",
    label: "YouTube",
    icon: <FaYoutube />,
    bgColor: "bg-[#FF0000]",
    link: "https://youtube.com",
    external: true,
  },
  {
    name: "Call",
    label: "Call Us",
    icon: <FiPhoneCall />, // FaWhatsapp-க்கு பதில் FaPhoneAlt மாற்றப்பட்டுள்ளது
    bgColor: "bg-[#25D366]",
    link: "tel:+919842198882",
    external: false,
  },
];

export default function SocialRail() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Left Social Floating Rail */}
      <div className="fixed left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.link}
            {...(social.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={social.label}
            className="
              group flex items-center
              rounded-r-full bg-white/0 py-1 pl-1 pr-1.5
              transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-black/5
            "
          >
            {/* Smooth Grid Expander (Zero width to full content) */}
            <div
              className="
                grid grid-cols-[0fr]
                transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                group-hover:grid-cols-[1fr]
              "
            >
              <div className="overflow-hidden">
                <span
                  className="
                    block whitespace-nowrap pl-3 pr-2 text-sm font-semibold text-gray-800
                    opacity-0 transition-opacity duration-500 ease-in-out
                    group-hover:opacity-100 group-hover:delay-150
                  "
                >
                  {social.label}
                </span>
              </div>
            </div>

            {/* Circular Social Icon */}
            <span
              className={`
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full text-white border-2 border-white shadow-md
                transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                group-hover:scale-105
                ${social.bgColor}
              `}
            >
              <span className="text-sm">{social.icon}</span>
            </span>
          </a>
        ))}
      </div>

      {/* Right Bottom Floating Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="
            flex h-[52px] w-[52px] items-center justify-center
            rounded-full bg-[#25D366] text-white shadow-xl
            transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95
          "
        >
          <FaWhatsapp className="text-3xl" />
        </a>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-[#f97316] text-white shadow-lg
            transition-all duration-300 hover:scale-110 hover:bg-[#ea580c] active:scale-95
          "
        >
          <FaArrowUp className="text-lg" />
        </button>
      </div>
    </>
  );
}