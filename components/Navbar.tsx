"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [bgOpacity, setBgOpacity]       = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  /* Oscurece progresivamente desde el primer pixel de scroll */
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.4), 1);
      setBgOpacity(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Desaparece cuando el video del scrollytelling está activo */
  useEffect(() => {
    const onVideoOn  = () => setVideoPlaying(true);
    const onVideoOff = () => setVideoPlaying(false);
    window.addEventListener("scrolly-video-on",  onVideoOn);
    window.addEventListener("scrolly-video-off", onVideoOff);
    return () => {
      window.removeEventListener("scrolly-video-on",  onVideoOn);
      window.removeEventListener("scrolly-video-off", onVideoOff);
    };
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: `rgba(16, 27, 55, ${bgOpacity * 0.92})`,
        backdropFilter:  bgOpacity > 0.05 ? `blur(${bgOpacity * 12}px)` : "none",
        borderBottom:    `1px solid rgba(255,255,255,${bgOpacity * 0.1})`,
        boxShadow:       bgOpacity > 0.6 ? `0 4px 24px rgba(0,0,0,${bgOpacity * 0.3})` : "none",
        opacity:         videoPlaying ? 0 : 1,
        pointerEvents:   videoPlaying ? "none" : "auto",
        transition:      "opacity 0.7s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0" aria-label="Ir al inicio">
          <Image
            src="/logo.png"
            alt="Geostrategy"
            width={65}
            height={12}
            priority
            className="h-3 w-auto"
          />
        </a>

        {/* CTA */}
        <a
          href="#demo-form"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: "#01c9f0",
            color: "#101b37",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#00b3d6")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#01c9f0")}
        >
          Solicitar demo
        </a>
      </div>
    </header>
  );
}
