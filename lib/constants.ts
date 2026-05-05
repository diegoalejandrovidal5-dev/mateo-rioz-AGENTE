// ─── A/B VARIANT ───────────────────────────────────────────────────────────────
export const AB_VARIANT = (process.env.NEXT_PUBLIC_AB_VARIANT ?? "A") as "A" | "B" | "C";

export const HERO_HEADLINES: Record<"A" | "B" | "C", { title: string; subtitle: string; cta: string }> = {
  A: {
    title: "Deja de tomar decisiones financieras a ciegas",
    subtitle:
      "Mateo Ríos responde en segundos tus preguntas sobre caja, cartera y rentabilidad — con la información que ya existe en tu empresa.",
    cta: "Solicitar demo gratuita",
  },
  B: {
    title: "Tu información financiera en segundos, sin esperar reportes",
    subtitle:
      "Mateo Ríos convierte los datos de tu empresa en respuestas claras para que tomes decisiones con control, no con intuición.",
    cta: "Quiero ver cómo funciona",
  },
  C: {
    title: "Pregunta. Obtén respuesta. Decide. En segundos.",
    subtitle:
      "Mateo Ríos es el copiloto financiero que entiende la información de tu empresa y te la explica en lenguaje ejecutivo, sin intermediarios.",
    cta: "Solicitar mi demo",
  },
};

// ─── TRUST BAR ─────────────────────────────────────────────────────────────────
export const TRUST_ITEMS = [
  "Diseñado para empresas colombianas",
  "Compatible con Siigo, World Office, SAP B1 y más*",
  "Lenguaje ejecutivo, no contable",
  "No reemplaza a tu contador",
  "Implementación estimada: 2–4 semanas*",
];

// ─── PROBLEM SECTION ───────────────────────────────────────────────────────────
export const PAIN_POINTS = [
  {
    icon: "Clock",
    title: "Reportes que llegan tarde",
    description: "Para cuando el informe contable llega a tu escritorio, el momento de actuar ya pasó.",
  },
  {
    icon: "UserCheck",
    title: "Dependencia del contador",
    description: "Necesitas intermediarios para saber si tu caja está bien. Eso no debería ser así.",
  },
  {
    icon: "AlertTriangle",
    title: "Cartera vencida detectada tarde",
    description: "El deterioro del recaudo se acumula silenciosamente hasta que se convierte en un problema real.",
  },
  {
    icon: "HelpCircle",
    title: "Decisiones basadas en intuición",
    description: "Sin datos claros, decides con experiencia. A veces funciona. A veces cuesta caro.",
  },
  {
    icon: "TrendingDown",
    title: "Presión de caja sin alertas",
    description: "La caja se aprieta antes de que te des cuenta. Para entonces las opciones son pocas.",
  },
  {
    icon: "Layers",
    title: "Información dispersa entre áreas",
    description: "Contabilidad, ventas y administración tienen los datos. Nadie los conecta para ti.",
  },
  {
    icon: "Calculator",
    title: "No puedes simular \"¿qué pasa si...?\"",
    description: "Contratar, invertir o endeudarse sin una simulación es apostar más de lo necesario.",
  },
];

// ─── BENEFITS ──────────────────────────────────────────────────────────────────
export const BENEFITS = [
  {
    icon: "Zap",
    title: "Respuestas financieras instantáneas",
    description:
      "Pregunta por la caja, el margen o la cartera y obtén una respuesta en segundos, sin esperar al cierre contable.",
    kpi: "Tiempo de respuesta: de días a segundos*",
  },
  {
    icon: "MessageSquare",
    title: "Lenguaje ejecutivo, no contable",
    description:
      "Mateo traduce los datos técnicos a frases que cualquier gerente entiende, sin necesidad de formación financiera.",
    kpi: "Decisiones más informadas para usuarios no financieros*",
  },
  {
    icon: "Bell",
    title: "Alertas proactivas de riesgo",
    description:
      "Mateo detecta señales de presión de caja, cartera vencida o desviación de gastos antes de que se conviertan en crisis.",
    kpi: "Anticipación de riesgos financieros operativos*",
  },
  {
    icon: "BarChart2",
    title: "Simulación de escenarios gerenciales",
    description:
      "Evalúa el impacto de contratar, invertir o tomar crédito sobre el flujo de caja y el margen, antes de decidir.",
    kpi: "Escenarios simulados con supuestos trazables*",
  },
  {
    icon: "Link",
    title: "Integración con sistemas existentes",
    description:
      "Opera sobre la información que ya tienes en tu ERP o software contable. Sin migración, sin duplicidad.",
    kpi: "Compatible con entornos donde existan fuentes estructuradas*",
  },
  {
    icon: "Shield",
    title: "Trazabilidad de respuestas",
    description:
      "Cada respuesta incluye la fuente y los supuestos usados. Puedes verificar, cuestionar y auditar.",
    kpi: "Transparencia total en el origen de cada análisis*",
  },
  {
    icon: "Users",
    title: "Escalamiento a criterio humano",
    description:
      "Cuando la decisión requiere juicio especializado, Mateo lo reconoce y escala al responsable adecuado.",
    kpi: "Límites claros entre IA y juicio financiero humano*",
  },
];

// ─── INDUSTRY USE CASES ────────────────────────────────────────────────────────
export const INDUSTRY_CASES = [
  {
    sector: "Servicios",
    icon: "Briefcase",
    pain: "Márgenes variables por proyecto, dificultad para saber cuáles son realmente rentables.",
    question: "¿Cuál de mis contratos activos está afectando más mi margen este mes?",
    answer:
      "Mateo compara ingresos y costos por proyecto, identifica los de menor rentabilidad y muestra las variables que los están deteriorando.",
    benefit: "Reasignación de recursos hacia proyectos con mejor margen.",
  },
  {
    sector: "Comercio",
    icon: "ShoppingCart",
    pain: "Flujo de caja irregular por ciclos de compra, cartera vencida y rotación de inventario.",
    question: "¿Qué clientes están afectando más mi flujo de caja esta semana?",
    answer:
      "Mateo identifica los clientes con mayor cartera vencida, prioriza el riesgo de recaudo y sugiere acciones de cobro concretas.",
    benefit: "Mejora del ciclo de recaudo y anticipación de presiones de liquidez.",
  },
  {
    sector: "Manufactura",
    icon: "Factory",
    pain: "Costos de producción variables, riesgo de inventarios ociosos y presión sobre el margen bruto.",
    question: "¿Mi costo de producción esta semana se desvió del promedio histórico?",
    answer:
      "Mateo compara el costo real versus el promedio, identifica los insumos o líneas con mayor desviación y cuantifica el impacto en margen.",
    benefit: "Control proactivo del margen bruto antes del cierre contable.",
  },
  {
    sector: "Distribución",
    icon: "Truck",
    pain: "Alta rotación de inventario, presión logística y márgenes ajustados por cliente o ruta.",
    question: "¿Qué rutas o clientes tienen el peor margen neto este trimestre?",
    answer:
      "Mateo cruza ingresos, costos logísticos y márgenes por ruta o cliente para identificar dónde se está perdiendo rentabilidad.",
    benefit: "Optimización de cartera de clientes y decisiones de precios más informadas.",
  },
  {
    sector: "Construcción",
    icon: "HardHat",
    pain: "Proyectos con presupuesto variable, anticipos, retenciones y flujo de caja difícil de predecir.",
    question: "¿Cómo está el flujo de caja del proyecto X frente a lo presupuestado?",
    answer:
      "Mateo contrasta el flujo real contra el presupuesto del proyecto, identifica desviaciones y anticipa presiones de liquidez por retenciones o sobrecostos.",
    benefit: "Control financiero por proyecto en tiempo real, sin esperar informes de obra.",
  },
];

// ─── INTERACTIVE DEMO ──────────────────────────────────────────────────────────
export const DEMO_QUESTIONS: { question: string; answer: string }[] = [
  {
    question: "¿Cómo está mi flujo de caja esta semana?",
    answer:
      "Basado en la información disponible, el saldo de caja disponible es positivo, con ingresos proyectados por recaudo de cartera y egresos comprometidos por nómina y proveedores. El punto de mayor tensión se presenta el jueves por el pago de obligaciones laborales. Te recomiendo revisar el recaudo de los 3 clientes con facturas más próximas a vencer.",
  },
  {
    question: "¿Qué clientes están retrasando más el recaudo?",
    answer:
      "Los 3 clientes con mayor cartera vencida concentran aproximadamente el 60% del saldo pendiente de cobro. El de mayor antigüedad lleva más de 60 días sin pago. Puedo generar un resumen de cartera por antigüedad para que el equipo comercial priorice el cobro esta semana.",
  },
  {
    question: "¿Puedo contratar dos personas más sin afectar la caja?",
    answer:
      "Con el nivel actual de caja y los ingresos proyectados del mes, incorporar dos personas adicionales representaría un incremento mensual en nómina. El escenario es viable si el recaudo de los próximos 30 días se mantiene al ritmo actual. Si la cartera vencida no se recupera en las próximas 2 semanas, el margen de maniobra se reduce. ¿Quieres que simule los dos escenarios?",
  },
  {
    question: "¿Qué gastos se desviaron frente al promedio?",
    answer:
      "Este mes se identifican desviaciones relevantes en tres categorías: servicios externos (por encima del promedio), gastos de transporte (desviación moderada) y consumibles de oficina (leve). En conjunto representan una desviación positiva frente al promedio histórico. ¿Quieres el detalle por área o proveedor?",
  },
  {
    question: "¿Qué obligaciones debo priorizar este mes?",
    answer:
      "Las obligaciones más próximas incluyen: pago de nómina, aportes parafiscales, cuota de crédito bancario y retención en la fuente. En orden de prioridad por impacto legal y operativo: nómina y seguridad social primero, obligaciones tributarias segundo. La cuota de crédito puede negociarse con mayor margen de tiempo si la caja se aprieta.",
  },
  {
    question: "¿Qué pasaría si tomo un crédito de $200 millones?",
    answer:
      "Un crédito de COP 200 millones a 36 meses con tasa aproximada del mercado representaría una cuota mensual estimada. Con el flujo de caja actual, el servicio de deuda es cubierto con un margen positivo, siempre que los ingresos se mantengan en el nivel de los últimos 3 meses. El mayor riesgo es la concentración de cartera: si los 2 clientes principales no pagan puntual, el margen de cobertura se reduce. ¿Quieres ver el escenario pesimista?",
  },
];

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    icon: "Database",
    title: "Conecta tu información financiera",
    description:
      "Mateo se integra con tu ERP, software contable o fuentes estructuradas existentes. Sin migración completa, sin duplicar datos.",
  },
  {
    number: "02",
    icon: "Cpu",
    title: "Organiza y contextualiza los datos",
    description:
      "Mateo estructura la información financiera, contable y administrativa para que sea consultable en lenguaje natural.",
  },
  {
    number: "03",
    icon: "MessageCircle",
    title: "Haz preguntas en lenguaje natural",
    description:
      "El gerente pregunta como si hablara con un analista de confianza. Mateo entiende el contexto financiero del negocio.",
  },
  {
    number: "04",
    icon: "Lightbulb",
    title: "Recibe respuestas, alertas y simulaciones",
    description:
      "Respuestas claras con trazabilidad de fuente, alertas proactivas de riesgo y escenarios simulados para decisiones informadas.",
  },
];

// ─── COMPARISON TABLE ──────────────────────────────────────────────────────────
export const COMPARISON_ROWS = [
  { variable: "Tiempo de respuesta", reporte: "Días / semanas", dashboard: "Minutos", erp: "Minutos", consultor: "Horas / días", mateo: "Segundos" },
  { variable: "Lenguaje ejecutivo", reporte: "No", dashboard: "Parcial", erp: "No", consultor: "Sí", mateo: "Sí" },
  { variable: "Alertas proactivas", reporte: "No", dashboard: "Limitado", erp: "No", consultor: "Sí (periódico)", mateo: "Sí (continuo)" },
  { variable: "Simulación de escenarios", reporte: "No", dashboard: "No", erp: "Limitado", consultor: "Sí", mateo: "Sí" },
  { variable: "Trazabilidad de respuestas", reporte: "Alta", dashboard: "Media", erp: "Alta", consultor: "Variable", mateo: "Alta" },
  { variable: "Accesible para no financieros", reporte: "No", dashboard: "Parcial", erp: "No", consultor: "Sí", mateo: "Sí" },
  { variable: "Opera sobre datos existentes", reporte: "Sí", dashboard: "Sí", erp: "Sí", consultor: "Sí", mateo: "Sí" },
  { variable: "Soporte a decisión gerencial", reporte: "Indirecto", dashboard: "Indirecto", erp: "Indirecto", consultor: "Directo", mateo: "Directo" },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    question: "Ya tengo contador y software contable. ¿Para qué necesito esto?",
    answer:
      "Mateo Ríos no reemplaza a tu contador ni a tu software. Los complementa. Tu contador registra y cierra la contabilidad. Tu ERP guarda los datos. Mateo traduce esa información en respuestas claras para que tú, como gerente, puedas decidir sin depender de un intermediario cada vez que necesitas saber el estado real del negocio.",
  },
  {
    question: "No sé si mis datos están organizados. ¿Funciona igual?",
    answer:
      "El diagnóstico técnico inicial identifica qué información está disponible, en qué formato y qué tan estructurada está. Mateo puede operar con información parcial y va ampliando su base de conocimiento a medida que los datos mejoran. No necesitas tener todo perfecto para empezar.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El modelo de inversión se define según el tamaño de la empresa, el volumen de información y el alcance del diagnóstico técnico. Conversemos en una demo para presentarte una propuesta ajustada a tu realidad.",
  },
  {
    question: "¿Cuánto tarda en implementarse?",
    answer:
      "La estimación de implementación inicial es de 2 a 4 semanas, dependiendo de la disponibilidad y estructura de la información financiera de tu empresa. Este dato está sujeto a validación en el diagnóstico técnico de cada proyecto.",
  },
  {
    question: "¿La IA puede equivocarse?",
    answer:
      "Sí, y por eso Mateo siempre indica la fuente y los supuestos de cada respuesta. No entrega cifras sin trazabilidad. Cuando la información disponible es insuficiente o ambigua, lo dice explícitamente y escala al responsable humano. La transparencia es parte del diseño, no un accesorio.",
  },
  {
    question: "¿Qué pasa con la seguridad de la información?",
    answer:
      "La arquitectura de Mateo contempla control de acceso por roles, auditoría de consultas y manejo de información sensible bajo estándares de seguridad empresarial. Los detalles específicos de implementación se definen en el diagnóstico técnico, adaptados al entorno de cada empresa.",
  },
  {
    question: "¿Mi equipo financiero lo va a usar?",
    answer:
      "Mateo está diseñado para que lo usen los gerentes, dueños y tomadores de decisión, no solo el equipo financiero. La interfaz es conversacional y no requiere formación contable. El equipo financiero sigue siendo el responsable de los datos; Mateo es el canal para que la gerencia los entienda y los use.",
  },
  {
    question: "¿Esto reemplaza al gerente financiero?",
    answer:
      "No. Mateo cubre la demanda de información financiera rutinaria y el soporte a decisiones operativas del día a día. Las decisiones estratégicas complejas, la negociación con bancos, la planificación financiera de largo plazo y el juicio experto siguen siendo responsabilidad de personas. Mateo libera tiempo del equipo financiero para lo que realmente requiere criterio humano.",
  },
];

// ─── VIDEO SCRIPT ──────────────────────────────────────────────────────────────
export const VIDEO_SCENES = [
  "Escena 1: Un gerente frente a su computador pregunta '¿Cómo está nuestra caja esta semana?'",
  "Escena 2: Mateo Ríos consulta la información financiera de la empresa en segundos.",
  "Escena 3: Respuesta en lenguaje ejecutivo: saldo disponible, ingresos proyectados, egresos comprometidos.",
  "Escena 4: Alerta proactiva: 'Tienes 3 clientes con cartera vencida que representan el 40% del recaudo proyectado.'",
  "Escena 5: Recomendación trazable y accionable: priorizar cobro a esos clientes antes del jueves.",
];
