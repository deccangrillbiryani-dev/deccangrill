import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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

const words = ["Where", "Every", "Bite", "Tells", "a", "Story"];

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
    // FIX: Removed max-w-[100vw] and locked to w-full overflow-hidden to stop the white gap
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

      {/* Steam Particles */}
      <SteamParticles />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-label-gold mb-6 flex items-center gap-3"
          >
            Authentic Hyderabadi Cuisine · Plano, TX
          </motion.div>

          {/* Hero Headline — FIX: Added flex-wrap so the words don't push the screen wider on small devices */}
          <h1 className="font-display font-bold mb-6 leading-none flex flex-wrap"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", letterSpacing: "-0.03em", color: "hsl(38 64% 95%)" }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.4)", "0px 0px 0px rgba(255,255,255,0)"]
                }}
                transition={{ 
                  y: { delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  opacity: { delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  textShadow: { delay: 1.5 + (i * 0.2), duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word === "Story" ? (
                  <span style={{
                    background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0px 0px 12px rgba(212,184,149,0.5))" 
                  }}>{word}</span>
                ) : word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="font-subhead text-xl md:text-2xl italic mb-10"
            style={{ color: "hsl(38 64% 95%)", fontWeight: 400 }} 
          >
           Experience the rich heritage of slow-cooked biryanis, aromatic spices, and 100% Zabiha Halal meats.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/menu" className="btn-primary text-center">
              View Our Menu
            </Link>
            <Link to="/catering" className="btn-ghost-gold text-center">
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
          opacity: { delay: 1, duration: 0.8 },
          scale: { delay: 1, duration: 0.8 },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } 
        }}
        className="absolute bottom-6 right-4 lg:bottom-32 lg:right-12 z-20 pointer-events-none"
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
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden lg:flex absolute bottom-12 right-12 items-center gap-4 z-10"
      >
        <div className="flex flex-col items-end">
          <span className="font-label text-xs tracking-widest" style={{ color: "hsl(var(--gold))" }}>FEATURING</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentImgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-display text-lg text-white drop-shadow-md"
            >
              {heroItems[currentImgIndex].name}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex gap-1">
            {heroItems.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-500 ${currentImgIndex === i ? "w-6 bg-white" : "w-2 bg-white/30"}`}
              />
            ))}
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "hsl(var(--gold) / 0.7)" }}
      >
        <span className="font-label text-xs tracking-widest">SCROLL</span>
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