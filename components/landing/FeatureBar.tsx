import { Brain, Globe2, LineChart, RefreshCw, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: Brain, label: "AI-powered" },
  { icon: Globe2, label: "Cross-border payments" },
  { icon: LineChart, label: "Smart credit insights" },
  { icon: RefreshCw, label: "Real-time FX optimization" },
  { icon: ShieldCheck, label: "Secure infrastructure" },
];

export function FeatureBar() {
  return (
    <section className="relative py-10 border-y border-border/60 bg-black/20">
      <Reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {items.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
