"use client";

import {
  CloudField,
  JourneyCard,
  MemorialNav,
  PageIntro,
  PrimaryButton,
  SecondaryButton,
  journeyCards
} from "@/components/afterlife-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sun } from "lucide-react";

export default function AfterlifePage() {
  const { scrollYProgress } = useScroll();
  const cloudY = useTransform(scrollYProgress, [0, 1], [50, -80]);

  return (
    <main className="sky-journey relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10">
      <MemorialNav />
      <motion.div style={{ y: cloudY }} className="absolute inset-0" aria-hidden="true">
        <CloudField variant="sky" />
      </motion.div>
      <div className="sun-rays" aria-hidden="true" />

      <PageIntro
        kicker="Afterlife Experience"
        title="Your Legacy Continues"
        copy="After passing, the legacy plan becomes a gentle procession of care: family notified, memories delivered, accounts guided, and final wishes shared."
        align="center"
      />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="journey-thread hidden xl:block" aria-hidden="true" />
          {journeyCards.map((item, index) => (
            <JourneyCard key={item.title} {...item} index={index} />
          ))}
        </div>

        <motion.div
          className="mx-auto mt-14 max-w-4xl border border-white/70 bg-[#fffaf0]/88 p-6 text-center shadow-folio md:p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Sun className="mx-auto mb-5 text-gilt" size={42} strokeWidth={1.3} />
          <h2 className="text-3xl leading-tight text-ink md:text-4xl">Not a report. A completed act of remembrance.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-umber">
            The family sees each step as a graceful card in the sky, with language that feels ceremonial and instructions that remain practical.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="/gallery">View Delivered Memories</PrimaryButton>
            <SecondaryButton href="/vault">Open Legacy Vault</SecondaryButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
