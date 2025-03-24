"use client";

import "./goback.css";
import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

export default function GoBack() {
  const handleClick = (e) => {
    gsap.to("#page-content", {
      opacity: 0,
      duration: 0.4,
      ease: "inOutQuart",
    });

    const infoProject = document.querySelector("#page_content_total");
    infoProject.style.display = "none";

    window.history.back();
  };

  return (
    <Link href="/" className="goback-button" onClick={handleClick}>
      <p>Cerrar</p>
    </Link>
  );
}
