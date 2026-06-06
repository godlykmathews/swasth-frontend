"use client";

import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Check,
  ChevronRight,
  CirclePlus,
  Crown,
  LockKeyhole,
  Share2,
  Tv
} from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageIntro, PageShell } from "@/components/afterlife-ui";
import { financialAccounts, mockUser, socialAccounts, subscriptions } from "@/components/prototype-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const groups = [
  {
    title: "Subscriptions",
    copy: "Recurring services prepared for cancellation, transfer, or memorial instructions.",
    icon: Tv,
    entries: subscriptions
  },
  {
    title: "Social Accounts",
    copy: "Public profiles, memorialization choices, and final account wishes.",
    icon: Share2,
    entries: socialAccounts
  },
  {
    title: "Financial Accounts",
    copy: "Payment services and business tools catalogued for the executor.",
    icon: BadgeDollarSign,
    entries: financialAccounts
  }
];

export default function DigitalAssetsPage() {
  return (
    <PageShell>
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Digital Legacy Setup"
        title="Preserve The Digital Estate"
        copy="Subscriptions, social profiles, and financial platforms become elegant ledger cards rather than a cold spreadsheet."
      />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="ledger-panel mb-8 grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-base text-rosewood">Mock User</p>
            <h2 className="mt-2 text-4xl leading-tight text-ink">{mockUser.name}</h2>
            <p className="mt-3 text-lg text-umber">{mockUser.location}</p>
          </div>
          <Button variant="outline">
            <CirclePlus size={19} strokeWidth={1.7} />
            Add Digital Asset
          </Button>
        </div>

        <div className="grid gap-7">
          {groups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <motion.section
                key={group.title}
                className="ledger-page relative overflow-hidden p-6 md:p-8"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: groupIndex * 0.08 }}
              >
                <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
                      <Icon size={24} strokeWidth={1.45} />
                    </div>
                    <h2 className="text-4xl leading-tight text-ink">{group.title}</h2>
                    <p className="mt-3 max-w-3xl text-lg leading-7 text-umber">{group.copy}</p>
                  </div>
                  <Badge>
                    <Crown size={16} strokeWidth={1.6} />
                    Executor ready
                  </Badge>
                </div>
                <OrnamentalDivider className="my-7" />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.entries.map((entry, index) => (
                    <motion.article
                      key={entry}
                      className="asset-card"
                      initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.04 }}
                      whileHover={{ y: -6 }}
                    >
                      <div className="relative z-10 flex h-full flex-col justify-between gap-7">
                        <div className="flex items-start justify-between gap-4">
                          <span className="asset-monogram text-xl">{entry.charAt(0)}</span>
                          <span className="flex h-8 w-8 items-center justify-center border border-cypress/30 bg-[#edf4e9] text-cypress">
                            <Check size={17} strokeWidth={1.7} />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-3xl leading-tight text-ink">{entry}</h3>
                          <p className="mt-2 text-base text-umber">
                            Stored with access notes and final handling preference.
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="/insurance-property" className={buttonVariants({ size: "lg" })}>
            Continue To Insurance & Property
            <ChevronRight size={20} strokeWidth={1.7} />
          </a>
          <a href="/profile" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Return To Profile
          </a>
        </div>
      </section>
    </PageShell>
  );
}
