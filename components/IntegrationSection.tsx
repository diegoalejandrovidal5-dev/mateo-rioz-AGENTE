"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Search, FileText, AlertTriangle } from "lucide-react";

const SOURCES = [
  { label: "ERP / SAP B1", color: "bg-blue-100 text-blue-700" },
  { label: "Siigo", color: "bg-indigo-100 text-indigo-700" },
  { label: "World Office", color: "bg-purple-100 text-purple-700" },
  { label: "Aspel", color: "bg-pink-100 text-pink-700" },
  { label: "Excel / CSV", color: "bg-green-100 text-green-700" },
  { label: "Fuentes propias*", color: "bg-slate-100 text-slate-600" },
];

const ARCH_FEATURES = [
  {
    icon: Lock,
    title: "Control de acceso por roles",
    description: "Solo los usuarios autorizados pueden consultar información sensible.",
  },
  {
    icon: Search,
    title: "Auditoría de consultas",
    description: "Registro completo de qué se preguntó, cuándo y con qué respuesta.",
  },
  {
    icon: FileText,
    title: "Trazabilidad de respuestas",
    description: "Cada respuesta indica su fuente de datos y los supuestos aplicados.",
  },
  {
    icon: AlertTriangle,
    title: "Escalamiento a humano",
    description: "Cuando la respuesta requiere juicio experto, Mateo lo señala explícitamente.",
  },
];

export default function IntegrationSection() {
  return (
    <section id="integraciones" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Arquitectura e integraciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Opera sobre la información que ya tienes, sin empezar de cero
          </h2>
          <p className="text-lg text-slate-600">
            Mateo se conecta con las fuentes de información existentes. Sin migrar, sin duplicar, sin
            reemplazar lo que ya funciona.
          </p>
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-2xl p-8 mb-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">

            {/* Sources */}
            <div className="flex-1 text-center">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                Tus fuentes de información
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SOURCES.map((s) => (
                  <div key={s.label} className={`${s.color} rounded-lg px-3 py-2 text-xs font-medium text-center`}>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 text-slate-300">
              <div className="hidden lg:flex flex-col items-center">
                <div className="w-px h-8 bg-slate-200" />
                <ArrowRight className="w-6 h-6 rotate-0" />
              </div>
              <div className="lg:hidden">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
              <p className="text-xs text-slate-400 text-center max-w-[80px] leading-tight">
                Diagnóstico técnico
              </p>
            </div>

            {/* Mateo */}
            <div className="w-full max-w-[220px] lg:w-auto bg-[#101b37] rounded-2xl p-6 text-center lg:min-w-[180px]">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <p className="text-white font-bold text-sm">Mateo Ríos</p>
              <p className="text-emerald-400 text-xs mt-1">Capa de conocimiento</p>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 text-slate-300">
              <div className="hidden lg:flex flex-col items-center">
                <div className="w-px h-8 bg-slate-200" />
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="lg:hidden">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
              <p className="text-xs text-slate-400 text-center max-w-[80px] leading-tight">
                Respuestas ejecutivas
              </p>
            </div>

            {/* Output */}
            <div className="flex-1 text-center">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                Lo que recibe la gerencia
              </p>
              <div className="space-y-2">
                {[
                  "Respuestas en lenguaje natural",
                  "Alertas proactivas de riesgo",
                  "Simulaciones de escenarios",
                  "Resúmenes ejecutivos",
                ].map((out) => (
                  <div key={out} className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-xs text-emerald-800 font-medium text-center">
                    {out}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security & features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARCH_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          * Compatible conceptualmente con entornos donde existan ERP, software contable o fuentes estructuradas de información financiera. Las integraciones específicas deben validarse en diagnóstico técnico.
        </p>
      </div>
    </section>
  );
}
