import Hero from "@/components/Hero";
import TrustPillars from "@/components/TrustPillars";
import SignatureDishes from "@/components/SignatureDishes";
import OurStory from "@/components/OurStory";
import BusinessHours from "@/components/BusinessHours";
import CateringCTA from "@/components/CateringCTA";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustPillars />
      <SignatureDishes />
      <OurStory />
      <BusinessHours />
      <CateringCTA />
      <FindUs />
      <Footer />
    </div>
  );
}
