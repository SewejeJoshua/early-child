import { Helmet } from "react-helmet-async";
import { Heart, BookOpen, Sprout, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const values = [
  {
    icon: BookOpen,
    title: "Play-Based Learning",
    desc: "We use play-based early childhood education methods that help children in Nigeria develop creativity, problem-solving skills, and confidence through guided exploration.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "We provide a safe, loving, and inclusive preschool environment in Ibadan where every child feels valued, supported, and emotionally secure.",
  },
  {
    icon: Sprout,
    title: "Holistic Child Development",
    desc: "Our programs focus on cognitive, emotional, social, and physical development to prepare children for lifelong learning success.",
  },
];

const About = () => {
  return (
    <>
      {/* SEO SECTION */}
      <Helmet>
        <title>About Us | Early Childhood Education in Ibadan, Nigeria</title>
        <meta
          name="description"
          content="Learn about Early Childhood Development Ltd, a trusted preschool and child care provider in Ibadan, Nigeria focused on quality early childhood education."
        />
        <meta
          name="keywords"
          content="about preschool Ibadan, early childhood education Nigeria, child care Ibadan, kindergarten Nigeria, preschool program Nigeria"
        />
      </Helmet>

      <section id="about" className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* LEFT CONTENT */}
            <div>

              <ScrollReveal>
                <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6">
                  About Our School
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="font-display text-3xl md:text-4xl font-800 leading-tight mb-6 text-balance">
                  Trusted Early Childhood Education in Ibadan, Nigeria
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-body text-base leading-relaxed mb-8">
                  At Early Childhood Development Ltd, we provide high-quality early childhood education in Ibadan, Nigeria.
                  Our goal is to build strong learning foundations through structured preschool programs,
                  safe learning environments, and experienced educators who care deeply about each child's development.
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

            {/* RIGHT CONTENT */}
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
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1.1,
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
                    <h2 className="font-display text-base font-700 mb-1.5">
                      {item.title}
                    </h2>
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
    </>
  );
};

export default About;