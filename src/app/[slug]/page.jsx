import "./projectpage.css";
import { notFound } from "next/navigation"; // Redirección a 404
import GoBack from "../components/GoBack";
import Image from "next/image";

export default async function Project({ params }) {
  if (!params) {
    return <p>Loading...</p>;
  }

  const { slug } = params; // Obtener el slug de los parámetros

  try {
    // Llamada a la API para obtener los datos del proyecto
    const res = await fetch(
      `${process.env.WP_API_URL}/portfolio?_embed=true&slug=${slug}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      notFound();
    }

    const project = data[0];

    // Obtener la imagen destacada correctamente
    const featuredImage =
      project._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    return (
      <div id="total-wrapper">
        <GoBack />
        <div 
          id="page-content-wrapper" 
          className={project.acf?.position <= 2 ? "left" : "right"}
        >
          <div id="page-content">
            <div>
              <h1 className="title-project">{project.title.rendered}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: project.content.rendered }}
              />
            </div>
          </div>
          {featuredImage && (
            <div
              id="page-img"
              className={project.acf?.position <= 2 ? "left" : "right"}
            >
              <img
                src={featuredImage}
                alt="Project Image"
                style={{ viewTransitionName: `project-image-${slug}` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    return notFound();
  }
}
