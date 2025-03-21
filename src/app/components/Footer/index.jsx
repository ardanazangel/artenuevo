"use client";

import "./footer.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    gsap.to(".footer", {
      clipPath: "polygon(42% 50%, 58% 50%, 58% 70%, 42% 70%)",
      scrollTrigger: {
        trigger: "#footer__section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Refresh ScrollTrigger after loading projects
    ScrollTrigger.refresh();

    return () => {
      // Cleanup animation and ScrollTrigger
    };
  }, []);

  return (
    <section id="footer__section">
      <div className="footer"></div>
    </section>
  );
}
