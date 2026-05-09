"use client"
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChatMockup } from "./ChatMockup";

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
      {/* Background grid + glows */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[760px] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      <Particles />

      {/* Floating background widgets */}
      <BackgroundWidgets />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              AI Financial Copilot · v1.0 Preview
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-gradient"
            >
              Banking, Payments & Finance —{" "}
              <span className="text-accent-gradient">Through Natural Language</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              HustFina is an AI Financial Copilot that helps users send money, manage budgets,
              optimize cross-border payments, and make smarter financial decisions — through
              conversation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                onClick={() => toast.success("AI optimized transfer route", { description: "Stablecoin route saves 4.2% in fees." })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_-6px_var(--glow)] gap-2"
              >
                Try Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-white/5 hover:bg-white/10 hover:text-foreground gap-2"
              >
                <Code2 className="h-4 w-4" /> View Architecture
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex items-center gap-6 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                SOC2-grade infra
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                40+ currencies
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sub-second routing
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 7) * 0.6;
        const size = (i % 3) + 1;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60 animate-pulse-glow"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 8px var(--glow)",
            }}
          />
        );
      })}
    </div>
  );
}

function BackgroundWidgets() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden xl:flex absolute left-6 top-[55%] glass rounded-xl p-3 w-44 animate-float"
      >
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-9 w-9 rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">FX Save</div>
            <div className="text-sm font-semibold">+4.2%</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden xl:flex absolute left-10 bottom-12 glass rounded-xl p-3 w-48 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-9 w-9 rounded-lg bg-accent/10 text-accent">
            <Wallet className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Wallet</div>
            <div className="text-sm font-semibold">$12,480.21</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden xl:flex absolute right-2 bottom-24 glass rounded-xl p-3 w-44 animate-float"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-9 w-9 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Insights</div>
            <div className="text-sm font-semibold">12 new</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
