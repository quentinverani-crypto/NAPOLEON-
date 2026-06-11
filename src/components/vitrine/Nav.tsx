"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#constat", label: "Le constat" },
  { href: "#solution", label: "La solution" },
  { href: "#souverainete", label: "Souveraineté" },
  { href: "#preuves", label: "Preuves" },
];

export function Nav({ show }: { show: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed inset-x-0 top-0 z-[100] transition-colors duration-300",
            scrolled
              ? "bg-nap-canvas/80 backdrop-blur-md border-b border-nap-border/70"
              : "bg-nap-canvas/0 border-b border-transparent",
          )}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
            {/* Marque */}
            <a
              href="#accueil"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-deep rounded-md"
              aria-label="NAPOLEON Médical — accueil"
            >
              <Image
                src="/vitrine/embleme-encre.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                priority
              />
              <span className="font-news text-nap-ink text-lg leading-none">
                NAPOLEON Médical
              </span>
            </a>

            {/* Liens d'ancres — desktop */}
            <ul className="hidden items-center gap-7 md:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative pb-1 text-sm text-nap-inksoft transition-colors hover:text-nap-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-deep"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-nap-gold transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#demo"
                className="nap-btn nap-sweep hidden bg-nap-deep px-5 py-2.5 text-white transition-colors hover:bg-nap-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-deep focus-visible:ring-offset-2 sm:inline-flex"
              >
                Demander une démo
              </a>

              {/* Bouton menu — mobile */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-full text-nap-ink md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-deep"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300",
                      open && "translate-y-[5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-300",
                      open && "-translate-y-[5px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>

          {/* Menu mobile */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-nap-border/70 bg-nap-canvas/95 backdrop-blur-md md:hidden"
              >
                <ul className="flex flex-col gap-1 px-5 py-4">
                  {LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2.5 text-sm text-nap-inksoft hover:bg-nap-ivory hover:text-nap-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li className="pt-2">
                    <a
                      href="#demo"
                      onClick={() => setOpen(false)}
                      className="nap-btn block bg-nap-deep px-5 py-3 text-center text-white"
                    >
                      Demander une démo
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
