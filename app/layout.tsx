import type { Metadata } from "next";
import { Heebo, Manrope, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mateo Ríos — Gestión del Conocimiento Financiero para Empresas Colombianas",
  description:
    "Mateo Ríos responde tus preguntas sobre caja, cartera y rentabilidad en segundos. Decisiones gerenciales informadas, sin reportes tardíos.",
  keywords: [
    "gestión financiera empresas colombianas",
    "inteligencia artificial financiera",
    "copiloto financiero gerencial",
    "empleado digital financiero",
  ],
  openGraph: {
    title: "Mateo Ríos — Tu copiloto financiero empresarial",
    description:
      "Convierte la información financiera dispersa de tu empresa en respuestas claras, oportunas y accionables.",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-CO"
      className={cn("scroll-smooth", heebo.variable, manrope.variable, dmSans.variable)}
    >
      <head>
        {GTM_ID && (
          // eslint-disable-next-line @next/next/next-script-for-ga
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Mateo Ríos",
              description:
                "Empleado digital especializado en gestión del conocimiento financiero para empresas colombianas.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
            }),
          }}
        />
      </head>
      <body className="antialiased font-body">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
