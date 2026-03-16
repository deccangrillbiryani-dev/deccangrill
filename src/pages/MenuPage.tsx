import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { menuData } from "@/data/menuData";

function DishCard({ item }: { item: { name: string; price: string; image: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.03)`;
    card.style.boxShadow = `var(--shadow-gold)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateY(0) rotateX(0) scale(1)";
      cardRef.current.style.boxShadow = "var(--shadow-card)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--gold) / 0.12)",
        boxShadow: "var(--shadow-card)",
        transition: "transform 0.15s ease-out, box-shadow 0.2s ease",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--gold) / 0.1))" }}>
            🍛
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-body font-semibold text-sm leading-snug mb-2"
          style={{ color: "hsl(var(--foreground))", textWrap: "balance" } as React.CSSProperties}>
          {item.name}
        </h3>
        <p className="font-body font-bold text-base tabular-nums" style={{ color: "hsl(var(--primary))" }}>
          {item.price}
        </p>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeId, setActiveId] = useState("appetizers");

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar />

      {/* Hero Banner */}
      <div className="pt-24 pb-16 geometric-bg" style={{ background: "hsl(var(--background-dark))" }}>
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <p className="section-label-gold mb-3">Deccan Grill Plano</p>
          <h1 className="section-title-light text-5xl md:text-6xl mb-4">Our Menu</h1>
          <p className="font-subhead italic text-xl" style={{ color: "hsl(38 64% 80% / 0.75)" }}>
            Every dish slow-cooked with heritage & heart
          </p>
        </div>
      </div>

      {/* Sticky Category Tabs */}
      <div className="sticky top-16 z-30 py-3"
        style={{ backdropFilter: "blur(16px)", background: "hsl(var(--background) / 0.92)", borderBottom: "1px solid hsl(var(--gold) / 0.12)" }}>
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {menuData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className="flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200"
                style={{
                  background: activeId === cat.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  color: activeId === cat.id ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground-muted))",
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 md:px-8 py-16 space-y-20">
        {menuData.map((cat) => (
          <section key={cat.id} id={`section-${cat.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="section-label mb-2">{cat.category}</p>
              <h2 className="font-display font-bold text-3xl gold-underline" style={{ color: "hsl(var(--foreground))" }}>
                {cat.category}
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {cat.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <DishCard item={item} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
