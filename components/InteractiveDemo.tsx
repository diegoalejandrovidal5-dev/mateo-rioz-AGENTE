"use client";

import { useState, useRef, useEffect } from "react";
import { DEMO_QUESTIONS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { Bot, AlertTriangle, ArrowRight } from "lucide-react";

type Message = { role: "user" | "mateo"; text: string };

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
      setMessages((prev) => [...prev, { role: "mateo", text: q.answer }]);
    }, 1200);
  };

  return (
    <section id="demo-interactiva" className="pt-20 pb-0 lg:pt-28 lg:pb-0 bg-slate-900">
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
          <div className="bg-[#101b37] border border-white/10 rounded-2xl flex flex-col overflow-hidden" style={{ height: 480 }}>
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
