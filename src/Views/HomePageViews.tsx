import Footer from "@/Fragments/Content/Footer";
import Gallery from "@/Fragments/Content/Gallery";
import Hero from "@/Fragments/Content/Hero";
import Services from "@/Fragments/Content/Service";

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
