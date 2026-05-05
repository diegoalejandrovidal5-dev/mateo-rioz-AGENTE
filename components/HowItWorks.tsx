"use client";

import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Database, Cpu, MessageCircle, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ElementType> = {
  Database, Cpu, MessageCircle, Lightbulb,
};

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="pt-0 pb-20 lg:pt-0 lg:pb-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            ¿Cómo funciona?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Cuatro pasos para tener el control financiero que siempre quisiste
          </h2>
          <p className="text-lg text-slate-600">
            Mateo opera sobre la información que ya tienes. Sin migración completa, sin disrupciones.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const Icon = ICON_MAP[step.icon];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="relative text-center"
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-24 h-24 mx-auto mb-6 bg-[#101b37] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                    {Icon && <Icon className="w-7 h-7 text-emerald-400 mb-1" />}
                    <span className="text-emerald-400 text-xs font-bold">{step.number}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 mb-3 text-sm">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>

                  {/* Arrow between steps (mobile) */}
                  {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="flex justify-center mt-6 lg:hidden">
                      <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="mt-14 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-slate-600 text-sm leading-relaxed">
            <strong className="text-slate-900">Nota importante:</strong> Mateo Ríos no reemplaza tu ERP
            ni tu contador. Opera <em>sobre</em> la información existente para convertirla en
            conocimiento accionable para la gerencia. Las integraciones específicas se definen en el
            diagnóstico técnico de cada empresa.
          </p>
        </div>
      </div>
    </section>
  );
}
