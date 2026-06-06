"use client";

import Image from "next/image";
import {
  CloudField,
  MemorialNav,
  OrnamentalDivider,
  PageIntro,
  PageShell,
  Polaroid,
  PortraitPlaque,
  PrimaryButton,
  SecondaryButton,
  memoryPhotos
} from "@/components/afterlife-ui";
import { motion } from "framer-motion";
import { BookMarked, Flower, Mail, MapPinned, Music } from "lucide-react";

const keepsakeNotes = [
  {
    title: "Sunday Piano",
    icon: Music,
    copy: "A short recording saved for the grandchildren before every holiday."
  },
  {
    title: "Garden Map",
    icon: MapPinned,
    copy: "Handwritten notes about the roses, herbs, and the pear tree."
  },
  {
    title: "Letter Cabinet",
    icon: Mail,
    copy: "Messages arranged for birthdays, anniversaries, and quiet mornings."
  },
  {
    title: "Service Flowers",
    icon: Flower,
    copy: "White lilies, rosemary, and blue ribbon for the celebration of life."
  }
];

export default function ExamplePage() {
  return (
    <PageShell>
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Example Legacy"
        title="Elena Moreno's Living Archive"
        copy="A sample memorial story showing how an AfterLife AI legacy can hold practical guidance and intimate family memory in the same graceful place."
      />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <div className="space-y-6">
          <PortraitPlaque caption="Elena Moreno, 1941 to 2026" />
          <div className="ledger-panel p-6">
            <p className="text-base text-rosewood">Legacy Blessing</p>
            <blockquote className="mt-4 text-3xl leading-tight text-ink">
              "Let every practical task become a way to remember love."
            </blockquote>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            className="storybook-open relative overflow-hidden p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-base text-rosewood">Family Preface</p>
                <h2 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">The Story Her Family Opens First</h2>
                <OrnamentalDivider />
                <p className="text-lg leading-8 text-umber">
                  Elena's legacy begins with the names of the people she loved, the songs she chose, the papers her executor needs, and the memories she wanted framed in sunlight.
                </p>
              </div>
              <div className="relative min-h-72 overflow-hidden border border-gilt/40 bg-[#fff8e8] p-3 shadow-folio">
                <Image
                  src="/images/memory-album.png"
                  alt="Vintage album of family memories"
                  fill
                  className="object-cover p-3"
                  sizes="(max-width: 768px) 90vw, 420px"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {keepsakeNotes.map((note, index) => {
              const Icon = note.icon;
              return (
                <motion.article
                  key={note.title}
                  className="vintage-card relative min-h-44 p-5"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.07 }}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-2xl leading-tight text-ink">{note.title}</h3>
                  <p className="mt-3 text-base leading-6 text-umber">{note.copy}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-16 max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-base text-rosewood">Sample Memory Wall</p>
            <h2 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">Five Keepsakes, One Life</h2>
          </div>
          <BookMarked className="hidden text-gilt md:block" size={44} strokeWidth={1.3} />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {memoryPhotos.slice(0, 3).map((photo, index) => (
            <Polaroid key={photo.caption} {...photo} index={index} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="/setup">Create Your Folio</PrimaryButton>
          <SecondaryButton href="/gallery">Open Gallery</SecondaryButton>
        </div>
      </section>
    </PageShell>
  );
}
