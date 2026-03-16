import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Flame } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/#story" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (href.includes("#")) {
      const id = href.split("#")[1];
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "navbar-glass py-3 shadow-dark" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))" }}>
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <div className="font-label text-xs tracking-[0.18em] uppercase"
                style={{ color: "hsl(var(--primary))" }}>
                DECCAN
              </div>
              <div className="font-display font-bold text-lg leading-none"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                GRILL
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.includes("#") ? (
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    className="font-body text-sm font-medium transition-colors duration-200 relative group"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ background: "hsl(var(--gold))" }} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="font-body text-sm font-medium transition-colors duration-200 relative group"
                    style={{ color: location.pathname === link.href ? "hsl(var(--primary))" : "hsl(var(--primary-foreground))" }}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                      style={{ background: "hsl(var(--gold))" }} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Phone */}
          <a
            href="tel:+14695739471"
            className="hidden md:flex items-center gap-2 font-body text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{ color: "hsl(var(--gold))" }}
          >
            <Phone className="w-4 h-4" />
            +1 (469) 573-9471
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "hsl(var(--gold))" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 flex flex-col pt-20 pb-8 px-8"
            style={{ background: "hsl(var(--background-dark))" }}
          >
            <div className="shimmer-divider mb-8" />
            <ul className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.href.includes("#") ? (
                    <button
                      onClick={() => handleAnchorClick(link.href)}
                      className="font-display text-3xl font-bold"
                      style={{ color: "hsl(var(--primary-foreground))" }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl font-bold"
                      style={{ color: location.pathname === link.href ? "hsl(var(--gold))" : "hsl(var(--primary-foreground))" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="shimmer-divider my-8" />
            <a
              href="tel:+14695739471"
              className="flex items-center gap-3 font-body text-lg font-medium"
              style={{ color: "hsl(var(--gold))" }}
            >
              <Phone className="w-5 h-5" />
              +1 (469) 573-9471
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
