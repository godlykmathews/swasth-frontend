"use client";

import {
  CloudField,
  MemorialNav,
  OrnamentalDivider,
  PortraitPlaque,
  PrimaryButton,
  SecondaryButton
} from "@/components/afterlife-ui";
import { motion } from "framer-motion";
import { BookOpen, MailCheck, ShieldCheck } from "lucide-react";

const planChoices = [
  {
    title: "Personal Legacy",
    icon: BookOpen,
    copy: "Begin with memories, letters, family contacts, and final wishes."
  },
  {
    title: "Family Preparedness",
    icon: ShieldCheck,
    copy: "Add documents, insurance records, executor guidance, and account notes."
  },
  {
    title: "Memorial Delivery",
    icon: MailCheck,
    copy: "Prepare the messages and memories that should reach loved ones later."
  }
];

export default function CreatePage() {
  return (
    <main className="final-hero relative min-h-screen overflow-hidden px-5 pb-20 pt-28 text-center md:px-10">
      <MemorialNav />
      <CloudField variant="sky" />
      <div className="sun-rays" aria-hidden="true" />

      <section className="relative z-10 mx-auto max-w-5xl">
        <PortraitPlaque caption="A life remembered, carefully held" compact />
        <motion.h1
          className="mx-auto mt-8 max-w-4xl text-5xl leading-[1.05] text-ink md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          A Life Remembered. A Legacy Protected.
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-umber md:text-2xl md:leading-9"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
        >
          Choose the first page of the plan. Each path opens into the same quiet garden of remembrance and practical care.
        </motion.p>
      </section>

      <section className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
        {planChoices.map((choice, index) => {
          const Icon = choice.icon;
          return (
            <motion.article
              key={choice.title}
              className="create-choice relative p-6 text-left"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
                <Icon size={24} strokeWidth={1.45} />
              </div>
              <h2 className="text-3xl leading-tight text-ink">{choice.title}</h2>
              <p className="mt-4 text-lg leading-7 text-umber">{choice.copy}</p>
              <OrnamentalDivider className="my-6" />
              <a href="/setup" className="font-script text-xl text-rosewood underline decoration-gilt/45 underline-offset-4">
                Open this folio
              </a>
            </motion.article>
          );
        })}
      </section>

      <div className="relative z-10 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <PrimaryButton href="/setup">Create Legacy Plan</PrimaryButton>
        <SecondaryButton href="/">Return To Garden</SecondaryButton>
      </div>
    </main>
  );
}
