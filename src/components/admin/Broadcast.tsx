import { useState } from "react";

const BroadcastMessage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  // Store image
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    // 1. Get the token from localStorage
    const token = localStorage.getItem("token");

    // 2. Prepare FormData
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);
    formData.append("content", content);

    try {
      const response = await fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/api/news/`, {
        method: "POST",
        headers: {
          // 3. Add the Authorization header
          // Note: Using "Token" prefix (common for Django). Change to "Bearer" if needed.
          "Authorization": `Token ${token}`, 
          // Note: DO NOT add 'Content-Type': 'multipart/form-data' here. 
          // Fetch will set it automatically with the correct boundary.
        },
        body: formData,
      });

      if (response.ok) {
        setStatusMsg({ type: "success", text: "Broadcast sent successfully!" });
        // Clear form
        setTitle("");
        setImage(null);
        setContent("");
      } else if (response.status === 401) {
        setStatusMsg({ type: "error", text: "Session expired. Please log in again." });
      } else {
        const errorData = await response.json();
        setStatusMsg({ type: "error", text: errorData.message || "Failed to send broadcast." });
      }
    } catch (error) {
      console.error(error);
      setStatusMsg({ type: "error", text: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Broadcast Message</h1>
        <p className="text-muted-foreground text-sm">
          Send announcements to parents, teachers, or all users.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        {statusMsg.text && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
            statusMsg.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Message Title</label>
            <input
              type="text"
              placeholder="e.g School Holiday Announcement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Message Content</label>
            <textarea
              rows={5}
              placeholder="Write your announcement here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Broadcast"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BroadcastMessage;