"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const { pathname } = useRouter(); // Accedemos al pathname

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis; // Eliminamos la instancia al desmontar
    };
  }, [pathname]); // Este useEffect se ejecuta solo una vez al montar

  return null;
}
