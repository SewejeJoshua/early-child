import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
       <About />
       <Services />
      <Testimonials />
      <Contact />
       <Team/>
      <Footer /> 
    </div>
  );
};

export default Index;
