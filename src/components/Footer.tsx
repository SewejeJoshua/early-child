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

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/api/news-list/`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`, 
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
    if (showNewsletter) {
      fetchNews();
    }
  }, [showNewsletter]);

  return (
    <footer className="bg-foreground py-16 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
                <img src={Earlylogo} className="object-cover w-full h-full" alt="Logo" />
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

          <div className="flex flex-col gap-4">
            <h4 className="font-display font-600 text-primary-foreground/40 text-xs uppercase tracking-wider mb-5">Updates</h4>
            <button
              onClick={() => setShowNewsletter(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body font-600 text-sm hover:bg-primary/90 transition-colors w-fit"
            >
              Recent Information
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Full-page Newsletter Modal --- */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-[#f8fafc] rounded-3xl p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
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

            {/* --- Card Grid Section --- */}
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
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Compact Image */}
                    {item.image && (
                      <div className="relative h-44 w-full overflow-hidden bg-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      {/* Meta Date */}
                      <div className="flex items-center gap-2 text-green-600 mb-3">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {item.created_at 
                            ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})
                            : "New"}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        {item.title}
                      </h4>

                      {/* Content Preview */}
                      <div className="text-gray-500 text-sm leading-relaxed line-clamp-4 mb-6">
                         {item.content}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-medium">Early Childhood News</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
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
    </footer>
  );
};

export default Footer;