"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 md:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <a
        href="#demo-form"
        onClick={() => trackEvent("hero_cta_click", { source: "sticky_cta" })}
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-7 py-4 rounded-full shadow-xl shadow-emerald-500/40 transition-all duration-200 text-sm"
      >
        Solicitar demo gratuita
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
