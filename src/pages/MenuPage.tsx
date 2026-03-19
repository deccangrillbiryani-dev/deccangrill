import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { menuData } from "@/data/menuData";

// Special data for Combos
const comboData = [
  {
    name: "Veg Lunch Combo",
    price: "$11.99",
    image: "/images/vegcombo.png",
    desc: "Veg Starter, Veg Biryani, Veg Entree, Naan, Dessert",
    time: "Mon - Thu | 11:30 AM - 3:30 PM"
  },
  {
    name: "Chicken Lunch Combo",
    price: "$12.99",
    image: "/images/nonvegcombo.png",
    desc: "Chicken Starter, Chicken Biryani, Chicken Entree, Naan, Dessert",
    time: "Mon - Thu | 11:30 AM - 3:30 PM"
  },
  {
    name: "Goat Lunch Combo",
    price: "$14.99",
    image: "/images/goatcombo.jpg",
    desc: "Chicken Starter, Goat Biryani, Chicken Entree, Naan, Dessert",
    time: "Mon - Thu | 11:30 AM - 3:30 PM"
  },
  {
    name: "Weekend Lunch Buffet",
    price: "$17.99",
    image: "/images/buffet.jpg",
    desc: "Signature Deccan flavors, Dum Biryanis, Classic Curries, Indulgent Desserts & Drinks",
    time: "Fri - Sun | 11:45 AM - 3:00 PM",
    isHighlight: true
  }
];

// ✅ REQUIRED CHANGE: Map comboData into the exact structure of menuData and append it.
const extendedMenuData = [
  ...menuData,
  {
    id: "combos",
    category: "Combos & Buffet",
    items: comboData.map(combo => ({
      name: combo.name,
      price: combo.price,
      image: combo.image,
      desc: combo.desc
    }))
  }
];

function DishCard({ item }: { item: { name: string; price: string; image: string; desc?: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateY(0) rotateX(0) scale(1)";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col bg-white border border-[#D97706]/10 shadow-sm transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden relative shrink-0">
        {!imgError ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={() => setImgError(true)} loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F9F6F0] text-4xl">🍛</div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-semibold text-sm text-[#1F2937]">{item.name}</h3>
          {item.desc && <p className="text-[11px] text-[#7F5539] mt-1 line-clamp-2">{item.desc}</p>}
        </div>
        <p className="font-bold text-base text-[#D97706]">{item.price}</p>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to filter the ENTIRE menu (now including Combos) based on Tab and Search
  const filteredMenu = useMemo(() => {
    let result = extendedMenuData; // ✅ Use extended data

    // 1. Filter by Tab
    if (activeTab !== "all") {
      result = extendedMenuData.filter(cat => cat.id === activeTab);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const terms = searchQuery.toLowerCase().split(/\s+/);
      return result.map(cat => ({
        ...cat,
        items: cat.items.filter(item => terms.every(t => item.name.toLowerCase().includes(t)))
      })).filter(cat => cat.items.length > 0);
    }

    return result;
  }, [activeTab, searchQuery]);

  return (
    // FIX: flex flex-col and min-h-screen removes the white space below footer entirely
    <div className="flex flex-col min-h-screen bg-[#FAF3E0]">
      <Navbar />

      <div className="flex-1 pb-12">
        <div className="pt-32 pb-4 text-center">
          <div className="container mx-auto px-4">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-[#D97706]">Royal Hyderabadi Menu</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#1F2937]">What are you craving?</h1>
          </div>
        </div>

        {/* STICKY HEADER */}
        <div className="sticky top-16 z-30 pt-4 pb-3 flex flex-col gap-4 bg-[#FAF3E0]/95 backdrop-blur-xl border-b border-[#D97706]/10 shadow-sm">
          <div className="container mx-auto px-4 md:px-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D97706]" />
              <input
                type="text"
                placeholder="Search for biryani, kebabs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white outline-none ring-1 ring-[#D97706]/20 focus:ring-2 focus:ring-[#D97706] transition-all"
              />
            </div>
          </div>

          <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 justify-start md:justify-center min-w-max pb-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "all" ? "bg-[#D97706] text-white" : "bg-white text-[#7F5539]"}`}
              >
                All Items
              </button>
              {extendedMenuData.map((cat) => ( // ✅ Render tabs dynamically from extendedMenuData
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === cat.id ? "bg-[#D97706] text-white" : "bg-white text-[#7F5539]"}`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-10">
          {/* MAIN MENU SECTIONS - Combos now naturally render here at the end! */}
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((cat) => (
              <motion.section 
                layout
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                key={cat.id} 
                className="mb-16"
              >
                <h2 className="text-2xl font-bold text-[#1F2937] mb-8 pb-2 border-b border-[#D97706]/10">{cat.category}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {cat.items.map((item) => (
                    <DishCard key={item.name} item={item} />
                  ))}
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}