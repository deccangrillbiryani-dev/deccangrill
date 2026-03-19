import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

// Updated dishes with specific items and prices
const dishes = [
  {
    name: "Hyderabadi Chicken Dum Biryani",
    desc: "Slow-cooked saffron rice with hand-marinated chicken.",
    price: "$14.99",
    image: "/images/hyd_chi_dum_bri.jpeg",
    badge: "Signature",
  },
  {
    name: "Mutton Haleem",
    desc: "Hand-ground lentil & slow-braised mutton, heritage recipe.",
    price: "$18.99",
    image: "/images/ma_ha.jpeg",
    badge: "Hyderabadi Haleem",
  },
  {
    name: "Chicken Tandoori (Leg Qtr)",
    desc: "Classic clay-oven roasted chicken with rich spices.",
    price: "$7.99",
    image: "/images/chi_tan.jpeg",
    badge: "Tandoori",
  },
  {
    name: "Chicken Seekh Kabab",
    desc: "Minced chicken skewers, perfectly spiced and grilled.",
    price: "$12.99",
    image: "/images/chi_se_kab.jpeg",
    badge: "Seekh Kabab",
  },
];

function DishCard({ dish }: { dish: typeof dishes[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D effect strictly for desktop mice
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // FIX: Changed mobile width to 80vw to guarantee the next card peeks into view
      className="relative flex-shrink-0 w-[80vw] sm:w-[280px] md:w-[320px] h-[400px] rounded-3xl overflow-hidden cursor-pointer group bg-white"
      style={{
        border: "1px solid rgba(221, 110, 48, 0.15)", // Soft orange border
        boxShadow: "0 20px 40px rgba(44, 26, 8, 0.08)", // Soft brown shadow
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Wrapper to ensure smooth curved borders during hover scale */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A08] via-[#2C1A08]/50 to-transparent opacity-90" />
      </div>

      {/* Top Badge & Price */}
      <div className="absolute top-5 w-full px-5 flex justify-between items-start z-10">
        <div className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold shadow-sm"
          style={{
            background: "rgba(255, 255, 255, 0.95)", 
            color: "#DD6E30", // Terracotta orange from booths
            backdropFilter: "blur(8px)",
          }}>
          {dish.badge}
        </div>
        <div className="px-3 py-1.5 rounded-full text-sm font-bold shadow-sm"
             style={{
               background: "#DD6E30", // Solid orange for price to make it pop
               color: "#FFFFFF"
             }}>
          {dish.price}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:-translate-y-2 z-10">
        <h3 className="font-semibold text-xl mb-2 text-white leading-tight tracking-tight">
          {dish.name}
        </h3>
        <p className="text-sm font-light leading-relaxed text-white/80">
          {dish.desc}
        </p>
      </div>
    </div>
  );
}

export default function SignatureDishes() {
  return (
    <section 
      className="pt-0 pb-24 overflow-hidden relative" 
      style={{ backgroundColor: "#F9F6F0", fontFamily: "'Inter', 'SF Pro Display', sans-serif" }} // Warm Cream Background
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: "#DD6E30" }}>
            From Our Kitchen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#2C1A08" }}> {/* Rich Espresso Dark Brown */}
            Our Signatures
          </h2>
        </motion.div>

        
        {/* Horizontal Scroll for Cards */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {dishes.map((dish) => (
            // FIX: Removed motion.div animation here so items are instantly visible for the mobile horizontal scroll
            <div
              key={dish.name}
              className="snap-center md:snap-start first:pl-4 md:first:pl-0 last:pr-4 md:last:pr-0"
            >
              <DishCard dish={dish} />
            </div>
          ))}
        </div>

        {/* Premium Promo Banner & CTA (Light Glass Theme) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 md:mt-16 relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "rgba(255, 255, 255, 0.6)", // Light frosted glass
            border: "1px solid rgba(221, 110, 48, 0.15)", // Soft orange border
            boxShadow: "0 30px 60px rgba(44, 26, 8, 0.05)",
            backdropFilter: "blur(20px)"
          }}
        >
          {/* Promo Text */}
          <div className="flex items-start gap-4 z-10 text-center md:text-left">
            <div className="hidden md:flex p-3 rounded-2xl shrink-0" style={{ background: "rgba(221, 110, 48, 0.1)" }}>
              <CalendarDays className="w-8 h-8" style={{ color: "#DD6E30" }} />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight" style={{ color: "#2C1A08" }}>
                Join us for Lunch & Weekends
              </h4>
              <p className="font-light max-w-md text-sm md:text-base" style={{ color: "#5A3D23" }}>
                We offer exclusive <span className="font-medium" style={{ color: "#DD6E30" }}>Weekday Lunch Combos</span> and a grand <span className="font-medium" style={{ color: "#DD6E30" }}>Weekend Buffet</span> featuring all our signature delicacies.
              </p>
            </div>
          </div>

          {/* Highlighted CTA Button */}
          <Link to="/menu" className="z-10 w-full md:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(221,110,48,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg, #DD6E30, #b85723)" }}
            >
              Explore Full Menu
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}