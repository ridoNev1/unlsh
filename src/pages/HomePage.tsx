import Header from "../sections/Header";
import HeroSection from "../sections/HeroSection";
import KeywordsStrip from "../sections/KeywordsStrip";
import RevolutionSection from "../sections/RevolutionSection";
import ValuesSection from "../sections/ValuesSection";
import BasicEtiquetteSection from "../sections/BasicEtiquetteSection";
import WhoSection from "../sections/WhoSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import FaqSection from "../sections/FaqSection";
import Footer from "../sections/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#120104] font-avenir text-white">
      <Header />
      <main>
        <HeroSection />
        <KeywordsStrip />
        <RevolutionSection />
        <ValuesSection />
        <BasicEtiquetteSection />
        <WhoSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
