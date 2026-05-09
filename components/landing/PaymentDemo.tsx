"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Coins, Globe2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type Route = {
  id: string;
  name: string;
  icon: typeof Building2;
  fee: string;
  feeRaw: number;
  eta: string;
  fx: string;
  best?: boolean;
};

const routes: Route[] = [
  { id: "bank", name: "Bank Transfer", icon: Building2, fee: "$42.10", feeRaw: 42.1, eta: "2–3 days", fx: "+3.1% margin" },
  { id: "swift", name: "SWIFT", icon: Globe2, fee: "$58.00", feeRaw: 58, eta: "1–2 days", fx: "+2.7% margin" },
  { id: "stable", name: "Stablecoin (USDC)", icon: Coins, fee: "$3.20", feeRaw: 3.2, eta: "3 min", fx: "Mid-market", best: true },
];

export function PaymentDemo() {
  const [selected, setSelected] = useState("stable");

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-20 h-72 bg-primary/[0.05] blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Cross-Border Demo"
          title="Watch HustFina Pick The Optimal Route"
          subtitle="One message in. Multiple rails compared. Best path executed."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 grid lg:grid-cols-[1fr_1.4fr] gap-6">
            {/* Prompt panel */}
            <div className="glass-strong rounded-2xl p-5">
              <div className="text-xs text-muted-foreground">User message</div>
              <div className="mt-3 rounded-xl bg-black/30 border border-white/5 p-4">
                <p className="font-display text-lg leading-snug">
                  "Transfer <span className="text-primary">20M VND</span> to Singapore"
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <Detail label="From" value="Hanoi, VN" />
                <Detail label="To" value="Singapore, SG" />
                <Detail label="Amount" value="20,000,000 VND" />
                <Detail label="≈ USD" value="$786.40" />
              </div>

              <Button
                onClick={() =>
                  toast.success("Payment simulation completed", {
                    description: "USDC route selected · arrives in 3 minutes",
                  })
                }
                className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-4px_var(--glow)]"
              >
                <Sparkles className="h-4 w-4 mr-2" /> Simulate transfer
              </Button>
            </div>

            {/* Routes panel */}
            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">AI route comparison</div>
                <div className="text-[10px] text-primary inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Updated 2s ago
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {routes.map((r) => {
                  const isSelected = selected === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r.id)}
                      className={`relative w-full text-left rounded-xl border p-4 transition-all ${
                        isSelected
                          ? "border-primary/40 bg-primary/[0.06] shadow-[0_0_30px_-12px_var(--glow)]"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`grid h-10 w-10 place-items-center rounded-lg ${
                            isSelected
                              ? "bg-primary/15 text-primary border border-primary/30"
                              : "bg-white/5 text-muted-foreground border border-white/5"
                          }`}
                        >
                          <r.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 grid grid-cols-3 gap-3">
                          <div>
                            <div className="text-sm font-medium">{r.name}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{r.fx}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Fee</div>
                            <div className={`text-sm font-semibold ${r.best ? "text-primary" : ""}`}>
                              {r.fee}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ETA</div>
                            <div className="text-sm font-semibold">{r.eta}</div>
                          </div>
                        </div>
                        {r.best && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 text-[10px] font-medium">
                            <CheckCircle2 className="h-3 w-3" /> Best
                          </span>
                        )}
                      </div>

                      {/* Cost bar */}
                      <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${100 - (r.feeRaw / 60) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${
                            r.best
                              ? "bg-gradient-to-r from-primary to-accent"
                              : "bg-white/20"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl bg-black/30 border border-white/5 p-3 text-xs text-muted-foreground">
                HustFina recommends <span className="text-primary font-medium">USDC route</span> —
                saves <span className="text-foreground font-medium">$54.80</span> vs SWIFT, with
                <span className="text-foreground font-medium"> mid-market FX</span> and 3-minute
                settlement.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}
