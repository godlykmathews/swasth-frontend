"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, KeyRound } from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider } from "@/components/afterlife-ui";
import { buttonVariants } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="paper-section relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10">
      <MemorialNav />
      <CloudField />
      <div className="classical-column left-3 hidden lg:block" aria-hidden="true" />
      <div className="classical-column right-3 hidden lg:block" aria-hidden="true" />

      <section className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="ledger-page p-6 text-center md:p-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-base text-rosewood">AFTERLIFE AI</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-5xl leading-[1.05] text-ink md:text-7xl">
            Legacy Setup And Family Activation
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-umber">
            A private record for estate instructions, account closure notices, insurance guidance,
            and family messages. No previews, no public memorial, no promotional dashboard.
          </p>
          <OrnamentalDivider className="mx-auto my-10 max-w-3xl" />
          <div className="grid gap-5 md:grid-cols-2">
            <a href="/setup" className="feature-folio p-6 text-left no-underline">
              <BookOpen className="text-gilt" size={30} strokeWidth={1.45} />
              <h2 className="mt-5 text-3xl leading-tight text-ink">Create Legacy Record</h2>
              <p className="mt-4 text-lg leading-7 text-umber">
                Add the person, executor contact, accounts, insurance, and final message.
              </p>
            </a>
            <a href="/executor" className="feature-folio p-6 text-left no-underline">
              <KeyRound className="text-gilt" size={30} strokeWidth={1.45} />
              <h2 className="mt-5 text-3xl leading-tight text-ink">Enter Family Code</h2>
              <p className="mt-4 text-lg leading-7 text-umber">
                Confirm death, mark the record as deceased, and generate service notifications.
              </p>
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <a href="/setup" className={buttonVariants({ size: "lg" })}>
              Start Setup
              <ArrowRight size={20} strokeWidth={1.7} />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
