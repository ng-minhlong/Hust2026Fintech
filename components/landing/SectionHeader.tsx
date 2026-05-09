import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal>
      <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </div>
        )}
        <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}
