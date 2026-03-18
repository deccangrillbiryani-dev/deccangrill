import Hero from "@/components/Hero";
import TrustPillars from "@/components/TrustPillars";
import SignatureDishes from "@/components/SignatureDishes";
import OurStory from "@/components/OurStory";
import CateringCTA from "@/components/CateringCTA";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Index() {
  return (
    <div className="min-h-screen bg-[#F9F6F0]"> {/* Applied base cream background to avoid white flashes */}
      <Navbar />
      <Hero />
      <TrustPillars />
      <SignatureDishes />
      <OurStory />
      {/* BusinessHours removed from here */}
      <CateringCTA />
      <FindUs />
      <Footer />
    </div>
  );
}