"use client";
import "./contenido.css";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function Contenido() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const contentScroll = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.querySelector("#page_content"),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      orientation: "vertical",
    });

    function raf(time) {
      contentScroll.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      contentScroll.destroy();
    };
  }, []);

  return (
    <div
      id="page_content_total"
      ref={scrollRef}
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div id="page_content" style={{ minHeight: "150vh" }}>
        <h2>Titulo</h2>
      </div>
    </div>
  );
}
