"use client";

import { useCallback, useState } from "react";
import { Preamble } from "./Preamble";
import { Nav } from "./Nav";

/** Événement émis quand le préambule rend la main (le Hero s'en sert pour
 *  chorégraphier son entrée dans la continuité de l'ouverture). */
export const PREAMBLE_DONE_EVENT = "nap:preamble:done";

/** Orchestre le préambule et la révélation de la navigation. */
export function PreambleGate() {
  const [done, setDone] = useState(false);

  const onDone = useCallback(() => {
    setDone(true);
    // Drapeau pour les composants montés après coup (ou avant l'événement).
    document.documentElement.dataset.napPreambleDone = "1";
    window.dispatchEvent(new Event(PREAMBLE_DONE_EVENT));
  }, []);

  return (
    <>
      <Preamble onDone={onDone} />
      <Nav show={done} />
    </>
  );
}
