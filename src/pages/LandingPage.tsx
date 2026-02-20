import Navbar from "@/components/layout/Navbar";
import About from "@/sections/landing/About";
import DiamondComparison from "@/sections/landing/DiamondComparison";
import Hero from "@/sections/landing/Hero";
import Shapes from "@/sections/landing/Shapes";
import Trust from "@/sections/landing/Trust";
import Instagram from "@/sections/landing/Instagram";
import Certificates from "@/sections/landing/Certificates";
import Testimonials from "@/sections/landing/Testimonials";
import Contact from "@/sections/landing/Contact";
import Footer from "@/sections/landing/Footer";

const LandingPage = () => {
  return (
    <div className="bg-[#2A2A2A] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <DiamondComparison />
      <Shapes />
      <Trust />
      <Instagram />
      <Certificates />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;