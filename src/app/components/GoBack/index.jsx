"use client";

import "./goback.css";
import { Link } from "next-view-transitions";
import { useEffect } from "react";
import gsap from "gsap";

export default function GoBack() {
  useEffect(() => {
    gsap.to(".goback-button", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      delay: 1,
      ease: "inOutQuart",
    });
  });
  return (
    <Link href="/" className="goback-button" scroll={false}>
      <p>Cerrar</p>
    </Link>
  );
}
