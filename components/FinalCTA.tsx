"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#101b37] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Icon */}
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <span className="text-emerald-400 font-bold text-2xl">M</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
          Empieza a tomar decisiones financieras con información clara, trazable y oportuna
        </h2>

        <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
          Mateo Ríos está diseñado para gerentes que no quieren depender de reportes tardíos para
          saber cómo está su empresa.
        </p>

        <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm">
          Sin compromiso. Sin migración de datos. Solo una conversación para entender si Mateo es
          lo que tu empresa necesita.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#demo-form"
            onClick={() => trackEvent("final_cta_click", { cta: "primary" })}
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-9 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5"
          >
            Solicitar demo de Mateo Ríos
            <ArrowRight className="w-5 h-5" />
          </a>

          {CALENDLY_URL ? (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("calendar_booking_started")}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-9 py-4 rounded-xl transition-all duration-200 text-base hover:bg-white/5"
            >
              <Calendar className="w-5 h-5" />
              Agendar reunión
            </a>
          ) : (
            <a
              href="#demo-form"
              onClick={() => trackEvent("final_cta_click", { cta: "secondary" })}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-9 py-4 rounded-xl transition-all duration-200 text-base hover:bg-white/5"
            >
              <Calendar className="w-5 h-5" />
              Agendar reunión
            </a>
          )}
        </div>

        {/* Reassurance */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
          {[
            "Sin compromiso comercial",
            "Demo personalizada a tu empresa",
            "Respuesta en menos de 24 horas",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
