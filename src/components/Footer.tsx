import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, Heart } from "lucide-react";

// Business Hours Data for Footer
const hours = [
  { day: "Mon - Thu", time: "11:00 AM – 10:00 PM" },
  { day: "Friday", time: "11:00 AM – 3:00 AM" },
  { day: "Saturday", time: "11:30 AM – 3:00 AM" },
  { day: "Sunday", time: "11:00 AM – 10:00 PM" },
];

export default function Footer() {
  return (
    <footer 
      className="pt-16 pb-8" 
      style={{ 
        backgroundColor: "#2C1A08", // FIX: Changed from bluish-gray to Rich Warm Espresso
        borderTop: "4px solid #7F5539", // Dark Wood top border
        fontFamily: "'Inter', 'SF Pro Display', sans-serif" 
      }}
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Main Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col items-start">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="Deccan Grill" 
                className="w-28 h-auto mb-6 transition-transform duration-300 hover:scale-105 bg-white rounded-full p-1" 
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#D4A373" }}> {/* Light Wood Text */}
              Authentic Hyderabadi Cuisine.<br />100% Zabiha Halal. Plano, TX.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/deccangrillplano" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                 style={{ background: "#7F5539", color: "#FAF3E0" }}> {/* Dark Wood Bg */}
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/deccangrillplano" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                 style={{ background: "#7F5539", color: "#FAF3E0" }}>
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-6 uppercase" style={{ color: "#B08968" }}> {/* Medium Wood */}
              Navigate
            </p>
            <ul className="space-y-4">
              {[["Home", "/"], ["Menu", "/menu"], ["Catering", "/catering"]].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm font-medium transition-colors duration-200"
                        style={{ color: "#D4A373" }} // Light Wood
                        onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#D4A373"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-6 uppercase" style={{ color: "#B08968" }}>
              Contact
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover:scale-110" style={{ color: "#B08968" }} />
                <a href="tel:+14695739471" className="text-sm font-medium transition-colors" style={{ color: "#D4A373" }}
                   onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                   onMouseLeave={(e) => e.currentTarget.style.color = "#D4A373"}>
                  +1 (469) 573-9471
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover:scale-110" style={{ color: "#B08968" }} />
                <a href="mailto:deccangrillbiryani@gmail.com" className="text-sm font-medium break-all transition-colors" style={{ color: "#D4A373" }}
                   onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                   onMouseLeave={(e) => e.currentTarget.style.color = "#D4A373"}>
                  deccangrillbiryani@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover:scale-110" style={{ color: "#B08968" }} />
                <span className="text-sm font-medium" style={{ color: "#D4A373" }}>
                  909 W Spring Creek Pkwy Ste 230,<br />Plano, TX 75023
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Business Hours */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-6 uppercase flex items-center gap-2" style={{ color: "#B08968" }}>
              <Clock className="w-4 h-4" /> Hours
            </p>
            <ul className="space-y-3">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between items-center text-sm border-b pb-2" style={{ borderColor: "rgba(176, 137, 104, 0.2)" }}>
                  <span style={{ color: "#D4A373" }}>{h.day}</span>
                  <span className="font-medium" style={{ color: "#FAF3E0" }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider Line using Dark Wood */}
        <div className="w-full h-[1px] mb-8" style={{ background: "#7F5539" }} />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs" style={{ color: "rgba(212, 163, 115, 0.6)" }}>
            © {new Date().getFullYear()} Deccan Grill Plano. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
              style={{ background: "rgba(176, 137, 104, 0.1)", color: "#D4A373", border: "1px solid rgba(176, 137, 104, 0.3)" }}>
              ✓ 100% Zabiha Halal
            </span>
          </div>
        </div>

        {/* StaffArc Attribution */}
        <div className="mt-8 flex justify-center items-center gap-1 text-sm" style={{ color: "#B08968" }}>
          Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" fill="currentColor" /> by
          <a
            href="https://staffarc.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors duration-300 hover:underline"
            style={{ color: "#D97706" }}
          >
            <img
              src="https://www.staffarc.in/images/Staffarc-logo.png"
              alt="StaffArc logo"
              className="h-5 w-5 object-contain"
            />
            StaffArc
          </a>
        </div>

      </div>
    </footer>
  );
}