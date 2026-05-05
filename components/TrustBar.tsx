import { TRUST_ITEMS } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export default function TrustBar() {
  return (
    <div className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2 text-slate-300 text-sm whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 text-xs mt-3">
          * Sujeto a validación en diagnóstico técnico por empresa.
        </p>
      </div>
    </div>
  );
}
