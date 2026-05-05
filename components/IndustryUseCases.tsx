"use client";

import { useState } from "react";
import { INDUSTRY_CASES } from "@/lib/constants";
import {
  Briefcase, ShoppingCart, Factory, Truck, HardHat, ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase, ShoppingCart, Factory, Truck, HardHat,
};

export default function IndustryUseCases() {
  const [active, setActive] = useState(0);
  const current = INDUSTRY_CASES[active];

  return (
    <section id="casos-de-uso" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Por industria
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Mateo Ríos entiende el contexto financiero de tu sector
          </h2>
          <p className="text-lg text-slate-600">
            Cada industria tiene sus propios riesgos y preguntas. Mateo está diseñado para responderlos.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* Sector tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {INDUSTRY_CASES.map((item, idx) => {
              const TabIcon = ICON_MAP[item.icon];
              return (
                <button
                  key={item.sector}
                  onClick={() => {
                    setActive(idx);
                    trackEvent("suggested_question_clicked", { sector: item.sector });
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 flex-shrink-0 lg:flex-shrink font-medium text-sm whitespace-nowrap lg:whitespace-normal ${
                    active === idx
                      ? "bg-[#101b37] text-white shadow-md"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {TabIcon && <TabIcon className="w-4 h-4 flex-shrink-0" />}
                  {item.sector}
                </button>
              );
            })}
          </div>

          {/* Case detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6"
            >
              {/* Pain */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Dolor financiero típico
                </p>
                <p className="text-slate-700 leading-relaxed">{current.pain}</p>
              </div>

              {/* Question → Answer */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 text-xs font-bold">G</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">El gerente pregunta:</p>
                    <p className="text-slate-800 font-medium text-sm">&ldquo;{current.question}&rdquo;</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 text-xs font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 mb-1 font-medium">Mateo responde:</p>
                    <p className="text-slate-700 text-sm leading-relaxed">{current.answer}</p>
                  </div>
                </div>
              </div>

              {/* Benefit */}
              <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-emerald-700 mb-1">Beneficio esperado</p>
                  <p className="text-slate-700 text-sm">{current.benefit}</p>
                </div>
              </div>

              <a
                href="#demo-form"
                className="inline-flex items-center gap-2 text-[#101b37] font-semibold text-sm hover:text-emerald-600 transition-colors"
              >
                Solicitar demo para mi empresa
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
