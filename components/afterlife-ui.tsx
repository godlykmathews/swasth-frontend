"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Archive,
  BellRing,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  HeartHandshake,
  LockKeyhole,
  Mail,
  PenLine,
  ScrollText,
  ShieldCheck,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";

export type IconCard = {
  title: string;
  icon: LucideIcon;
  copy?: string;
};

export const navLinks = [
  { href: "/setup", label: "Setup" },
  { href: "/activation-code", label: "Code" },
  { href: "/executor", label: "Activate" }
];

export const setupCards: IconCard[] = [
  {
    title: "Family Contacts",
    icon: UsersRound,
    copy: "Name the people who should be lovingly informed first."
  },
  {
    title: "Digital Accounts",
    icon: LockKeyhole,
    copy: "Collect account notes, wishes, and access instructions."
  },
  {
    title: "Final Messages",
    icon: Mail,
    copy: "Write letters that arrive with ceremony and care."
  },
  {
    title: "Insurance Information",
    icon: ShieldCheck,
    copy: "Place policy guidance beside the people who will need it."
  },
  {
    title: "Personal Memories",
    icon: HeartHandshake,
    copy: "Preserve photographs, stories, voice notes, and small rituals."
  },
  {
    title: "Important Documents",
    icon: FileText,
    copy: "Gather the records that help loved ones move with clarity."
  }
];

export const journeyCards: IconCard[] = [
  { title: "Family Notified", icon: BellRing },
  { title: "Memories Delivered", icon: HeartHandshake },
  { title: "Accounts Managed", icon: LockKeyhole },
  { title: "Insurance Guidance Prepared", icon: ShieldCheck },
  { title: "Legacy Report Created", icon: ScrollText },
  { title: "Final Wishes Shared", icon: PenLine }
];

export const vaultSections = [
  {
    title: "Final Letters",
    count: "12 sealed notes",
    detail: "Private words arranged by recipient and delivery moment."
  },
  {
    title: "Important Documents",
    count: "18 records",
    detail: "Certificates, IDs, property notes, and signed directions."
  },
  {
    title: "Insurance Records",
    count: "4 policies",
    detail: "Policy numbers, contacts, and first steps for claims."
  },
  {
    title: "Family Instructions",
    count: "9 requests",
    detail: "Household rituals, service wishes, and care preferences."
  },
  {
    title: "Digital Accounts",
    count: "23 entries",
    detail: "Accounts, memorialization wishes, and executor notes."
  }
];

export const chapters = [
  {
    roman: "I",
    title: "Verification",
    copy: "A careful confirmation begins the story with dignity and restraint."
  },
  {
    roman: "II",
    title: "Family Contact",
    copy: "Loved ones receive the right words, at the right time, with tenderness."
  },
  {
    roman: "III",
    title: "Legacy Preservation",
    copy: "Letters, photographs, wishes, and memories are gathered into a lasting record."
  },
  {
    roman: "IV",
    title: "Digital Estate Management",
    copy: "Accounts and instructions are handled through a calm, guided procession."
  },
  {
    roman: "V",
    title: "Completion",
    copy: "The final folio closes with clarity, gratitude, and protection."
  }
];

export const memoryPhotos = [
  {
    caption: "Summer table, 1978",
    position: "18% 25%",
    angle: -3,
    note: "The family picnic that became a yearly ritual."
  },
  {
    caption: "The wedding roses",
    position: "50% 24%",
    angle: 2,
    note: "A small bouquet pressed between two pages."
  },
  {
    caption: "Candles and laughter",
    position: "82% 24%",
    angle: -1,
    note: "Birthdays always ended with one extra candle."
  },
  {
    caption: "A quiet shore",
    position: "34% 72%",
    angle: 3,
    note: "The walk she asked everyone to remember."
  },
  {
    caption: "Letter after tea",
    position: "75% 72%",
    angle: -2,
    note: "Advice saved in her familiar hand."
  }
];

export function CloudField({ variant = "cream" }: { variant?: "cream" | "sky" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`cloud cloud-lg ${variant === "sky" ? "cloud-white" : "cloud-warm"} left-[4%] top-[13%]`}
        animate={{ x: [0, 36, 0], y: [0, -8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`cloud cloud-sm ${variant === "sky" ? "cloud-white" : "cloud-warm"} right-[10%] top-[25%]`}
        animate={{ x: [0, -28, 0], y: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`cloud cloud-md ${variant === "sky" ? "cloud-white" : "cloud-warm"} bottom-[16%] left-[24%]`}
        animate={{ x: [0, 44, 0], y: [0, 6, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function MemorialNav() {
  const pathname = usePathname();

  return (
    <nav className="page-nav">
      <Link href="/" className="page-nav-brand">
        AFTERLIFE AI
      </Link>
      <div className="page-nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link href="/setup" className="page-nav-action">
        Setup
      </Link>
    </nav>
  );
}

export function PageShell({
  children,
  className = "paper-section"
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={`${className} relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10`}>
      {children}
    </main>
  );
}

export function PageIntro({
  kicker,
  title,
  copy,
  align = "left"
}: {
  kicker: string;
  title: string;
  copy: string;
  align?: "left" | "center";
}) {
  return (
    <motion.header
      className={`relative z-10 mx-auto mb-12 max-w-5xl ${align === "center" ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="mb-4 text-base text-rosewood">{kicker}</p>
      <h1 className="text-5xl leading-[1.05] text-ink md:text-7xl">{title}</h1>
      <p className={`mt-6 text-xl leading-8 text-umber md:text-2xl md:leading-9 ${align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
        {copy}
      </p>
    </motion.header>
  );
}

export function OrnamentalDivider({ className = "my-8" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span />
    </div>
  );
}

export function PrimaryButton({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      className="inline-flex min-h-12 items-center gap-3 rounded-[4px] border border-[#8f6427] bg-[#9f7330] px-6 py-3 text-base text-[#fff8e8] shadow-folio outline-offset-4 transition hover:bg-[#865b21] focus:outline focus:outline-2 focus:outline-gilt"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <BookOpen size={18} strokeWidth={1.7} />
      <span>{children}</span>
      <ChevronRight size={18} strokeWidth={1.7} />
    </motion.a>
  );
}

export function SecondaryButton({
  href,
  children,
  back = false
}: {
  href: string;
  children: ReactNode;
  back?: boolean;
}) {
  return (
    <motion.a
      href={href}
      className="inline-flex min-h-12 items-center gap-3 rounded-[4px] border border-gilt/55 bg-[#fff8e8] px-6 py-3 text-base text-umber shadow-etching outline-offset-4 transition hover:bg-white focus:outline focus:outline-2 focus:outline-gilt"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {back ? <ChevronLeft size={18} strokeWidth={1.7} /> : <Archive size={18} strokeWidth={1.7} />}
      <span>{children}</span>
    </motion.a>
  );
}

export function PortraitPlaque({
  caption = "Elena's living archive",
  compact = false
}: {
  caption?: string;
  compact?: boolean;
}) {
  return (
    <motion.figure
      className={`portrait-frame mx-auto w-full ${compact ? "max-w-[280px]" : "max-w-[430px]"}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-gilt/55 bg-parchment p-3 shadow-folio">
        <Image
          src="/images/legacy-portrait.png"
          alt="A warm archival portrait representing a preserved family legacy"
          fill
          priority={!compact}
          className="object-cover p-3"
          sizes={compact ? "280px" : "(max-width: 1024px) 86vw, 430px"}
        />
      </div>
      <figcaption className="mt-4 text-center font-script text-lg text-umber">{caption}</figcaption>
    </motion.figure>
  );
}

export function VintageCard({
  title,
  icon: Icon,
  copy,
  children
}: IconCard & { children?: ReactNode }) {
  return (
    <motion.article
      className="vintage-card relative min-h-36 p-5"
      whileHover={{ y: -6, rotate: -0.4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <h3 className="text-xl leading-tight text-ink">{title}</h3>
      {copy ? <p className="mt-3 text-base leading-6 text-umber">{copy}</p> : null}
      {children}
      <div className="absolute bottom-4 right-4 h-7 w-7 border-b border-r border-gilt/35" />
    </motion.article>
  );
}

export function JourneyCard({ title, icon: Icon, index }: IconCard & { index: number }) {
  return (
    <motion.article
      className="floating-card relative min-h-44 border border-white/70 bg-[#fffaf0]/90 p-6 shadow-folio"
      initial={{ opacity: 0, y: 36, rotate: index % 2 === 0 ? -1 : 1 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
      transition={{ duration: 0.75, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center border border-gilt/45 bg-[#fff3ce] text-gilt">
          <Icon size={22} strokeWidth={1.55} />
        </div>
        <span className="flex h-8 w-8 items-center justify-center border border-cypress/30 bg-[#edf4e9] text-cypress">
          <Check size={18} strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="text-2xl leading-tight text-ink">{title}</h3>
    </motion.article>
  );
}

export function Polaroid({
  caption,
  position,
  angle,
  note,
  index = 0
}: {
  caption: string;
  position: string;
  angle: number;
  note?: string;
  index?: number;
}) {
  return (
    <motion.figure
      className="polaroid relative mx-auto w-full max-w-[320px]"
      initial={{ opacity: 0, y: 34, rotate: angle }}
      animate={{ opacity: 1, y: 0, rotate: angle }}
      transition={{ duration: 0.72, delay: index * 0.08 }}
      whileHover={{ y: -8, rotate: 0 }}
    >
      <span className="clip" aria-hidden="true" />
      <div
        className="h-64 border border-[#d9c69b] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/memory-album.png')",
          backgroundPosition: position
        }}
      />
      <figcaption className="px-3 pb-4 pt-5 text-center font-script text-lg text-umber">
        {caption}
      </figcaption>
      {note ? <p className="px-3 pb-5 text-center text-base leading-6 text-umber/85">{note}</p> : null}
    </motion.figure>
  );
}

export function ArchiveDrawer({
  title,
  count,
  detail,
  index
}: {
  title: string;
  count: string;
  detail: string;
  index: number;
}) {
  return (
    <motion.article
      className="archive-drawer min-h-64 p-5"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, delay: index * 0.08 }}
    >
      <div className="mb-9 flex items-center justify-between">
        <span className="drawer-pull" aria-hidden="true" />
        <Archive size={21} strokeWidth={1.45} />
      </div>
      <p className="text-base text-[#d3b06f]">{count}</p>
      <h3 className="mt-3 text-2xl leading-tight">{title}</h3>
      <div className="my-6 h-px w-full bg-[#d2aa60]/50" />
      <p className="text-base leading-6 text-[#f8e4bd]">{detail}</p>
    </motion.article>
  );
}

export function ChapterPage({
  roman,
  title,
  copy,
  index
}: {
  roman: string;
  title: string;
  copy: string;
  index: number;
}) {
  return (
    <motion.article
      className="chapter-page relative min-h-80 p-6"
      initial={{ opacity: 0, y: 34, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
    >
      <p className="text-base text-gilt">Chapter {roman}</p>
      <h3 className="mt-5 text-3xl leading-tight text-ink">{title}</h3>
      <OrnamentalDivider />
      <p className="text-lg leading-7 text-umber">{copy}</p>
    </motion.article>
  );
}
