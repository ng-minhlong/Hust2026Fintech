import { Github, Linkedin, Mail, Sparkles } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold">FlowFi</span>
          <span className="ml-3 text-xs text-muted-foreground">© 2026 FlowFi · All rights reserved</span>
        </div>

        <div className="flex items-center gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-label={l.label}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <l.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
