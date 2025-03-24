"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export default function TotalScroll() {
  const pathname = usePathname();

  useEffect(() => {
    CustomEase.create("inOutQuart", "0.65, 0, 0.22, 1");
  }, []);

  useEffect(() => {
    gsap.to(".hero-img__wrapper", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "linear",
      scrollTrigger: {
        trigger: "#hero__scroll-tracker__wrapper",
        start: "top top", // When image top hits viewport bottom
        end: "center center", // When image bottom hits viewport center
        scrub: true, // Smooth animation
      },
    });

    gsap.to(".hero-img__white-element", {
      transform: "scale(1)",
      ease: "linear",
      scrollTrigger: {
        trigger: "#hero__scroll-tracker__wrapper",
        start: "75% bottom", // When image top hits viewport bottom
        end: "bottom bottom", // When image bottom hits viewport center
        scrub: true, // Smooth animation
      },
    });

    gsap.to(".navbar__element", {
      color: "#000000",
      scrollTrigger: {
        trigger: "#projects__section",
        start: "top bottom", // Cuando la parte superior de la imagen llega al fondo del viewport
        end: "1% bottom", // Cuando la parte inferior de la imagen llega al centro del viewport
        scrub: true, // Animación suave
      },
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".title__wrapper",
      {
        opacity: 0,
        y: "50%",
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "inOutQuart", // Use the custom easing
      }
    );
  }, [pathname]);
  return (
    <div id="hero__scroll-tracker__wrapper">
      <div id="hero__scroll-tracker">
        <section id="hero__wrapper">
          <div className="title__wrapper">
            <h1>Artenuevo</h1>
          </div>
          <div className="hero-img__wrapper">
            <iframe
              src="https://player.vimeo.com/video/483212598?autoplay=1&muted=1&loop=1&controls=0&dnt=1&app_id=122963"
              width="1920"
              height="1080"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vimeo Video"
              className="hero-img__element"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                minHeight: "100vh",
                minWidth: "calc(148.148vh)",
                height: "calc(67.5vw)",
              }}
            ></iframe>
          </div>
          <div className="hero-img__white-element"></div>
        </section>
      </div>
    </div>
  );
}
