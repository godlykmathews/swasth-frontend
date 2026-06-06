"use client";

import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Home,
  Plus,
  UserRound,
  UsersRound
} from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageIntro, PageShell } from "@/components/afterlife-ui";
import { familyMembers, mockUser, trustedContacts } from "@/components/prototype-data";
import { getLegacyId, updateProfile } from "@/lib/afterlife-api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const steps = [
  { title: "Personal Information", icon: UserRound },
  { title: "Family Information", icon: UsersRound },
  { title: "Trusted Contacts", icon: HeartHandshake }
];

export default function ProfilePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [saveNote, setSaveNote] = useState("Profile not yet saved");
  const progress = ((activeStep + 1) / steps.length) * 100;
  const ActiveIcon = steps[activeStep].icon;

  async function saveProfile() {
    setSaveNote("Saving profile to FastAPI...");
    try {
      await updateProfile(getLegacyId(), {
        full_name: mockUser.name,
        location: mockUser.location,
        profile: {
          address: mockUser.address,
          nationality: mockUser.nationality,
          bloodGroup: mockUser.bloodGroup,
          photoUrl: "/images/legacy-portrait.png"
        },
        family_members: familyMembers,
        trusted_contacts: trustedContacts
      });
      setSaveNote("Saved to Supabase");
    } catch {
      setSaveNote("Demo mode active. Start FastAPI to persist profile changes.");
    }
  }

  async function continueToAssets(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    await saveProfile();
    window.location.href = "/digital-assets";
  }

  return (
    <PageShell>
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Profile Completion"
        title="Complete The Family Record"
        copy="The profile wizard collects the practical details an executor needs, but presents them as an old family record book."
      />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.36fr_0.64fr]">
        <aside className="ledger-panel p-5">
          <p className="text-base text-rosewood">Wizard Progress</p>
          <h2 className="mt-2 text-3xl leading-tight text-ink">{Math.round(progress)}% prepared</h2>
          <Progress value={progress} className="mt-5" />
          <p className="mt-4 text-base text-rosewood">{saveNote}</p>
          <OrnamentalDivider className="my-6" />
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              return (
                <button
                  key={step.title}
                  type="button"
                  className={`setup-tab ${isActive ? "setup-tab-active" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="flex h-9 w-9 items-center justify-center border border-gilt/35 bg-[#fff8e8] text-gilt">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span>{step.title}</span>
                  {isDone || isActive ? <Check size={18} strokeWidth={1.7} /> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <motion.div
          key={activeStep}
          className="ledger-page relative overflow-hidden p-6 md:p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-base text-rosewood">Step {activeStep + 1}</p>
              <h1 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">
                {steps[activeStep].title}
              </h1>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
              <ActiveIcon size={30} strokeWidth={1.45} />
            </div>
          </div>

          <OrnamentalDivider />

          {activeStep === 0 ? (
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="profile-photo-well min-h-[390px]">
                <div className="absolute inset-x-5 bottom-5 border border-gilt/30 bg-[#fff8e8]/86 p-4 shadow-etching">
                  <div className="flex items-center gap-3 text-umber">
                    <Camera className="text-gilt" size={22} strokeWidth={1.5} />
                    <span>Profile Photo</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="profile-name">Full Name</Label>
                  <Input id="profile-name" defaultValue={mockUser.name} />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="profile-address">Address</Label>
                  <Input id="profile-address" defaultValue={mockUser.address} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-nationality">Nationality</Label>
                  <Input id="profile-nationality" defaultValue={mockUser.nationality} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-blood">Blood Group</Label>
                  <Input id="profile-blood" defaultValue={mockUser.bloodGroup} />
                </div>
              </div>
            </div>
          ) : null}

          {activeStep === 1 ? (
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.relationship} className="feature-folio p-5">
                  <div className="grid gap-4 md:grid-cols-[0.5fr_1fr_1fr_0.8fr]">
                    <div>
                      <p className="text-sm text-gilt">Relationship</p>
                      <h3 className="mt-1 text-2xl text-ink">{member.relationship}</h3>
                    </div>
                    <div className="grid gap-2">
                      <Label>Name</Label>
                      <Input defaultValue={member.name} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input defaultValue={member.email} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Phone</Label>
                      <Input defaultValue={member.phone} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeStep === 2 ? (
            <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-lg leading-7 text-umber">
                  Add up to 5 contacts who can help verify, receive, and steward the legacy plan.
                </p>
                <Button variant="outline">
                  <Plus size={18} strokeWidth={1.7} />
                  Add Contact
                </Button>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {trustedContacts.map((contact, index) => (
                  <motion.article
                    key={contact.name}
                    className="feature-folio min-h-56 p-6"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
                      <HeartHandshake size={24} strokeWidth={1.45} />
                    </div>
                    <h3 className="text-3xl leading-tight text-ink">{contact.name}</h3>
                    <p className="mt-2 text-lg text-rosewood">{contact.role}</p>
                    <p className="mt-5 text-base leading-6 text-umber">{contact.email}</p>
                    <p className="text-base leading-6 text-umber">{contact.phone}</p>
                  </motion.article>
                ))}
                {[1, 2].map((slot) => (
                  <article key={slot} className="upload-well flex min-h-56 items-center justify-center text-center">
                    <div>
                      <Home className="mx-auto text-gilt" size={28} strokeWidth={1.45} />
                      <p className="mt-4 text-xl text-ink">Reserved Contact</p>
                      <p className="mt-2 text-base text-umber">Available trusted-contact slot</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
            <Button
              variant="outline"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
            >
              <ChevronLeft size={18} strokeWidth={1.7} />
              Previous
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button onClick={() => setActiveStep((step) => Math.min(steps.length - 1, step + 1))}>
                Next Page
                <ChevronRight size={18} strokeWidth={1.7} />
              </Button>
            ) : (
              <a href="/digital-assets" className={buttonVariants()} onClick={continueToAssets}>
                Continue To Digital Assets
                <ChevronRight size={18} strokeWidth={1.7} />
              </a>
            )}
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
