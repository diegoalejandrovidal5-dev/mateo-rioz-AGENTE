"use client";

import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL;

export default function DemoVideoSection() {
  const [played, setPlayed] = useState(false);

  const handlePlay = () => {
    setPlayed(true);
    trackEvent("demo_video_play");
  };

  return (
    <section id="demo-video" className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Demo en video
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Mira cómo Mateo Ríos responde preguntas financieras en segundos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Un gerente pregunta. Mateo consulta la información de la empresa, responde en lenguaje
            ejecutivo y emite una alerta accionable. Sin reportes. Sin esperas.
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-video">
          {VIDEO_URL && played ? (
            <iframe
              src={VIDEO_URL}
              title="Demo Mateo Ríos"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            /* Placeholder until video URL is configured */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#101b37] to-[#1a2e55]">
              <div className="text-center space-y-6 p-8">
                <button
                  onClick={handlePlay}
                  aria-label="Reproducir demo"
                  className="w-20 h-20 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/40 transition-all duration-200 hover:scale-105 mx-auto"
                >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </button>
                <div>
                  <p className="text-white font-semibold text-lg mb-2">Demo de Mateo Ríos</p>
                  <p className="text-slate-400 text-sm max-w-sm">
                    El video demo estará disponible próximamente. Solicita una demostración personalizada
                    con los datos de tu empresa.
                  </p>
                </div>
                {/* Scene indicators */}
                <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto mt-4">
                  {[
                    "Pregunta del gerente",
                    "Consulta de datos",
                    "Respuesta ejecutiva",
                    "Alerta de riesgo",
                    "Acción recomendada",
                  ].map((scene, idx) => (
                    <div key={scene} className="text-center">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-bold mx-auto mb-1">
                        {idx + 1}
                      </div>
                      <p className="text-slate-400 text-xs leading-tight">{scene}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Post-video CTA */}
        <div className="text-center mt-10">
          <p className="text-slate-600 mb-4">¿Quieres verlo con los datos reales de tu empresa?</p>
          <a
            href="#demo-form"
            className="inline-flex items-center gap-2 bg-[#101b37] hover:bg-[#1a2e55] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
          >
            Solicitar demo con mis datos
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
