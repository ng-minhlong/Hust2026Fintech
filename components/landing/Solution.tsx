import { Brain, Languages, Lightbulb, PiggyBank, MessageSquare, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const features = [
  { icon: MessageSquare, title: "Conversational AI", desc: "Manage everything by chatting — no forms, no menus." },
  { icon: Languages, title: "Multilingual support", desc: "Speaks 30+ languages natively, including code-switching." },
  { icon: Lightbulb, title: "Intelligent recommendations", desc: "Suggests the optimal financial action in real time." },
  { icon: PiggyBank, title: "Budgeting assistance", desc: "Tracks spend patterns and nudges you toward your goals." },
  { icon: Brain, title: "Financial memory", desc: "Remembers context across sessions, accounts, and currencies." },
];

export function Solution() {
  return (
    <section id="solution" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[420px] bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Solution"
          title="One AI Copilot For Your Financial Life"
          subtitle="From sending money abroad to optimizing budgets — FlowFi unifies every financial decision behind a single conversational interface."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="group flex gap-4 rounded-xl p-4 hover:bg-white/[0.03] transition-colors">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <DashboardPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-3xl bg-accent/10 blur-3xl pointer-events-none" />
      <div className="relative glass-strong glow-border rounded-2xl p-5 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Total balance</div>
            <div className="font-display text-2xl font-semibold mt-0.5">$48,213.40</div>
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" /> +2.4%
          </div>
        </div>

        {/* Mock chart */}
        <div className="mt-5 h-32 relative overflow-hidden rounded-xl bg-black/30 border border-white/5 p-3">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.18 162)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.82 0.18 162)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,70 C30,60 50,80 80,55 C110,30 140,65 170,40 C200,15 230,45 260,25 C280,12 290,18 300,10 L300,100 L0,100 Z"
              fill="url(#g)"
            />
            <path
              d="M0,70 C30,60 50,80 80,55 C110,30 140,65 170,40 C200,15 230,45 260,25 C280,12 290,18 300,10"
              stroke="oklch(0.86 0.18 162)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Income", value: "$12.4k", up: true },
            { label: "Spend", value: "$3.8k", up: false },
            { label: "Saved", value: "$8.6k", up: true },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/[0.02] border border-white/5 p-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-0.5 flex items-center justify-between">
                <span className="text-sm font-semibold">{s.value}</span>
                {s.up ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-primary/[0.06] border border-primary/15 p-3 flex items-start gap-3">
          <div className="grid place-items-center h-7 w-7 shrink-0 rounded-lg bg-primary/15 text-primary">
            <Brain className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-foreground">
              You'll save <span className="text-primary font-medium">$240/mo</span> by switching
              recurring USD→EUR transfers to a stablecoin route.
            </p>
            <button className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:underline">
              Apply suggestion <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
