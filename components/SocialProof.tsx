import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "[Testimonio pendiente de validación]",
    name: "[Nombre del gerente]",
    title: "Gerente Financiero",
    company: "[Empresa — sector servicios]",
  },
  {
    quote: "[Testimonio pendiente de validación]",
    name: "[Nombre del gerente general]",
    title: "Gerente General",
    company: "[Empresa — sector comercio]",
  },
];

export default function SocialProof() {
  return (
    <section id="prueba-social" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Empresas que confían en Mateo Ríos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Gerentes que tomaron la decisión de saber
          </h2>
          <p className="text-lg text-slate-600">
            Empresas colombianas que dejaron de decidir a ciegas.
          </p>
        </div>

        {/* Logo placeholders */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {["[Logo cliente autorizado]", "[Logo cliente autorizado]", "[Logo cliente autorizado]"].map(
            (label, idx) => (
              <div
                key={idx}
                className="h-14 w-40 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center"
              >
                <span className="text-slate-400 text-xs font-medium text-center px-2">{label}</span>
              </div>
            )
          )}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-7 relative">
              <Quote className="w-8 h-8 text-emerald-200 absolute top-6 right-6" />
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 text-xs font-bold">
                    {t.name.charAt(1).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.title} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case study placeholder */}
        <div className="bg-[#101b37] rounded-2xl p-8 text-center">
          <p className="text-emerald-400 text-sm font-semibold mb-2">Caso de uso</p>
          <p className="text-white font-bold text-lg mb-3">
            [Caso de uso real pendiente de documentación]
          </p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Los resultados de pilotos se publicarán aquí una vez documentados y autorizados por las
            empresas participantes. Sin datos no verificados.
          </p>
        </div>
      </div>
    </section>
  );
}
