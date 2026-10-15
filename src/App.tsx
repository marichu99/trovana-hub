import { useState } from "react";
import Loader from "./components/Loader";
import ScrollProgressBar from "./components/ScrollProgressBar";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Services from "./components/sections/Services";
import PropertyVideos from "./components/sections/PropertyVideos";
import Work from "./components/sections/Work";
import Process from "./components/sections/Process";
import About from "./components/sections/About";
import CtaBanner from "./components/sections/CtaBanner";
import Contact from "./components/sections/Contact";
import { useLenis } from "./lib/useLenis";
import { useReducedMotion } from "./lib/useReducedMotion";

export default function App() {
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();
  useLenis(reducedMotion);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <PropertyVideos />
        <Work />
        <Process />
        <About />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
