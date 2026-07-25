"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The entry experience: a landing gate with a mouse-reactive light-orb
 * background, a photosensitivity warning, and a transition video that plays
 * once per session before revealing the site.
 *
 * Every piece of copy and media is supplied by the `entry` data singleton
 * (`content/data/entry.json`) so it stays editable in the Netlify Visual
 * Editor. The root carries `data-sb-object-id` and each field is annotated
 * with a relative `data-sb-field-path`.
 */

export interface EntryContent {
  enabled?: boolean;
  eyebrow?: string;
  logo?: string;
  logoAlt?: string;
  buttonLabel?: string;
  enterCue?: string;
  warningTitle?: string;
  warningBody?: string;
  warningDuration?: number;
  video?: string;
  __metadata: { id: string };
}

const SESSION_KEY = "talesNTellsEntered";

type Phase = "landing" | "video" | "done";

/** Full-screen canvas of soft light orbs that drift on their own and are
 * pulled toward — and swell near — the cursor. Ported from the original
 * `LiquidBackground`. */
function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    class LightOrb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseRadius = Math.random() * 150 + 100;
        this.radius = this.baseRadius;
        const opacity = Math.random() * 0.15 + 0.05;
        this.color =
          Math.random() > 0.5
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(0, 255, 255, ${opacity})`;
      }

      update() {
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;
        this.vx *= 0.99;
        this.vy *= 0.99;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 400) {
          const force = (400 - distance) / 400;
          this.vx += dx * force * 0.005;
          this.vy += dy * force * 0.005;
          this.radius = this.baseRadius * (1 + force * 0.3);
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const orbs = Array.from({ length: 8 }, () => new LightOrb());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ filter: "blur(40px)" }}
    />
  );
}

export default function EntryExperience({
  entry,
  children,
}: {
  entry: EntryContent;
  children: React.ReactNode;
}) {
  // Render the gate by default so first-time visitors never see the site flash
  // underneath. If the experience is disabled in content, skip it entirely.
  const [phase, setPhase] = useState<Phase>(
    entry.enabled === false ? "done" : "landing"
  );
  const [showWarning, setShowWarning] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Returning visitors within the same session skip straight to the site.
  useEffect(() => {
    if (entry.enabled === false) return;
    // Inside the Netlify Visual Editor the preview renders in an iframe. The
    // gate is a full-screen overlay (fixed inset-0, z-[200]); if it stayed up
    // it would cover every page and block editors from selecting anything
    // underneath — the tales-page buttons, the tag sorter, any section. So
    // dismiss it in the editor and reveal the full, editable site. The intro
    // itself stays editable from the editor's content sidebar, where it
    // appears as the "Entry Experience" data singleton.
    const inVisualEditor =
      typeof window !== "undefined" && window.self !== window.top;
    if (inVisualEditor) {
      setPhase("done");
      return;
    }
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setPhase("done");
    }
  }, [entry.enabled]);

  const handleEnter = () => {
    setShowWarning(true);
    setPhase("video");
  };

  const finishEntry = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      /* sessionStorage may be unavailable; gate still dismisses */
    }
    setPhase("done");
  };

  // Drive the warning → video → site sequence.
  useEffect(() => {
    if (phase !== "video") return;

    const duration = entry.warningDuration ?? 1500;
    const warningTimer = setTimeout(() => {
      setShowWarning(false);
      const video = videoRef.current;
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked — fall through to the site rather than stall.
            finishEntry();
          });
        }
      } else {
        finishEntry();
      }
    }, duration);

    return () => clearTimeout(warningTimer);
  }, [phase, entry.warningDuration]);

  // Start fetching the transition video as soon as the landing gate mounts —
  // previously the <video> element only existed once phase became "video",
  // so the browser didn't start downloading it until *after* the click +
  // warning delay, which is what made the transition feel slow to load.
  useEffect(() => {
    if (phase === "done" || !entry.video) return;
    const video = videoRef.current;
    if (video && video.readyState === 0) {
      video.load();
    }
  }, [phase, entry.video]);

  return (
    <>
      {children}

      {phase !== "done" && (
        <div
          data-sb-object-id={entry.__metadata.id}
          className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden"
        >
          {/* Hide the gate when JavaScript is unavailable so the site stays
              reachable. */}
          <noscript>
            <style>{`[data-sb-object-id="${entry.__metadata.id}"]{display:none!important}`}</style>
          </noscript>

          {phase === "landing" && (
            <div className="relative h-full w-full flex items-center justify-center">
              <LiquidBackground />
              <div className="absolute inset-0 mesh-bg opacity-40 z-0" />

              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <p
                  data-sb-field-path=".eyebrow"
                  className="text-[10px] uppercase tracking-[0.6em] mb-8 opacity-60 font-medium"
                >
                  {entry.eyebrow}
                </p>

                {entry.logo && (
                  <div className="relative mb-6 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.logo}
                      alt={entry.logoAlt ?? "Tales 'N' Tells"}
                      data-sb-field-path=".logo#@src .logoAlt#@alt"
                      className="h-40 md:h-56 w-auto object-contain"
                    />
                  </div>
                )}

                <div className="relative group mt-2">
                  <div className="absolute inset-0 bg-accent blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <button
                    type="button"
                    onClick={handleEnter}
                    data-sb-field-path=".buttonLabel"
                    className="relative px-16 py-5 bg-white text-black font-bold text-lg uppercase tracking-[0.2em] rounded-full transition-transform hover:scale-105 active:scale-95"
                  >
                    {entry.buttonLabel ?? "EXPERIENCE"}
                  </button>

                  <div className="mt-6 flex flex-col items-center animate-bounce opacity-40">
                    <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
                    <p
                      data-sb-field-path=".enterCue"
                      className="text-[9px] mt-2 tracking-widest uppercase"
                    >
                      {entry.enterCue ?? "ENTER"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === "video" && showWarning && (
            <div className="absolute inset-0 z-[300] bg-black flex items-center justify-center">
              <div className="text-center px-8 max-w-md">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-accent mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <h2
                    data-sb-field-path=".warningTitle"
                    className="text-xl font-bold text-bone mb-2"
                  >
                    {entry.warningTitle ?? "PHOTOSENSITIVITY WARNING"}
                  </h2>
                </div>
                <p
                  data-sb-field-path=".warningBody"
                  className="text-bone/70 text-sm leading-relaxed"
                >
                  {entry.warningBody}
                </p>
              </div>
            </div>
          )}

          {/* Always mounted (once the gate itself is up) so the browser can
              start buffering during the "landing" phase rather than waiting
              until the user has already clicked Experience. Invisible and
              inert until phase === "video". */}
          {entry.video && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              ref={videoRef}
              src={entry.video}
              data-sb-field-path=".video#@src"
              preload="auto"
              onEnded={() => {
                setTimeout(finishEntry, 500);
              }}
              onError={finishEntry}
              className={`absolute inset-0 z-[210] w-full h-full object-cover bg-ink transition-opacity duration-200 ${
                phase === "video" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              playsInline
            />
          )}
        </div>
      )}
    </>
  );
}
