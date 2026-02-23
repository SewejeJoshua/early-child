import { ArrowUpRight } from "lucide-react";

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
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-800 text-sm">EC</span>
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

          {/* Social */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">Connect</h4>
            <ul className="space-y-3">
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
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-primary-foreground/30 text-sm">
            © {new Date().getFullYear()} Early Childhood. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <a key={item} href="#" className="font-body text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
