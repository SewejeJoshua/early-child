import { Heart, BookOpen, Sprout, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const values = [
  {
    icon: BookOpen,
    title: "Play-Based Learning",
    desc: "Children learn best through hands-on exploration, imaginative play, and guided discovery rooted in evidence-based pedagogy.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "Every child is welcomed into a warm, inclusive environment where they feel safe, valued, and empowered to grow.",
  },
  {
    icon: Sprout,
    title: "Holistic Growth",
    desc: "We focus on social, emotional, cognitive, and physical development — nurturing the whole child at every stage.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left heading */}
          <div>
            <ScrollReveal>
              <span className="inline-flex   items-center gap-2 bg-secondary text-secondary-foreground font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6">
                About Us
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display  text-3xl md:text-4xl font-800 leading-tight mb-6 text-balance">
                Every Child Deserves a Strong Start
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base leading-relaxed mb-8">
                At Early Childhood, we believe the first years of life shape the future.
                Our dedicated team of educators and caregivers provides enriching
                experiences that nurture curiosity, creativity, and confidence in
                every child — building the foundation for lifelong learning.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-primary font-display font-600 text-sm hover:gap-3 transition-all duration-300"
              >
                Explore our programs <ArrowRight size={14} />
              </a>
            </ScrollReveal>
          </div>

          {/* Right cards */}
          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
          >
            {values.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, x: 80 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                className="flex gap-5 bg-card rounded-xl p-6 border border-border shadow-soft hover:shadow-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.icon
                    size={22}
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                  />
                </div>

                <div>
                  <h3 className="font-display text-base font-700 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;