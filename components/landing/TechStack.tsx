import { Boxes, Brain, Code, Database, Layers, Link2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const stack = [
  { icon: Code, name: "Next.js", desc: "App Router · Edge runtime" },
  { icon: Brain, name: "OpenAI", desc: "GPT-4o · function calling" },
  { icon: Layers, name: "FastAPI", desc: "Python orchestration layer" },
  { icon: Database, name: "Vector DB", desc: "Pinecone · semantic memory" },
  { icon: Link2, name: "Blockchain rails", desc: "USDC · Solana · settlement" },
  { icon: Boxes, name: "RAG pipeline", desc: "Hybrid retrieval + reranking" },
];

export function TechStack() {
  return (
    <section id="tech" className="relative py-24 sm:py-32 border-y border-border/60 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Architecture"
          title="Built On Modern Infrastructure"
          subtitle="A composable stack that combines reasoning, retrieval, and real-time payment rails."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="group relative h-full rounded-2xl glass p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.04]">
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative flex items-start gap-4">
                  <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <s.icon className="h-5 w-5" />
                    <div className="absolute inset-0 rounded-xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
