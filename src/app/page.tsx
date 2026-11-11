import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { BetaSignup } from "@/components/sections/BetaSignup";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Trust />
        <BetaSignup />
      </main>
      <Footer />
    </>
  );
}
