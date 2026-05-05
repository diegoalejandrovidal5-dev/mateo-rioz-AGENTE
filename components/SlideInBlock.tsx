"use client";

import { motion } from "framer-motion";

interface SlideInBlockProps {
  children: React.ReactNode;
  /** Delay en segundos antes de que empiece la animación */
  delay?: number;
  className?: string;
}

export default function SlideInBlock({
  children,
  delay = 0,
  className = "",
}: SlideInBlockProps) {
  return (
    /* Contenedor de la mitad izquierda */
    <div className="w-full overflow-hidden">
      <motion.div
        className={`w-full sm:w-1/2 ${className}`}
        initial={{ x: "-110%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1],   /* expo-out — arranque rápido, frenado suave */
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
