import { useState, useEffect } from "react";
import { ArrowUpRight, X, Loader2, Calendar } from "lucide-react";
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
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Fetch news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/api/news-list/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
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
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-800 text-sm"><img src={Earlylogo} alt="Early Childhood Logo" className="rounded-lg"/></span>
              </div>
              <span className="font-display text-lg font-700 text-primary-foreground">
                Early Childhood
              </span>
            </div>
            <p className="font-body text-primary-foreground/50 text-sm leading-relaxed max-w-sm">
              Nurturing young minds through evidence-based, play-based learning and compassionate care since 2010.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">
              Navigation
            </h4>
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

          {/* Social Links */}
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

          {/* Updates / Newsletter */}
          <div>
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">
              Updates
            </h4>
            <button
              onClick={() => setShowNewsletter(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body font-600 text-sm hover:bg-primary/90 transition-colors w-fit"
            >
              Recent Information
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
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

      {/* --- Newsletter Modal --- */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-[#f8fafc] rounded-3xl p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors bg-white shadow-sm rounded-full p-2 z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-10 text-center md:text-left">
              <h3 className="font-display text-4xl font-900 text-gray-900 tracking-tight">
                School Broadcasts
              </h3>
              <p className="font-body text-gray-500 mt-2">
                Stay updated with the latest happenings at Early Childhood.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center py-20">
                <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
                <p className="text-gray-500 animate-pulse">Loading updates...</p>
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item: any) => (
                  <article
                    key={item.id || item.title}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="relative h-44 w-full overflow-hidden bg-gray-200">
                      {item.image && (
                        <>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-green-600 mb-3">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString()
                            : "New"}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {item.title}
                      </h4>

                      <div className="text-gray-500 text-sm line-clamp-4 mb-6 break-words">
                        {item.content}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-400 font-medium italic">No recent broadcasts found.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Detail Modal --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4"
            >
              <X size={22} />
            </button>

            {/* Image Section */}
            <div className="h-60 mb-6 rounded-xl overflow-hidden bg-gray-100">
              {selectedItem.image && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <h2 className="text-2xl font-bold mb-3 text-center">
              {selectedItem.title}
            </h2>

            <p className="text-gray-700 whitespace-pre-line text-justify">
              {selectedItem.content}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;