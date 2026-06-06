"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, PenLine, ShieldCheck } from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageShell } from "@/components/afterlife-ui";
import { getActivationCode } from "@/lib/afterlife-api";
import { buttonVariants } from "@/components/ui/button";

export default function ActivationCodePage() {
  const [code, setCode] = useState("");
  const [source, setSource] = useState("Complete setup to generate a code.");

  useEffect(() => {
    const storedCode = getActivationCode("");
    setCode(storedCode);
    setSource(storedCode ? "Store this with important documents." : "No code found in this browser session.");
  }, []);

  return (
    <PageShell className="paper-section">
      <MemorialNav />
      <CloudField />
      <div className="classical-column left-3 hidden lg:block" aria-hidden="true" />
      <div className="classical-column right-3 hidden lg:block" aria-hidden="true" />

      <section className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="certificate-sheet px-6 py-12 text-center md:px-14 md:py-16"
          initial={{ opacity: 0, y: 30, rotate: -0.4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="activation-seal mx-auto flex h-24 w-24 items-center justify-center text-[#fff8e8]">
            <ShieldCheck size={42} strokeWidth={1.55} />
          </div>
          <p className="mt-8 text-base text-rosewood">Certificate Of Preparedness</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-5xl leading-[1.05] text-ink md:text-7xl">
            Emergency Family Activation Code
          </h1>
          <OrnamentalDivider className="mx-auto my-9 max-w-3xl" />

          <motion.div
            className="certificate-code mx-auto max-w-3xl px-5 py-7"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <p className="text-base text-umber">Family Activation Code</p>
            <p className="mt-3 break-words text-4xl leading-tight md:text-6xl">
              {code || "Not Created Yet"}
            </p>
          </motion.div>
          <p className="mt-4 text-base text-rosewood">{source}</p>

          <div className="mx-auto mt-9 max-w-3xl border border-gilt/30 bg-[#fff8e8]/70 p-5 text-left shadow-etching">
            <p className="flex items-start gap-3 text-lg leading-8 text-umber">
              <PenLine className="mt-1 shrink-0 text-gilt" size={22} strokeWidth={1.5} />
              <span>
                Write this code down and store it with your important documents. Your family will
                need this code to activate your digital executor.
              </span>
            </p>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Download size={20} strokeWidth={1.7} />
              Download Certificate
            </button>
            <a href="/executor" className={buttonVariants({ size: "lg" })}>
              Family Activation Page
            </a>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
