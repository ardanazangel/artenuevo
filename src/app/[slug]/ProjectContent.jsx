"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function ProjectContent({ project, featuredImage, slug }) {
  useEffect(() => {
    gsap.fromTo(
      "#page-content div",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "inOutQuart" }
    );
  }, []);
  return (
    <div id="page-content-wrapper">
      <div id="page-content" style={{ opacity: "1" }}>
        <div>
          <h1 className="title-project">{project.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
        </div>
      </div>
      {featuredImage && (
        <div
          id="page-img"
          className={project.acf?.position <= 2 ? "left" : "right"}
        >
          <img src={featuredImage} alt="Project Image" />
        </div>
      )}
    </div>
  );
}
