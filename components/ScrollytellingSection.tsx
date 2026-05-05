"use client";

import { useRef, useEffect, useState, useCallback, type MutableRefObject } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SCROLLY_VIDEO = "/mateo-closeup.mp4";
const SCROLLY_POSTER = "/mateo-full.png";

/**
 * Misma altura que el sticky (100vh): evita la “cola” extra bajo el pin que se veía como franja azul (#080f1e).
 */
const SCROLL_VH = 100;

/** Ventanas de progreso 0→1 por tarjeta (solo movimiento/escala; las 4 siguen siempre legibles). */
const DESKTOP_CARD_ENTER: [number, number][] = [
  [0.04, 0.22],
  [0.12, 0.32],
  [0.22, 0.44],
  [0.34, 0.58],
];

const MAIN_COPY = {
  title: "¿Qué es un empleado digital?",
  body: "Un empleado digital es una solución de inteligencia artificial especializada en un rol de negocio. Puede consultar información, interpretar datos, automatizar la ejecución de tareas definidas y entregar respuestas útiles para apoyar el trabajo humano.",
  mateo:
    "En el caso de Mateo Ríos, ese rol es ayudar a la gerencia a tener mayor control financiero, convirtiendo información contable y administrativa dispersa en conocimiento claro, confiable y fácil de entender.",
};

const SIDE_CARDS = [
  {
    chip: "Inteligencia aplicada",
    title: "No es solo un chatbot",
    body: "No se limita a conversar. Trabaja con información empresarial y responde con contexto.",
  },
  {
    chip: "Integración nativa",
    title: "No es otro ERP",
    body: "No reemplaza tus sistemas actuales. Se apoya en ellos para hacer más útil la información.",
  },
  {
    chip: "Herramienta de apoyo",
    title: "No reemplaza al equipo financiero",
    body: "Complementa al contador, al gerente financiero y a la dirección, facilitando consultas, alertas y análisis.",
  },
  {
    chip: "Rol especializado",
    title: "Es un rol digital especializado",
    body: "Tiene un propósito concreto: ayudar a convertir datos financieros en control gerencial.",
  },
] as const;

function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`liquid-glass liquid-glass-scrolly text-left ${className}`}>{children}</div>;
}

function EditorialPanel({
  compact,
  activeCard,
}: {
  compact?: boolean;
  activeCard?: (typeof SIDE_CARDS)[number] | null;
}) {
  return (
    <GlassCard
      className={cn(
        "concept-card p-0 overflow-hidden",
        compact && "shadow-lg",
      )}
    >
      <div className={cn("concept-top", compact ? "px-4 py-4 sm:px-5 sm:py-5" : "")}>
        <p className="concept-chip">
          <span className="chip-line" />
          <span>Concepto</span>
        </p>

        {activeCard && (
          <p
            className={cn(
              "concept-focus-live",
              compact && "concept-focus-live--compact",
            )}
            aria-live="polite"
          >
            <span className="concept-focus-live-kicker">Enfoque</span>
            <span className="concept-focus-live-text">{activeCard.chip}</span>
          </p>
        )}

        <h2 className={cn("concept-title", compact ? "text-[18px] sm:text-[20px]" : "")}>
          ¿Qué es un empleado <em>digital?</em>
        </h2>

        <p className={cn("concept-copy", compact ? "text-[12px] sm:text-[12.5px]" : "")}>
          {MAIN_COPY.body}
        </p>
      </div>

      <div className={cn("concept-bottom", compact ? "px-4 py-4 sm:px-5 sm:py-5" : "")}>
        <p className="concept-bottom-label">En el caso de Mateo Ríos</p>
        <p className={cn("concept-bottom-copy", compact ? "text-[12px] sm:text-[12.5px]" : "")}>
          Ese rol es <strong>ayudar a la gerencia a tener mayor control financiero</strong>, convirtiendo
          información contable y administrativa dispersa en conocimiento claro, confiable y fácil de entender.
        </p>
      </div>
    </GlassCard>
  );
}

function pickEditorialIndexFromProgress(p: number) {
  const mids = DESKTOP_CARD_ENTER.map(([s, e]) => (s + e) / 2);
  let idx = 0;
  for (let i = mids.length - 1; i >= 0; i--) {
    if (p >= mids[i]!) {
      idx = i;
      break;
    }
  }
  return idx;
}

function MobileRightGlassCards({
  activeIndex,
  onActivate,
  reduced,
  scrollRootRef,
}: {
  activeIndex: number;
  onActivate: (index: number) => void;
  reduced: boolean;
  scrollRootRef: MutableRefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root || reduced) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-editorial-card]");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = 0;
        let bestRatio = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.editorialCard);
          if (!Number.isFinite(idx)) continue;
          const r =
            typeof entry.intersectionRatio === "number" ? entry.intersectionRatio : 0;
          if (r >= bestRatio) {
            bestRatio = r;
            bestIdx = idx;
          }
        }
        if (bestRatio >= 0.42) {
          onActivate(bestIdx);
        }
      },
      {
        root,
        threshold: [0, 0.15, 0.25, 0.35, 0.42, 0.55, 0.7, 0.85],
        rootMargin: "-6px 0px",
      },
    );

    cards.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [onActivate, reduced, scrollRootRef]);

  const tapInteractive = reduced
    ? {}
    : {
        whileTap: { scale: 0.985 },
        transition: { type: "spring" as const, stiffness: 520, damping: 38 },
      };

  return (
    <div
      ref={scrollRootRef}
      className="h-full w-full min-h-0 overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin] [touch-action:pan-y]"
    >
      <GlassCard className="editorial-stack p-0">
        {SIDE_CARDS.map((card, idx) => (
          reduced ? (
            <article
              key={card.title}
              data-editorial-card={String(idx)}
              className={cn(
                "editorial-card editorial-card-interactive cursor-pointer touch-manipulation outline-none ring-offset-4 ring-offset-transparent",
                "focus-visible:ring-2 focus-visible:ring-cyan-300/80",
                idx === activeIndex && "is-selected",
              )}
              role="button"
              tabIndex={0}
              aria-pressed={idx === activeIndex}
              aria-label={`${card.title}. Pulse para destacar`}
              onClick={() => onActivate(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onActivate(idx);
                }
              }}
            >
              <div className="editorial-card-inner">
                <div className="editorial-card-body">
                  <p className="editorial-chip">
                    <span className="chip-line" />
                    {card.chip}
                  </p>
                  <h3 className="editorial-title text-[11px] sm:text-xs">{card.title}</h3>
                  <p className="editorial-copy text-[10px] sm:text-[11px]">{card.body}</p>
                </div>
                <span className="editorial-num hidden">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <span className="editorial-arrow editorial-arrow-visible-sm">→</span>
            </article>
          ) : (
            <motion.article
              key={card.title}
              data-editorial-card={String(idx)}
              className={cn(
                "editorial-card editorial-card-interactive relative z-0 outline-none ring-offset-4 ring-offset-transparent transform-gpu will-change-transform",
                "focus-visible:ring-2 focus-visible:ring-cyan-300/80",
                idx === activeIndex && "is-selected",
              )}
              role="button"
              tabIndex={0}
              aria-pressed={idx === activeIndex}
              aria-label={`${card.title}. Pulse para destacar`}
              {...tapInteractive}
              onClick={() => onActivate(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onActivate(idx);
                }
              }}
            >
              <div className="editorial-card-inner touch-manipulation">
                <div className="editorial-card-body">
                  <p className="editorial-chip">
                    <span className="chip-line" />
                    {card.chip}
                  </p>
                  <h3 className="editorial-title text-[11px] sm:text-xs">{card.title}</h3>
                  <p className="editorial-copy text-[10px] sm:text-[11px]">{card.body}</p>
                </div>
                <span className="editorial-num hidden">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <span className="editorial-arrow editorial-arrow-visible-sm">→</span>
            </motion.article>
          )
        ))}
      </GlassCard>
    </div>
  );
}

function DesktopEditorialCard({
  card,
  index,
  scrollYProgress,
  reduced,
  isActive,
  onActivate,
}: {
  card: (typeof SIDE_CARDS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [start, end] = DESKTOP_CARD_ENTER[index] ?? [0, 1];
  const clamp = { clamp: true } as const;

  const y = useTransform(scrollYProgress, [start, end], [28, 0], clamp);
  const scale = useTransform(scrollYProgress, [start, end], [0.97, 1], clamp);

  /** Parallax muy sutil al entrar: alterna el desplazamiento por índice. */
  const drift = useTransform(scrollYProgress, (p) => {
    const span = end - start + 0.08;
    const t = Math.min(1, Math.max(0, (p - start) / span));
    return (index - 1.5) * 2 * (1 - t);
  });

  const yCombined = useTransform([y, drift], ([yy, d]) => Number(yy) + Number(d));

  if (reduced) {
    return (
      <article
        data-editorial-card={String(index)}
        className={cn(
          "editorial-card editorial-card-interactive cursor-pointer touch-manipulation outline-none ring-offset-4 ring-offset-transparent",
          "focus-visible:ring-2 focus-visible:ring-cyan-300/80",
          isActive && "is-selected",
        )}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        <div className="editorial-card-inner">
          <div className="editorial-card-body">
            <p className="editorial-chip">
              <span className="chip-line" />
              {card.chip}
            </p>
            <h3 className="editorial-title text-sm">{card.title}</h3>
            <p className="editorial-copy text-xs sm:text-[13px]">{card.body}</p>
          </div>
          <span className="editorial-num">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <span className="editorial-arrow editorial-arrow-visible-sm">→</span>
      </article>
    );
  }

  return (
    <motion.article
      data-editorial-card={String(index)}
      className={cn(
        "editorial-card editorial-card-interactive relative z-0 cursor-pointer touch-manipulation transform-gpu outline-none ring-offset-4 ring-offset-transparent will-change-transform",
        "focus-visible:ring-2 focus-visible:ring-cyan-300/80",
        isActive && "is-selected",
      )}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${card.title}. Pulse para destacar`}
      initial={false}
      style={{ scale, y: yCombined }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.2 }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      <div className="editorial-card-inner">
        <div className="editorial-card-body">
          <p className="editorial-chip">
            <span className="chip-line" />
            {card.chip}
          </p>
          <h3 className="editorial-title text-sm">{card.title}</h3>
          <p className="editorial-copy text-xs sm:text-[13px]">{card.body}</p>
        </div>
        <span className="editorial-num">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <span className="editorial-arrow editorial-arrow-visible-sm">→</span>
    </motion.article>
  );
}

export default function ScrollytellingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobileSceneRef = useRef<HTMLDivElement>(null);
  const mobileCardsScrollRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [editorialFocus, setEditorialFocus] = useState(0);
  const [viewportLg, setViewportLg] = useState(false);

  const activateEditorial = useCallback((index: number) => {
    if (!Number.isFinite(index)) return;
    const n = SIDE_CARDS.length;
    const clamped = Math.max(0, Math.min(n - 1, Math.floor(index)));
    setEditorialFocus(clamped);
  }, []);

  const pinnedCard = SIDE_CARDS[editorialFocus] ?? SIDE_CARDS[0];

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const leftReveal = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setViewportLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!viewportLg || prefersReducedMotion) return;
    setEditorialFocus(pickEditorialIndexFromProgress(latest));
  });

  useEffect(() => {
    const scene = scrollRef.current;
    const vid = videoRef.current;
    if (!scene || !vid) return;

    let inDesktopScene = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const enough = entry.isIntersecting && entry.intersectionRatio >= 0.14;
          if (enough && !inDesktopScene) {
            inDesktopScene = true;
            vid.currentTime = 0;
            vid.play().catch(() => {});
            window.dispatchEvent(new CustomEvent("scrolly-video-on"));
          } else if (!enough && inDesktopScene) {
            inDesktopScene = false;
            vid.pause();
            window.dispatchEvent(new CustomEvent("scrolly-video-off"));
          }
        }
      },
      { threshold: [0, 0.08, 0.14, 0.25, 0.4] },
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scene = mobileSceneRef.current;
    const vid = mobileVideoRef.current;
    if (!scene || !vid) return;

    let inMobileScene = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const enough = entry.isIntersecting && entry.intersectionRatio >= 0.22;
          if (enough && !inMobileScene) {
            inMobileScene = true;
            vid.currentTime = 0;
            vid.play().catch(() => {});
            window.dispatchEvent(new CustomEvent("scrolly-video-on"));
          } else if (!enough && inMobileScene) {
            inMobileScene = false;
            vid.pause();
            window.dispatchEvent(new CustomEvent("scrolly-video-off"));
          }
        }
      },
      { threshold: [0, 0.15, 0.22, 0.35, 0.55] },
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="¿Qué es un empleado digital?"
      id="empleado-digital"
      className="relative bg-[#080f1e]"
    >
      <div
        ref={mobileSceneRef}
        className="lg:hidden relative min-h-[100svh] w-full overflow-hidden bg-[#080f1e]"
      >
        <video
          ref={mobileVideoRef}
          src={SCROLLY_VIDEO}
          poster={SCROLLY_POSTER}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full min-h-[100svh] w-full object-cover object-center pointer-events-none"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080f1e]/72 via-[#080f1e]/15 to-[#080f1e]/72"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080f1e]/40 via-transparent to-[#080f1e]/22"
          aria-hidden
        />

        <div className="relative z-10 min-h-[100svh] w-full max-w-[100vw] mx-auto">
          <div
            className="absolute z-20 flex min-h-0 flex-col overflow-y-auto pointer-events-auto pl-2 sm:pl-3"
            style={{
              left: 0,
              top: "max(5.5rem, env(safe-area-inset-top))",
              bottom: "max(0.75rem, env(safe-area-inset-bottom))",
              width: "min(42%, var(--subject-safe-left))",
              maxWidth: "16.5rem",
            }}
          >
            <div className="max-h-full w-full overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin] [touch-action:pan-y]">
              <EditorialPanel compact activeCard={pinnedCard} />
            </div>
          </div>

          <div
            className="absolute z-20 flex min-h-0 flex-col min-w-0 overflow-hidden pointer-events-auto pr-2 sm:pr-3"
            style={{
              right: 0,
              top: "max(5.5rem, env(safe-area-inset-top))",
              bottom: "max(0.75rem, env(safe-area-inset-bottom))",
              width: "min(42%, var(--subject-safe-left))",
              maxWidth: "16rem",
            }}
          >
            <MobileRightGlassCards
              activeIndex={editorialFocus}
              onActivate={activateEditorial}
              reduced={!!prefersReducedMotion}
              scrollRootRef={mobileCardsScrollRef}
            />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hidden lg:block relative"
        style={{ height: `${SCROLL_VH}vh` }}
      >
        <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden">
          <video
            ref={videoRef}
            src={SCROLLY_VIDEO}
            poster={SCROLLY_POSTER}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080f1e]/55 via-transparent to-[#080f1e]/45"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080f1e]/40 via-transparent to-[#080f1e]/20"
            aria-hidden
          />

          <div className="relative z-10 h-full w-full max-w-[1920px] mx-auto">
            <div
              className="absolute z-20 flex flex-col justify-center pointer-events-auto"
              style={{
                left: "max(1.25rem, env(safe-area-inset-left))",
                top: "max(12%, env(safe-area-inset-top))",
                bottom: "max(10%, env(safe-area-inset-bottom))",
                width: "var(--glass-left-width)",
              }}
            >
              <motion.div
                style={{ opacity: leftReveal }}
                className="min-h-0 max-h-full overflow-y-auto pr-1 [scrollbar-width:thin]"
              >
                <EditorialPanel activeCard={pinnedCard} />
              </motion.div>
            </div>

            <div
              className="absolute z-20 flex flex-col gap-3 pointer-events-auto max-w-[32vw] min-h-0 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.22)_transparent] [touch-action:pan-y]"
              style={{
                right: "max(1.25rem, env(safe-area-inset-right))",
                top: "max(5%, env(safe-area-inset-top))",
                bottom: "max(11%, env(safe-area-inset-bottom))",
                width: "var(--glass-right-width)",
              }}
            >
              <GlassCard className="editorial-stack p-0 flex h-full min-h-0 flex-1 flex-col [perspective:1200px] [transform-style:preserve-3d]">
                {SIDE_CARDS.map((card, idx) => (
                  <DesktopEditorialCard
                    key={card.title}
                    card={card}
                    index={idx}
                    scrollYProgress={scrollYProgress}
                    reduced={!!prefersReducedMotion}
                    isActive={editorialFocus === idx}
                    onActivate={() => activateEditorial(idx)}
                  />
                ))}
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
