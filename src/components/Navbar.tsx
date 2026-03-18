import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

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
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    const [path, hash] = href.split("#");

    // Case 1: If we are already on the home page and it's an anchor link
    if (location.pathname === "/" && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } 
    // Case 2: If we are on a different page, go home first
    else if (hash) {
      navigate("/"); // Navigate to home
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 500); 
    }
  };

  const isHomePage = location.pathname === "/";
  const isDarkBg = scrolled || isHomePage;
  const desktopTextColor = isDarkBg ? "hsl(38 64% 95%)" : "#1F2937"; 

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
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="Deccan Grill Logo" 
              className="h-16 w-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" 
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.includes("#") ? (
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    className="font-body text-sm font-medium transition-colors duration-200 relative group"
                    style={{ color: desktopTextColor }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ background: "hsl(var(--gold))" }} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="font-body text-sm font-medium transition-colors duration-200 relative group"
                    style={{ color: location.pathname === link.href ? "hsl(var(--primary))" : desktopTextColor }}
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
            style={{ color: isDarkBg ? "hsl(var(--gold))" : "#D97706" }}
          >
            <Phone className="w-4 h-4" />
            +1 (469) 573-9471
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: isDarkBg ? "hsl(var(--gold))" : "#D97706" }}
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
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    className="font-display text-3xl font-bold text-left"
                    style={{ color: (location.pathname === link.href && !link.href.includes("#")) ? "hsl(var(--gold))" : "hsl(var(--primary-foreground))" }}
                  >
                    {link.label}
                  </button>
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