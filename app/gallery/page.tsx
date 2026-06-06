"use client";

import { useState } from "react";
import {
  CloudField,
  MemorialNav,
  OrnamentalDivider,
  PageIntro,
  PageShell,
  Polaroid,
  PrimaryButton,
  SecondaryButton,
  memoryPhotos
} from "@/components/afterlife-ui";
import { motion } from "framer-motion";
import { Camera, Heart, PenLine } from "lucide-react";

export default function GalleryPage() {
  const [selected, setSelected] = useState(0);
  const active = memoryPhotos[selected];

  return (
    <PageShell className="gallery-section">
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Memory Gallery"
        title="A Wall Of Gentle Days"
        copy="Family memories displayed as hanging photographs, soft captions, and small handwritten notes preserved as part of the legacy."
      />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="photo-wall relative min-h-[1020px] overflow-hidden border border-gilt/35 bg-[#f4e4c6] p-5 shadow-folio md:min-h-[760px] md:p-10">
          <div className="album-spread absolute inset-x-6 bottom-6 top-6 opacity-20 md:inset-10" aria-hidden="true" />
          <div className="string-line top-[15%]" aria-hidden="true" />
          <div className="string-line top-[55%]" aria-hidden="true" />

          <div className="relative grid gap-8 md:grid-cols-3">
            {memoryPhotos.slice(0, 3).map((photo, index) => (
              <button
                key={photo.caption}
                type="button"
                onClick={() => setSelected(index)}
                className="text-left outline-offset-4 focus:outline focus:outline-2 focus:outline-gilt"
              >
                <Polaroid {...photo} index={index} />
              </button>
            ))}
          </div>
          <div className="relative mt-10 grid gap-8 md:ml-[14%] md:grid-cols-2">
            {memoryPhotos.slice(3).map((photo, index) => (
              <button
                key={photo.caption}
                type="button"
                onClick={() => setSelected(index + 3)}
                className="text-left outline-offset-4 focus:outline focus:outline-2 focus:outline-gilt"
              >
                <Polaroid {...photo} index={index + 3} />
              </button>
            ))}
          </div>
        </div>

        <motion.aside
          key={active.caption}
          className="ledger-page sticky top-28 h-fit p-6"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-base text-rosewood">Selected Memory</p>
            <Camera className="text-gilt" size={28} strokeWidth={1.35} />
          </div>
          <h2 className="mt-4 text-4xl leading-tight text-ink">{active.caption}</h2>
          <OrnamentalDivider />
          <p className="text-lg leading-8 text-umber">{active.note}</p>
          <div className="mt-8 grid gap-4">
            <div className="keepsake-row">
              <Heart size={18} strokeWidth={1.7} />
              <span>Saved for the family memorial wall</span>
            </div>
            <div className="keepsake-row">
              <PenLine size={18} strokeWidth={1.7} />
              <span>Caption written in the family voice</span>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <PrimaryButton href="/vault">File In Legacy Vault</PrimaryButton>
            <SecondaryButton href="/afterlife" back>
              Return To Journey
            </SecondaryButton>
          </div>
        </motion.aside>
      </section>
    </PageShell>
  );
}
