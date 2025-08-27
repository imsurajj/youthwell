import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Companies from "@/components/Companies";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Companies />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
