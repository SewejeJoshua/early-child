import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-input bg-background font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-sm";

  return (
    <section id="contact" className="py-28 bg-green-light">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6 shadow-soft">
                Contact
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4 leading-tight">
                Let's Start a Conversation
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
                Have questions about our programs? We'd love to hear from you.
                Reach out and we'll respond within 24 hours.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="space-y-4">
                {[
                  "Free initial consultation",
                  "Personalized program recommendations",
                  "Tour scheduling available",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right form */}
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
                    <h3 className="font-display text-2xl font-700 text-foreground mb-2">Message Sent</h3>
                    <p className="font-body text-muted-foreground">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-card space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">Name</label>
                        <input type="text" required placeholder="Your name" className={inputClasses} />
                      </div>
                      <div>
                        <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">Email</label>
                        <input type="email" required placeholder="your@email.com" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">Subject</label>
                      <input type="text" required placeholder="How can we help?" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block font-display font-600 text-foreground text-xs mb-2 uppercase tracking-wider">Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us more..."
                        className={`${inputClasses} resize-none`}
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
  );
};

export default Contact;
