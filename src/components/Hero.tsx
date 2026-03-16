import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroBiryani from "@/assets/hero-biryani.jpg";

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

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const y = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${y * 0.4}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      {/* Parallax BG */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform" style={{ top: "-5%" }}>
        <img
          src={heroBiryani}
          alt="Hyderabadi Biryani"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, hsl(28 36% 7% / 0.88) 0%, hsl(28 36% 7% / 0.55) 50%, hsl(25 87% 40% / 0.1) 100%)" }} />

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
            <span className="w-12 h-px" style={{ background: "hsl(var(--gold))" }} />
            Authentic Hyderabadi Cuisine · Plano, TX
          </motion.div>

          {/* Hero Headline — word by word */}
          <h1 className="font-display font-bold mb-6 leading-none"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", letterSpacing: "-0.03em", color: "hsl(38 64% 95%)" }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word === "Story" ? (
                  <span style={{
                    background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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
            style={{ color: "hsl(38 64% 85% / 0.85)", fontWeight: 400 }}
          >
            Authentic Hyderabadi Cuisine in the Heart of Plano, TX
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
