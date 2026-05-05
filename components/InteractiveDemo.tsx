"use client";

import { useState, useRef, useEffect } from "react";
import { DEMO_QUESTIONS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { Bot, AlertTriangle, ArrowRight } from "lucide-react";

type Message = { role: "user" | "mateo"; text: string; chartId?: string };

const CHART_MAP: Record<string, string> = {
  "¿Cómo está mi flujo de caja esta semana?": "cashflow_week",
  "¿Qué clientes están retrasando más el recaudo?": "overdue_clients",
  "¿Puedo contratar dos personas más sin afectar la caja?": "hiring_scenario",
  "¿Qué gastos se desviaron frente al promedio?": "expense_deviation",
  "¿Qué obligaciones debo priorizar este mes?": "obligations_priority",
  "¿Qué pasaría si tomo un crédito de $200 millones?": "credit_scenario",
};

function ChartCashflowWeek() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie"];
  const ingresos = [42, 28, 35, 18, 50];
  const egresos = [20, 22, 18, 48, 15];
  const max = 60;
  const barW = 14;
  const gap = 4;
  const groupW = barW * 2 + gap + 12;
  const chartH = 80;

  return (
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-medium">
        Flujo de caja — semana actual (COP millones)
      </p>
      <svg width="100%" viewBox={`0 0 ${groupW * 5} ${chartH + 28}`} className="overflow-visible">
        {days.map((d, i) => {
          const x = i * groupW;
          const hI = (ingresos[i] / max) * chartH;
          const hE = (egresos[i] / max) * chartH;
          const isThursday = i === 3;
          return (
            <g key={d}>
              {isThursday && (
                <rect
                  x={x - 4}
                  y={0}
                  width={groupW - 4}
                  height={chartH}
                  fill="rgba(248,113,113,0.06)"
                  rx="4"
                />
              )}
              <rect x={x} y={chartH - hI} width={barW} height={hI} fill="#10b981" rx="3" opacity="0.85" />
              <rect
                x={x + barW + gap}
                y={chartH - hE}
                width={barW}
                height={hE}
                fill={isThursday ? "#f87171" : "#64748b"}
                rx="3"
                opacity="0.85"
              />
              <text
                x={x + barW}
                y={chartH + 14}
                textAnchor="middle"
                fontSize="9"
                fill={isThursday ? "#f87171" : "#64748b"}
              >
                {d}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-4 mt-1">
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />
          Ingresos
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-slate-500 inline-block" />
          Egresos
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-red-400">
          <span className="w-2 h-2 rounded-sm bg-red-400 inline-block" />
          Tensión (Jue)
        </span>
      </div>
    </div>
  );
}

function ChartOverdueClients() {
  const clients = [
    { name: "Cliente A", pct: 35, days: 63, color: "#f87171" },
    { name: "Cliente B", pct: 15, days: 42, color: "#fb923c" },
    { name: "Cliente C", pct: 10, days: 28, color: "#fbbf24" },
  ];

  const cx = 48;
  const cy = 48;
  const r = 34;
  const sw = 14;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = [
    { pct: 35, color: "#f87171" },
    { pct: 15, color: "#fb923c" },
    { pct: 10, color: "#fbbf24" },
    { pct: 40, color: "rgba(255,255,255,0.08)" },
  ];

  return (
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-medium">
        Concentración de cartera vencida
      </p>
      <div className="flex gap-4 items-center">
        <svg width="96" height="96" viewBox="0 0 96 96" className="flex-shrink-0">
          {slices.map((s, i) => {
            const dashArr = (s.pct / 100) * circ;
            const el = (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={sw}
                strokeDasharray={`${dashArr} ${circ - dashArr}`}
                strokeDashoffset={-offset}
                style={{ transform: "rotate(-90deg)", transformOrigin: "48px 48px" }}
              />
            );
            offset += dashArr;
            return el;
          })}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
            60%
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="7" fill="#94a3b8">
            top 3
          </text>
        </svg>
        <div className="flex-1 space-y-2.5">
          {clients.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-300">{c.name}</span>
                <span style={{ color: c.color }}>{c.days} días</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${c.pct / 0.6}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartHiringScenario() {
  const months = ["Mes 1", "Mes 2", "Mes 3"];
  const sinContratar = [100, 118, 134];
  const conContratar = [100, 96, 108];
  const max = 145;
  const barH = 16;
  const gap = 6;

  return (
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-medium">
        Caja proyectada — dos escenarios
      </p>
      <svg width="100%" viewBox="0 0 220 100" className="overflow-visible">
        {months.map((m, i) => {
          const y = i * (barH * 2 + gap + 8);
          const w1 = (sinContratar[i] / max) * 170;
          const w2 = (conContratar[i] / max) * 170;
          return (
            <g key={m}>
              <text x={0} y={y + barH - 3} fontSize="8" fill="#64748b">
                {m}
              </text>
              <rect x={42} y={y} width={w1} height={barH} fill="#10b981" rx="3" opacity="0.8" />
              <text x={42 + w1 + 3} y={y + barH - 3} fontSize="8" fill="#10b981">
                ${sinContratar[i]}M
              </text>
              <rect x={42} y={y + barH + 3} width={w2} height={barH} fill="#01c9f0" rx="3" opacity="0.7" />
              <text x={42 + w2 + 3} y={y + barH * 2} fontSize="8" fill="#01c9f0">
                ${conContratar[i]}M
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-4 mt-1">
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />
          Sin contratar
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-cyan-400">
          <span className="w-2 h-2 rounded-sm bg-cyan-400 inline-block" />
          Con 2 personas
        </span>
      </div>
    </div>
  );
}

function ChartExpenseDeviation() {
  const categories = [
    { label: "Servicios ext.", real: 84, avg: 60, severity: "high" },
    { label: "Transporte", real: 38, avg: 30, severity: "medium" },
    { label: "Consumibles", real: 18, avg: 15, severity: "low" },
  ];
  const max = 100;
  const barW = 18;
  const gap = 6;
  const groupW = barW * 2 + gap + 16;
  const chartH = 72;
  const colors = { high: "#f87171", medium: "#fb923c", low: "#fbbf24" };

  return (
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-medium">
        Desviación de gastos vs. promedio histórico (COP M)
      </p>
      <svg width="100%" viewBox={`0 0 ${groupW * 3} ${chartH + 36}`} className="overflow-visible">
        {categories.map((c, i) => {
          const x = i * groupW;
          const hR = (c.real / max) * chartH;
          const hA = (c.avg / max) * chartH;
          const col = colors[c.severity as keyof typeof colors];
          return (
            <g key={c.label}>
              <rect x={x} y={chartH - hA} width={barW} height={hA} fill="rgba(148,163,184,0.4)" rx="3" />
              <rect x={x + barW + gap} y={chartH - hR} width={barW} height={hR} fill={col} rx="3" opacity="0.9" />
              <text x={x + barW} y={chartH + 12} textAnchor="middle" fontSize="7.5" fill="#94a3b8">
                {c.label}
              </text>
              <text
                x={x + barW + gap + barW / 2}
                y={chartH - hR - 3}
                textAnchor="middle"
                fontSize="8"
                fill={col}
                fontWeight="600"
              >
                +{c.real - c.avg}M
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-4 mt-1">
        <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-slate-500 inline-block" />
          Promedio
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-red-400">
          <span className="w-2 h-2 rounded-sm bg-red-400 inline-block" />
          Real este mes
        </span>
      </div>
    </div>
  );
}

function ChartObligationsPriority() {
  const items = [
    { label: "Nómina y seguridad social", priority: 100, color: "#f87171", tag: "Crítico", date: "Día 1–5" },
    { label: "Retención en la fuente", priority: 75, color: "#fb923c", tag: "Alta", date: "Día 10" },
    { label: "Cuota crédito bancario", priority: 50, color: "#fbbf24", tag: "Media", date: "Día 15" },
    { label: "Aportes parafiscales", priority: 85, color: "#f87171", tag: "Crítico", date: "Día 20" },
  ];

  return (
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-medium">
        Obligaciones por prioridad — mes actual
      </p>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-slate-200">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500">{item.date}</span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ color: item.color, background: `${item.color}22` }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.priority}%`, background: item.color, opacity: 0.85 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartCreditScenario() {
  const months = ["M1", "M2", "M3", "M6", "M12", "M24"];
  const sinCredito = [100, 108, 115, 128, 144, 170];
  const conCredito = [300, 290, 278, 265, 258, 270];
  const min = 90;
  const max = 310;
  const W = 240;
  const H = 80;

  const toX = (i: number) => (i / (months.length - 1)) * W;
  const toY = (v: number) => H - ((v - min) / (max - min)) * H;

  const pathSin = months.map((_, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(sinCredito[i])}`).join(" ");
  const pathCon = months.map((_, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(conCredito[i])}`).join(" ");

  return (
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-medium">
        Proyección de caja — con y sin crédito $200M (COP M)
      </p>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} className="overflow-visible">
        <path d={pathSin} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
        <path d={pathCon} fill="none" stroke="#01c9f0" strokeWidth="2" strokeLinejoin="round" strokeDasharray="5 3" />
        {months.map((m, i) => (
          <g key={m}>
            <circle cx={toX(i)} cy={toY(sinCredito[i])} r="3" fill="#10b981" />
            <circle cx={toX(i)} cy={toY(conCredito[i])} r="3" fill="#01c9f0" />
            <text x={toX(i)} y={H + 14} textAnchor="middle" fontSize="8" fill="#64748b">
              {m}
            </text>
          </g>
        ))}
        <text x={W} y={toY(sinCredito[5]) - 5} textAnchor="end" fontSize="8" fill="#10b981">
          Sin crédito
        </text>
        <text x={W} y={toY(conCredito[5]) - 5} textAnchor="end" fontSize="8" fill="#01c9f0">
          Con crédito
        </text>
      </svg>
      <div className="flex gap-4 mt-1">
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />
          Sin crédito
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-cyan-400">
          <span className="w-2 h-2 rounded-sm bg-cyan-400 inline-block" />
          Con crédito $200M
        </span>
      </div>
    </div>
  );
}

export default function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mateo",
      text: "Hola. Soy Mateo Ríos. Puedo responder preguntas sobre la situación financiera de tu empresa. Selecciona una pregunta de ejemplo o escribe la tuya.",
    },
  ]);
  const [started, setStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chat = chatScrollRef.current;
    if (!chat) return;
    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleQuestion = (q: (typeof DEMO_QUESTIONS)[0], source: "chip" | "input") => {
    if (!started) {
      trackEvent("interactive_demo_started");
      setStarted(true);
    }
    trackEvent("suggested_question_clicked", { question: q.question, source });

    setMessages((prev) => [...prev, { role: "user", text: q.question }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "mateo",
          text: q.answer,
          chartId: CHART_MAP[q.question],
        },
      ]);
    }, 1200);
  };

  function renderChart(chartId?: string) {
    if (!chartId) return null;
    const charts: Record<string, JSX.Element> = {
      cashflow_week: <ChartCashflowWeek />,
      overdue_clients: <ChartOverdueClients />,
      hiring_scenario: <ChartHiringScenario />,
      expense_deviation: <ChartExpenseDeviation />,
      obligations_priority: <ChartObligationsPriority />,
      credit_scenario: <ChartCreditScenario />,
    };
    return charts[chartId] ?? null;
  }

  return (
    <section id="demo-interactiva" className="pt-20 pb-12 lg:pt-28 lg:pb-16 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-500/20 text-emerald-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Demo interactiva
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Hazle una pregunta a Mateo Ríos
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Selecciona una pregunta de ejemplo y mira cómo respondería Mateo con la información
            financiera de tu empresa.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200 text-sm">
            Esta es una <strong>demostración simulada</strong> con respuestas de ejemplo. No está conectada
            a datos reales. Para ver a Mateo con la información de tu empresa, solicita una demo.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">

          {/* Chat window */}
          <div className="bg-[#101b37] border border-white/10 rounded-2xl flex flex-col overflow-hidden" style={{ height: 560 }}>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Mateo Ríos</p>
                <p className="text-emerald-400 text-xs">Empleado Digital · Finanzas</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs">En línea</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "mateo" && (
                    <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "chat-bubble-user"
                        : "chat-bubble-mateo"
                    }`}
                  >
                    {msg.text}
                    {msg.role === "mateo" && renderChart(msg.chartId)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="chat-bubble-mateo px-4 py-3 rounded-2xl">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Suggested questions + CTA */}
          <div className="space-y-4">
            <p className="text-slate-400 text-sm font-medium">Preguntas sugeridas:</p>
            <div className="space-y-2">
              {DEMO_QUESTIONS.map((q) => (
                <button
                  key={q.question}
                  onClick={() => handleQuestion(q, "chip")}
                  disabled={isTyping}
                  className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl px-4 py-3 text-slate-300 text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &ldquo;{q.question}&rdquo;
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-slate-400 text-xs mb-3">
                ¿Quieres ver esto con los datos reales de tu empresa?
              </p>
              <a
                href="#demo-form"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 text-sm"
              >
                Solicitar demo real
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
