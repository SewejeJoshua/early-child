import { useState } from "react";
import { Copy, Check, Upload, Landmark, Mail } from "lucide-react";
import Chiday from "@/assets/images/chiday.jpeg";

const ChildrensDayRegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    school: "",
    parent_name: "",
    email: "", 
    parent_phone: "",
    medical_notes: "",
    receipt: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState("");
  const [fname, setFname] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("first_name", formData.first_name);
      dataToSend.append("last_name", formData.last_name);
      dataToSend.append("age", formData.age);
      dataToSend.append("gender", formData.gender);
      dataToSend.append("school", formData.school);
      dataToSend.append("parent_name", formData.parent_name);
      dataToSend.append("email", formData.email);
      dataToSend.append("parent_phone", "+234" + formData.parent_phone);
      dataToSend.append("medical_notes", formData.medical_notes || "");

      if (formData.receipt) {
        dataToSend.append("receipt", formData.receipt);
      }

      

      const response = await fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/api/register/`, {
        method: "POST",
        body: dataToSend,
        headers: { Accept: "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Use backend-generated pass_code
        setToken(data.pass_code);
        setFname(data.first_name);
        setSubmitted(true);
      } else {
        console.error("Backend Error:", data);
        alert(Object.values(data).flat().join("\n"));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* HERO IMAGE */}
          <div className="relative h-70 w-full">
            <img src={Chiday} alt="Childrens Day" className="w-full h-45" />
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* EVENT DESCRIPTION */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <p className="text-gray-700 text-sm leading-relaxed text-justify">
                🎉 <span className="font-bold text-green-700  decoration-green-200">EarlyChildhood Children’s Day 2026 Party!</span> 🎉
                <br /><br />
                Get ready for a day filled with laughter, joy, and unforgettable memories! EarlyChildhood warmly invites you and your little ones to our exciting Children’s Day 2026 Party — a celebration specially designed to bring smiles, fun activities, and a truly uplifting and spirit-filled experience for every child.
                <br /><br />
                Beyond the fun, this is a moment to nurture hearts and celebrate the gift of every child. We commit this day into God’s hands, trusting Him for safety, joy, and a beautiful atmosphere where every child feels loved, uplifted, and truly special. 🌟
              </p>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-green-700 font-bold">
                <Landmark size={18} />
                <h3>Payment Details</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <span className="font-medium">Fee:</span> <span className="text-gray-900 font-bold">₦5,000</span>
                <span className="font-medium">Account:</span> <span className="text-gray-900 font-bold">0058577041</span>
                <span className="font-medium">Bank:</span> <span className="text-gray-900">Access Bank</span>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Child's Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select name="age" value={formData.age} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500">
                  <option value="">Select Age</option>
                  <option value="1-5">1-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-13">11-13 years</option>
                  <option value="14-18">14-18 years</option>
                </select>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500">
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <input type="text" name="school" placeholder="Name of School" value={formData.school} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              <input type="text" name="medical_notes" placeholder="Medical Notes (Allergies, etc.)" value={formData.medical_notes} onChange={handleChange} className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1 pt-2">Parent / Guardian Details</h4>
              
              <input type="text" name="parent_name" placeholder="Full Name" value={formData.parent_name} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 font-semibold text-xs">+234</div>
                  <input
                    type="tel"
                    name="parent_phone"
                    placeholder="Phone Number"
                    value={formData.parent_phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parent_phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    required
                    className="w-full border rounded-xl pl-12 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
              </div>

              {/* UPLOAD RECEIPT */}
              <div className="pt-2">
                <label className="flex items-center justify-between w-full border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <Upload size={18} className="text-green-600" />
                    <span className="text-sm text-gray-500 font-medium">
                      {formData.receipt ? formData.receipt.name : "Upload Receipt"}
                    </span>
                  </div>
                  <input type="file" name="receipt" accept="image/*,.pdf" onChange={handleFileChange} required className="hidden" />
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-md shadow-green-200 hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50">
                {loading ? "Processing..." : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* SUCCESS VIEW */
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Yay {fname}! 
          </h2>
          <p className="text-gray-500 text-sm"> You’re all set for the EarlyChildhood Children’s Day 2026 Party!

 
              This is your own VIP code — it’s super important! Keep it safe because it’s the key to all the fun, games, and surprises we have for you. If you lose it, you won’t be able to join the fun or get all the goodies, so copy it and keep it somewhere safe until the big day!

              We can’t wait to see you shine and have a super fun day! 🎈💛</p>
          
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Your Token Code:</span>
            <div className="flex items-center gap-2">
              <input type="text" value={token} readOnly className="flex-1 px-3 py-2 text-center text-lg font-mono font-bold text-green-700 bg-transparent outline-none" />
              <button onClick={handleCopy} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




 

export default ChildrensDayRegistrationForm;