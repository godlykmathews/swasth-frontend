"use client";

import { useState } from "react";
import {
  ArchiveDrawer,
  MemorialNav,
  OrnamentalDivider,
  PrimaryButton,
  SecondaryButton,
  vaultSections
} from "@/components/afterlife-ui";
import { motion } from "framer-motion";
import { Archive, KeyRound, LockKeyhole, ScrollText } from "lucide-react";

const archiveEntries = [
  "Read final letters only after the family has gathered.",
  "Insurance folder begins with the carrier and claim contact.",
  "Digital wishes distinguish memorialized, transferred, and closed accounts.",
  "Family instructions include service music, flowers, and household notes."
];

export default function VaultPage() {
  const [selected, setSelected] = useState(0);
  const active = vaultSections[selected];

  return (
    <main className="vault-section relative min-h-screen overflow-hidden px-5 pb-20 pt-28 text-[#fff5dc] md:px-10">
      <MemorialNav />
      <section className="relative z-10 mx-auto mb-12 max-w-5xl text-center">
        <motion.p
          className="mb-4 text-base text-[#d3b06f]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Legacy Vault
        </motion.p>
        <motion.h1
          className="text-5xl leading-[1.05] text-[#fff5dc] md:text-7xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          An Antique Archive Of Care
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-[#f8e4bd] md:text-2xl md:leading-9"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
        >
          Final letters, important documents, insurance records, family instructions, and digital accounts preserved like a private old-library collection.
        </motion.p>
      </section>

      <section className="archive-room relative z-10 mx-auto grid max-w-7xl gap-5 lg:grid-cols-5">
        {vaultSections.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setSelected(index)}
            className="text-left outline-offset-4 focus:outline focus:outline-2 focus:outline-[#d2aa60]"
          >
            <ArchiveDrawer {...item} index={index} />
          </button>
        ))}
      </section>

      <motion.section
        key={active.title}
        className="relative z-10 mx-auto mt-10 grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="archive-drawer min-h-80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base text-[#d3b06f]">Drawer Open</p>
              <h2 className="mt-3 text-4xl leading-tight">{active.title}</h2>
            </div>
            <LockKeyhole size={42} strokeWidth={1.25} />
          </div>
          <div className="my-8 h-px bg-[#d2aa60]/50" />
          <p className="text-lg leading-8 text-[#f8e4bd]">{active.detail}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton href="/executor">Begin Executor Story</PrimaryButton>
            <SecondaryButton href="/gallery" back>
              Return To Gallery
            </SecondaryButton>
          </div>
        </div>

        <div className="archive-drawer p-6">
          <div className="flex items-center gap-4">
            <Archive className="text-[#d3b06f]" size={30} strokeWidth={1.3} />
            <h3 className="text-3xl leading-tight">Archive Notes</h3>
          </div>
          <OrnamentalDivider />
          <div className="grid gap-4 md:grid-cols-2">
            {archiveEntries.map((entry, index) => (
              <div key={entry} className="vault-note">
                {index % 2 === 0 ? <ScrollText size={20} strokeWidth={1.45} /> : <KeyRound size={20} strokeWidth={1.45} />}
                <p>{entry}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
