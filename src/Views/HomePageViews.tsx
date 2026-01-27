import Footer from "@/Views/Fragments/Content/Footer";
import Gallery from "@/Views/Fragments/Content/Gallery";
import Hero from "@/Views/Fragments/Content/Hero";
import Services from "@/Views/Fragments/Content/Service";

const HomePageView = () => {
  return (
    <>
      <main className="">
        <Hero />
        <Gallery />
        <Services />
        <Footer />
      </main>
    </>
  );
};

export default HomePageView;
