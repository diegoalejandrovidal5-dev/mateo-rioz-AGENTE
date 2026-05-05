"use client";

import { useRef, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────
   Variants — McLaren-style masked line reveal
   Each line sits inside overflow:hidden so the
   translateY slide creates a "wipe up" effect.
───────────────────────────────────────────── */
const CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const LINE: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* Subtitle container — staggered, delayed after title */
const SUB_CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.55,
    },
  },
};

const SUB_LINE: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* Clip wrapper — hides the "below baseline" start position */
function Clip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let inHero = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const enough = entry.isIntersecting && entry.intersectionRatio >= 0.22;
          if (enough && !inHero) {
            inHero = true;
            video.currentTime = 0;
            video.play().catch(() => {});
          } else if (!enough && inHero) {
            inHero = false;
            video.pause();
          }
        }
      },
      { threshold: [0, 0.15, 0.22, 0.35, 0.55] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="relative h-[100svh] min-h-[600px]">
        {/* ── FULL-SCREEN VIDEO ── */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="metadata"
          poster="/mateo-full.png"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* ── GRADIENT OVERLAYS ── */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: "75%", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.52) 48%, transparent 100%)" }}
        />

        {/* ── CONTENT ── */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="w-full pl-5 sm:pl-8 lg:pl-10 pr-4 sm:pr-6 lg:pr-8 pb-16 sm:pb-20 lg:pb-24">
            <div style={{ maxWidth: "640px" }}>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">
              Empleado Digital · Gestión del Conocimiento Financiero
            </span>
          </motion.div>

          {/* ── TITLE — three masked lines ── */}
          <motion.h1
            className="font-bold text-white leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", maxWidth: "720px" }}
            variants={prefersReduced ? undefined : CONTAINER}
            initial="hidden"
            animate="show"
          >
            {/* Line 1 */}
            <Clip>
              <motion.span
                className="block"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
                variants={prefersReduced ? undefined : LINE}
              >
                Recupera
              </motion.span>
            </Clip>

            {/* Line 2 — cyan accent */}
            <Clip>
              <motion.span
                className="block"
                style={{ color: "#01c9f0", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
                variants={prefersReduced ? undefined : LINE}
              >
                el control
              </motion.span>
            </Clip>

            {/* Line 3 */}
            <Clip>
              <motion.span
                className="block"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
                variants={prefersReduced ? undefined : LINE}
              >
                de tu empresa
              </motion.span>
            </Clip>
          </motion.h1>

          {/* ── SUBTITLE — staggered lines ── */}
          <motion.div
            className="mb-8"
            style={{ maxWidth: "560px" }}
            variants={prefersReduced ? undefined : SUB_CONTAINER}
            initial="hidden"
            animate="show"
          >
            {[
              "Mateo Ríos convierte datos contables, administrativos y",
              "comerciales en respuestas claras, confiables y fáciles de entender",
              "para que gerentes y dueños tomen el control de su empresa con",
              "información actualizada.",
            ].map((line, i) => (
              <Clip key={i}>
                <motion.span
                  className="block text-white/80 leading-relaxed"
                  style={{
                    fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                    textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                  }}
                  variants={prefersReduced ? undefined : SUB_LINE}
                >
                  {line}
                </motion.span>
              </Clip>
            ))}
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={prefersReduced ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <a
              href="#demo-form"
              onClick={() => trackEvent("hero_cta_click", { cta: "primary" })}
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base hover:-translate-y-0.5"
              style={{ backgroundColor: "#01c9f0", color: "#fff", boxShadow: "0 4px 24px rgba(16,185,129,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0099b8")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#01c9f0")}
            >
              Solicitar demo gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#como-funciona"
              onClick={() => trackEvent("hero_cta_click", { cta: "secondary" })}
              className="inline-flex items-center justify-center gap-2 font-medium px-8 py-4 rounded-xl transition-all duration-200 text-base"
              style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff", backdropFilter: "blur(4px)", backgroundColor: "rgba(255,255,255,0.07)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)")}
            >
              Ver cómo funciona
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>
          </motion.div>

            </div>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
        </motion.div>
      </div>

    </section>
  );
}
