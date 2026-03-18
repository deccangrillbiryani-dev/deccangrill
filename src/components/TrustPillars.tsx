import { motion } from "framer-motion";
import { BadgeCheck, UtensilsCrossed, Store, ChefHat, Flame, Sparkles } from "lucide-react";

// Expanded to 6 pillars based on Deccan Grill's authentic business context
const pillars = [
  {
    icon: BadgeCheck,
    title: "100% Zabiha Halal",
    desc: "Every dish is crafted with certified premium quality meats and the finest ingredients.",
  },
  {
    icon: Flame,
    title: "Signature Biryani",
    desc: "Perfectly spiced and slow-cooked to bring out the most aromatic and savory flavors.",
  },
  {
    icon: UtensilsCrossed,
    title: "Authentic Heritage",
    desc: "Traditional recipes transporting you straight to the heart of South Asia.",
  },
  {
    icon: ChefHat,
    title: "Master Chefs",
    desc: "Our culinary experts craft each mouthwatering dish with absolute care and passion.",
  },
  {
    icon: Store,
    title: "Dine-In & Takeout",
    desc: "Enjoy an unforgettable culinary experience inside, or take the rich flavors home.",
  },
  {
    icon: Sparkles,
    title: "Exquisite Kebabs",
    desc: "A mouthwatering selection of tender, marinated meats fired to perfection.",
  },
];

export default function TrustPillars() {
  return (
    <section 
      className="py-16 md:py-24 relative z-10 overflow-hidden" 
      style={{ 
        backgroundColor: "#F9F6F0", // Warm cream matching your walls
        fontFamily: "'Inter', 'SF Pro Display', sans-serif" 
      }}
    >
      <div className="container mx-auto px-4 md:px-8 mb-8 md:mb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: "#2C1A08" }}>
          The Deccan Grill Standard
        </h2>
      </div>

      {/* The Edge Fade Mask: 
        This makes the scrolling items fade out smoothly at the left and right edges of the screen.
      */}
      <div 
        className="relative w-full flex items-center"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        {/* The Infinite Marquee Track */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: ["0%", "-50%"], // Moves exactly half its width, then instantly resets
          }}
          transition={{
            ease: "linear",
            duration: 35, // Adjust this number to make it scroll faster or slower
            repeat: Infinity,
          }}
        >
          {/* We render the array TWICE so it loops seamlessly without a gap */}
          {[...pillars, ...pillars].map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={`${p.title}-${i}`}
                className="relative flex flex-col md:flex-row items-center md:items-start text-center md:text-left p-6 md:p-8 rounded-3xl shrink-0 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  width: "320px", // Fixed width so they stay uniform while scrolling
                  /* Amber/Yellow Tinted Glass matching your interior */
                  background: "linear-gradient(145deg, rgba(212, 184, 149, 0.25) 0%, rgba(221, 110, 48, 0.1) 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(221, 110, 48, 0.3)",
                  boxShadow: "0 15px 35px rgba(44, 26, 8, 0.04)",
                }}
              >
                {/* Icon Container */}
                <div 
                  className="mb-4 md:mb-0 md:mr-5 p-3 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ 
                    background: "rgba(221, 110, 48, 0.1)", 
                    border: "1px solid rgba(221, 110, 48, 0.2)"
                  }}
                >
                  <Icon 
                    className="w-6 h-6 md:w-8 md:h-8" 
                    style={{ color: "#DD6E30" }} // Terracotta Orange
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col justify-center h-full">
                  <h3 className="font-semibold text-lg md:text-xl mb-2 tracking-tight leading-tight" style={{ color: "#2C1A08" }}>
                    {p.title}
                  </h3>
                  <p className="font-light text-sm tracking-wide leading-relaxed" style={{ color: "#5A3D23" }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}