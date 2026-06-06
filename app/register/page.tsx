"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, ScrollText, Sparkles } from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageIntro, PageShell } from "@/components/afterlife-ui";
import { mockUser } from "@/components/prototype-data";
import { DEMO_LEGACY_ID, registerLegacy, saveLegacySession } from "@/lib/afterlife-api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fields = [
  { label: "Full Name", name: "full_name", value: mockUser.name, type: "text" },
  { label: "Email", name: "email", value: "mathews.joseph@example.com", type: "email" },
  { label: "Phone Number", name: "phone", value: "+91 94470 42000", type: "tel" },
  { label: "Date of Birth", name: "date_of_birth", value: "1958-05-14", type: "date" }
];

export default function RegisterPage() {
  const [created, setCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activationCode, setActivationCode] = useState(mockUser.activationCode);
  const [backendNote, setBackendNote] = useState("FastAPI backend ready");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setBackendNote("Creating Supabase legacy plan...");

    const form = new FormData(event.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") || mockUser.name),
      email: String(form.get("email") || "mathews.joseph@example.com"),
      phone: String(form.get("phone") || "+91 94470 42000"),
      date_of_birth: String(form.get("date_of_birth") || "1958-05-14")
    };

    try {
      const result = await registerLegacy(payload);
      saveLegacySession(result.legacy_id, result.activation_code);
      setActivationCode(result.activation_code);
      setBackendNote("Supabase legacy plan created");
    } catch {
      saveLegacySession(DEMO_LEGACY_ID, mockUser.activationCode);
      setActivationCode(mockUser.activationCode);
      setBackendNote("Demo mode active. Start FastAPI to persist this registration.");
    } finally {
      setIsSubmitting(false);
      setCreated(true);
    }
  }

  return (
    <PageShell>
      <MemorialNav />
      <CloudField />
      <div className="classical-column left-3 hidden lg:block" aria-hidden="true" />
      <div className="classical-column right-3 hidden lg:block" aria-hidden="true" />
      <PageIntro
        kicker="Register"
        title="Create The First Page Of Your Legacy"
        copy="A quiet account opening for the person whose memories, instructions, and family protections will be preserved."
        align="center"
      />

      <section className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          className="ledger-panel p-6 md:p-8"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="flex h-16 w-16 items-center justify-center border border-gilt/45 bg-[#fff8e8] text-gilt shadow-etching">
            <ScrollText size={31} strokeWidth={1.45} />
          </div>
          <h2 className="mt-6 text-4xl leading-tight text-ink md:text-5xl">
            A premium memorial service begins with one protected identity.
          </h2>
          <p className="mt-5 text-lg leading-8 text-umber">
            The prototype uses mock data for Mathews Joseph, but the flow demonstrates how a
            family-facing legacy service could onboard someone without feeling clinical.
          </p>
          <OrnamentalDivider />
          <div className="grid gap-3 text-lg text-umber">
            <p>Location: {mockUser.location}</p>
            <p>Status: {mockUser.status}</p>
            <p>Primary vault: Family instructions, insurance, property, will, and memories.</p>
          </div>
        </motion.div>

        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <p className="text-base text-rosewood">Legacy Account</p>
            <CardTitle className="text-4xl md:text-5xl">Registration Folio</CardTitle>
          </CardHeader>
          <CardContent>
            {!created ? (
              <motion.form
                className="space-y-5"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                {fields.map((field) => (
                  <div key={field.label} className="grid gap-2">
                    <Label htmlFor={field.label}>{field.label}</Label>
                    <Input id={field.label} name={field.name} type={field.type} defaultValue={field.value} />
                  </div>
                ))}
                <p className="text-base text-rosewood">{backendNote}</p>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Legacy Account..." : "Create Legacy Account"}
                  <ChevronRight size={20} strokeWidth={1.7} />
                </Button>
              </motion.form>
            ) : (
              <motion.div
                className="py-8 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="activation-seal mx-auto flex h-24 w-24 items-center justify-center text-[#fff8e8]"
                  initial={{ rotate: -18, scale: 0.6 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 13 }}
                >
                  <Check size={42} strokeWidth={1.7} />
                </motion.div>
                <h2 className="mt-7 text-4xl leading-tight text-ink">Legacy Account Created</h2>
                <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-umber">
                  Your emergency family activation certificate is ready. Code: {activationCode}
                </p>
                <p className="mx-auto mt-3 max-w-lg text-base leading-6 text-rosewood">{backendNote}</p>
                <a
                  href="/activation-code"
                  className={buttonVariants({ size: "lg", className: "mt-8" })}
                >
                  Receive Family Activation Code
                  <Sparkles size={20} strokeWidth={1.6} />
                </a>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
