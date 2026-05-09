"use client"
import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Play,
  Search,
  FileText,
  Edit3,
  Clock,
  Wand2,
  BookOpen,
  RefreshCw,
  Image as ImageIcon,
  Download,
  LayoutTemplate,
  GraduationCap,
  Rocket,
  MessageSquare,
  ArrowRight,
  Brain,
  Layers,
  Type as TypeIcon,
  Check,
} from "lucide-react";

/* ---------- Motion helpers ---------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const year = new Date().getFullYear();
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:py-32 md:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight">SlideMind</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#templates" className="transition-colors hover:text-foreground">Templates</a>
          <a href="#preview" className="transition-colors hover:text-foreground">Preview</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </a>
          <a
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Try it free
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Mock slide editor preview ---------- */
function MockEditor({ compact = false }: { compact?: boolean }) {
  const slides = [
    { t: "Title slide", active: true },
    { t: "The problem" },
    { t: "Our solution" },
    { t: "How it works" },
    { t: "Traction" },
    { t: "Team" },
  ];
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-card-soft backdrop-blur ${
        compact ? "" : "shadow-glow"
      }`}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <div className="rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
          slidemind.app / deck / pitch-q4
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
            Edit
          </button>
          <button className="rounded-md bg-gradient-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* sidebar */}
        <aside className="col-span-4 border-r border-border/60 bg-background/30 p-3 sm:col-span-3">
          <div className="mb-3 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Slides
          </div>
          <ul className="space-y-1.5">
            {slides.map((s, i) => (
              <li
                key={s.t}
                className={`group flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors ${
                  s.active
                    ? "bg-primary/15 text-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-5 w-7 items-center justify-center rounded text-[9px] ${
                    s.active
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate">{s.t}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* main slide */}
        <div className="col-span-8 p-4 sm:col-span-9 sm:p-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/60 bg-background/60">
            <div className="absolute inset-0 bg-hero-glow opacity-70" />
            <div className="relative flex h-full flex-col justify-between p-5 sm:p-8">
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-accent">
                <Sparkles className="h-3 w-3" />
                Pitch deck · Q4
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl">
                  Reimagining how teams build{" "}
                  <span className="text-gradient">presentations</span>
                </h3>
                <p className="mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
                  AI-powered research, structured outlines, and slide formats that
                  actually look designed.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Slide 1 of 12
                </div>
                <div className="flex gap-1">
                  <span className="h-1 w-6 rounded-full bg-gradient-primary" />
                  <span className="h-1 w-3 rounded-full bg-muted" />
                  <span className="h-1 w-3 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>

          {!compact && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {["Regenerate", "Add image", "Change layout", "Speaker notes"].map((b) => (
                <button
                  key={b}
                  className="rounded-md border border-border/60 bg-card/60 px-2.5 py-1.5 text-[11px] text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <Section className="pt-40">
      {/* glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-hero-glow" />
      <div
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[420px] w-[920px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <Eyebrow>
            <Sparkles className="h-3 w-3 text-accent" />
            Now with smart slide formats
          </Eyebrow>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Turn ideas into <span className="text-gradient">beautiful slides</span> in seconds
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Search, summarize, and generate fully editable presentations with AI —
          built for founders, researchers, and teams who care about how they show up.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Try it free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#preview"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
          >
            <Play className="h-4 w-4" />
            See demo
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-accent" /> No credit card
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-accent" /> Export to PowerPoint
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-16 max-w-5xl"
      >
        <MockEditor />
      </motion.div>
    </Section>
  );
}

/* ---------- Problem → Solution ---------- */
function ProblemSolution() {
  const items = [
    {
      icon: Clock,
      problem: "Research takes too long",
      solution: "AI gathers and summarizes sources in seconds — not hours.",
    },
    {
      icon: LayoutTemplate,
      problem: "Slides are boring",
      solution: "Smart formats produce designed layouts, not template clones.",
    },
    {
      icon: Edit3,
      problem: "Editing is painful",
      solution: "Regenerate any slide, tweak the outline, export everywhere.",
    },
  ];
  return (
    <Section>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>The problem</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          Slides shouldn't be the hardest part of sharing your idea.
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {items.map(({ icon: Icon, problem, solution }) => (
          <motion.div
            key={problem}
            variants={fadeUp}
            className="group rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-border hover:bg-card"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary/20 ring-1 ring-inset ring-primary/30">
              <Icon className="h-5 w-5 text-primary-glow" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{problem}</h3>
            <div className="mt-3 h-px w-10 bg-gradient-primary opacity-60" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{solution}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Enter a prompt",
      desc: "Describe your topic, audience, and goal — one sentence is enough.",
    },
    {
      icon: Search,
      title: "Get structured content",
      desc: "SlideMind researches, cites sources, and proposes a clean outline.",
    },
    {
      icon: LayoutTemplate,
      title: "Choose a slide format",
      desc: "Pitch, academic, tutorial — pick the shape that fits the story.",
    },
    {
      icon: Download,
      title: "Edit & export",
      desc: "Refine slides inline. Export to PowerPoint or PDF when you're ready.",
    },
  ];
  return (
    <Section id="how">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>How it works</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            From a single prompt to a polished deck.
          </motion.h2>
        </motion.div>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-sm text-sm text-muted-foreground"
        >
          A focused workflow built around the four moments that actually matter when you make slides.
        </motion.p>
      </div>

      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.li
            key={title}
            variants={fadeUp}
            className="relative rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:bg-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/60 ring-1 ring-inset ring-border">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-6 text-base font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const items = [
    {
      icon: Brain,
      title: "AI-powered research",
      desc: "Up-to-date sources synthesized into clear, citable points.",
    },
    {
      icon: Layers,
      title: "Smart slide formats",
      desc: "Pitch, academic, tutorial, internal — each with its own logic.",
    },
    {
      icon: TypeIcon,
      title: "Editable outline",
      desc: "Restructure your story before a single slide is rendered.",
    },
    {
      icon: RefreshCw,
      title: "Slide-level regeneration",
      desc: "Don't like a slide? Regenerate just that one — keep the rest.",
    },
    {
      icon: ImageIcon,
      title: "Auto image suggestions",
      desc: "Relevant visuals proposed for every slide, ready to swap.",
    },
    {
      icon: Download,
      title: "Export to PowerPoint / PDF",
      desc: "Ship to .pptx or .pdf with layouts and assets fully preserved.",
    },
  ];
  return (
    <Section id="features">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Features</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          Everything you need to go from idea to deck.
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary/20 ring-1 ring-inset ring-primary/30">
              <Icon className="h-5 w-5 text-primary-glow" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------- Interactive Preview ---------- */
function Preview() {
  return (
    <Section id="preview">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Live preview</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          A focused editor designed to stay out of your way.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-relaxed text-muted-foreground"
        >
          Browse your slides on the left, refine the active one on the right, and let AI handle the heavy lifting.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        <MockEditor />
      </motion.div>
    </Section>
  );
}

/* ---------- Templates ---------- */
function Templates() {
  const items = [
    {
      icon: Rocket,
      title: "Pitch Deck",
      desc: "Investor-ready story arc with traction, market, and ask.",
    },
    {
      icon: GraduationCap,
      title: "Academic",
      desc: "Structured for hypotheses, methodology, and findings.",
    },
    {
      icon: BookOpen,
      title: "Tutorial",
      desc: "Step-by-step lessons with examples and recap slides.",
    },
    {
      icon: Wand2,
      title: "Social Content",
      desc: "Carousel-style slides tuned for LinkedIn and Instagram.",
    },
  ];
  return (
    <Section id="templates">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Templates</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          Formats for every kind of story.
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="group cursor-pointer rounded-2xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Use template <ArrowRight className="h-3 w-3" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <Section id="cta">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 px-6 py-20 text-center sm:px-10 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[680px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="relative">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Stop wasting time on <span className="text-gradient">slides</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Spin up your first deck in under a minute. Free while in beta.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Start creating
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#preview"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              <Play className="h-4 w-4" />
              Watch demo
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:px-10">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight">SlideMind</span>
        </a>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">Product</a>
          <a href="#cta" className="transition-colors hover:text-foreground">Pricing</a>
          <a href="mailto:hello@slidemind.app" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {year} SlideMind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <Preview />
      <Templates />
      <CTA />
      <Footer />
    </main>
  );
}

export default Landing;