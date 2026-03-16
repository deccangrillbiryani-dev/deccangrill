import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    icon: "🔥",
    title: "100% Zabiha Halal",
    desc: "Every dish crafted with certified Zabiha Halal meat and the finest ingredients.",
  },
  {
    icon: "🍛",
    title: "Authentic Hyderabadi",
    desc: "Slow-cooked recipes passed down through generations from the royal kitchens of Deccan.",
  },
  {
    icon: "🏠",
    title: "Dine-In & Takeout",
    desc: "Enjoy the full experience inside our warm dining room or take the flavors home.",
  },
];

export default function TrustPillars() {
  const ref = useScrollReveal();

  return (
    <section className="py-24" style={{ background: "hsl(var(--background))" }}>
      <div className="container mx-auto px-4 md:px-8">
        <div ref={ref} className="reveal grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center p-10 rounded-3xl transition-all duration-300 group hover:-translate-y-2"
              style={{
                background: "hsl(var(--card))",
                boxShadow: "var(--shadow-card)",
                border: "1px solid hsl(var(--gold) / 0.15)",
              }}
            >
              {/* Gold line top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />

              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "hsl(var(--foreground))" }}>
                {p.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "hsl(var(--foreground-muted))" }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
