"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip, CustomEase } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import "./proyectos.css";
import ClickButtonMarker from "../ClickButton";
import Link from "next/link";
import Contenido from "../Contenido";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export default function Proyectos({ data }) {
  const imagesRef = useRef([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    CustomEase.create("inOutQuart", "0.65, 0, 0.22, 1");
  }, []);
  // Configuración de covers e imagenes
  const getRandomPosition = (index) => {
    const pattern = [3, 1, 4, 2]; // Patrón predefinido
    return pattern[index % pattern.length];
  };
  const projects = data.map((item, index) => ({
    id: item.id,
    position: getRandomPosition(index),
    form: ["square", "rectangle-v", "rectangle-h", "rectangle-l"][index % 4], // Alterna formatos
    image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
  }));

  useEffect(() => {
    const covers = document.querySelectorAll(".project-cover");
    let isAnimating = false;
    let hoverTimeout = null;

    covers.forEach((cover) => {
      let originalParent = cover.parentElement;
      let imgNumber = cover.dataset.img;

      cover.addEventListener("mouseenter", () => {
        if (isAnimating || pathname !== "/") return; // Verificación de pathname

        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          isAnimating = true;

          if (window.lenis) window.lenis.stop();

          const state = Flip.getState(cover);

          const targetContainer = cover.classList.contains("left")
            ? document.querySelector(".secondary-container-left")
            : document.querySelector(".secondary-container-right");

          if (targetContainer) {
            targetContainer.appendChild(cover);
          }

          covers.forEach((otherCover) => {
            if (otherCover !== cover) {
              gsap.to(otherCover, {
                scale: 0,
                duration: 0.4,
                ease: "inOutQuart",
                pointerEvents: "none", // Deshabilitar eventos de ratón para el cover que se mueve
              });
            }
          });

          document.querySelectorAll(".img").forEach((img) => {
            gsap.to(img, { opacity: 0, duration: 0, delay: 0.6 });
          });

          gsap.set(`.img-${imgNumber}`, { opacity: 1, zIndex: 999 });
          gsap.set(".img", { width: "50%" });

          gsap.to(`.img-${imgNumber}`, {
            opacity: 1,
            duration: 0.8,
            ease: "inOutQuart",
            display: "flex",
            width: "100%",
            onComplete: () => (isAnimating = false),
          });

          gsap.to(".row-info", { opacity: 0, duration: 0.2 });

          Flip.from(state, { duration: 0.9, ease: "inOutQuart" }, 2000);
        }, 100);
      });

      cover.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);
        if (isAnimating || pathname !== "/") return; // Verificación de pathname
        isAnimating = true;
        if (window.lenis) window.lenis.start();

        const secondState = Flip.getState(cover);

        originalParent.appendChild(cover);

        Flip.from(secondState, {
          duration: 0.9,
          ease: "inOutQuart",
        });

        covers.forEach((otherCover) => {
          if (otherCover !== cover) {
            gsap.to(otherCover, {
              scale: 1,
              duration: 0.8,
              delay: 1,
              ease: "inOutQuart",
              onComplete: () => {
                otherCover.style.pointerEvents = "auto";
              },
            });
          }
        });

        gsap.set(".row-info", { opacity: 0 });

        gsap.to(".row-info", {
          opacity: 1,
          duration: 0.2,
          delay: 0.8,
        });

        gsap.to(".img", {
          opacity: 1,
          duration: 0,
          display: "flex",
          width: "50%",
          delay: 1,
          zIndex: "",
          onComplete: () => (isAnimating = false),
        });
      });
    });
  }, [pathname]);

  // Cambio de las imágenes según la posición definida
  useEffect(() => {
    if (!imagesRef.current || imagesRef.current.length === 0) return;

    const positionImageMap = {
      1: 0, // Primera imagen
      2: 1, // Segunda imagen
      3: 2, // Tercera imagen
      4: 3, // Cuarta imagen
    };

    // Agrupar proyectos por posición (usando projects)
    const projectsByPosition = {};
    projects.forEach((project) => {
      if (!projectsByPosition[project.position]) {
        projectsByPosition[project.position] = [];
      }
      projectsByPosition[project.position].push(project);
    });

    // Crear ScrollTriggers para cada proyecto
    Object.entries(projectsByPosition).forEach(
      ([position, projectsInPosition]) => {
        projectsInPosition.forEach((project) => {
          ScrollTrigger.create({
            trigger: `.row-${project.id} .cover-${project.position}`,
            start: "top bottom",
            markers: false,
            onEnter: () => updateImage(project),
            onEnterBack: () => updateImage(project),
            id: `trigger-${project.id}`,
          });
        });
      }
    );

    function updateImage(project) {
      const imgIndex = positionImageMap[project.position];
      if (imgIndex === undefined || !imagesRef.current[imgIndex]) return;

      // Actualizar la imagen usando la ruta proveniente de data (a través de projects)
      gsap.to(imagesRef.current[imgIndex], {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          imagesRef.current[imgIndex].src = project.image;
          gsap.to(imagesRef.current[imgIndex], { opacity: 1, duration: 0 });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagesRef, projects]);

  return (
    <section className="projects-section">
      <Contenido />
      <ClickButtonMarker />
      <div className="mask">
        <div className="project-cover-wrapper">
          {projects.map((project) => {
            const side = project.position <= 2 ? "left" : "right";
            return (
              <div className={`row row-${project.id}`} key={project.id}>
                <Link
                  scroll={false}
                  className={`project-cover cover-${project.position} ${side} ${project.form}`}
                  data-img={project.position}
                  href={`/${
                    data[projects.findIndex((p) => p.id === project.id)]
                      ?.slug || ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const infoProject = document.querySelector(
                      "#page_content_total"
                    );
                    infoProject.style.display = "block";
                    router.push(
                      `/${
                        data[projects.findIndex((p) => p.id === project.id)]
                          ?.slug || ""
                      }`
                    );
                    const mainElement = document.querySelector("main");
                    if (mainElement) {
                      mainElement.className = "";
                      mainElement.classList.add(
                        side === "left" ? "left" : "right"
                      );
                    }
                  }}
                ></Link>
              </div>
            );
          })}
        </div>

        <div className="cover-secondary-container">
          <div className="secondary-container-left"></div>
          <div className="secondary-container-right"></div>
        </div>
      </div>
      <div className="project-cover-wrapper-info">
        {projects.map((project, index) => {
          const side = project.position <= 2 ? "left" : "right";
          const item = data[index];
          return (
            <div className="row row-info" key={`info-${project.id}`}>
              {item && (
                <p className={`info cover-${project.position} ${side}`}>
                  {item.title.rendered}, 2024
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="images-background">
        <div className="img-container images-background-left">
          <div className="img img-1">
            <img
              ref={(el) => (imagesRef.current[0] = el)}
              src={null}
              alt="Imagen de proyecto"
            />
          </div>
          <div className="img img-2">
            <img
              ref={(el) => (imagesRef.current[1] = el)}
              src={null}
              alt="Imagen de proyecto"
            />
          </div>
        </div>
        <div className="img-container images-background-right">
          <div className="img img-3">
            <img
              ref={(el) => (imagesRef.current[2] = el)}
              src={null}
              alt="Imagen de proyecto"
            />
          </div>
          <div className="img img-4">
            <img
              ref={(el) => (imagesRef.current[3] = el)}
              src={null}
              alt="Imagen de proyecto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
