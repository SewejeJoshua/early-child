import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Earlylogo from "@/assets/images/early-logo.jpeg";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" }, 
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

const Footer = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Replace with your subscription logic
    alert(`Subscribed with email: ${email}`);
    setEmail("");
    setShowNewsletter(false);
  };

  return (
    <footer className="bg-foreground py-16 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <img src={Earlylogo} className="rounded-full" />
              </div>
              <span className="font-display text-lg font-700 text-primary-foreground">
                Early Childhood
              </span>
            </div>
            <p className="font-body text-primary-foreground/50 text-sm leading-relaxed max-w-sm">
              Nurturing young minds through evidence-based, play-based learning
              and compassionate care since 2010.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">Connect</h4>
            <ul className="space-y-3 mb-6">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Button */}
            <button
              onClick={() => setShowNewsletter(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body font-600 text-sm hover:bg-primary/90 transition-colors"
            >
              Recent Information
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-primary-foreground/30 text-sm">
            © {new Date().getFullYear()} Early Childhood. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Full-page Newsletter Modal */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-card rounded-xl p-8 shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="font-display text-2xl font-800 mb-4 text-foreground">
              Our Newsletter
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Stay updated with our latest programs and news.
            </p>

            
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;