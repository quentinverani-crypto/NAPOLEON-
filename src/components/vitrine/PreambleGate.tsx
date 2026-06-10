"use client";

import { useState } from "react";
import { Preamble } from "./Preamble";
import { Nav } from "./Nav";

/** Orchestre le préambule et la révélation de la navigation. */
export function PreambleGate() {
  const [done, setDone] = useState(false);
  return (
    <>
      <Preamble onDone={() => setDone(true)} />
      <Nav show={done} />
    </>
  );
}
