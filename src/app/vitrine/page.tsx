import { PreambleGate } from "@/components/vitrine/PreambleGate";
import { SmoothScroll } from "@/components/vitrine/SmoothScroll";
import { Hero } from "@/components/vitrine/Hero";
import { Constat } from "@/components/vitrine/Constat";
import { Bascule } from "@/components/vitrine/Bascule";
import { Solution } from "@/components/vitrine/Solution";
import { Souverainete } from "@/components/vitrine/Souverainete";
import { Preuves } from "@/components/vitrine/Preuves";
import { CtaFinal } from "@/components/vitrine/CtaFinal";
import { Footer } from "@/components/vitrine/Footer";

export default function VitrinePage() {
  return (
    <>
      <SmoothScroll />
      <PreambleGate />
      <main>
        <Hero />
        <Constat />
        <Bascule />
        <Solution />
        <Souverainete />
        <Preuves />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
