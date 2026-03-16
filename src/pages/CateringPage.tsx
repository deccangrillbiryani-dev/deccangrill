import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cateringData } from "@/data/cateringData";

const occasions = [
  { icon: "💍", label: "Wedding" }, { icon: "🏠", label: "Housewarming" },
  { icon: "🎉", label: "Kitty Party" }, { icon: "⛺", label: "Outdoor Catering" },
  { icon: "🎂", label: "Birthday" }, { icon: "❤️", label: "Anniversary" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Parties" }, { icon: "🪔", label: "Pooja" },
  { icon: "🎭", label: "Cultural Events" },
];

type SelectedItems = Record<string, Set<string>>;

export default function CateringPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", eventType: "Wedding", notes: "" });

  const toggleCategory = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleItem = (catId: string, item: string) => {
    setSelectedItems(prev => {
      const catSet = new Set(prev[catId] || []);
      catSet.has(item) ? catSet.delete(item) : catSet.add(item);
      return { ...prev, [catId]: catSet };
    });
  };

  const totalSelected = Object.values(selectedItems).reduce((acc, s) => acc + s.size, 0);
  const totalCategories = Object.values(selectedItems).filter(s => s.size > 0).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // EmailJS integration point
    setSubmitted(true);
  };

  const selectedSummary = Object.entries(selectedItems)
    .filter(([, s]) => s.size > 0)
    .map(([catId, s]) => {
      const cat = cateringData.find(c => c.id === catId);
      return `${cat?.category}: ${Array.from(s).join(", ")}`;
    }).join("\n");

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 geometric-bg relative overflow-hidden"
        style={{ background: "hsl(var(--background-dark))" }}>
        {/* Gold floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
              left: `${10 + i * 11}%`, bottom: "20%",
              background: `hsl(var(--gold) / ${0.2 + (i % 3) * 0.1})`,
              animation: `float-particle ${3 + i % 3}s ease-in ${i * 0.5}s infinite`,
              filter: "blur(1px)",
            }} />
        ))}
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label-gold mb-4">Premium Catering</p>
            <h1 className="font-display font-bold mb-5"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", letterSpacing: "-0.03em", color: "hsl(38 64% 95%)" }}>
              Catering For Every<br />
              <span style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Celebration
              </span>
            </h1>
            <p className="font-subhead italic text-xl" style={{ color: "hsl(38 64% 80% / 0.8)" }}>
              From intimate gatherings to grand weddings — we bring Hyderabadi flavors to your table.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20" style={{ background: "hsl(var(--background))" }}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-label mb-3">We Cater For</p>
            <h2 className="section-title gold-underline">Every Occasion</h2>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {occasions.map((occ, i) => (
              <motion.div key={occ.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-2 py-6 px-2 rounded-2xl hover:-translate-y-1 transition-all duration-300"
                style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--gold) / 0.12)", boxShadow: "var(--shadow-card)" }}>
                <span className="text-3xl">{occ.icon}</span>
                <span className="font-body text-xs text-center font-medium leading-tight" style={{ color: "hsl(var(--foreground-muted))" }}>
                  {occ.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Menu Builder */}
      <section className="py-16 pb-32" style={{ background: "hsl(var(--muted) / 0.4)" }}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-label mb-3">Interactive Menu</p>
            <h2 className="section-title gold-underline">Build Your Catering Menu</h2>
            <p className="font-body text-sm mt-4" style={{ color: "hsl(var(--foreground-muted))" }}>
              Click a category to expand, then select the dishes you'd like.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {cateringData.map((cat, i) => {
              const isOpen = expanded.has(cat.id);
              const selectedCount = selectedItems[cat.id]?.size || 0;
              return (
                <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }} transition={{ delay: i * 0.04 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "hsl(var(--card))", border: `1px solid ${isOpen ? "hsl(var(--gold) / 0.3)" : "hsl(var(--border))"}`, boxShadow: "var(--shadow-card)" }}>
                  <button onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between px-6 py-5 transition-colors duration-200 hover:bg-muted/50 text-left">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-lg" style={{ color: "hsl(var(--foreground))" }}>{cat.category}</h3>
                        <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>
                          {cat.items.length} items{selectedCount > 0 ? ` · ${selectedCount} selected` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedCount > 0 && (
                        <span className="px-2.5 py-1 rounded-full font-body text-xs font-bold"
                          style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                          {selectedCount}
                        </span>
                      )}
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5" style={{ color: "hsl(var(--foreground-muted))" }} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 pt-2">
                          <div className="shimmer-divider mb-5" />
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                            {cat.items.map((item) => {
                              const isChecked = selectedItems[cat.id]?.has(item) || false;
                              return (
                                <label key={item}
                                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                                  style={{
                                    background: isChecked ? "hsl(var(--primary) / 0.08)" : "hsl(var(--muted) / 0.5)",
                                    border: `1px solid ${isChecked ? "hsl(var(--gold) / 0.4)" : "transparent"}`,
                                  }}>
                                  <input type="checkbox" checked={isChecked} onChange={() => toggleItem(cat.id, item)}
                                    className="w-4 h-4 rounded accent-amber-500 flex-shrink-0" />
                                  <span className="font-body text-sm leading-snug" style={{ color: "hsl(var(--foreground))" }}>
                                    {item}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky Selection Bar */}
      <AnimatePresence>
        {totalSelected > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-4 rounded-2xl flex items-center gap-4"
            style={{ background: "hsl(var(--background-dark))", border: "1px solid hsl(var(--gold) / 0.3)", boxShadow: "var(--shadow-gold)", maxWidth: "90vw" }}>
            <span className="font-body text-sm" style={{ color: "hsl(38 64% 85%)" }}>
              🍽️ <strong style={{ color: "hsl(var(--gold))" }}>{totalSelected}</strong> items across{" "}
              <strong style={{ color: "hsl(var(--gold))" }}>{totalCategories}</strong> categories
            </span>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))", color: "hsl(var(--primary-foreground))" }}>
              Request Quote →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: "hsl(28 36% 7% / 0.8)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="w-full max-w-lg rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--gold) / 0.2)", boxShadow: "var(--shadow-dark)" }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="section-label mb-1">Catering Enquiry</p>
                  <h2 className="font-display font-bold text-2xl" style={{ color: "hsl(var(--foreground))" }}>
                    Request a Quote
                  </h2>
                </div>
                <button onClick={() => setShowModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground-muted))" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--primary))" }} />
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "hsl(var(--foreground))" }}>
                    Thank You!
                  </h3>
                  <p className="font-body text-sm" style={{ color: "hsl(var(--foreground-muted))" }}>
                    We'll contact you within 24 hours to confirm your catering order.
                  </p>
                  <button onClick={() => { setShowModal(false); setSubmitted(false); }}
                    className="btn-primary mt-6">
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Full Name", type: "text", key: "name", placeholder: "Your full name" },
                    { label: "Phone Number", type: "tel", key: "phone", placeholder: "+1 (xxx) xxx-xxxx" },
                  ].map(({ label, type, key, placeholder }) => (
                    <div key={key}>
                      <label className="block font-body text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
                        {label}
                      </label>
                      <input type={type} required placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none focus:ring-2 transition-all"
                        style={{
                          background: "hsl(var(--muted))", color: "hsl(var(--foreground))",
                          border: "1px solid hsl(var(--border))",
                        }} />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Event Date</label>
                      <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none focus:ring-2"
                        style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }} />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Preferred Time</label>
                      <input type="time" required value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none"
                        style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Event Type</label>
                    <select value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none"
                      style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}>
                      {occasions.map(o => <option key={o.label}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>Additional Notes</label>
                    <textarea rows={3} placeholder="Guest count, special requests..."
                      value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none resize-none"
                      style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }} />
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--gold) / 0.15)" }}>
                    <p className="font-label text-xs tracking-wider mb-2" style={{ color: "hsl(var(--gold))" }}>
                      SELECTED: {totalSelected} ITEMS
                    </p>
                    <p className="font-body text-xs leading-relaxed whitespace-pre-line" style={{ color: "hsl(var(--foreground-muted))" }}>
                      {selectedSummary.slice(0, 300)}{selectedSummary.length > 300 ? "..." : ""}
                    </p>
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send className="w-4 h-4" />
                    Submit Enquiry
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
