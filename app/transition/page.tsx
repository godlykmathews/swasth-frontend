"use client";

import {
  CloudField,
  MemorialNav,
  PrimaryButton,
  SecondaryButton
} from "@/components/afterlife-ui";
import { motion } from "framer-motion";

export default function TransitionPage() {
  return (
    <main className="sunset-transition relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 text-center">
      <MemorialNav />
      <CloudField variant="sky" />
      <motion.div
        aria-hidden="true"
        className="sun-disc"
        initial={{ x: "-50%", y: 80, opacity: 0.72 }}
        animate={{ x: "-50%", y: -40, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >
        <div className="mx-auto mb-8 h-px w-40 bg-gilt/60" />
        <blockquote className="text-4xl leading-tight text-ink md:text-6xl">
          "Every life leaves a story worth preserving."
        </blockquote>
        <div className="mx-auto mt-8 h-px w-40 bg-gilt/60" />
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton href="/afterlife">Enter The Bright Garden</PrimaryButton>
          <SecondaryButton href="/setup" back>
            Return To Setup
          </SecondaryButton>
        </div>
      </motion.div>
    </main>
  );
}
