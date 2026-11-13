import { BrowserFrame } from "@/components/site/BrowserFrame";
import { Reveal } from "@/components/site/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import studioMain from "@/assets/brandhub-studio-main.png";
import studioTemplates from "@/assets/mallar.png";
import studioText from "@/assets/text.png";
import studioPhotos from "@/assets/foton.png";

const studioTabs = [
  {
    value: "mallar",
    label: "Mallar",
    title: "Från idé till färdigt inlägg",
    description:
      "Skriv vad inlägget handlar om, så tar Studio fram flera layouter med varumärkets typsnitt, färger och logotyp.",
    details: ["Format för sociala medier: 4:5, 1:1 och 9:16", "Skapa karuseller med flera ytor"],
    image: studioTemplates,
    alt: "BrandHub Studio: formulär för inläggsidé med föreslagna layouter för varumärket.",
  },
  {
    value: "text",
    label: "Text",
    title: "Inbyggd hjälp på traven",
    description:
      "Studio hjälper teamet att hålla sig till varumärkets visuella riktlinjer, från färger och logotyper till text och layouter.",
    details: [
      "Bara godkända färgkombinationer visas för text och bakgrund",
      "Rätt logotyp väljs automatiskt efter bakgrund",
      "Endast textstilar från varumärkets typskala",
      "Former, grafiska element och ikoner från guiden, med stödlinjer som fäster mot kanter och mitt",
      "Admins kan spara egna layouter som mallar för hela teamet",
    ],
    image: studioText,
    alt: "BrandHub Studio: textredigering med varumärkets typskala och knappen Skriv om i vår ton.",
  },
  {
    value: "foton",
    label: "Foton",
    title: "Bilder och text på plats",
    description:
      "Samla godkända bilder i BrandHub och gör dem enkla att använda direkt när teamet skapar nytt material.",
    details: [
      "Bildbank med mappar",
      "Bilder kan användas som bakgrund eller placeras fritt",
      "Godkända bilder hålls uppdaterade på ett och samma ställe",
    ],
    image: studioPhotos,
    alt: "BrandHub Studio: bildbank med mappar och godkända bilder att använda i inlägg.",
  },
];

export function BrandHubStudioSection() {
  return (
    <section id="studio" className="scroll-mt-20">
      <div className="relative isolate overflow-hidden pb-12 pt-24 sm:pb-20 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-1/3 -z-10 h-2/3 rounded-full bg-gradient-to-r from-glow-1/35 via-glow-3/35 to-glow-2/35 blur-3xl sm:inset-x-24"
        />
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal variant="up">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              BrandHub Studio
            </p>
            <h2 className="text-4xl leading-[1.05] sm:text-6xl">Alltid innehåll som är on-brand</h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Gör din brandguide till ett designverktyg. Ditt team skriver och skapar – BrandHub
              Studio tar hand om färger, logotyper, typsnitt, bilder och layouter så att allt alltid
              håller sig inom varumärket.
            </p>
          </Reveal>
          <Reveal variant="zoom" delay={150} className="relative mx-auto mt-12 max-w-6xl">
            <BrowserFrame
              src={studioMain}
              url="brandhub.app/studio"
              alt="BrandHub Studio, ett verktyg där teamet skapar innehåll med varumärkets egna riktlinjer."
            />
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
        <Reveal variant="up">
          <h2 className="mx-auto max-w-4xl text-center text-3xl sm:text-5xl">
            Äntligen full kontroll för dig som äger varumärket
          </h2>
        </Reveal>
        <Tabs defaultValue="mallar" className="mt-10">
          <TabsList
            aria-label="Delar av BrandHub Studio"
            className="mx-auto flex h-auto w-fit max-w-full flex-wrap gap-1 rounded-full border border-border bg-background p-1"
          >
            {studioTabs.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {studioTabs.map((item) => (
            <TabsContent key={item.value} value={item.value} className="mt-8">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
                <div>
                  <h3 className="text-2xl font-medium sm:text-3xl">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
                  <ul className="mt-6 space-y-3">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glow-1"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Reveal key={item.value} variant="zoom">
                  <BrowserFrame
                    src={item.image}
                    url="brandhub.app/studio"
                    alt={item.alt}
                    className="animate-in fade-in zoom-in-95 duration-500"
                  />
                </Reveal>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
