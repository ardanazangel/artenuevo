import TotalScroll from "./components/TotalScroll";
import ProjectSection from "./components/Proyectos";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

export default async function Home() {
  const res = await fetch(`${process.env.WP_API_URL}/portfolio?_embed=true`, {
    cache: "force-cache",
    next: { revalidate: 60 }, // Se actualiza cada 60 seg
  });

  const data = await res.json();

  return (
    <div>
      <ScrollTop />
      <TotalScroll />
      <section id="projects__section">
        <ProjectSection data={data} />
      </section>
      <Footer />
    </div>
  );
}
