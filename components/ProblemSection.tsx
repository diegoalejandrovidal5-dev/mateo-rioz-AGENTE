"use client";

import { PAIN_POINTS } from "@/lib/constants";
import {
  Clock, UserCheck, AlertTriangle, HelpCircle,
  TrendingDown, Layers, Calculator,
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ElementType> = {
  Clock, UserCheck, AlertTriangle, HelpCircle,
  TrendingDown, Layers, Calculator,
};

export default function ProblemSection() {
  return (
    <section id="problema" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            El problema que enfrentas hoy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            ¿Tu empresa crece más rápido que tu capacidad de entender sus números?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            La mayoría de gerentes toma decisiones financieras con información que llega tarde,
            fragmentada o en un lenguaje que no fue diseñado para ellos. Eso tiene un costo.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PAIN_POINTS.map((pain, idx) => {
            const Icon = ICON_MAP[pain.icon];
            return (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.4 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-red-200 hover:bg-red-50/30 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-5 h-5 text-red-500" />}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{pain.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pain.description}</p>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: PAIN_POINTS.length * 0.07, duration: 0.4 }}
            className="bg-[#101b37] rounded-xl p-5 flex flex-col justify-between col-span-1"
          >
            <p className="text-white font-semibold text-base mb-4">
              Hay una forma mejor de estar al tanto de tus finanzas.
            </p>
            <a
              href="#propuesta"
              className="inline-flex items-center text-emerald-400 font-medium text-sm hover:text-emerald-300 transition-colors"
            >
              Conoce a Mateo Ríos →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
