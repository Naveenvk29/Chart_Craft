import Hero from "../../components/homeComponets/Hero";
import FeatureSection from "../../components/homeComponets/FeatureSection";
import AboutSection from "../../components/homeComponets/AboutSection";
import ContactSection from "../../components/homeComponets/ContactSection";
import FooterSecction from "../../components/homeComponets/FooterSecction";
import NavBar from "../../components/homeComponets/NavBar";
const Home = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-950">
      <Hero />
      <FeatureSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;
