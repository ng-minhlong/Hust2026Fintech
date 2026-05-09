"use client"
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] rounded-full bg-primary/15 blur-[140px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[520px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <Reveal>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient">
            The Future of Banking Is{" "}
            <span className="text-accent-gradient">Conversational</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Join the early access program and experience finance without forms, menus, or friction.
          </p>
          <div className="mt-9 flex justify-center">
            <Button
              size="lg"
              onClick={() => toast.success("Demo launched", { description: "Redirecting to interactive playground…" })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-6px_var(--glow)] gap-2 h-12 px-7"
            >
              Launch Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
