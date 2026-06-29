import { createFileRoute } from "@tanstack/react-router";
import g1 from "@/assets/Rajiwith.Veena.jpg";
import g2 from "@/assets/VeenaclassatNataRajiArts.jpg";
import g3 from "@/assets/TreePose.jpg";
import g4 from "@/assets/Natarajasana.jpg";
import g5 from "@/assets/meditation.jpg";
import g6 from "@/assets/teacher.jpg";
import g7 from "@/assets/pexels-sohanikamat-10491559.jpg";
import g8 from "@/assets/pexels-sohanikamat-10491567.jpg";
import g9 from "@/assets/veena.png";

const images = [
  { src: g1, cap: "Rajalakshmi with her Veena" },
  { src: g2, cap: "Veena class in session" },
  { src: g3, cap: "Tree Pose — Vrikshasana" },
  { src: g7, cap: "Carnatic recital" },
  { src: g4, cap: "Natarajasana" },
  { src: g5, cap: "Meditation" },
  { src: g8, cap: "Performance" },
  { src: g6, cap: "Teaching moment" },
  { src: g9, cap: "The divine instrument" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Sattvalaya Arts" },
      { name: "description", content: "Moments from the studio — Veena performances, classes, and yoga sessions." },
      { property: "og:image", content: g1 },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="px-5 sm:px-8 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion/80 mb-3">Moments</div>
          <h1 className="font-display text-5xl sm:text-6xl text-gradient-gold">Gallery</h1>
          <p className="mt-4 text-ink/70 max-w-2xl mx-auto">Glimpses from classes, performances, and the quiet practice that shapes them.</p>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {images.map((img, i) => (
            <figure key={i} className="mb-5 break-inside-avoid group relative overflow-hidden rounded-2xl glass-card">
              <img src={img.src} alt={img.cap} className="w-full object-cover group-hover:scale-105 transition duration-700" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent text-cream text-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition">
                {img.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
