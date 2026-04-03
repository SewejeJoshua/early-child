import { useEffect, useState } from "react";
import { Loader2, X, Calendar } from "lucide-react";

const BMessage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // ✅ NEW STATES
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const fetchMessages = async () => {
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
        setMessages(Array.isArray(data) ? data : data.results || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDIT API FUNCTION
  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_ECHILDHOOD_API}/api/news/${selectedItem.id}/ind/`,
        {
          method: "PUT", // or PATCH depending on your backend
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
        }
      );

      if (response.ok) {
        // ✅ Update UI instantly
        const updatedMessages = messages.map((msg) =>
          msg.id === selectedItem.id
            ? { ...msg, title: editedTitle, content: editedContent }
            : msg
        );

        setMessages(updatedMessages);

        // update selected item too
        setSelectedItem({
          ...selectedItem,
          title: editedTitle,
          content: editedContent,
        });

        setIsEditing(false);
      } else {
        console.error("Failed to update message");
      }
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Broadcasted Messages</h1>

      {loading ? (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
          <p className="text-gray-500">Loading messages...</p>
        </div>
      ) : messages.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((item: any) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setEditedTitle(item.title);
                setEditedContent(item.content);
                setIsEditing(false);
              }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gray-200">
                {item.image_url && (
                  <>
                    <img
                      src={
                        item.image_url.startsWith("http")
                          ? item.image_url
                          : `${import.meta.env.VITE_ECHILDHOOD_API}${item.image_url}`
                      }
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

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic">No messages found.</p>
      )}

      {/* ✅ MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* IMAGE */}
            <div className="h-60 mb-6 rounded-xl overflow-hidden bg-gray-100">
              {selectedItem.image_url && (
                <img
                  src={
                    selectedItem.image_url.startsWith("http")
                      ? selectedItem.image_url
                      : `${import.meta.env.VITE_ECHILDHOOD_API}${selectedItem.image_url}`
                  }
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* ✅ EDITABLE TITLE */}
            {isEditing ? (
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
            ) : (
              <h2 className="text-2xl font-bold mb-3 text-center">
                {selectedItem.title}
              </h2>
            )}

            {/* ✅ EDITABLE CONTENT */}
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border p-3 rounded min-h-[120px]"
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line text-justify">
                {selectedItem.content}
              </p>
            )}

            {/* ✅ ACTION BUTTONS */}
            <div className="mt-6 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Send
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMessage;