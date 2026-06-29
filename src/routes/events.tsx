import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Performances — Sattvalaya Arts" },
      { name: "description", content: "Upcoming recitals, workshops, and seasonal yoga sessions at Sattvalaya Arts." },
    ],
  }),
  component: EventsPage,
});

const events = [
  { date: "AUG 16, 2026", title: "Student Recital — Summer Showcase", loc: "Sattvalaya Studio, San Jose", body: "A celebration of progress, featuring solo Veena performances from beginner to advanced students." },
  { date: "SEP 21, 2026", title: "Saraswati Pooja & Open House", loc: "In-person + Live online", body: "Traditional invocation, a short Veena concert, and an open house for prospective students and families." },
  { date: "OCT 12, 2026", title: "Yoga & Pranayama Workshop", loc: "Sattvalaya Studio, San Jose", body: "Half-day workshop on breath, gentle Vinyasa flow, and meditation — for all experience levels." },
  { date: "DEC 14, 2026", title: "Margazhi Veena Recital", loc: "Bay Area Community Hall", body: "An evening of Carnatic compositions honoring the sacred month of Margazhi." },
];

function EventsPage() {
  return (
    <div className="px-5 sm:px-8 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion/80 mb-3">What's Happening</div>
          <h1 className="font-display text-5xl sm:text-6xl text-gradient-gold">Events &amp; Performances</h1>
          <p className="mt-4 text-ink/70">Concerts, recitals, and workshops throughout the year.</p>
        </header>

        <ol className="relative border-l-2 border-temple-gold/40 space-y-8 pl-8">
          {events.map((e) => (
            <li key={e.title} className="relative">
              <span className="absolute -left-[42px] top-1 w-5 h-5 rounded-full bg-vermilion ring-4 ring-cream shadow" />
              <div className="glass-card rounded-2xl p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-vermilion font-semibold">{e.date}</div>
                <h3 className="font-display text-2xl mt-1 text-ink">{e.title}</h3>
                <div className="text-sm text-ink/60 mt-1">{e.loc}</div>
                <p className="text-sm text-ink/75 mt-3 leading-relaxed">{e.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center glass-card rounded-3xl p-10">
          <h2 className="font-display text-2xl text-vermilion">Want updates on future events?</h2>
          <p className="text-ink/70 mt-2">Reach out and we'll add you to our quarterly newsletter.</p>
          <Link to="/contact" className="inline-flex mt-5 rounded-full px-7 py-3 text-sm font-semibold text-cream" style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
