"use client";

import { useState } from "react";
import { FAQS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number, question: string) => {
    if (openIdx !== idx) trackEvent("faq_opened", { question });
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="preguntas-frecuentes" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Resolvemos las dudas más comunes
          </h2>
          <p className="text-lg text-slate-600">
            Si tienes una pregunta que no está aquí, cuéntanosla en la demo.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-white"
                }`}
              >
                <button
                  onClick={() => toggle(idx, faq.question)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900 text-sm leading-relaxed">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-500" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-600 mb-4">¿Tienes otras dudas? Conversemos en la demo.</p>
          <a
            href="#demo-form"
            className="inline-flex items-center gap-2 bg-[#101b37] hover:bg-[#1a2e55] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
          >
            Solicitar demo
          </a>
        </div>
      </div>
    </section>
  );
}
