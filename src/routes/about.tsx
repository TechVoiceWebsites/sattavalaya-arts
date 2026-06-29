import { createFileRoute, Link } from "@tanstack/react-router";
import teacher from "@/assets/teacher.jpg";
import raji from "@/assets/Rajiwith.Veena.jpg";

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
    <article className="px-5 sm:px-8 py-16">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-60" style={{ background: "linear-gradient(135deg,#e9a04a,#c05a2a)" }} />
              <img src={teacher} alt="Rajalakshmi Roshan" className="relative rounded-3xl w-full aspect-[4/5] object-cover glass-card p-1.5" />
            </div>
          </div>

          <div className="space-y-8 text-ink/80 leading-relaxed text-[15px]">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.35em] text-vermilion/80">Meet Your Guru</div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-ink">The Soul Behind <span className="italic text-gradient-gold">Nataraji Arts</span></h1>
              <p className="text-lg text-ink/70 max-w-3xl">Decades of devotion to Veena, dance and wellness — shared with every student who walks this path.</p>
            </div>

            <div className="space-y-4">
              <p><span className="font-semibold">Rajalakshmi Roshan</span> is a biotechnologist by profession and a Vainika, Bharatanatyam dancer, and yoga practitioner by passion. Her training began at age 11, and she brings decades of dedication to sharing the divine art of Veena and wellness practices.</p>
              <h2 className="font-display text-2xl font-semibold text-ink">A Vainika, dancer & healer</h2>
              <p>A biotechnologist by profession and a Vainika, Bharatanatyam dancer, and yoga practitioner by passion. With training beginning at age 11, she brings decades of dedication to sharing the divine art of Veena and wellness practices.</p>
            </div>

            <ul className="space-y-3 text-ink/80">
              <li className="flex gap-3"><span className="mt-1 text-vermilion">•</span> Trained under Guru Shri V. S. Rangarajan</li>
              <li className="flex gap-3"><span className="mt-1 text-vermilion">•</span> Certified Ashtanga & Vinyasa yoga instructor</li>
              <li className="flex gap-3"><span className="mt-1 text-vermilion">•</span> Active performer & cultural educator</li>
              <li className="flex gap-3"><span className="mt-1 text-vermilion">•</span> Blends classical tradition with modern teaching</li>
            </ul>

            <Link to="/contact" className="inline-flex items-center rounded-full bg-ink px-7 py-3 text-sm font-semibold text-cream shadow-lg transition hover:bg-ink/90">
              Begin Your Journey
            </Link>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[3rem] border border-amber-100 bg-white/70 px-6 py-16 shadow-sm backdrop-blur-xl dark:bg-slate-950/60">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-8 h-24 w-24 rounded-full bg-amber-100/70 blur-2xl" />
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm uppercase tracking-[0.35em] text-vermilion/80 mb-4">Our Mission & Vision</div>
            <h2 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-ink">Inspiring the Next Generation Through <span className="italic text-gradient-gold">Divine Arts</span> and Holistic Wellness</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-ink/75">A space where ancient tradition meets modern aspiration — nurturing artists, healers, and seekers.</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-2xl shadow-slate-900/5">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-500 text-white mb-6 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink mb-3">Our Mission</h3>
              <p className="text-ink/75">To share the beauty of the divine Veena with audiences from diverse cultural backgrounds, and to nurture the next generation of Vainikas by fostering a supportive, creative, and joyful learning experience. We aim to cultivate balance and harmony of body, mind, and soul through comprehensive wellness programs.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-2xl shadow-slate-900/5">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-500 text-white mb-6 shadow-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink mb-3">Our Vision</h3>
              <p className="text-ink/75">To create a thriving community where traditional Indian classical arts and holistic wellness practices are accessible to all. We envision a space where students not only master technique but also connect deeply with the spiritual and cultural essence of these ancient practices.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200/70 bg-white p-10 text-center shadow-2xl shadow-slate-900/5">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xl italic font-semibold text-ink/80">"Playing the Veena has been regarded as a form of yoga — a spiritual practice that unites discipline, devotion, and inner harmony."</p>
            <div className="font-display text-sm uppercase tracking-[0.35em] text-vermilion/80">— Ancient Vedic Wisdom</div>
          </div>
        </section>

        <section className="mt-10 glass-card rounded-3xl p-10 text-center">
          <img src={raji} alt="Rajalakshmi Roshan" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-temple-gold/30" />
          <p className="font-display italic text-2xl text-ink/80 max-w-2xl mx-auto">"To play the Veena is to listen — to the string, to the breath, to the silence between notes."</p>
          <div className="mt-3 text-xs uppercase tracking-[0.25em] text-vermilion">— Rajalakshmi Roshan</div>
        </section>
      </div>
    </article>
  );
}
