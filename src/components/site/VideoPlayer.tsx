import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Maximize } from "lucide-react";

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function VideoPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <div className="group relative overflow-hidden rounded-[14px] border border-border bg-ink shadow-video">
      <video
        ref={ref}
        src={`${src}#t=0.1`}
        className="block aspect-video w-full cursor-pointer object-cover"
        preload="metadata"
        playsInline
        autoPlay
        loop
        muted={muted}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Spela upp"
          className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors hover:bg-ink/10"
        >
          <span className="grid h-20 w-20 place-items-center rounded-full bg-background text-foreground shadow-frame transition-transform group-hover:scale-105">
            <Play className="ml-1 h-7 w-7" fill="currentColor" />
          </span>
        </button>
      )}
      <div
        className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-ink-foreground transition-opacity ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <button type="button" onClick={toggle} aria-label={playing ? "Pausa" : "Spela upp"} className="shrink-0">
          {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
        </button>
        <span className="shrink-0 text-xs tabular-nums">{fmt(time)}</span>
        <input
          type="range"
          min={0}
          max={dur || 0}
          step={0.1}
          value={time}
          aria-label="Tidslinje"
          onChange={(e) => {
            if (ref.current) ref.current.currentTime = Number(e.target.value);
          }}
          className="h-1 min-w-0 flex-1 cursor-pointer accent-ink-foreground"
        />
        <span className="shrink-0 text-xs tabular-nums">{fmt(dur)}</span>
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label="Ljud" className="shrink-0">
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={() => ref.current?.requestFullscreen?.()}
          aria-label="Helskärm"
          className="shrink-0"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
