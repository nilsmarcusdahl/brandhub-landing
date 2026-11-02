import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import {
  Search,
  Save,
  ListChecks,
  History,
  Download,
  Code2,
  Languages,
  Mail,
  Check,
  X,
  Menu,
  CalendarDays,
  PlayCircle,
  ArrowRight,
  Globe,
  Sparkles,
  MessageSquareQuote,
  SpellCheck,
  ThumbsUp,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

import logo from "@/assets/brandhub-logo.svg";
import video from "@/assets/brandhub-explainer.mp4";
import shotIntro from "@/assets/intro.png";
import shotTon from "@/assets/tonalitet.png";
import shotFarg from "@/assets/farg.png";
import shotTypo from "@/assets/typografi.png";
import shotIkon from "@/assets/ikoner.png";
import shotSign from "@/assets/signatur.png";
import shotUsers from "@/assets/users.png";
import shotEditor from "@/assets/editor.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrandHub – Ditt varumärke, samlat på en plats" },
      {
        name: "description",
        content:
          "BrandHub gör riktlinjerna till en webbsida med logotyper, färger, typsnitt och tonalitet som du uppdaterar själv.",
      },
      { property: "og:title", content: "BrandHub – Ditt varumärke, samlat på en plats" },
      {
        property: "og:description",
        content: "Levande varumärkesriktlinjer som alla hittar, och som dina AI-verktyg följer.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://brandhub.nmdinnovation.se/brandhub-social.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://brandhub.nmdinnovation.se/brandhub-social.png" },
    ],
  }),
  component: Index,
});

const btnPrimary =
  "btn-lift group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90";
const btnGhost =
  "btn-lift group inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-accent";
const bookingUrl =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eOkcG8zWK4vsYzrKIRTMskm33ga8yB4YmfAuT8YZmSQ9o_b4YwP2GDh1SQTe3SaiMpkz58wYy";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Section({
  id,
  children,
  className,
  glow = ["bg-ambient-1", "bg-ambient-2"],
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  glow?: [string, string] | null;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} id={id} className={cn("relative scroll-mt-20", className)}>
      {glow && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className={cn("ambient -left-32 top-10 h-96 w-96", glow[0])}
            style={{ opacity: inView ? 0.85 : 0, transform: inView ? "translateY(0)" : "translateY(80px)" }}
          />
          <div
            className={cn("ambient -right-32 bottom-0 h-[32rem] w-[32rem]", glow[1])}
            style={{ opacity: inView ? 0.7 : 0, transform: inView ? "translateY(0)" : "translateY(-80px)" }}
          />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{children}</p>;
}

const nav = [
  { label: "Funktioner", href: "#funktioner" },
  { label: "AI", href: "#ai" },
  { label: "För byråer", href: "#byraer" },
  { label: "Frågor", href: "#fragor" },
];

const tabs = [
  { label: "Färgpalett", src: shotFarg },
  { label: "Typografi", src: shotTypo },
  { label: "Ikoner", src: shotIkon },
  { label: "E-postsignatur", src: shotSign },
  { label: "Utkast & Admin", src: shotEditor },
];

const steps = [
  {
    t: "Sätt upp varumärket",
    d: "En guidad start tar dig igenom namn, färger, typsnitt och tonalitet.",
    src: shotIntro,
  },
  {
    t: "Fyll i och förhandsvisa",
    d: "Skriv in riktlinjerna och se sidan uppdateras medan du skriver.",
    src: shotEditor,
  },
  {
    t: "Publicera och dela",
    d: "Alla får samma version via en länk, och du ser exakt vad som har ändrats.",
    src: shotTon,
  },
];

const features = [
  { i: Search, t: "Sök och hitta", d: "Alla hittar rätt regel på några sekunder." },
  { i: Save, t: "Utkast och autospar", d: "Du uppdaterar själv, och inget halvfärdigt syns för besökarna." },
  { i: ListChecks, t: "Checklista", d: "Se direkt vad som saknas innan du publicerar." },
  { i: History, t: "Historik", d: "Varje ändring spåras och kan återställas." },
  { i: Download, t: "Export", d: "Logotyper, färgkarta, typsnitt och länkar i en ZIP-fil." },
  { i: Code2, t: "Designtokens", d: "Utvecklare använder exakt samma färger och typsnitt." },
  { i: Languages, t: "Svenska och engelska", d: "En guide för hela organisationen." },
  { i: Mail, t: "E-postsignatur", d: "Alla får samma signatur på en minut." },
];

const featureColors = [
  { text: "text-glow-1", border: "hover:!border-glow-1" },
  { text: "text-glow-2", border: "hover:!border-glow-2" },
  { text: "text-glow-3", border: "hover:!border-glow-3" },
  { text: "text-glow-4", border: "hover:!border-glow-4" },
  { text: "text-glow-5", border: "hover:!border-glow-5" },
];

const faqs: [string, string][] = [
  [
    "Kan vi använda våra egna typsnitt?",
    "Ja. Ladda upp filerna, så visas de på sidan. Du bestämmer om besökare får ladda ner dem.",
  ],
  ["Kan riktlinjerna vara på både svenska och engelska?", "Ja, eller på bara ett av språken."],
  [
    "Vem kan ändra i guiden?",
    "Du bjuder in administratörer per varumärke. Ändringar sparas som utkast tills någon publicerar.",
  ],
  ["Kan vi skydda guiden?", "Ja, med ett lösenord per varumärke."],
  [
    "Hur fungerar AI-kopplingen?",
    "Du laddar ner en skill till Claude, eller kopplar in BrandHubs MCP-server så att Claude läser riktlinjerna direkt.",
  ],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 text-foreground backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
          <a href="#" className="flex min-w-0 items-center" aria-label="BrandHub">
            <img src={logo} alt="BrandHub" className="h-5 w-auto" />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-2">
            <a href={bookingUrl} target="_blank" rel="noreferrer" className={cn(btnPrimary, "px-5 py-2")}>
              <CalendarDays className="h-4 w-4" />
              Boka en demo
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Meny"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="flex flex-col border-t border-border px-5 py-3 md:hidden">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2.5 text-sm">
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative pb-16 pt-20 sm:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="ambient -left-40 -top-20 h-[34rem] w-[34rem] bg-ambient-1 opacity-60" />
          <div className="ambient -right-40 top-20 h-[30rem] w-[30rem] bg-ambient-2 opacity-45" />
          <div className="ambient left-1/3 bottom-[-12rem] h-[28rem] w-[28rem] bg-ambient-3 opacity-45" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal variant="blur">
            <h1 className="mx-auto max-w-4xl text-5xl leading-[1.04] sm:text-7xl">
              Ditt varumärke, samlat på en plats som alla hittar
            </h1>
          </Reveal>
          <Reveal variant="up" delay={150}>
            <p className="mx-auto mt-7 max-w-[54rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              BrandHub gör riktlinjerna till en{" "}
              <span className="whitespace-nowrap text-foreground">
                <Globe className="mr-1 inline h-5 w-5 -translate-y-0.5 text-glow-3" />
                webbsida
              </span>{" "}
              med logotyper, färger, typsnitt och tonalitet. Du uppdaterar den själv, och dina{" "}
              <span className="whitespace-nowrap text-foreground">
                <Sparkles className="mr-1 inline h-5 w-5 -translate-y-0.5 text-glow-2" />
                AI-verktyg
              </span>{" "}
              följer den.
            </p>
          </Reveal>
          <Reveal variant="up" delay={300}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={bookingUrl} target="_blank" rel="noreferrer" className={btnPrimary}>
                <CalendarDays className="h-4 w-4" />
                Boka en demo
              </a>
              <a href="#video" className={btnGhost}>
                <PlayCircle className="h-4 w-4" />
                Så funkar det
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video */}
      <div id="video" className="relative scroll-mt-24">
        <Reveal variant="zoom" className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <VideoPlayer src={video} />
        </Reveal>
      </div>

      {/* How it works */}
      <Section id="sa-fungerar-det" className="py-24" glow={["bg-ambient-1", "bg-ambient-3"]}>
        <h2 className="text-3xl sm:text-5xl">Så fungerar det</h2>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <ol className="space-y-3">
            {steps.map((s, idx) => (
              <li key={s.t}>
                <Reveal variant="left" delay={idx * 120}>
                  <button
                    onClick={() => setStep(idx)}
                    className={cn(
                      "card-hover w-full rounded-[14px] border p-6 text-left",
                      step === idx ? "border-foreground bg-card" : "border-border bg-card/50 hover:bg-card",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-full border text-sm",
                        step === idx ? "border-primary bg-primary text-primary-foreground" : "border-border",
                      )}
                    >
                      {idx + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-medium">{s.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{s.d}</p>
                  </button>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal variant="right" delay={200}>
            <BrowserFrame key={step} src={steps[step]!.src} alt={steps[step]!.t} className="animate-in fade-in slide-in-from-right-4 duration-500" />
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section id="funktioner" className="py-24">
        <h2 className="max-w-2xl text-3xl sm:text-5xl">Allt varumärket behöver, på en sida</h2>
        <div className="-mx-2 mt-8 flex gap-2 overflow-x-auto px-2 pb-4 pt-3" role="tablist">
          {tabs.map((t, idx) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={tab === idx}
              onClick={() => setTab(idx)}
              className={cn(
                "btn-lift shrink-0 rounded-full border px-4 py-2 text-sm",
                tab === idx
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Reveal variant="zoom" className="mt-6">
          <BrowserFrame key={tab} src={tabs[tab]!.src} alt={tabs[tab]!.label} className="animate-in fade-in zoom-in-95 duration-500" />
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <Reveal key={f.t} variant={idx % 2 ? "blur" : "up"} delay={(idx % 4) * 90}>
              <div
                className={cn(
                  "card-hover h-full rounded-[14px] border border-border bg-card/80 p-6 backdrop-blur-sm",
                  featureColors[idx % featureColors.length]!.border,
                )}
              >
                <f.i className={cn("h-5 w-5", featureColors[idx % featureColors.length]!.text)} strokeWidth={1.75} />
                <h3 className="mt-5 font-medium">{f.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* AI */}
      <section id="ai" className="relative scroll-mt-16 overflow-hidden bg-ink py-32 text-ink-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="ambient -left-40 top-1/4 h-[32rem] w-[32rem] bg-glow-1 opacity-40" />
          <div className="ambient -right-40 bottom-1/4 h-[32rem] w-[32rem] bg-glow-3 opacity-35" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal variant="blur">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">AI</p>
            <h2 className="text-3xl sm:text-5xl">Låt AI-verktygen följa varumärket</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              BrandHub skapar en färdig skill för Claude med er tonalitet, era färger och era regler. Via MCP läser
              Claude alltid den senaste versionen och kontrollerar texter mot ord ni aldrig använder.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { l: "Tonalitet", i: MessageSquareQuote, c: "text-glow-1" },
                { l: "Textkontroll", i: SpellCheck, c: "text-glow-3" },
                { l: "Do's and don'ts", i: ThumbsUp, c: "text-glow-2" },
              ].map((x) => (
                <div
                  key={x.l}
                  className="card-hover flex flex-col items-center justify-center gap-2 rounded-[14px] border border-ink-border px-4 py-4 text-center text-sm"
                >
                  <x.i className={cn("h-5 w-5", x.c)} />
                  {x.l}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" delay={150}>
            <BrowserFrame dark src={shotTon} alt="Tonalitet i riktlinjerna" className="card-hover" />
          </Reveal>
        </div>
      </section>

      {/* Agencies */}
      <Section id="byraer" className="py-24" glow={["bg-ambient-3", "bg-ambient-2"]}>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal variant="left">
            <Eyebrow>För byråer</Eyebrow>
            <h2 className="text-3xl sm:text-5xl">För byråer som bygger varumärken</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Sätt upp en guide per kund, bjud in kundens administratör och lämna över en levande guide i stället för
              en PDF.
            </p>
            <WaitlistCard />
          </Reveal>
          <Reveal variant="right" delay={150}>
            <BrowserFrame src={shotUsers} alt="Användarhantering i BrandHub" className="card-hover" />
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="fragor" className="py-24" glow={null}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-5xl">Vanliga frågor</h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden pb-40 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="ambient -left-32 top-1/3 h-[32rem] w-[32rem] bg-ambient-1 opacity-55" />
          <div className="ambient -right-32 bottom-0 h-[30rem] w-[30rem] bg-ambient-2 opacity-45" />
          <div className="ambient left-1/3 top-1/2 h-[22rem] w-[22rem] bg-ambient-3 opacity-40" />
        </div>
        <Reveal variant="zoom" className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="text-4xl leading-[1.05] sm:text-7xl">Se hur ert varumärke skulle se ut i BrandHub</h2>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(btnPrimary, "mt-12 px-9 py-4 text-base")}
          >
            <CalendarDays className="h-5 w-5" />
            Boka en demo
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <img src={logo} alt="BrandHub" className="h-5 w-auto invert" />
            <p className="mt-3 text-sm text-ink-muted">Levande varumärkesriktlinjer</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-ink-foreground">
                {n.label}
              </a>
            ))}
            <a href="mailto:hej@brandhub.se" className="hover:text-ink-foreground">
              hej@brandhub.se
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-8 text-xs text-ink-muted sm:px-8">
          © {new Date().getFullYear()} BrandHub
        </div>
      </footer>

    </div>
  );
}

function WaitlistCard() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      setState("error");
      setMsg("Ange en giltig e-postadress");
      return;
    }
    setState("busy");
    const { error } = await supabase.from("waitlist_signups").insert({ email: parsed.data });
    if (error) {
      setState("error");
      setMsg("Något gick fel. Försök igen.");
    } else setState("done");
  }

  return (
    <div className="mt-10 rounded-[14px] border border-border bg-card p-6">
      <p className="leading-relaxed">Färger, typsnitt, tonalitet och regler hamnar på rätt plats på några minuter.</p>
      {state === "done" ? (
        <p className="mt-5 flex items-center gap-2 text-sm">
          <Check className="h-4 w-4" /> Tack, du står på väntelistan.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
          <input
            name="email"
            type="email"
            required
            maxLength={255}
            placeholder="namn@foretag.se"
            aria-label="E-postadress"
            className="w-full rounded-full border border-input bg-background px-5 py-4 text-base outline-none transition focus:border-foreground focus:shadow-frame"
          />
          <button type="submit" disabled={state === "busy"} className={cn(btnPrimary, "self-start")}>
            <Mail className="h-4 w-4" />
            Skriv upp dig på väntelistan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      )}
      {state === "error" && <p className="mt-2 text-sm text-destructive">{msg}</p>}
    </div>
  );
}
