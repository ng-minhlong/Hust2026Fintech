import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureBar } from "@/components/landing/FeatureBar";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PaymentDemo } from "@/components/landing/PaymentDemo";
import { TechStack } from "@/components/landing/TechStack";
import { Security } from "@/components/landing/Security";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "HustFina — AI Financial Copilot for Banking & Cross-Border Payments",
  description:
    "HustFina is an AI Financial Copilot that helps you send money, manage budgets, and optimize cross-border payments through natural language.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Toaster />

      <Navbar />

      <main>
        <Hero />
        <FeatureBar />
        <Problem />
        <Solution />
        <HowItWorks />
        <PaymentDemo />
        <TechStack />
        <Security />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}