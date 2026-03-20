import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Moon, Sparkles, Phone } from "lucide-react";

// The new dynamic image data
const heroItems = [
  { name: "Chilli Chicken", price: "$12.99", image: "/images/chil_chi.jpeg" },
  { name: "Chicken 65 Biryani (Boneless)", price: "$16.99", image: "/images/chi_65_bir.jpeg" },
  { name: "Paneer Butter Masala", price: "$14.99", image: "/images/pan_butter.jpg" },
  { name: "Chicken Pakoda", price: "$12.99", image: "/images/chi_pak.jpeg" },
];

// Steam particle component
function SteamParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-1/3 rounded-full"
          style={{
            left: `${20 + i * 5.5}%`,
            width: `${8 + (i % 4) * 4}px`,
            height: `${8 + (i % 4) * 4}px`,
            background: "rgba(255,255,255,0.07)",
            filter: "blur(4px)",
            animation: `float-particle ${3 + (i % 3)}s ease-in ${i * 0.4}s infinite`,
            "--drift": `${(i % 2 === 0 ? 1 : -1) * (10 + i * 3)}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Background Slider Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000); // Crossfade every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const y = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${y * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-svh flex items-center w-full overflow-hidden">
      {/* Cinematic Parallax BG Slider */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform" style={{ top: "-5%", height: "110%" }}>
        {heroItems.map((item, index) => (
          <motion.div
            key={item.image}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: currentImgIndex === index ? 1 : 0,
              scale: currentImgIndex === index ? 1.08 : 1, 
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeOut" }, 
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ))}
      </div>

      {/* Darkened Overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, hsl(28 36% 7% / 0.95) 0%, hsl(28 36% 7% / 0.80) 50%, hsl(28 36% 7% / 0.60) 100%)" }} />

      {/* DESKTOP ONLY: Top Right Action Center (Order + Midnight) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-24 right-4 md:right-8 z-20 hidden md:flex flex-col gap-4 items-end"
      >
        {/* Order Online Box */}
        <div className="relative group">
          <div className="absolute inset-0 bg-black/40 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col gap-3 shadow-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4A843] uppercase text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span> Order Delivery
            </span>
            <div className="flex gap-2">
              <a href="https://www.order.store/store/deccan-grill-plano/GAad6lQnRYmLGp3g3ahXAA" target="_blank" rel="noopener noreferrer" 
                 className="bg-[#D97706] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#b85723] transition-all hover:scale-105 shadow-lg text-center">
                Uber Eats
              </a>
              <a href="https://order.online/business/deccan-grill-plano-13666801" target="_blank" rel="noopener noreferrer" 
                 className="bg-[#D97706] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#b85723] transition-all hover:scale-105 shadow-lg text-center">
                DoorDash
              </a>
            </div>
          </div>
        </div>

        {/* Midnight Biryanis Badge */}
        <div className="relative group cursor-default">
          <div className="absolute inset-0 bg-[#D97706]/20 rounded-2xl blur-xl" />
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 p-3 px-4 rounded-2xl flex items-center gap-4 shadow-2xl"
          >
            <div className="bg-[#D97706]/20 p-2 rounded-xl">
              <Moon size={20} className="text-[#D4A843]" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4A843] uppercase">Midnight Biryanis</p>
              <p className="text-white text-xs font-medium">Fri - Sat: 10PM – 3AM</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* MOBILE ONLY: Horizontal Compact Action Center */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        // FIX: Changed from top-24 to top-28 to give more space below the logo
        className="absolute top-28 left-0 w-full px-6 z-20 md:hidden flex justify-between items-start"
      >
        {/* Left: Delivery Section */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-widest text-[#D4A843] uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse"></span> Order Delivery
          </span>
          <div className="flex gap-2">
            <a href="https://www.order.store/store/deccan-grill-plano/GAad6lQnRYmLGp3g3ahXAA" target="_blank" rel="noopener noreferrer" 
               className="bg-[#D97706] text-white text-[10px] font-bold px-4 py-2 rounded-lg shadow-md active:scale-95 transition-transform text-center">
              Uber Eats
            </a>
            <a href="https://order.online/business/deccan-grill-plano-13666801" target="_blank" rel="noopener noreferrer" 
               className="bg-[#D97706] text-white text-[10px] font-bold px-4 py-2 rounded-lg shadow-md active:scale-95 transition-transform text-center">
              DoorDash
            </a>
          </div>
        </div>

        {/* Right: Mobile Number */}
        <a href="tel:+14695739471" 
           // FIX: Changed label to full number and added whitespace-nowrap
           className="bg-black/30 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-2 rounded-lg shadow-md flex items-center gap-1.5 active:bg-white/20 transition-colors mt-0.5 whitespace-nowrap">
          <Phone size={12} className="text-[#D4A843]" /> +1 (469) 573-9471
        </a>
      </motion.div>

      <SteamParticles />

      {/* Content */}
      {/* FIX: Reduced top padding from pt-[180px] to pt-[160px] to close the gap without overlapping */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 pt-[80px] md:pt-32">
        <div className="max-w-4xl"> 
          
          {/* Haleem 365 Days - ABOVE LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-2"
          >
            <Sparkles size={14} className="text-[#D4A843]" />
            <span className="text-[#FAF3E0] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
              Haleem 365 Days
            </span>
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#D4A843]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Authentic Hyderabadi Cuisine · Plano, TX
          </motion.div>

          {/* Hero Headline - Balanced Typography */}
          <h1 className="font-display font-bold mb-4 md:mb-6 leading-[1.1] md:leading-none flex flex-col"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", letterSpacing: "-0.03em", color: "hsl(38 64% 95%)" }}>
            <div className="flex flex-wrap">
              {["Where", "every", "bite"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap items-baseline">
               {["tells", "a"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="inline-block pb-2 overflow-visible"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0px 0px 12px rgba(212,184,149,0.3))" 
                }}
              >
                Story
              </motion.span>
            </div>
          </h1>

          {/* Subtext - HIDDEN ON MOBILE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="hidden md:block font-subhead text-xl md:text-2xl italic mb-10"
            style={{ color: "hsl(38 64% 95%)", fontWeight: 400 }} 
          >
            Experience the rich heritage of slow-cooked biryanis, aromatic spices, and 100% Zabiha Halal meats.
          </motion.p>

          {/* Midnight Biryanis - MOBILE ONLY (Sits above CTA buttons) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="md:hidden flex items-center gap-2 mb-6 mt-4"
          >
            <Moon size={14} className="text-[#D4A843]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4A843] uppercase">
              Midnight Biryanis: Fri-Sat 10PM–3AM
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/menu" className="btn-primary text-center flex justify-center items-center w-[200px]">
              View Our Menu
            </Link>
            <Link to="/catering" className="btn-ghost-gold text-center flex justify-center items-center w-[200px]">
              Book Catering
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Halal Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{ 
          opacity: { delay: 1.6, duration: 0.8 },
          scale: { delay: 1.6, duration: 0.8 },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } 
        }}
        className="absolute bottom-6 right-4 lg:bottom-44 lg:right-12 z-20 pointer-events-none"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-md animate-pulse" />
          <img 
            src="/HalalC.png" 
            alt="100% Zabiha Halal Certified" 
            className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] object-cover relative z-10"
          />
        </div>
      </motion.div>

      {/* Floating Image Indicator / Dish Name */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="hidden lg:flex absolute bottom-12 right-12 items-center justify-center gap-4 z-10 bg-black/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5"
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.2em] text-[#D4A843] uppercase mb-1" style={{ fontFamily: "'Calibri', sans-serif" }}>FEATURING</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentImgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-display text-base text-white font-medium text-center"
            >
              {heroItems[currentImgIndex].name}
            </motion.span>
          </AnimatePresence>
          <div className="flex gap-1.5 mt-3">
              {heroItems.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${currentImgIndex === i ? "w-6 bg-[#D4A843]" : "w-2 bg-white/30"}`}
                />
              ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Hint - HIDDEN ON MOBILE TO PREVENT OVERLAPPING */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1"
        style={{ color: "hsl(var(--gold) / 0.7)" }}
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}