/** @type {import('next').NextConfig} */
/**
 * Desarrollo usa `.next` (comportamiento estándar de Next): HMR estable y menos 404 en chunks.
 * `next build` / `next start` siguen usando `.cache/next` como antes (export estático).
 */
const argv = process.argv;
const useExportDist = argv.includes("build") || argv.includes("start");
const distDir = useExportDist ? ".cache/next" : ".next";

const nextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
  distDir,
  images: {
    unoptimized: true,
  },
  /** Menos páginas/chunks desalojados en caliente durante `next dev` (menos “planos” intermitentes). */
  ...(useExportDist
    ? {}
    : {
        onDemandEntries: {
          maxInactiveAge: 120_000,
          pagesBufferLength: 10,
        },
      }),
};

export default nextConfig;
