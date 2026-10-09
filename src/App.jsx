import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Contact from "./components/Contact/Contact.jsx";
// import Footer from "./components/Footer/Footer.jsx";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import "./App.css";
export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let attempts = 0;
    let retry;
    const initialize = () => {
      if (window.AOS) {
        window.AOS.init({
          startEvent: "reem-aos-ready",
          once: true,
          duration: 650,
          easing: "ease-out-cubic",
          offset: 65,
        });
        document.dispatchEvent(new Event("reem-aos-ready"));
        document.body.classList.add("aos-enabled");
        window.setTimeout(() => window.AOS?.refreshHard(), 80);
        return;
      }
      if (attempts++ < 40) retry = window.setTimeout(initialize, 100);
    };
    initialize();
    return () => window.clearTimeout(retry);
  }, []);
  return (
    <>
      <Preloader />
      <ParticlesBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Experience />
        <Contact />
      </main>
      {/* <Footer /> */}
    </>
  );
}
