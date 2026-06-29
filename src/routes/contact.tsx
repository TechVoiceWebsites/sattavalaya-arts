import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sattvalaya Arts" },
      { name: "description", content: "Get in touch about Veena & Yoga classes at Sattvalaya Arts in San Jose, California." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="px-5 sm:px-8 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-vermilion/80 mb-3">Reach Out</div>
          <h1 className="font-display text-5xl sm:text-6xl text-gradient-gold">Contact Us</h1>
          <p className="mt-4 text-ink/70 max-w-xl mx-auto">Curious about classes, schedules, or trials? Send a note — we'd love to hear from you.</p>
        </header>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <aside className="space-y-4">
            <Info label="Location" value="San Jose, California, USA" />
            <Info label="Email" value="hello@sattvalayaarts.com" href="mailto:hello@sattvalayaarts.com" />
            <Info label="Phone" value="+1 (408) 555-1234" href="tel:+14085551234" />
            <Info label="Formats" value="In-person · Online · Hybrid" />
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-vermilion mb-2">Hours</div>
              <ul className="text-sm text-ink/75 space-y-1">
                <li>Mon — Fri · 4:00 PM – 8:00 PM</li>
                <li>Sat — Sun · 9:00 AM – 6:00 PM</li>
              </ul>
            </div>
          </aside>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-card rounded-3xl p-7 space-y-4"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-3">🙏</div>
                <h3 className="font-display text-2xl text-vermilion">Thank you!</h3>
                <p className="text-ink/70 mt-2">Your message has been received. We'll be in touch soon.</p>
              </div>
            ) : (
              <>
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-vermilion/90 mb-1.5">Interested in</label>
                  <select name="interest" className="w-full rounded-xl border border-temple-gold/40 bg-cream/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vermilion/40">
                    <option>Veena — Beginner</option>
                    <option>Veena — Intermediate</option>
                    <option>Veena — Advanced</option>
                    <option>Yoga</option>
                    <option>Both Veena &amp; Yoga</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-vermilion/90 mb-1.5">Message</label>
                  <textarea name="message" rows={5} required className="w-full rounded-xl border border-temple-gold/40 bg-cream/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vermilion/40" />
                </div>
                <button type="submit" className="w-full rounded-full px-6 py-3 text-sm font-semibold text-cream shadow-md hover:-translate-y-0.5 transition" style={{ background: "linear-gradient(135deg,#9a3412,#c2410c)" }}>
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = <span className="text-ink/85 text-[15px]">{value}</span>;
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-vermilion mb-1">{label}</div>
      {href ? <a href={href} className="hover:text-vermilion transition">{inner}</a> : inner}
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-vermilion/90 mb-1.5">{label}</label>
      <input {...rest} className="w-full rounded-xl border border-temple-gold/40 bg-cream/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vermilion/40" />
    </div>
  );
}
