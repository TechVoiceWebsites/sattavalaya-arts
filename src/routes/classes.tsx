import { createFileRoute } from "@tanstack/react-router";
import veenaImg from "@/assets/veena.png";
import veenaClass from "@/assets/VeenaclassatNataRajiArts.jpg";
import yoga from "@/assets/TreePose.jpg";
import nataraja from "@/assets/Natarajasana.jpg";
import meditation from "@/assets/meditation.jpg";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Veena & Yoga | Sattvalaya Arts" },
      { name: "description", content: "Veena classes (Beginner, Intermediate, Advanced) and Yoga sessions (Ashtanga, Vinyasa, Pranayama) at Sattvalaya Arts." },
      { property: "og:image", content: veenaClass },
    ],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  return (
    <div className="px-5 sm:px-8 py-16">
      <div className="mx-auto max-w-6xl space-y-24">
        <Header />

        {/* VEENA */}
        <section id="veena" className="scroll-mt-24">
          <SectionTitle eyebrow="Carnatic Tradition" title="Veena Classes" />
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start mt-8">
            <div className="space-y-4 text-ink/80 leading-relaxed text-[15px]">
              <p>Veena is one of the most ancient and revered stringed instruments of India — an instrument that embodies grace, depth, devotion, and meditative beauty. Learning Veena is not only a musical journey, but also a path toward discipline, inner harmony, and cultural connection.</p>
              <p>At Sattvalaya Arts, students are introduced to the rich tradition of Carnatic music through a nurturing and structured learning experience that honors both classical foundations and artistic expression.</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] blur-3xl opacity-50" style={{ background: "radial-gradient(circle, #e9a04a, transparent 70%)" }} />
              <img src={veenaImg} alt="Veena" className="relative w-full object-contain animate-float" />
            </div>
          </div>

          <div className="mt-14 glass-card rounded-3xl p-8 lg:p-10">
            <h3 className="font-display text-2xl text-vermilion mb-3">About Veena</h3>
            <div className="space-y-4 text-ink/80 text-[15px] leading-relaxed">
              <p>The Veena, regarded as the National Musical Instrument of India, traces its origins back to around 1500 BCE. Revered as a divine instrument, it is one of the three principal instruments mentioned in Vedic literature, alongside the Venu (flute) and Mridanga (drum).</p>
              <p>Ancient Sanskrit treatises on music describe the Veena in remarkable detail. In the <em>Natyasastra</em>, Bharata Muni refers to the Chitra Veena with seven strings and the Vipanchi Veena with nine strings. He also explains the theory of the 22 Śruti-s (microtones) in an octave using experimental Veenas as models.</p>
              <p>Veena is considered a complete instrument because it beautifully encompasses the essential elements of Indian classical music:</p>
              <ul className="grid sm:grid-cols-3 gap-3">
                {[["Śruti","pitch"],["Laya","rhythm"],["Sahitya","expression"]].map(([t,d]) => (
                  <li key={t} className="rounded-2xl p-4 bg-cream/60 border border-temple-gold/30 text-center">
                    <div className="font-display text-xl text-vermilion">{t}</div>
                    <div className="text-xs uppercase tracking-wider text-ink/60">{d}</div>
                  </li>
                ))}
              </ul>
              <p>Its hallmark is its mellow, resonant tone that naturally creates a calming and meditative atmosphere. For centuries, playing Veena has been regarded as a form of yoga — a sacred practice that unites concentration, discipline, devotion, and inner peace. The instrument is deeply associated with Goddess Saraswati, the embodiment of wisdom, music, and the arts.</p>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="font-display text-3xl text-center mb-2 text-gradient-gold">The Divinity of Veena</h3>
            <p className="text-center text-sm uppercase tracking-[0.25em] text-vermilion/80 mb-6">From the Sangeeta Ratnakara</p>
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              <pre className="font-display italic text-center text-lg text-ink/85 whitespace-pre-wrap leading-loose">
{`Darsana sparsane chasya bhoga svargapavargade |
Punito viprahatyadi patakaih patitam janam ||
Danda sambhuruma tantri kakubhah kamalapatih |
Indra patrika brahma tumbam nabhih sarasvati ||
Dorako vasukirjiva sudhamsuh sarika ravih |
Sarvadevamayi tasmad veeneyam sarvamangala ||`}
              </pre>
              <p className="mt-6 text-ink/80 leading-relaxed text-[15px]">
                These verses express that merely seeing or touching the Veena can bring joy, purity, and spiritual upliftment.
                Each part of the instrument symbolizes a divine presence: the <em>danda</em> (stem) represents Lord Shiva, the string is Devi Uma (Parvati), the shoulder is Lord Vishnu, the bridge is Lakshmi, the gourd is Brahma, and the navel represents Sarasvati. The connecting wires symbolize Vasuki, the resonator is the moon, and the pegs signify the sun.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="font-display text-2xl text-center mb-8 text-vermilion">Class Structure</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Level title="Beginner" tag="Level 1">
                These classes focus on basic fretting and strumming techniques. Students get comfortable with the instrument and build a foundation in posture, tuning, and tone.
              </Level>
              <Level title="Intermediate" tag="Level 2">
                Students begin learning simple compositions — Adi Tala Varnams and Kritis. Emphasis on tonal clarity, gamakas, rhythm alignment, and expression. By the end of this level, students handle the instrument with greater ease and confidence.
              </Level>
              <Level title="Advanced" tag="Level 3">
                Complex Varnams, mastery of gamakas, ornamentation, and manodharma (creative improvisation). Designed to prepare students for solo recitals and ensemble performance.
              </Level>
            </div>
          </div>
        </section>

        {/* YOGA */}
        <section id="yoga" className="scroll-mt-24">
          <SectionTitle eyebrow="Mind · Body · Spirit" title="Yoga at Sattvalaya Arts" />
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start mt-8">
            <div className="grid grid-cols-2 gap-4">
              {[yoga, nataraja, meditation, veenaClass].map((g, i) => (
                <img key={i} src={g} alt="" className={`rounded-2xl object-cover w-full ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5] mt-8"}`} />
              ))}
            </div>
            <div className="space-y-4 text-ink/80 leading-relaxed text-[15px]">
              <p>In today's world, yoga is often viewed simply as a form of physical exercise or a series of postures (asanas). In reality, yoga is a holistic practice that nurtures the connection between mind, body, and spirit. The word <em>Yoga</em> comes from the Sanskrit root <em>yuj</em>, meaning "to unite" or "to connect," reflecting its deeper purpose of creating harmony within oneself.</p>
              <p>Yoga offers benefits for people of all ages and backgrounds. A consistent practice can support physical health, mental clarity, emotional balance, and overall well-being. Studies have shown that yoga may help reduce stress, anxiety, and fatigue while improving flexibility, strength, posture, breath awareness, and nervous system regulation.</p>
              <p>Beyond the physical practice, yoga provides an opportunity to slow down, reconnect inwardly, and cultivate greater mindfulness in daily life.</p>
              <p>At Sattvalaya Arts, yoga is approached not merely as exercise, but as a lifelong practice that supports balance, awareness, and inner well-being.</p>
            </div>
          </div>

          <div className="mt-14 glass-card rounded-3xl p-8 lg:p-10">
            <h3 className="font-display text-2xl text-vermilion mb-3">Meet Your Instructor</h3>
            <div className="space-y-4 text-ink/80 leading-relaxed text-[15px]">
              <p>Yoga classes at Sattvalaya Arts are led by Rajalakshmi Roshan — a passionate yoga practitioner, Bharatanatyam dancer, and Vainika who has been practicing yoga since the age of 8.</p>
              <p>With a background in biotechnology and years of experience in movement-based disciplines, Rajalakshmi brings a thoughtful and holistic approach to teaching. Her understanding of breathwork, body alignment, and mindful movement allows her to guide students safely while encouraging strength, flexibility, balance, and inner calm.</p>
              <p><strong>Certified in Ashtanga and Vinyasa yoga</strong>, she blends the discipline and structure of Ashtanga with the fluidity and flow of Vinyasa, creating classes that are both grounding and energizing.</p>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="font-display text-2xl text-center mb-8 text-vermilion">Class Structure</h3>
            <p className="text-center text-ink/70 mb-8">Each 60-minute session includes:</p>
            <div className="grid md:grid-cols-3 gap-6">
              <Level title="Pranayama" tag="Breathwork">Calm the mind and energize the body through guided breath practice.</Level>
              <Level title="Asana Flow" tag="Movement">A guided flow of postures designed to improve flexibility, build strength, enhance balance, and reduce daily stress.</Level>
              <Level title="Relaxation" tag="Awareness">Mindful awareness practices to support overall well-being and inner stillness.</Level>
            </div>
            <p className="text-center text-ink/60 mt-6 text-sm italic">All ages and experience levels are welcome — no prior yoga experience is required.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-vermilion/80 mb-3">What We Teach</div>
      <h1 className="font-display text-5xl sm:text-6xl text-gradient-gold">Our Classes</h1>
      <p className="mt-4 max-w-2xl mx-auto text-ink/70">A nurturing, structured learning experience in Veena and Yoga — honoring tradition while welcoming every level.</p>
      <div className="mt-6 flex justify-center gap-3 text-sm">
        <a href="#veena" className="rounded-full px-5 py-2 font-semibold text-cream" style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}>Veena</a>
        <a href="#yoga" className="rounded-full px-5 py-2 font-semibold border border-temple-gold/50">Yoga</a>
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-vermilion/80 mb-2">{eyebrow}</div>
      <h2 className="font-display text-4xl sm:text-5xl text-gradient-gold">{title}</h2>
    </div>
  );
}

function Level({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-3xl p-6 hover:-translate-y-1 transition">
      <div className="text-[10px] uppercase tracking-[0.25em] text-vermilion/80 mb-1">{tag}</div>
      <div className="font-display text-2xl text-ink mb-3">{title}</div>
      <p className="text-sm text-ink/75 leading-relaxed">{children}</p>
    </div>
  );
}
