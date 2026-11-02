import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Fyll i ditt namn").max(100),
  company: z.string().trim().min(1, "Fyll i företag").max(150),
  email: z.string().trim().email("Ange en giltig e-postadress").max(255),
  message: z.string().trim().max(2000).optional(),
});

const field =
  "w-full rounded-[10px] border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-foreground";

export function DemoDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Kontrollera fälten");
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("demo_requests").insert({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      message: parsed.data.message || null,
    });
    setBusy(false);
    if (error) setError("Något gick fel. Försök igen.");
    else setDone(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(() => setDone(false), 200);
      }}
    >
      <DialogContent className="rounded-[14px] sm:max-w-md">
        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-5 w-5" />
            </div>
            <DialogTitle className="mt-5 text-xl font-medium">Tack!</DialogTitle>
            <DialogDescription className="mt-2">
              Vi har tagit emot din förfrågan och hör av oss snart.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-medium">Boka en demo</DialogTitle>
              <DialogDescription>Se hur ert varumärke skulle se ut i BrandHub.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="mt-2 space-y-3">
              <label className="block text-sm">
                Namn
                <input name="name" required maxLength={100} className={`${field} mt-1.5`} />
              </label>
              <label className="block text-sm">
                Företag
                <input name="company" required maxLength={150} className={`${field} mt-1.5`} />
              </label>
              <label className="block text-sm">
                E-postadress
                <input name="email" type="email" required maxLength={255} className={`${field} mt-1.5`} />
              </label>
              <label className="block text-sm">
                Meddelande
                <textarea name="message" rows={3} maxLength={2000} className={`${field} mt-1.5 resize-none`} />
              </label>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {busy ? "Skickar…" : "Skicka förfrågan"}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
