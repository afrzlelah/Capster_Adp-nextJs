import Hero from "@/Views/Fragments/Content/Hero";
import { Metadata } from "next";
import Gallery from "../../../public/Gallery";
import Services from "@/Views/Fragments/Content/Service";
import Footer from "@/Views/Fragments/Content/Footer";

export const metadata: Metadata = {
  title: "Home | Capster_Adp",
  description: "Barbershop Berkelas kualitas emas",
};

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Gallery />
      <Services />
      <Footer />
    </main>
  );
}
