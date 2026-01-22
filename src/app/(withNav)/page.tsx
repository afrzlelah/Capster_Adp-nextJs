import HomePageView from "@/Views/HomePageViews";
import { Metadata } from "next";
import { title } from "process";

export const metadata = {
  title: "Home | Capster_Adp",
};

export default function Home() {
  return <HomePageView />;
}
