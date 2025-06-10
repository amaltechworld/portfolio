
import FAQs from "./components/FAQs/FAQs";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

import Intro from "./components/Intro/Intro";
import Projects from "./components/Project/Projects";
import Testimonials from "./components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <Intro />
    <Projects />
    <Testimonials />
    <FAQs /> 
    <Footer />
        
      
    </>
  );
}
