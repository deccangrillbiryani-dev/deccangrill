import { Link } from "react-router-dom";
import { Flame, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="geometric-bg pt-16 pb-8" style={{ background: "hsl(var(--background-dark))" }}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))" }}>
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-label text-xs tracking-[0.18em]" style={{ color: "hsl(var(--primary))" }}>DECCAN</div>
                <div className="font-display font-bold text-xl leading-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  GRILL
                </div>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "hsl(38 64% 70% / 0.7)" }}>
              Authentic Hyderabadi Cuisine.<br />100% Zabiha Halal. Plano, TX.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/deccangrillplano" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/deccangrillplano" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(var(--gold))" }}>
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-label text-xs tracking-widest mb-5" style={{ color: "hsl(var(--gold))" }}>
              NAVIGATE
            </p>
            <ul className="space-y-3">
              {[["Home", "/"], ["Menu", "/menu"], ["Catering", "/catering"]].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="font-body text-sm transition-colors duration-200 hover:text-amber-400"
                    style={{ color: "hsl(38 64% 70% / 0.7)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-label text-xs tracking-widest mb-5" style={{ color: "hsl(var(--gold))" }}>
              CONTACT
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <a href="tel:+14695739471" className="font-body text-sm" style={{ color: "hsl(38 64% 70% / 0.7)" }}>
                  +1 (469) 573-9471
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <a href="mailto:deccangrillbiryani@gmail.com" className="font-body text-sm break-all" style={{ color: "hsl(38 64% 70% / 0.7)" }}>
                  deccangrillbiryani@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <span className="font-body text-sm" style={{ color: "hsl(38 64% 70% / 0.7)" }}>
                  909 W Spring Creek Pkwy Ste 230,<br />Plano, TX 75023
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="shimmer-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-center" style={{ color: "hsl(38 64% 70% / 0.4)" }}>
            © 2025 Deccan Grill Plano. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label text-xs tracking-wider"
              style={{
                background: "hsl(var(--gold) / 0.1)",
                color: "hsl(var(--gold))",
                border: "1px solid hsl(var(--gold) / 0.2)",
              }}>
              ✓ 100% Zabiha Halal
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label text-xs tracking-wider"
              style={{
                background: "hsl(var(--primary) / 0.1)",
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary) / 0.2)",
              }}>
              🥩 Halal Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
