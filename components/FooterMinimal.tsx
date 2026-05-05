export default function FooterMinimal() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Mateo Ríos</p>
              <p className="text-slate-400 text-xs">Empleado Digital · Gestión del Conocimiento Financiero</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <span>Diseñado para empresas colombianas</span>
            <span className="hidden sm:block">·</span>
            <a href="#demo-form" className="hover:text-emerald-400 transition-colors">
              Solicitar demo
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Mateo Ríos — Empleado Digital de Gestión del Conocimiento Financiero.
            Las integraciones, cifras de implementación y KPIs mencionados están sujetos a validación en
            diagnóstico técnico por empresa. No se garantizan resultados específicos.
          </p>
        </div>
      </div>
    </footer>
  );
}
