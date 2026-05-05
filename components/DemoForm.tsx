"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Step1 = {
  nombre: string;
  empresa: string;
  correo: string;
  cargo: string;
};

type Step2 = {
  tamano: string;
  software: string;
  reto: string;
};

type FormData = Step1 & Step2;

const COMPANY_SIZES = [
  "Menos de 20 empleados",
  "20–50 empleados",
  "51–100 empleados",
  "101–250 empleados",
  "Más de 250 empleados",
];

const SOFTWARE_OPTIONS = [
  "Siigo",
  "World Office",
  "SAP Business One",
  "Aspel",
  "Excel / manual",
  "Otro",
  "No tenemos aún",
];

const CHALLENGES = [
  "Entender el estado real de mi caja",
  "Controlar la cartera vencida",
  "Conocer mi rentabilidad real",
  "Simular decisiones de inversión o crédito",
  "Reducir la dependencia del contador",
  "Detectar riesgos financieros a tiempo",
  "Otro",
];

export default function DemoForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register: reg1,
    handleSubmit: handle1,
    formState: { errors: e1 },
    getValues: get1,
  } = useForm<Step1>();

  const {
    register: reg2,
    handleSubmit: handle2,
    formState: { errors: e2 },
  } = useForm<Step2>();

  const onStep1 = () => {
    trackEvent("form_step_1_completed");
    setStep(2);
  };

  const onStep2 = async (data2: Step2) => {
    const payload: FormData = { ...get1(), ...data2 };
    setStatus("loading");
    trackEvent("form_submitted", { cargo: payload.cargo, tamano: payload.tamano });

    const webhookUrl = process.env.NEXT_PUBLIC_FORM_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("webhook error");
      } else {
        // Simulate success in dev
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="demo-form" className="py-20 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white border border-emerald-200 rounded-2xl p-12 shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">¡Solicitud recibida!</h3>
            <p className="text-slate-600 mb-2">
              Nos pondremos en contacto contigo en menos de 24 horas para coordinar la demo.
            </p>
            <p className="text-slate-500 text-sm">
              Prepararemos la demostración ajustada a la realidad financiera de tu empresa.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo-form" className="py-20 bg-slate-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Solicitud de demo
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Solicita tu demo de Mateo Ríos
          </h2>
          <p className="text-slate-600 text-sm">
            Usaremos esta información para preparar una demo ajustada a la realidad financiera de tu empresa.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? "bg-[#101b37] text-white" : "bg-emerald-500 text-white"}`}>
              {step > 1 ? "✓" : "1"}
            </div>
            <span className={`text-sm font-medium ${step === 1 ? "text-slate-900" : "text-slate-400"}`}>Datos básicos</span>
          </div>
          <div className="w-8 h-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? "bg-[#101b37] text-white" : "bg-slate-200 text-slate-400"}`}>
              2
            </div>
            <span className={`text-sm font-medium ${step === 2 ? "text-slate-900" : "text-slate-400"}`}>Tu contexto</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handle1(onStep1)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre completo *</label>
                <input
                  {...reg1("nombre", { required: "Campo requerido" })}
                  placeholder="Juan Pérez"
                  onFocus={() => trackEvent("form_started")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
                {e1.nombre && <p className="text-red-500 text-xs mt-1">{e1.nombre.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Empresa *</label>
                <input
                  {...reg1("empresa", { required: "Campo requerido" })}
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
                {e1.empresa && <p className="text-red-500 text-xs mt-1">{e1.empresa.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo corporativo *</label>
                <input
                  {...reg1("correo", {
                    required: "Campo requerido",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" },
                  })}
                  type="email"
                  placeholder="juan@empresa.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
                {e1.correo && <p className="text-red-500 text-xs mt-1">{e1.correo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Cargo *</label>
                <input
                  {...reg1("cargo", { required: "Campo requerido" })}
                  placeholder="Gerente General / Gerente Financiero / ..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
                {e1.cargo && <p className="text-red-500 text-xs mt-1">{e1.cargo.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#101b37] hover:bg-[#1a2e55] text-white font-semibold py-4 rounded-xl transition-all duration-200 mt-2"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handle2(onStep2)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tamaño de la empresa *</label>
                <select
                  {...reg2("tamano", { required: "Campo requerido" })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  {COMPANY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {e2.tamano && <p className="text-red-500 text-xs mt-1">{e2.tamano.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Software contable o ERP actual *</label>
                <select
                  {...reg2("software", { required: "Campo requerido" })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  {SOFTWARE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {e2.software && <p className="text-red-500 text-xs mt-1">{e2.software.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Principal reto financiero *</label>
                <select
                  {...reg2("reto", { required: "Campo requerido" })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  {CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {e2.reto && <p className="text-red-500 text-xs mt-1">{e2.reto.message}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-slate-300 text-slate-600 font-medium py-3.5 rounded-xl hover:bg-slate-50 transition-all text-sm"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-sm disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                  ) : (
                    <>Agendar demo <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm text-center">
                  Hubo un error al enviar. Por favor intenta de nuevo o escríbenos directamente.
                </p>
              )}
            </form>
          )}

        </div>

        <p className="text-center text-slate-400 text-xs mt-4">
          Tu información es confidencial y solo se usará para preparar tu demo.
        </p>
      </div>
    </section>
  );
}
