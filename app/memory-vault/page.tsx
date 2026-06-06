"use client";

import { motion } from "framer-motion";
import { ChevronRight, ImagePlus, Mic, Upload, Video } from "lucide-react";
import {
  CloudField,
  MemorialNav,
  OrnamentalDivider,
  PageIntro,
  PageShell,
  Polaroid,
  memoryPhotos
} from "@/components/afterlife-ui";
import { memoryTimeline } from "@/components/prototype-data";
import { buttonVariants } from "@/components/ui/button";

const uploadTypes = [
  { title: "Family Photos", icon: ImagePlus, copy: "Albums, portraits, scanned postcards, and treasured snapshots." },
  { title: "Videos", icon: Video, copy: "Ceremony clips, birthdays, travel footage, and family gatherings." },
  { title: "Voice Notes", icon: Mic, copy: "Stories, blessings, recipes, and recordings for loved ones." }
];

export default function MemoryVaultPage() {
  return (
    <PageShell className="gallery-section">
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Memory Vault"
        title="A Wall Of Photographs And Living Stories"
        copy="The memory vault holds photographs, videos, and voice notes as a peaceful family album with a gentle timeline."
        align="center"
      />

      <section className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="photo-wall relative overflow-hidden p-6 md:p-10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="string-line top-[16%]" aria-hidden="true" />
          <div className="string-line bottom-[37%]" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {memoryPhotos.map((photo, index) => (
              <Polaroid key={photo.caption} {...photo} index={index} />
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {uploadTypes.map((upload, index) => {
            const Icon = upload.icon;
            return (
              <motion.article
                key={upload.title}
                className="upload-well"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
              >
                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
                    <Icon size={24} strokeWidth={1.45} />
                  </div>
                  <h2 className="text-3xl leading-tight text-ink">{upload.title}</h2>
                  <p className="mt-4 text-lg leading-7 text-umber">{upload.copy}</p>
                  <button type="button" className="seal-button mt-6">
                    <Upload size={18} strokeWidth={1.7} />
                    Upload Keepsake
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <section className="storybook-open relative mt-10 overflow-hidden p-6 md:p-8">
          <p className="text-base text-rosewood">Memory Timeline</p>
          <h2 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">
            Milestones Preserved In Order
          </h2>
          <OrnamentalDivider />
          <div className="grid gap-5 md:grid-cols-3">
            {memoryTimeline.map((memory, index) => (
              <motion.article
                key={memory.year}
                className="timeline-note p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
              >
                <p className="text-4xl text-gilt">{memory.year}</p>
                <h3 className="mt-4 text-3xl leading-tight text-ink">{memory.title}</h3>
                <p className="mt-4 text-lg leading-7 text-umber">{memory.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="/executor" className={buttonVariants({ size: "lg" })}>
            Open Executor Experience
            <ChevronRight size={20} strokeWidth={1.7} />
          </a>
          <a href="/will-final-wishes" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Return To Final Wishes
          </a>
        </div>
      </section>
    </PageShell>
  );
}
