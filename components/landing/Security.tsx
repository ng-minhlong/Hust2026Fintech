import { Lock, ShieldAlert, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const items = [
  { icon: Lock, title: "Encrypted infrastructure", desc: "AES-256 at rest, TLS 1.3 in transit, isolated tenant boundaries." },
  { icon: ShieldAlert, title: "Fraud-aware recommendations", desc: "Anomaly detection on intent, amount, and counterparty patterns." },
  { icon: ShieldCheck, title: "Secure orchestration", desc: "Every transaction passes signed policy checks before execution." },
];

export function Security() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Security" title="Trust Built Into Every Layer" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="rounded-2xl glass p-6 h-full">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <it.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-5 font-medium">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
