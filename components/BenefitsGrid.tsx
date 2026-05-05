"use client";

import { BENEFITS } from "@/lib/constants";
import {
  Zap, MessageSquare, Bell, BarChart2, Link, Shield, Users,
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, MessageSquare, Bell, BarChart2, Link, Shield, Users,
};

export default function BenefitsGrid() {
  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Capacidades de Mateo Ríos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Lo que Mateo puede hacer por tu empresa
          </h2>
          <p className="text-lg text-slate-600">
            Diseñado para apoyar decisiones cotidianas con información clara, trazable y oportuna.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {BENEFITS.map((benefit, idx) => {
            const Icon = ICON_MAP[benefit.icon];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 bg-emerald-50 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  {Icon && <Icon className="w-5 h-5 text-emerald-600" />}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{benefit.description}</p>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-slate-400 text-xs italic">{benefit.kpi}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          * Los KPIs asociados requieren validación en piloto con cada empresa antes de publicarse como métricas comerciales.
        </p>
      </div>
    </section>
  );
}
