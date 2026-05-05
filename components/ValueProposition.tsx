"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const DIFFERENTIATORS = [
  {
    label: "ERP / Software contable",
    description: "Guarda y registra los datos financieros. Indispensable, pero no habla contigo.",
    highlight: false,
  },
  {
    label: "Dashboard financiero",
    description: "Muestra los datos visualmente. Pero no los explica ni te dice qué hacer.",
    highlight: false,
  },
  {
    label: "Consultor financiero",
    description: "Analiza y recomienda con criterio. Disponible en horas o días, no en segundos.",
    highlight: false,
  },
  {
    label: "Mateo Ríos",
    description:
      "Traduce la información que ya tienes en respuestas ejecutivas, alertas proactivas y simulaciones — en segundos, cuando lo necesitas.",
    highlight: true,
  },
];

export default function ValueProposition() {
  return (
    <section id="propuesta" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                La propuesta de valor
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-balance">
                El puente entre tus datos financieros y tus decisiones gerenciales
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Mateo Ríos convierte la información contable y financiera dispersa de tu empresa en
                <strong className="text-slate-900"> respuestas claras, oportunas y accionables</strong> —
                sin depender de reportes tardíos ni de intermediarios técnicos.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: "¿Qué es?", text: "Un empleado digital especializado en gestión del conocimiento financiero." },
                { label: "¿Para quién?", text: "Gerentes generales, dueños y gerentes financieros de empresas colombianas medianas." },
                { label: "¿Qué resuelve?", text: "La brecha entre la información que existe en tu empresa y las decisiones que necesitas tomar hoy." },
                { label: "¿Qué no hace?", text: "No reemplaza a tu contador, tu ERP ni tu gerente financiero. Los complementa." },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-emerald-600 font-bold text-sm min-w-[100px] pt-0.5">{item.label}</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <a
              href="#demo-form"
              onClick={() => trackEvent("hero_cta_click", { section: "value_proposition" })}
              className="inline-flex items-center gap-2 bg-[#101b37] hover:bg-[#1a2e55] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
            >
              Solicitar demo gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right: Differentiator cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-5 border transition-all ${
                  item.highlight
                    ? "bg-[#101b37] border-[#1a2e55] shadow-lg"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.highlight ? "bg-emerald-400" : "bg-slate-300"
                    }`}
                  />
                  <div>
                    <p className={`font-semibold mb-1 text-sm ${item.highlight ? "text-white" : "text-slate-900"}`}>
                      {item.label}
                    </p>
                    <p className={`text-sm leading-relaxed ${item.highlight ? "text-slate-300" : "text-slate-500"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
