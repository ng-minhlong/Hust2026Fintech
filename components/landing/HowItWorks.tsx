import { Brain, MessageCircle, Zap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: MessageCircle,
    title: "Understand Intent",
    desc: "HustFina parses natural language requests — 'send', 'budget', 'optimize' — into structured financial actions.",
  },
  {
    icon: Brain,
    title: "Analyze Financial Context",
    desc: "It considers your accounts, history, FX rates, fees, and goals before recommending anything.",
  },
  {
    icon: Zap,
    title: "Recommend Best Action",
    desc: "You get a clear, ranked recommendation with tradeoffs — and one tap to execute.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32 border-y border-border/60 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="How it works" title="From Intent to Action in Seconds" />

        <div className="mt-16 relative">
          {/* Animated connector line */}
          <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-px">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute inset-0 animate-shimmer" />
          </div>

          <div className="grid gap-6 md:grid-cols-3 relative">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative grid h-[88px] w-[88px] place-items-center rounded-2xl glass-strong glow-border">
                      <div className="absolute inset-0 rounded-2xl bg-primary/5" />
                      <s.icon className="relative h-7 w-7 text-primary" />
                      <div className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        {i + 1}
                      </div>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-xs">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
