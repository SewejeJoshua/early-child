import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Earlylogo from "@/assets/images/early-logo.jpeg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" }, 
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <img src={Earlylogo} className="rounded-full" alt="Logo" />
          </div>
          <span className="font-display text-lg font-700 text-foreground tracking-tight">
            Early Childhood
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <HashLink
                smooth
                to={link.href}
                className="font-body font-500 text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-all duration-200 text-sm"
              >
                {link.label}
              </HashLink>
            </li>
          ))}

          {/* Gallery Link */}
          <li className="ml-1">
            <Link
              to="/gallery"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="font-body font-500 text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-all duration-200 text-sm"
            >
              Gallery
            </Link>
          </li>


          <li className="ml-1">
            <HashLink
              to="/#team"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="font-body font-500 text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-all duration-200 text-sm"
            >
              Team
            </HashLink>
          </li>

          {/* Contact / Get Started */}
          <li className="ml-4">
            <HashLink
              smooth
              to="/#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-600 text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Us <ArrowRight size={14} />
            </HashLink>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <HashLink
                    smooth
                    to={link.href}
                    className="block font-body font-500 text-muted-foreground hover:text-foreground hover:bg-muted px-4 py-3 rounded-lg transition-all text-base"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </HashLink>
                </motion.li>
              ))}

              {/* Gallery Link */}
              <li>
                <Link smooth
                  to="/#gallery"
                  className="block font-body font-500 text-muted-foreground hover:text-foreground hover:bg-muted px-4 py-3 rounded-lg transition-all text-base"
                  onClick={() => {
                    setOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Gallery
                </Link>
              </li>
                
                <li>
                <HashLink
                  to="/#team"
                  className="block font-body font-500 text-muted-foreground hover:text-foreground hover:bg-muted px-4 py-3 rounded-lg transition-all text-base"
                  onClick={() => {
                    setOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Team
                </HashLink>
              </li>


              

              {/* Get Started / Contact */}
              <li className="mt-4 px-4">
                <HashLink
                  smooth
                  to="/#contact"
                  className="block text-center bg-primary text-primary-foreground font-display font-600 text-sm px-5 py-3 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </HashLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;