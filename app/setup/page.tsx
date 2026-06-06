"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileText, ShieldCheck, UserRound } from "lucide-react";
import { CloudField, MemorialNav, OrnamentalDivider, PageIntro, PageShell } from "@/components/afterlife-ui";
import { createCompleteLegacyPlan } from "@/lib/afterlife-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function splitList(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function SetupPage() {
  const [status, setStatus] = useState("Backend connection required");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Saving legacy plan to Supabase...");

    const form = new FormData(event.currentTarget);
    try {
      await createCompleteLegacyPlan({
        full_name: String(form.get("full_name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        date_of_birth: String(form.get("date_of_birth") || ""),
        location: String(form.get("location") || ""),
        address: String(form.get("address") || ""),
        nationality: String(form.get("nationality") || ""),
        blood_group: String(form.get("blood_group") || ""),
        declarant_email: String(form.get("declarant_email") || ""),
        trusted_contacts: [
          {
            name: String(form.get("contact_name") || ""),
            role: String(form.get("contact_role") || ""),
            email: String(form.get("contact_email") || ""),
            phone: String(form.get("contact_phone") || "")
          }
        ].filter((contact) => contact.name && contact.email),
        subscriptions: splitList(form.get("subscriptions")),
        social_accounts: splitList(form.get("social_accounts")),
        financial_accounts: splitList(form.get("financial_accounts")),
        insurance_policies: [
          {
            title: String(form.get("insurance_name") || ""),
            policy: String(form.get("policy_number") || ""),
            note: String(form.get("insurance_note") || "")
          }
        ].filter((policy) => policy.title),
        final_message: String(form.get("final_message") || "")
      });
      setStatus("Saved. Opening activation code...");
      window.location.href = "/activation-code";
    } catch {
      setStatus("Could not save. Start FastAPI, set Supabase credentials, then try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell className="paper-section">
      <MemorialNav />
      <CloudField />
      <PageIntro
        kicker="Setup"
        title="Create A Legacy Record"
        copy="Enter the person, trusted contact, digital accounts, insurance details, and final message. The record is stored in Supabase and protected by a family activation code."
      />

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 mx-auto max-w-6xl ledger-page p-6 md:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <UserRound className="text-gilt" size={28} strokeWidth={1.45} />
              <h2 className="text-4xl leading-tight text-ink">Profile</h2>
            </div>
            <OrnamentalDivider />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" name="full_name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date_of_birth">Date Of Birth</Label>
                <Input id="date_of_birth" name="date_of_birth" type="date" required />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="City, country" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" name="nationality" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blood_group">Blood Group</Label>
                <Input id="blood_group" name="blood_group" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="declarant_email">Executor Email</Label>
                <Input id="declarant_email" name="declarant_email" type="email" defaultValue="work.gkm@gmail.com" />
              </div>
            </div>
          </section>

          <aside className="ledger-panel p-5">
            <ShieldCheck className="text-gilt" size={30} strokeWidth={1.45} />
            <h3 className="mt-4 text-3xl leading-tight text-ink">Activation Code</h3>
            <p className="mt-4 text-lg leading-7 text-umber">
              After setup, the backend generates a code. A family member must enter that code before death confirmation or notifications can be created.
            </p>
            <p className="mt-6 text-base text-rosewood">{status}</p>
          </aside>
        </div>

        <OrnamentalDivider />

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <FileText className="text-gilt" size={26} strokeWidth={1.45} />
              <h2 className="text-3xl leading-tight text-ink">Trusted Contact</h2>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Input name="contact_name" placeholder="Contact name" />
              <Input name="contact_role" placeholder="Relationship" />
              <Input name="contact_email" type="email" placeholder="Contact email" />
              <Input name="contact_phone" placeholder="Contact phone" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl leading-tight text-ink">Accounts And Policies</h2>
            <div className="mt-5 grid gap-5">
              <Input name="subscriptions" placeholder="Subscriptions, comma separated" />
              <Input name="social_accounts" placeholder="Social accounts, comma separated" />
              <Input name="financial_accounts" placeholder="Financial accounts, comma separated" />
              <Input name="insurance_name" placeholder="Insurance provider" />
              <Input name="policy_number" placeholder="Policy number" />
              <Input name="insurance_note" placeholder="Insurance note" />
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-2">
          <Label htmlFor="final_message">Final Message</Label>
          <Textarea id="final_message" name="final_message" placeholder="A message kept for the family." />
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save And Get Code"}
            <ChevronRight size={20} strokeWidth={1.7} />
          </Button>
        </div>
      </motion.form>
    </PageShell>
  );
}
