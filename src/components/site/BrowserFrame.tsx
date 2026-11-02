import { cn } from "@/lib/utils";

export function BrowserFrame({
  src,
  alt,
  url = "brandhub.app",
  className,
  dark = false,
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border shadow-frame",
        dark ? "border-ink-border bg-ink" : "border-border bg-card",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark ? "border-ink-border" : "border-border bg-muted/60",
        )}
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div
          className={cn(
            "mx-auto min-w-0 truncate rounded-full px-4 py-0.5 text-[11px]",
            dark ? "bg-ink-border text-ink-muted" : "bg-background text-muted-foreground",
          )}
        >
          {url}
        </div>
        <div className="w-10 shrink-0" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}
