import "./projectpage.css";
import { notFound } from "next/navigation";
import GoBack from "../components/GoBack";
import ProjectContent from "./ProjectContent";

export default async function Project({ params }) {
  if (!params) {
    return <p>Loading...</p>;
  }

  const { slug } = params;

  try {
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
    const featuredImage =
      project._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

    return (
      <div id="total-wrapper">
        <GoBack />
        <ProjectContent
          project={project}
          featuredImage={featuredImage}
          slug={slug}
        />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
