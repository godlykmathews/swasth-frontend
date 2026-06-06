"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  FileArchive,
  FileCheck,
  Home,
  Landmark,
  ShieldCheck,
  Upload
} from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageIntro, PageShell } from "@/components/afterlife-ui";
import { insurancePolicies, propertyRecords, uploadPreviews } from "@/components/prototype-data";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InsurancePropertyPage() {
  return (
    <PageShell className="paper-section">
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Insurance & Property"
        title="The Practical Records, Made Gentle"
        copy="Policies, property records, and ownership certificates are held in an antique archive so families can act with confidence."
      />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-8">
          <motion.section
            className="ledger-page relative overflow-hidden p-6 md:p-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-base text-rosewood">Insurance Policies</p>
                <h2 className="mt-3 text-4xl leading-tight text-ink">Claim Guidance Folio</h2>
              </div>
              <ShieldCheck className="text-gilt" size={34} strokeWidth={1.45} />
            </div>
            <OrnamentalDivider />
            <div className="space-y-4">
              {insurancePolicies.map((policy) => (
                <article key={policy.title} className="feature-folio p-5">
                  <div className="relative z-10">
                    <Badge>Policy Number: {policy.policy}</Badge>
                    <h3 className="mt-5 text-3xl leading-tight text-ink">{policy.title}</h3>
                    <p className="mt-3 text-lg leading-7 text-umber">{policy.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="ledger-page relative overflow-hidden p-6 md:p-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-base text-rosewood">Property Records</p>
                <h2 className="mt-3 text-4xl leading-tight text-ink">Homes And Land</h2>
              </div>
              <Landmark className="text-gilt" size={34} strokeWidth={1.45} />
            </div>
            <OrnamentalDivider />
            <div className="grid gap-4">
              {propertyRecords.map((property) => (
                <article key={property.title} className="keepsake-row min-h-24 p-4">
                  <Home className="shrink-0 text-gilt" size={24} strokeWidth={1.45} />
                  <div>
                    <h3 className="text-2xl leading-tight text-ink">{property.title}</h3>
                    <p className="mt-2 text-base leading-6 text-umber">{property.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section
          className="vault-section relative overflow-hidden rounded-[8px] p-6 md:p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-base text-[#d3b06f]">Upload Areas</p>
                <h2 className="mt-3 text-4xl leading-tight text-[#fff4d9] md:text-5xl">
                  Antique Document Archive
                </h2>
              </div>
              <FileArchive className="text-[#d3b06f]" size={36} strokeWidth={1.35} />
            </div>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f8e4bd]">
              In the real product these upload areas would hold scanned records. Here, every file is
              mocked for the front-end demo.
            </p>
            <div className="mt-8 grid gap-5">
              {uploadPreviews.map((upload, index) => (
                <motion.article
                  key={upload}
                  className="border border-[#d2aa60]/45 bg-[#fff0c6]/10 p-5 text-[#fff4d9]"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center border border-[#d2aa60]/45 bg-[#3b2922] text-[#d3b06f]">
                        <Upload size={22} strokeWidth={1.5} />
                      </span>
                      <div>
                        <h3 className="text-2xl leading-tight">{upload}</h3>
                        <p className="mt-1 text-base text-[#f8e4bd]">Mock preview attached</p>
                      </div>
                    </div>
                    <FileCheck className="text-[#d3b06f]" size={25} strokeWidth={1.5} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="/will-final-wishes" className={buttonVariants({ size: "lg" })}>
              Continue To Will & Final Wishes
              <ChevronRight size={20} strokeWidth={1.7} />
            </a>
            <a href="/digital-assets" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Return To Digital Assets
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
