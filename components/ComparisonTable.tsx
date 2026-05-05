"use client";

import { COMPARISON_ROWS } from "@/lib/constants";
import { Check, Minus, X } from "lucide-react";
import { motion } from "framer-motion";

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const isYes = value === "Sí" || value === "Alta" || value === "Directo";
  const isNo = value === "No";
  const isPartial = value.startsWith("Parcial") || value.startsWith("Limitado") || value.startsWith("Variable") || value.startsWith("Indirecto");

  return (
    <td
      className={`px-4 py-3.5 text-center text-sm ${
        highlight ? "bg-emerald-50 font-semibold text-emerald-800" : "text-slate-600"
      }`}
    >
      {isYes && !highlight ? (
        <div className="flex justify-center">
          <Check className="w-4 h-4 text-emerald-500" />
        </div>
      ) : isNo ? (
        <div className="flex justify-center">
          <X className="w-4 h-4 text-red-400" />
        </div>
      ) : isPartial ? (
        <div className="flex justify-center">
          <Minus className="w-4 h-4 text-amber-400" />
        </div>
      ) : (
        value
      )}
    </td>
  );
}

export default function ComparisonTable() {
  return (
    <section id="comparativo" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Comparativo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Mateo complementa lo que ya tienes
          </h2>
          <p className="text-lg text-slate-600">
            No compite con tu contador, tu ERP ni tus consultores. Los hace más útiles para la gerencia.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm [-webkit-overflow-scrolling:touch]"
        >
          <table className="w-full min-w-[620px] bg-white">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-[180px] sm:w-[220px]">
                  Variable
                </th>
                {[
                  "Reporte contable",
                  "Dashboard",
                  "ERP",
                  "Consultor",
                  "Mateo Ríos",
                ].map((col) => (
                  <th
                    key={col}
                    className={`px-2 sm:px-4 py-4 text-center text-[11px] sm:text-xs font-semibold uppercase tracking-wide ${
                      col === "Mateo Ríos"
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-500"
                    }`}
                  >
                    {col === "Mateo Ríos" ? (
                      <span className="flex items-center justify-center gap-1">
                        ✦ {col}
                      </span>
                    ) : (
                      col
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={row.variable}
                  className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                    idx % 2 === 0 ? "" : "bg-slate-50/30"
                  }`}
                >
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-900">{row.variable}</td>
                  <Cell value={row.reporte} />
                  <Cell value={row.dashboard} />
                  <Cell value={row.erp} />
                  <Cell value={row.consultor} />
                  <Cell value={row.mateo} highlight />
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-center text-slate-400 text-xs mt-6">
          Esta comparación es orientativa. Los resultados específicos dependen de la implementación y el contexto de cada empresa.
        </p>
      </div>
    </section>
  );
}
