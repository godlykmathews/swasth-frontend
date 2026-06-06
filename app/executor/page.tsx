"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Mail, ShieldAlert } from "lucide-react";
import { MemorialNav, OrnamentalDivider } from "@/components/afterlife-ui";
import { declareDeath, getActivationCode, saveLegacySession, type NotificationRecord } from "@/lib/afterlife-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function ExecutorPage() {
  const [status, setStatus] = useState("Enter the family activation code to begin.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [legacyId, setLegacyId] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Verifying activation code and preparing notifications...");

    const form = new FormData(event.currentTarget);
    const activationCode = String(form.get("activation_code") || "");

    try {
      const result = await declareDeath({
        activation_code: activationCode,
        declarant_name: String(form.get("declarant_name") || ""),
        declarant_email: String(form.get("declarant_email") || ""),
        date_of_death: String(form.get("date_of_death") || ""),
        place_of_death: String(form.get("place_of_death") || ""),
        confirmation_note: String(form.get("confirmation_note") || "")
      });
      saveLegacySession(result.legacy_id, activationCode);
      setLegacyId(result.legacy_id);
      setNotifications(result.notifications);
      setStatus("Record marked deceased. Service notifications prepared and delivery status saved.");
    } catch {
      setStatus("Could not confirm. Check the code, FastAPI server, Supabase credentials, and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mourning-section relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10">
      <MemorialNav />
      <section className="relative z-10 mx-auto max-w-6xl">
        <motion.header
          className="mb-10 max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-base text-[#c9a66b]">Family Activation</p>
          <h1 className="mt-4 text-5xl leading-[1.05] text-[#fff4dc] md:text-7xl">
            Confirm Death And Begin Estate Notifications
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#e8d5b5]">
            This page is intentionally solemn. Confirmation should only be completed by an
            authorized family member or executor with the activation code.
          </p>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.form
            onSubmit={handleSubmit}
            className="mourning-card p-6 md:p-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-[#c9a66b]" size={30} strokeWidth={1.45} />
              <h2 className="text-4xl leading-tight text-[#fff4dc]">Death Confirmation</h2>
            </div>
            <OrnamentalDivider />
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="activation_code" className="text-[#e8d5b5]">Activation Code</Label>
                <Input
                  id="activation_code"
                  name="activation_code"
                  defaultValue={getActivationCode("")}
                  placeholder="AFTR-XXXX-XXXX"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="declarant_name" className="text-[#e8d5b5]">Declarant Name</Label>
                <Input id="declarant_name" name="declarant_name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="declarant_email" className="text-[#e8d5b5]">Declarant Email</Label>
                <Input id="declarant_email" name="declarant_email" type="email" defaultValue="work.gkm@gmail.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date_of_death" className="text-[#e8d5b5]">Date Of Death</Label>
                <Input id="date_of_death" name="date_of_death" type="date" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="place_of_death" className="text-[#e8d5b5]">Place Of Death</Label>
                <Input id="place_of_death" name="place_of_death" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmation_note" className="text-[#e8d5b5]">Confirmation Note</Label>
                <Textarea id="confirmation_note" name="confirmation_note" placeholder="Who confirmed, what document is available, or next verification step." />
              </div>
            </div>
            <p className="mt-6 text-base leading-6 text-[#c9a66b]">{status}</p>
            <Button type="submit" className="mt-6 w-full" disabled={isSubmitting} variant="seal">
              {isSubmitting ? "Preparing Notifications..." : "Mark As Deceased"}
            </Button>
          </motion.form>

          <motion.section
            className="mourning-card p-6 md:p-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base text-[#c9a66b]">Outbound Email Records</p>
                <h2 className="mt-2 text-4xl leading-tight text-[#fff4dc]">Service Notifications</h2>
              </div>
              <Mail className="text-[#c9a66b]" size={32} strokeWidth={1.45} />
            </div>
            <OrnamentalDivider />
            {legacyId ? <p className="mb-5 text-base text-[#e8d5b5]">Legacy ID: {legacyId}</p> : null}
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="border border-[#c9a66b]/35 bg-[#fff4dc]/5 p-5 text-[#e8d5b5]">
                  No notifications have been generated yet. After confirmation, the backend will
                  prepare a separate service email for each subscription, social account,
                  financial account, and insurance policy.
                </div>
              ) : (
                notifications.map((notification) => (
                  <article key={notification.id} className="border border-[#c9a66b]/35 bg-[#fff4dc]/7 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Badge className="bg-[#2f2926] text-[#e8d5b5]">{notification.service_type}</Badge>
                        <h3 className="mt-4 text-2xl leading-tight text-[#fff4dc]">{notification.service_name}</h3>
                        <p className="mt-2 text-base text-[#c9a66b]">{notification.recipient_email}</p>
                      </div>
                      <span className="flex items-center gap-2 text-[#d9c39e]">
                        <Check size={17} strokeWidth={1.7} />
                        {notification.status}
                      </span>
                    </div>
                    <div className="mt-5 border-t border-[#c9a66b]/25 pt-5">
                      <p className="text-lg text-[#fff4dc]">{notification.subject}</p>
                      <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-[#e8d5b5]">{notification.body}</p>
                      <p className="mt-4 flex items-center gap-2 text-sm text-[#c9a66b]">
                        <Clock size={15} strokeWidth={1.6} />
                        Provider: {notification.provider}
                      </p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
