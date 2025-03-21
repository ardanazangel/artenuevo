"use client";

import { useEffect } from "react";
import gsap from "gsap";

const ScrollTop = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        if (window.lenis) window.lenis.stop();

        window.scrollTo(0, 0);

        gsap.fromTo(
          ".title__wrapper h1",
          { opacity: 0, y: "50%" },
          { opacity: 1, y: 0, duration: 1.5, ease: "inOutQuart" }
        );
        gsap.fromTo(
          ".hero-img__wrapper",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "inOutQuart" }
        );

        // Agregar clase para cambiar el cursor
        document.documentElement.classList.add("cursor-wait");

        setTimeout(() => {
          if (window.lenis) window.lenis.start();

          // Quitar clase después de 1 segundo
          setTimeout(() => {
            document.documentElement.classList.remove("cursor-wait");
          }, 1000);
        }, 1500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
};

export default ScrollTop;
