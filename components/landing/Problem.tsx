import { Banknote, Compass, Landmark } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const problems = [
  {
    icon: Banknote,
    title: "Expensive international transfers",
    desc: "Banks and remittance services charge 5–8% in hidden FX margins and routing fees on every cross-border payment.",
  },
  {
    icon: Landmark,
    title: "Confusing banking apps",
    desc: "Cluttered dashboards, scattered accounts, and jargon-heavy interfaces leave users guessing where their money actually goes.",
  },
  {
    icon: Compass,
    title: "No personalized guidance",
    desc: "Most apps show data, not decisions. There's no copilot that understands your goals and recommends the next best action.",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Problem"
          title="Finance Is Still Too Complicated"
          subtitle="Despite a decade of fintech innovation, most people still struggle with everyday money decisions."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
