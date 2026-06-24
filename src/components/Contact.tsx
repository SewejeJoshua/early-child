import { useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      await fetch(`${import.meta.env.VITE_ECHILDHOOD_API}/api/contact/`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
    } finally {
      console.log([...formData]);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-input bg-background font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-sm";

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Contact Us | Early Childhood Education in Ibadan, Nigeria</title>
        <meta
          name="description"
          content="Contact Early Childhood Development Ltd in Ibadan, Nigeria. Get in touch for preschool admission, child care programs, and early education inquiries."
        />
        <meta
          name="keywords"
          content="contact preschool Ibadan, child care Nigeria contact, early childhood education Nigeria, kindergarten Ibadan contact"
        />
      </Helmet>

      <section id="contact" className="py-28 bg-green-light">
        <div className="container mx-auto px-4 max-w-5xl">

          <div className="grid lg:grid-cols-5 gap-16">

            {/* LEFT INFO */}
            <div className="lg:col-span-2">

              <ScrollReveal>
                <span className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6 shadow-soft">
                  Contact Us
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4 leading-tight">
                  Get in Touch With Us
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
                  Have questions about our mentorship, leadership, entrepreneurship, savings, or child development programs?
We are here to help parents and guardians provide children with the knowledge, confidence, and opportunities they need to achieve their dreams and succeed in life.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="space-y-4">
                  {[
                    "Free consultation for parents",
                    "Admission guidance for preschool & kindergarten",
                    "Quick response within 24 hours",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.15} direction="right">
                <AnimatePresence mode="wait">

                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card rounded-2xl p-12 border border-border shadow-card text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={28} className="text-primary" />
                      </div>
                      <h2 className="font-display text-2xl font-700 text-foreground mb-2">
                        Message Sent Successfully
                      </h2>
                      <p className="font-body text-muted-foreground">
                        We’ll respond to your inquiry within 24 hours.
                      </p>
                    </motion.div>

                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-card space-y-5"
                    >

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            className={inputClasses}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            className={inputClasses}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Admission, inquiry, or support"
                          className={inputClasses}
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">
                          Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us how we can help your child..."
                          className={`${inputClasses} resize-none`}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-display font-600 text-sm px-8 py-3.5 rounded-xl shadow-soft hover:shadow-card hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Send Message <Send size={14} />
                      </button>

                    </motion.form>
                  )}

                </AnimatePresence>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;