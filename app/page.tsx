import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollytellingSection from "@/components/ScrollytellingSection";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import DemoVideoSection from "@/components/DemoVideoSection";
import BenefitsGrid from "@/components/BenefitsGrid";
import IndustryUseCases from "@/components/IndustryUseCases";
import InteractiveDemo from "@/components/InteractiveDemo";
import HowItWorks from "@/components/HowItWorks";
import IntegrationSection from "@/components/IntegrationSection";
import SocialProof from "@/components/SocialProof";
import ComparisonTable from "@/components/ComparisonTable";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import DemoForm from "@/components/DemoForm";
import StickyCTA from "@/components/StickyCTA";
import FooterMinimal from "@/components/FooterMinimal";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <ProblemSection />
      <div className="fade-transition-propuesta-video" />
      <ScrollytellingSection />

      <div className="relative z-[2]">
        <TrustBar />
        <DemoVideoSection />
        <HowItWorks />
        <BenefitsGrid />
        <IndustryUseCases />
        <InteractiveDemo />
        <IntegrationSection />
        <SocialProof />
        <ComparisonTable />
        <FAQSection />
        <FinalCTA />
        <DemoForm />
        <FooterMinimal />
      </div>

      {/* StickyCTA fuera del contexto z-index 2 para que su propio z-index sea global */}
      <StickyCTA />
    </>
  );
}
