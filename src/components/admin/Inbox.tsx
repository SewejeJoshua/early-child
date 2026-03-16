import { useEffect, useState } from "react";
import { Loader2, Mail, User, Calendar, X } from "lucide-react";

const Inbox = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const fetchMessages = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/api/contact-list/`,
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
        setMessages(Array.isArray(data) ? data : data.results || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inbox</h1>

      {loading ? (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
          <p className="text-gray-500">Loading messages...</p>
        </div>
      ) : messages.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              onClick={() => setSelectedItem(msg)}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* 🔥 HEADER (acts like image section) */}
              <div className="relative h-32 w-full bg-gradient-to-br from-green-500 to-green-700 flex items-end p-4">
                <div className="text-white">
                  <p className="text-xs uppercase opacity-80">New Message</p>
                  <h4 className="font-bold text-lg line-clamp-1">
                    {msg.subject}
                  </h4>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-grow">
                {/* DATE */}
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <Calendar size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {msg.created_at
                      ? new Date(msg.created_at).toLocaleDateString()
                      : "New"}
                  </span>
                </div>

                {/* NAME */}
                <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                  <User size={16} />
                  {msg.name}
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Mail size={14} />
                  {msg.email}
                </div>

                {/* MESSAGE PREVIEW */}
                <p className="text-gray-600 text-sm line-clamp-3">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 italic">
          No messages found.
        </div>
      )}

      {/* 🔥 MODAL (Same pattern as footer) */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* HEADER */}
            <div className="h-40 mb-6 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-end p-6 text-white">
              <h2 className="text-2xl font-bold">
                {selectedItem.subject}
              </h2>
            </div>

            {/* DETAILS */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-semibold">{selectedItem.name}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail size={14} />
                {selectedItem.email}
              </div>

              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Calendar size={14} />
                {selectedItem.created_at
                  ? new Date(selectedItem.created_at).toLocaleString()
                  : ""}
              </div>
            </div>

            {/* MESSAGE */}
            <p className="text-gray-700 whitespace-pre-line text-justify">
              {selectedItem.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;