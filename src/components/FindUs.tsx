import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from "lucide-react";

// Business Hours Data
const hours = [
  { day: "Mon - Thu", time: "11:00 AM – 10:00 PM", late: false },
  { day: "Friday", time: "11:00 AM – 3:00 AM", late: true },
  { day: "Saturday", time: "11:30 AM – 3:00 AM", late: true },
  { day: "Sunday", time: "11:30 AM – 10:00 PM", late: false },
];

function getCurrentDayIndex() {
  const d = new Date().getDay(); // 0=Sun, 5=Fri, 6=Sat
  if (d >= 1 && d <= 4) return 0;
  if (d === 5) return 1;
  if (d === 6) return 2;
  return 3;
}

export default function FindUs() {
  const todayIndex = getCurrentDayIndex();

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: "#F9F6F0", fontFamily: "'Inter', 'SF Pro Display', sans-serif" }}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10" // Reduced bottom margin
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-8 h-[1px]" style={{ background: "#D97706" }} />
            <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#D97706" }}>
              Find Us
            </span>
            <span className="w-8 h-[1px]" style={{ background: "#D97706" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#1F2937" }}>
            Come Visit Us
          </h2>
        </motion.div>

        {/* Changed items-start to items-stretch so both columns match heights perfectly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            // Reduced mobile height from 400px to 320px, keeping desktop height flexible to match right column
            className="lg:col-span-7 rounded-[2rem] overflow-hidden relative h-[320px] lg:h-full w-full group"
            style={{ 
              boxShadow: "0 20px 40px rgba(31, 41, 55, 0.08)", 
              border: "1px solid rgba(217, 119, 6, 0.25)" 
            }}
          >
            {/* Soft highlight glow behind the map */}
            <div className="absolute inset-0 bg-[#D97706]/10 animate-pulse pointer-events-none" />

            <iframe
              title="Deccan Grill Plano Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.541485640391!2d-96.7371529!3d33.055278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c185bc0000001%3A0x6b4f738870198031!2s909%20W%20Spring%20Creek%20Pkwy%20%23230%2C%20Plano%2C%20TX%2075023!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Cute Map Highlight Badge */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-md"
              style={{ background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(217, 119, 6, 0.3)" }}
            >
              <div className="p-1 rounded-full" style={{ background: "#D97706" }}>
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight" style={{ color: "#1F2937" }}>
                We are here!
              </span>
            </motion.div>
          </motion.div>

          {/* Unified Contact & Hours Card - Compressed Padding */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 p-6 md:p-8 rounded-[2rem] flex flex-col h-full" // Reduced padding
            style={{
              background: "rgba(229, 231, 235, 0.4)", // Very soft beige glass
              border: "1px solid rgba(217, 119, 6, 0.15)",
              boxShadow: "0 20px 40px rgba(31, 41, 55, 0.05)",
              backdropFilter: "blur(20px)"
            }}
          >
            {/* Contact Info */}
            <div className="mb-6">
              <h3 className="font-bold text-xl md:text-2xl mb-4" style={{ color: "#1F2937" }}>
                Get In Touch
              </h3>
              
              <div className="space-y-4"> {/* Compressed spacing */}
                {/* Click to Call */}
                <a href="tel:+14695739471" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3" style={{ background: "rgba(217, 119, 6, 0.1)" }}>
                    <Phone className="w-4 h-4" style={{ color: "#D97706" }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest font-semibold uppercase mb-0.5" style={{ color: "#7F5539" }}>Phone</p>
                    <p className="font-medium text-sm md:text-base text-[#1F2937] transition-colors group-hover:text-[#D97706]">+1 (469) 573-9471</p>
                  </div>
                </a>

                {/* Click to Mail */}
                <a href="mailto:deccangrillbiryani@gmail.com" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-3" style={{ background: "rgba(217, 119, 6, 0.1)" }}>
                    <Mail className="w-4 h-4" style={{ color: "#D97706" }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest font-semibold uppercase mb-0.5" style={{ color: "#7F5539" }}>Email</p>
                    <p className="font-medium text-sm md:text-base text-[#1F2937] break-all transition-colors group-hover:text-[#D97706]">deccangrillbiryani@gmail.com</p>
                  </div>
                </a>

                {/* Click to Map */}
                <a href="https://www.google.com/maps/place/909+W+Spring+Creek+Pkwy+%23230,+Plano,+TX+75023" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: "rgba(217, 119, 6, 0.1)" }}>
                    <MapPin className="w-4 h-4" style={{ color: "#D97706" }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest font-semibold uppercase mb-0.5" style={{ color: "#7F5539" }}>Address</p>
                    <p className="font-medium text-sm md:text-base text-[#1F2937] transition-colors group-hover:text-[#D97706]">909 W Spring Creek Pkwy Ste 230,<br />Plano, TX 75023</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] mb-6" style={{ background: "linear-gradient(90deg, rgba(217,119,6,0.1), rgba(217,119,6,0.3), rgba(217,119,6,0.1))" }} />

            {/* Compact Business Hours */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4" style={{ color: "#D97706" }} />
                <h3 className="font-bold text-lg md:text-xl" style={{ color: "#1F2937" }}>Hours</h3>
              </div>
              
              <div className="space-y-1.5"> {/* Tighter line spacing for hours */}
                {hours.map((h, i) => (
                  <div 
                    key={h.day} 
                    className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all ${i === todayIndex ? 'shadow-sm' : ''}`} // Compressed row padding
                    style={{
                      background: i === todayIndex ? "rgba(255, 255, 255, 0.8)" : "transparent",
                      border: i === todayIndex ? "1px solid rgba(217, 119, 6, 0.2)" : "1px solid transparent"
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {i === todayIndex && (
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#D97706" }} />
                      )}
                      <span className="text-sm font-medium" style={{ color: i === todayIndex ? "#1F2937" : "#7F5539" }}>
                        {h.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: i === todayIndex ? "#D97706" : "#1F2937" }}>
                        {h.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-auto pt-2 flex gap-3">
              <a href="https://facebook.com/deccangrillplano" target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-1 shadow-sm"
                 style={{ background: "white", color: "#1F2937", border: "1px solid rgba(0,0,0,0.05)" }}>
                <Facebook className="w-4 h-4" style={{ color: "#1877F2" }} />
                Facebook
              </a>
              <a href="https://instagram.com/deccangrillplano" target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-1 shadow-sm"
                 style={{ background: "white", color: "#1F2937", border: "1px solid rgba(0,0,0,0.05)" }}>
                <Instagram className="w-4 h-4" style={{ color: "#E4405F" }} />
                Instagram
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}