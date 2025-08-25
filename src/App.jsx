import "./App.css";
import Hero from "./components/Home/Hero";
import About from "./components/Home/About";
import FlowerImg from "./components/FlowerImg";
import AboutAr from "./components/Home/AboutAr";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <About />
      <FlowerImg />
      <AboutAr />
    </>
  );
}

export default App;
