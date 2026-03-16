import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const occasions = [
  { icon: "💍", label: "Wedding" },
  { icon: "🎂", label: "Birthday" },
  { icon: "🏠", label: "Housewarming" },
  { icon: "❤️", label: "Anniversary" },
  { icon: "🎉", label: "Kitty Party" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Parties" },
  { icon: "⛺", label: "Outdoor" },
  { icon: "🪔", label: "Pooja" },
  { icon: "🎭", label: "Cultural Events" },
];

export default function CateringCTA() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary-dark)) 0%, hsl(var(--primary)) 100%)" }}>
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0%, transparent 50%)`,
        }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-label text-xs tracking-widest mb-4 uppercase" style={{ color: "hsl(var(--gold))" }}>
            Catering Services
          </p>
          <h2 className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "hsl(38 64% 97%)",
            }}>
            Celebrate Every Moment<br />With Us
          </h2>
          <p className="font-subhead italic text-lg md:text-xl" style={{ color: "hsl(38 64% 90% / 0.85)" }}>
            Your Occasion, Our Heritage.
          </p>
        </motion.div>

        {/* Occasion Icons Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mb-14"
        >
          {occasions.map((occ, i) => (
            <motion.div
              key={occ.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex flex-col items-center gap-2 py-5 px-2 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-default"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-3xl">{occ.icon}</span>
              <span className="font-body text-xs text-center font-medium leading-tight"
                style={{ color: "hsl(38 64% 95%)" }}>
                {occ.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            to="/catering"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-semibold text-base transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "hsl(28 36% 7%)",
              color: "hsl(var(--gold))",
              border: "1px solid hsl(var(--gold) / 0.4)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            Explore Catering
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
