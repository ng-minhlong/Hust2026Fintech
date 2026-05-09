import { motion } from "framer-motion";
import { ArrowUpRight, Bot, CheckCircle2, Sparkles, User } from "lucide-react";

export function ChatMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-3xl pointer-events-none" />
      <div className="relative glass-strong glow-border rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="ml-3 text-xs text-muted-foreground">HustFina · copilot</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Live
          </div>
        </div>

        {/* Messages */}
        <div className="py-5 space-y-4">
          <Message role="user" delay={0.4}>
            Send 300 USD to my mom in Vietnam
          </Message>

          <Message role="ai" delay={0.9}>
            <p className="leading-relaxed">
              Stablecoin route saves <span className="text-primary font-medium">4.2% fees</span>{" "}
              and arrives in <span className="text-primary font-medium">3 minutes</span>.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-3 rounded-xl bg-black/30 border border-white/5 p-3"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>USD → VND via USDC</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Best route
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Stat label="Fees" value="$1.20" accent />
                <Stat label="ETA" value="3 min" />
                <Stat label="Rate" value="25,431" />
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          </Message>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="flex items-center gap-2 text-xs text-muted-foreground pl-9"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            Ready to confirm transfer
          </motion.div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 rounded-xl bg-black/40 border border-white/5 px-3 py-2">
          <input
            disabled
            placeholder="Ask HustFina anything…"
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 outline-none"
          />
          <button className="grid place-items-center h-7 w-7 rounded-lg bg-primary text-primary-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Message({
  role,
  children,
  delay = 0,
}: {
  role: "user" | "ai";
  children: React.ReactNode;
  delay?: number;
}) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-3"
    >
      <div
        className={`grid place-items-center h-7 w-7 shrink-0 rounded-lg ${
          isUser ? "bg-white/5 text-muted-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>
      <div
        className={`text-sm leading-relaxed rounded-xl px-3.5 py-2.5 max-w-[88%] ${
          isUser
            ? "bg-white/5 border border-white/5 text-foreground"
            : "bg-primary/[0.06] border border-primary/15 text-foreground"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm font-semibold ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}
