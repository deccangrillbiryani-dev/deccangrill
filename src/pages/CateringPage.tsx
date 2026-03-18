import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Send, CheckCircle, User, PhoneCall, Calendar, Clock, Tag, AlignLeft, Mail, ConciergeBell } from "lucide-react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cateringData } from "@/data/cateringData";

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

type SelectedItems = Record<string, Set<string>>;

export default function CateringPage() {
  const [activeCategoryModal, setActiveCategoryModal] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    date: "", 
    time: "", 
    eventType: "Wedding", 
    customEventType: "", 
    notes: "" 
  });

  const toggleItem = (catId: string, item: string) => {
    setSelectedItems(prev => {
      const catSet = new Set(prev[catId] || []);
      catSet.has(item) ? catSet.delete(item) : catSet.add(item);
      return { ...prev, [catId]: catSet };
    });
  };

  const totalSelected = Object.values(selectedItems).reduce((acc, s) => acc + s.size, 0);
  const totalCategories = Object.values(selectedItems).filter(s => s.size > 0).length;

  const selectedSummary = Object.entries(selectedItems)
    .filter(([, s]) => s.size > 0)
    .map(([catId, s]) => {
      const cat = cateringData.find(c => c.id === catId);
      return `${cat?.category}: ${Array.from(s).join(", ")}`;
    }).join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const finalEventType = form.eventType === "Other" ? form.customEventType : form.eventType;

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          eventType: finalEventType,
          notes: form.notes,
          menu_summary: selectedSummary,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", date: "", time: "", eventType: "Wedding", customEventType: "", notes: "" });
      setSelectedItems({});
    } catch (error) {
      console.error("FAILED to send email:", error);
      alert("Something went wrong with the connection. Please call us directly to book!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: "#FAF3E0", fontFamily: "'Inter', 'SF Pro Display', sans-serif" }}>
      <Navbar />

      {/* Hero Header */}
      <div className="pt-28 pb-4">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#D97706" }}>
              Premium Catering
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight" style={{ color: "#1F2937" }}>
              Catering For Every<br /><span style={{ color: "#D97706" }}>Celebration</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: "#7F5539" }}>
              From intimate gatherings to grand weddings, we bring authentic Hyderabadi flavors directly to your table. Build your custom menu below.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Occasions Images Grid */}
      <section className="pb-8 pt-4">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#1F2937" }}>We Cater For</h2>
            <div className="w-12 h-1 mx-auto mt-3 rounded-full" style={{ background: "#D97706" }} />
          </motion.div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-y-12 gap-x-4 max-w-7xl mx-auto">
            {occasions.map((occ, i) => (
              <motion.div key={occ.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} className="flex flex-col items-center gap-4 group cursor-pointer">
                
                <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
                  <div className="absolute inset-[-4px] rounded-full border border-dashed border-[#D97706]/50 group-hover:rotate-180 transition-transform duration-700 ease-in-out pointer-events-none" />
                  
                  <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-[#FAF3E0] shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                    <img src={occ.image} alt={occ.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>

                <span className="text-[11px] md:text-sm text-center font-semibold tracking-wide" style={{ color: "#1F2937" }}>{occ.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Menu Builder */}
      <section className="py-8 pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#1F2937" }}>Build Your Menu</h2>
            <p className="text-sm font-light mt-2" style={{ color: "#7F5539" }}>Select a category below to choose your dishes.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {cateringData.map((cat, i) => {
              const selectedCount = selectedItems[cat.id]?.size || 0;
              // UPDATED: Now pulls the image directly from the cateringData object!
              const bgImage = cat.image || "https://images.unsplash.com/photo-1544025162-83b0a70f2abf?w=500&q=80";
              
              return (
                <motion.button 
                  key={cat.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }} 
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setActiveCategoryModal(cat.id)}
                  className="relative aspect-square rounded-2xl overflow-hidden group text-left transition-transform duration-300 hover:-translate-y-2"
                  style={{ boxShadow: "0 15px 35px rgba(31, 41, 55, 0.1)" }}
                >
                  <img src={bgImage} alt={cat.category} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/90 via-[#1F2937]/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="font-bold text-base md:text-lg tracking-tight leading-tight mb-1" style={{ color: "#FFFFFF" }}>{cat.category}</h3>
                    <p className="text-[10px] md:text-xs font-light" style={{ color: "rgba(255, 255, 255, 0.7)" }}>{cat.items.length} items available</p>
                  </div>

                  {selectedCount > 0 && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold shadow-md z-10" 
                      style={{ background: "#D97706", color: "#FFFFFF", backdropFilter: "blur(4px)" }}>
                      {selectedCount} Selected
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Selection Modal */}
      <AnimatePresence>
        {activeCategoryModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(31, 41, 55, 0.8)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setActiveCategoryModal(null)}
          >
            {(() => {
              const cat = cateringData.find(c => c.id === activeCategoryModal);
              if (!cat) return null;
              const selectedCount = selectedItems[cat.id]?.size || 0;

              return (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className="w-full max-w-2xl rounded-[2rem] p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
                  style={{ background: "#FFFFFF" }}
                >
                  <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-4 border-b" style={{ borderColor: "rgba(31, 41, 55, 0.05)" }}>
                    <div>
                      <h2 className="font-bold text-2xl tracking-tight" style={{ color: "#1F2937" }}>{cat.category}</h2>
                      <p className="text-sm mt-1" style={{ color: "#D97706" }}>{selectedCount} items selected</p>
                    </div>
                    <button onClick={() => setActiveCategoryModal(null)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5" style={{ color: "#7F5539" }} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto py-2">
                    {cat.items.map((item) => {
                      const isChecked = selectedItems[cat.id]?.has(item) || false;
                      return (
                        <label key={item} className="flex items-start gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                          style={{ background: isChecked ? "rgba(217, 119, 6, 0.05)" : "#F9F6F0", border: `1px solid ${isChecked ? "rgba(217, 119, 6, 0.3)" : "transparent"}` }}>
                          <input type="checkbox" checked={isChecked} onChange={() => toggleItem(cat.id, item)}
                            className="w-4 h-4 mt-0.5 rounded flex-shrink-0" style={{ accentColor: "#D97706" }} />
                          <span className="text-sm font-medium leading-snug" style={{ color: isChecked ? "#D97706" : "#1F2937" }}>{item}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t flex justify-end" style={{ borderColor: "rgba(31, 41, 55, 0.05)" }}>
                    <button onClick={() => setActiveCategoryModal(null)} className="px-8 py-3 rounded-xl font-bold text-white transition-transform hover:scale-105"
                      style={{ background: "#1F2937" }}>
                      Done
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUXURY FLOATING ACTION BUTTON (Cart Style) */}
      <AnimatePresence>
        {totalSelected > 0 && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)} 
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center gap-3 p-4 md:px-6 md:py-4 rounded-full shadow-2xl"
            style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#FFFFFF", boxShadow: "0 10px 25px rgba(217, 119, 6, 0.4)" }}
          >
            <div className="relative flex items-center justify-center">
              <ConciergeBell className="w-7 h-7 md:w-5 md:h-5" />
              <span className="absolute -top-2 -right-2 md:hidden flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#D97706] text-[11px] font-bold shadow-sm">
                {totalSelected}
              </span>
            </div>
            <span className="hidden md:block text-sm font-bold tracking-wide">
              Request Quote ({totalSelected})
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Booking Modal (Classy & Rich Form) */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(31, 41, 55, 0.8)", backdropFilter: "blur(8px)" }} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-lg rounded-[2rem] p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl" style={{ background: "#FFFFFF" }}>
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-2xl tracking-tight" style={{ color: "#1F2937" }}>Catering Request</h2>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" style={{ color: "#7F5539" }} />
                </button>
              </div>

              {submitted ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#D97706" }} />
                  <h3 className="font-bold text-xl mb-2" style={{ color: "#1F2937" }}>Request Sent!</h3>
                  <p className="text-sm font-light max-w-xs mx-auto" style={{ color: "#7F5539" }}>We will contact you within 24 hours to confirm details.</p>
                  <button onClick={() => { setShowModal(false); setSubmitted(false); }} className="mt-8 px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: "#1F2937" }}>Close Window</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                    <div className="pl-4 pr-2" style={{ color: "#D97706" }}><User size={18} /></div>
                    <input type="text" required placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full py-3.5 pr-4 text-sm outline-none bg-transparent" style={{ color: "#1F2937" }} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                      <div className="pl-4 pr-2" style={{ color: "#D97706" }}><Mail size={18} /></div>
                      <input type="email" required placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full py-3.5 pr-4 text-sm outline-none bg-transparent" style={{ color: "#1F2937" }} />
                    </div>

                    <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                      <div className="pl-4 pr-2" style={{ color: "#D97706" }}><PhoneCall size={18} /></div>
                      <input type="tel" required placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full py-3.5 pr-4 text-sm outline-none bg-transparent" style={{ color: "#1F2937" }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                      <div className="pl-4 pr-2" style={{ color: "#D97706" }}><Calendar size={18} /></div>
                      <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} 
                        className="w-full py-3.5 pr-4 text-sm outline-none bg-transparent" style={{ color: "#1F2937" }} />
                    </div>
                    <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                      <div className="pl-4 pr-2" style={{ color: "#D97706" }}><Clock size={18} /></div>
                      <input type="time" required value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} 
                        className="w-full py-3.5 pr-4 text-sm outline-none bg-transparent" style={{ color: "#1F2937" }} />
                    </div>
                  </div>

                  <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20 pr-4" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                    <div className="pl-4 pr-2" style={{ color: "#D97706" }}><Tag size={18} /></div>
                    <select value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} 
                      className="w-full py-3.5 text-sm outline-none bg-transparent appearance-none cursor-pointer" style={{ color: "#1F2937" }}>
                      {occasions.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
                      <option value="Other">Other Event</option>
                    </select>
                    <ChevronDown size={16} style={{ color: "#7F5539" }} className="pointer-events-none" />
                  </div>

                  <AnimatePresence>
                    {form.eventType === "Other" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="relative flex items-center rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20 mt-2" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                          <input type="text" required placeholder="Please specify event type..." value={form.customEventType} onChange={e => setForm(f => ({ ...f, customEventType: e.target.value }))}
                            className="w-full py-3.5 px-4 text-sm outline-none bg-transparent" style={{ color: "#1F2937" }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative flex items-start rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#D97706]/20 pt-3.5" style={{ background: "#F9F6F0", border: "1px solid rgba(31, 41, 55, 0.1)" }}>
                    <div className="pl-4 pr-2 pt-0.5" style={{ color: "#D97706" }}><AlignLeft size={18} /></div>
                    <textarea rows={2} placeholder="Guest count, allergy requests, notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full pr-4 pb-3.5 text-sm outline-none bg-transparent resize-none" style={{ color: "#1F2937" }} />
                  </div>

                  <div className="p-4 rounded-xl mt-2" style={{ background: "rgba(217, 119, 6, 0.05)", border: "1px dashed rgba(217, 119, 6, 0.2)" }}>
                    <p className="text-xs font-bold tracking-wider mb-2" style={{ color: "#D97706" }}>YOUR MENU ({totalSelected} ITEMS)</p>
                    <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "#7F5539" }}>{selectedSummary.slice(0, 150)}{selectedSummary.length > 150 ? "..." : ""}</p>
                  </div>

                  <button type="submit" disabled={isSending} className="w-full flex items-center justify-center gap-2 py-4 mt-4 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", opacity: isSending ? 0.7 : 1, boxShadow: "0 10px 20px rgba(217,119,6,0.25)" }}>
                    <Send className="w-4 h-4" />
                    {isSending ? "Sending Request..." : "Submit Request"}
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