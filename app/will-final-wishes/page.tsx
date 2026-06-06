"use client";

import { motion } from "framer-motion";
import { BookMarked, ChevronRight, FileText, Flower2, Heart, PenLine, Upload } from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageIntro, PageShell } from "@/components/afterlife-ui";
import { willUploads } from "@/components/prototype-data";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const wishSections = [
  {
    title: "Funeral Preferences",
    icon: Flower2,
    value: "A peaceful service with family hymns, framed photographs, and jasmine flowers."
  },
  {
    title: "Burial Instructions",
    icon: BookMarked,
    value: "Follow the family tradition in Kerala, with close relatives present before the service."
  },
  {
    title: "Special Requests",
    icon: Heart,
    value: "Serve tea after the ceremony and share the family vacation album with the grandchildren."
  }
];

export default function WillFinalWishesPage() {
  return (
    <PageShell className="storybook-section">
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Will & Final Wishes"
        title="A Journal For The Words That Matter"
        copy="Messages, preferences, and legal documents are presented as a tender keepsake rather than a form."
      />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="journal-sheet p-6 md:p-8"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-base text-rosewood">Final Message To Family</p>
              <h2 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">
                A Letter Held Until It Is Needed
              </h2>
            </div>
            <PenLine className="text-gilt" size={34} strokeWidth={1.45} />
          </div>
          <OrnamentalDivider />
          <div className="grid gap-2">
            <Label htmlFor="final-message">Final Message To Family</Label>
            <Textarea
              id="final-message"
              defaultValue="If you are reading this, know that I loved each of you deeply."
              className="min-h-64 text-xl leading-9"
            />
          </div>
        </motion.div>

        <motion.aside
          className="ledger-page relative overflow-hidden p-6 md:p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <p className="text-base text-rosewood">Legal Uploads</p>
          <h2 className="mt-3 text-4xl leading-tight text-ink">Sealed Documents</h2>
          <OrnamentalDivider />
          <div className="grid gap-4">
            {willUploads.map((upload) => (
              <article key={upload} className="upload-well min-h-32">
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
                      <FileText size={23} strokeWidth={1.45} />
                    </span>
                    <div>
                      <h3 className="text-2xl leading-tight text-ink">{upload}</h3>
                      <p className="mt-1 text-base text-umber">Mock upload preview</p>
                    </div>
                  </div>
                  <Upload className="text-gilt" size={24} strokeWidth={1.45} />
                </div>
              </article>
            ))}
          </div>
        </motion.aside>

        <div className="lg:col-span-2">
          <div className="grid gap-5 md:grid-cols-3">
            {wishSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={section.title}
                  className="feature-folio p-6"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                >
                  <div className="relative z-10">
                    <Badge>
                      <Icon size={16} strokeWidth={1.55} />
                      {section.title}
                    </Badge>
                    <p className="mt-5 text-lg leading-8 text-umber">{section.value}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="/memory-vault" className={buttonVariants({ size: "lg" })}>
              Continue To Memory Vault
              <ChevronRight size={20} strokeWidth={1.7} />
            </a>
            <a href="/insurance-property" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Return To Insurance
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
