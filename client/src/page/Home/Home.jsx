import Hero from "../../components/homeComponets/Hero";
import FeatureSection from "../../components/homeComponets/FeatureSection";
import AboutSection from "../../components/homeComponets/AboutSection";
import ContactSection from "../../components/homeComponets/ContactSection";
import FooterSecction from "../../components/homeComponets/FooterSecction";

const Home = () => {
  return (
    <div className="bg-black text-white">
      <Hero />
      <FeatureSection />
      <AboutSection />
      <ContactSection />
      <FooterSecction />
    </div>
  );
};

export default Home;
