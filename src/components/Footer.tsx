import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { ArrowUpRight, X, Loader2, Calendar } from "lucide-react";
import Earlylogo from "@/assets/images/early-logo.jpeg";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

const Footer = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/api/news-list/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNews(Array.isArray(data) ? data : data.results || []);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showNewsletter) fetchNews();
  }, [showNewsletter]);

  return (
    <footer className="bg-foreground py-16">

      <div className="container mx-auto px-4 max-w-6xl">

        <div className="grid md:grid-cols-5 gap-12 mb-14">

          {/* BRAND / SEO IDENTITY */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">

              <img
                src={Earlylogo}
                alt="Early Childhood Development Ltd Logo"
                className="w-9 h-9 rounded-lg object-cover"
              />

              <span className="font-display text-lg font-700 text-primary-foreground">
                Early Childhood Development Ltd
              </span>

            </div>

            <p className="font-body text-primary-foreground/50 text-sm leading-relaxed max-w-sm">
              A trusted early childhood education and preschool center in Ibadan, Nigeria,
              focused on play-based learning and holistic child development.
            </p>
          </div>

          {/* NAVIGATION */}
          <nav aria-label="Footer navigation">
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <HashLink
                    to={link.href}
                    className="font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">
              Connect
            </h4>

            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* UPDATES */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">
              School Updates
            </h4>

            <button
              onClick={() => setShowNewsletter(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body font-600 text-sm hover:bg-primary/90 transition-colors"
            >
              View News
              <ArrowUpRight size={16} />
            </button>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="font-body text-primary-foreground/30 text-sm">
            © {new Date().getFullYear()} Early Childhood Development Ltd. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
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

      {/* NEWS MODAL */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">

          <div className="relative w-full max-w-5xl bg-[#f8fafc] rounded-3xl p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 bg-white shadow-sm rounded-full p-2"
            >
              <X size={24} />
            </button>

            <h2 className="font-display text-3xl font-800 mb-2">
              School Updates & News
            </h2>

            <p className="text-gray-500 mb-8">
              Latest announcements from Early Childhood Development Ltd, Ibadan.
            </p>

            {loading ? (
              <div className="flex flex-col items-center py-20">
                <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
                <p className="text-gray-500">Loading updates...</p>
              </div>
            ) : news.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {news.map((item: any) => (
                  <article
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer"
                  >

                    {item.image_url && (
                      <img
                        src={item.image_url}
                        className="h-44 w-full object-cover"
                      />
                    )}

                    <div className="p-5">

                      <div className="flex items-center gap-2 text-green-600 mb-2">
                        <Calendar size={14} />
                        <span className="text-[10px] uppercase font-bold">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString()
                            : "New"}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-3">
                        {item.content}
                      </p>

                    </div>

                  </article>
                ))}

              </div>
            ) : (
              <p className="text-center text-gray-400 py-20">
                No updates available.
              </p>
            )}

          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">

          <div className="bg-white max-w-3xl w-full rounded-2xl p-6 relative">

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>

            {selectedItem.image_url && (
              <img
                src={selectedItem.image_url}
                className="h-60 w-full object-cover rounded-xl mb-5"
              />
            )}

            <h2 className="text-2xl font-bold mb-3">
              {selectedItem.title}
            </h2>

            <p className="text-gray-700 whitespace-pre-line">
              {selectedItem.content}
            </p>

          </div>

        </div>
      )}

    </footer>
  );
};

export default Footer;