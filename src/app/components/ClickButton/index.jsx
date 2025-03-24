"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ClickButtonMarker() {
  const clickButtonRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const vw = window.innerWidth / 100;
      const offsetX = 2 * vw; // 4vw
      const offsetY = 2 * vw; // 4vw

      gsap.to(clickButtonRef.current, {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const covers = document.querySelectorAll(".project-cover");
    covers.forEach((cover) => {
      cover.addEventListener("mouseenter", () => {
        gsap.to(clickButtonRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.4,
        });
      });
      cover.addEventListener("mouseleave", () => {
        gsap.to(clickButtonRef.current, {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          duration: 0.2,
        });
      });
      cover.addEventListener("click", () => {
        gsap.to(clickButtonRef.current, {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          duration: 0.2,
        });
      });
    });
  }, []);

  return (
    <div
      id="clickbutton-wrapper"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "9999",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <div
        ref={clickButtonRef}
        id="clickbutton"
        style={{
          position: "absolute",
          padding: "1vw 1.75vw",
          backgroundColor: "var(--light-color)",
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          overflow: "hidden",
        }}
      >
        <p>Click</p>
      </div>
    </div>
  );
}
