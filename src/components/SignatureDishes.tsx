import { useRef } from "react";
import { motion } from "framer-motion";
import sigBiryani from "@/assets/sig-biryani.jpg";
import sigGrill from "@/assets/sig-grill.jpg";
import sigHaleem from "@/assets/sig-haleem.jpg";
import sigButterChicken from "@/assets/sig-butter-chicken.jpg";

const dishes = [
  {
    name: "Hyderabadi Chicken Dum Biryani",
    desc: "Slow-cooked saffron rice with hand-marinated chicken",
    image: sigBiryani,
    badge: "Signature",
  },
  {
    name: "Mix Grill Platter",
    desc: "Royal assortment of tikka, kebab & tandoori",
    image: sigGrill,
    badge: "Chef's Pick",
  },
  {
    name: "Mutton Haleem",
    desc: "Hand-ground lentil & slow-braised mutton, heritage recipe",
    image: sigHaleem,
    badge: "Heritage",
  },
  {
    name: "Butter Chicken",
    desc: "Aromatic tomato-cream gravy with tender chicken",
    image: sigButterChicken,
    badge: "Favourite",
  },
];

function DishCard({ dish }: { dish: typeof dishes[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-72 md:w-80 h-96 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: "1px solid hsl(var(--gold) / 0.2)",
        boxShadow: "var(--shadow-dark)",
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />

      {/* Overlay gradient */}
      <div className="absolute inset-0"
        style={{ background: "var(--gradient-card-overlay)" }} />

      {/* Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full font-label text-xs tracking-widest"
        style={{
          background: "hsl(var(--gold) / 0.2)",
          border: "1px solid hsl(var(--gold) / 0.5)",
          color: "hsl(var(--gold))",
          backdropFilter: "blur(8px)",
        }}>
        {dish.badge}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display font-bold text-lg mb-1"
          style={{ color: "hsl(var(--gold))", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          {dish.name}
        </h3>
        <p className="font-body text-sm" style={{ color: "hsl(38 64% 85% / 0.75)" }}>
          {dish.desc}
        </p>
      </div>
    </div>
  );
}

export default function SignatureDishes() {
  return (
    <section className="py-24 overflow-hidden geometric-bg" style={{ background: "hsl(var(--background-dark))" }}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label-gold mb-3">From Our Kitchen</p>
          <h2 className="section-title-light gold-underline">Our Signatures</h2>
        </motion.div>

        {/* Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory -mx-4 px-4">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-center"
            >
              <DishCard dish={dish} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
