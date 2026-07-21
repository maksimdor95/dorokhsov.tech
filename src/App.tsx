import {
  pricingTiers,
  projects,
  services,
} from "./data";
import { AboutSection, ContactSection, Footer } from "./components/AboutSection";
import { Header, Hero } from "./components/Header";
import { PricingSection, ServicesSection } from "./components/ServicesSection";
import { WorkSection } from "./components/WorkSection";

export default function App() {
  return (
    <div className="min-h-screen bg-bone text-carbon-black">
      <Header />
      <main>
        <Hero />
        <WorkSection projects={projects} />
        <ServicesSection services={services} />
        <PricingSection tiers={pricingTiers} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
