"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const SCROLLY_VIDEO = "/mateo-closeup.mp4";
const SCROLLY_POSTER = "/mateo-full.png";
const SCROLL_VH = 480;

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

function EditorialPanel({ compact }: { compact?: boolean }) {
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

function MobileRightGlassCards() {
  return (
    <div className="max-h-[min(82svh,720px)] overflow-y-auto overflow-x-visible [scrollbar-width:thin] [touch-action:pan-y]">
      <GlassCard className="editorial-stack p-0 overflow-hidden">
        {SIDE_CARDS.map((card, idx) => (
          <article key={card.title} className="editorial-card">
            <div className="editorial-card-inner">
              <div className="editorial-card-body">
                <p className="editorial-chip">
                  <span className="chip-line" />
                  {card.chip}
                </p>
                <h3 className="editorial-title text-[11px] sm:text-xs">{card.title}</h3>
                <p className="editorial-copy text-[10px] sm:text-[11px]">{card.body}</p>
              </div>
              <span className="editorial-num">{String(idx + 1).padStart(2, "0")}</span>
            </div>
            <span className="editorial-arrow">→</span>
          </article>
        ))}
      </GlassCard>
    </div>
  );
}

export default function ScrollytellingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobileSceneRef = useRef<HTMLDivElement>(null);
  const wasDesktopInScene = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const leftReveal = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const c1 = useTransform(scrollYProgress, [0.1, 0.26], [0, 1]);
  const c2 = useTransform(scrollYProgress, [0.24, 0.42], [0, 1]);
  const c3 = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);
  const c4 = useTransform(scrollYProgress, [0.56, 0.74], [0, 1]);

  const y1 = useTransform(c1, [0, 1], [22, 0]);
  const y2 = useTransform(c2, [0, 1], [22, 0]);
  const y3 = useTransform(c3, [0, 1], [22, 0]);
  const y4 = useTransform(c4, [0, 1], [22, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const inScene = v > 0.03 && v < 0.97;
    const vid = videoRef.current;
    if (!vid) return;

    if (inScene && !wasDesktopInScene.current) {
      wasDesktopInScene.current = true;
      vid.currentTime = 0;
      vid.play().catch(() => {});
      window.dispatchEvent(new CustomEvent("scrolly-video-on"));
    } else if (!inScene && wasDesktopInScene.current) {
      wasDesktopInScene.current = false;
      vid.pause();
      window.dispatchEvent(new CustomEvent("scrolly-video-off"));
    }
  });

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
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080f1e]/55 via-transparent to-[#080f1e]/35"
          aria-hidden
        />

        <div className="relative z-10 min-h-[100svh] w-full max-w-[100vw] mx-auto">
          <div
            className="absolute z-20 flex flex-col justify-center pointer-events-auto pl-2 sm:pl-3"
            style={{
              left: 0,
              top: "max(5.5rem, env(safe-area-inset-top))",
              bottom: "max(0.75rem, env(safe-area-inset-bottom))",
              width: "min(34%, var(--subject-safe-left))",
              maxWidth: "15.5rem",
            }}
          >
            <div className="max-h-[min(82svh,720px)] w-full overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin] [touch-action:pan-y]">
              <EditorialPanel compact />
            </div>
          </div>

          <div
            className="absolute z-20 flex flex-col justify-center pointer-events-auto pr-2 sm:pr-3"
            style={{
              right: 0,
              top: "max(5.5rem, env(safe-area-inset-top))",
              bottom: "max(0.75rem, env(safe-area-inset-bottom))",
              width: "min(34%, var(--subject-safe-left))",
              maxWidth: "14rem",
            }}
          >
            <MobileRightGlassCards />
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080f1e]/65 via-transparent to-[#080f1e]/25"
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
                <EditorialPanel />
              </motion.div>
            </div>

            <div
              className="absolute z-20 flex flex-col justify-center gap-3 pointer-events-auto max-w-[32vw]"
              style={{
                right: "max(1.25rem, env(safe-area-inset-right))",
                top: "max(14%, env(safe-area-inset-top))",
                bottom: "max(12%, env(safe-area-inset-bottom))",
                width: "var(--glass-right-width)",
              }}
            >
              <GlassCard className="editorial-stack p-0 overflow-hidden">
                <motion.article style={{ opacity: c1, y: y1 }} className="editorial-card">
                  <div className="editorial-card-inner">
                    <div className="editorial-card-body">
                      <p className="editorial-chip"><span className="chip-line" />{SIDE_CARDS[0].chip}</p>
                      <h3 className="editorial-title text-sm">{SIDE_CARDS[0].title}</h3>
                      <p className="editorial-copy text-xs sm:text-[13px]">{SIDE_CARDS[0].body}</p>
                    </div>
                    <span className="editorial-num">01</span>
                  </div>
                  <span className="editorial-arrow">→</span>
                </motion.article>
                <motion.article style={{ opacity: c2, y: y2 }} className="editorial-card">
                  <div className="editorial-card-inner">
                    <div className="editorial-card-body">
                      <p className="editorial-chip"><span className="chip-line" />{SIDE_CARDS[1].chip}</p>
                      <h3 className="editorial-title text-sm">{SIDE_CARDS[1].title}</h3>
                      <p className="editorial-copy text-xs sm:text-[13px]">{SIDE_CARDS[1].body}</p>
                    </div>
                    <span className="editorial-num">02</span>
                  </div>
                  <span className="editorial-arrow">→</span>
                </motion.article>
                <motion.article style={{ opacity: c3, y: y3 }} className="editorial-card">
                  <div className="editorial-card-inner">
                    <div className="editorial-card-body">
                      <p className="editorial-chip"><span className="chip-line" />{SIDE_CARDS[2].chip}</p>
                      <h3 className="editorial-title text-sm">{SIDE_CARDS[2].title}</h3>
                      <p className="editorial-copy text-xs sm:text-[13px]">{SIDE_CARDS[2].body}</p>
                    </div>
                    <span className="editorial-num">03</span>
                  </div>
                  <span className="editorial-arrow">→</span>
                </motion.article>
                <motion.article style={{ opacity: c4, y: y4 }} className="editorial-card">
                  <div className="editorial-card-inner">
                    <div className="editorial-card-body">
                      <p className="editorial-chip"><span className="chip-line" />{SIDE_CARDS[3].chip}</p>
                      <h3 className="editorial-title text-sm">{SIDE_CARDS[3].title}</h3>
                      <p className="editorial-copy text-xs sm:text-[13px]">{SIDE_CARDS[3].body}</p>
                    </div>
                    <span className="editorial-num">04</span>
                  </div>
                  <span className="editorial-arrow">→</span>
                </motion.article>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
