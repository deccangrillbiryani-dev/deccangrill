import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Using Lucide arrow for consistency

// Updated to use your specific image files from the public/images/ folder
const occasions = [
  { image: "/wedding.jpg", label: "Wedding" },
  { image: "/bday.jpg", label: "Birthday" },
  { image: "/house.jpg", label: "Housewarming" },
  { image: "/anniversary.jpg", label: "Anniversary" },
  { image: "/kity.webp", label: "Kitty Party" },
  { image: "/family.jpg", label: "Family Parties" },
  { image: "/outdoor.jpg", label: "Outdoor" },
  { image: "/pooja.jpg", label: "Pooja" },
  { image: "/cultural.jpg", label: "Cultural Events" },
];

export default function CateringCTA() {
  return (
    <section className="py-24 relative overflow-hidden"
      // Retaining your gradient background
      style={{ background: "linear-gradient(135deg, hsl(var(--primary-dark)) 0%, hsl(var(--primary)) 100%)", fontFamily: "'Inter', 'SF Pro Display', sans-serif" }}>
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0%, transparent 50%)`,
        }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest mb-4 uppercase" style={{ color: "#FAF3E0" }}>
            Catering Services
          </p>
          <h2 className="font-bold mb-4 tracking-tight leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#FFFFFF",
            }}>
            Celebrate Every Moment<br />With Us
          </h2>
          <p className="italic text-lg md:text-xl font-light" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Your Occasion, Our Heritage.
          </p>
        </motion.div>

        {/* Premium Image Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          // Adjusted grid for better responsive flow with circular images
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-y-10 gap-x-4 mb-16"
        >
          {occasions.map((occ, i) => (
            <motion.div
              key={occ.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              {/* Luxury Circular Image Wrapper - INCREASED SIZE */}
              <div 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
                style={{
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)" // Fallback while loading
                }}
              >
                {/* Subtle Inner Glow on Hover */}
                <div className="absolute inset-0 z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.3)" }} />
                     
                <img 
                  src={occ.image} 
                  alt={occ.label} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Clean Typography */}
              <span className="text-[11px] md:text-xs text-center font-medium leading-tight tracking-wide transition-colors duration-300"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                {occ.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            to="/catering"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base transition-all duration-300"
            style={{
              background: "#FAF3E0", // Main Brand Cream Background
              color: "#1F2937", // Main Brand Text Soft Black
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.5)"
            }}
          >
            Explore Catering
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}