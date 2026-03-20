import { motion } from "framer-motion";
import restaurantInterior from "@/assets/restaurant-interior.jpg";

export default function OurStory() {
  return (
    <section id="story" className="py-24" style={{ background: "hsl(var(--background))" }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-dark)" }}>
              <img
                src={restaurantInterior}
                alt="Deccan Grill Plano Restaurant Interior"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(var(--background-dark) / 0.3) 0%, transparent 60%)" }} />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 md:-right-8 px-6 py-4 rounded-2xl"
              style={{
                background: "hsl(var(--background-dark))",
                border: "1px solid hsl(var(--gold) / 0.3)",
                boxShadow: "var(--shadow-gold)",
              }}>
              <p 
                className="text-xs tracking-widest mb-1 font-bold" 
                style={{ 
                  color: "hsl(var(--gold))", 
                  fontFamily: "'Calibri', 'Candara', 'Segoe UI', 'Optima', Arial, sans-serif" 
                }}
              >
                SINCE
              </p>
              <p className="font-display font-bold text-3xl" style={{ color: "hsl(var(--primary-foreground))" }}>
                2019
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-4">Our Heritage</p>
            <h2 className="section-title mb-6 gold-underline">
              A Tradition of<br />Royal Flavors
            </h2>
            <div className="shimmer-divider mt-8 mb-8" />
            <div className="space-y-5 font-body leading-relaxed" style={{ color: "hsl(var(--foreground-muted))" }}>
              <p>
                Deccan Grill is a premier destination for <strong style={{ color: "hsl(var(--foreground))" }}>authentic Hyderabadi cuisines</strong>. We take pride in our
                signature Hyderabadi Biryani — perfectly spiced and slow-cooked the traditional way, sealed with dough and
                steamed to aromatic perfection.
              </p>
              <p>
                Every dish is crafted with <strong style={{ color: "hsl(var(--foreground))" }}>100% Zabiha Halal meat</strong> and the finest hand-ground spices,
                transporting you to the heart of South Asia with every bite.
              </p>
              <p>
                From our celebrated <em>Dum Biryani</em> to our sizzling <em>Mix Grill Platters</em>, each recipe carries
                the warmth of Hyderabadi hospitality — a tradition we've lovingly brought to Plano, Texas.
              </p>
            </div>

            <div className="mt-10 flex gap-8">
              {[["100%", "Zabiha Halal"], ["Dine-In", "& Takeout"], ["Authentic", "Hyderabadi"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="font-display font-bold text-2xl" style={{ color: "hsl(var(--primary))" }}>{val}</div>
                  <div className="font-body text-xs mt-1" style={{ color: "hsl(var(--foreground-muted))" }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}