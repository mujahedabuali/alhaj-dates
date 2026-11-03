import { useEffect } from "react";
import Seo from "./components/Seo";
import Hero from "./components/Home/Hero";
import Story from "./components/Home/Story";
import Highlights from "./components/Home/Highlights";
import Cta from "./components/Home/Cta";
import { useLocale } from "./i18n/LocaleContext";

function App() {
  const { t } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo title={t.seo.homeTitle} description={t.seo.homeDescription} path="/" />
      <Hero />
      <Story />
      <Highlights />
      <Cta />
    </>
  );
}

export default App;
