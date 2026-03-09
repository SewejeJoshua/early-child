import { useState } from "react";
import {
  GraduationCap,
  Users,
  Brain,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Star,
  Clipboard,
  Book,
  PiggyBank,
  Code,
  Home,
  Utensils,
  Rocket,
  Soup,
  Handshake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const services = [
  {
    icon: GraduationCap,
    title: "E-Edu/Konsult",
    desc: "Age-appropriate learning that sparks curiosity and builds skills through play and hands-on activities.",
    tag: "Core",
  },
  {
    icon: PiggyBank,
    title: "E-SAV",
    desc: "Smart saving for your child’s future—building financial security from their earliest years.",
    tag: "Savings",
  },
  {
    icon: Brain,
    title: "E-LeBuC",
    desc: "Empowering educators and caregivers with skills and tools to nurture every child’s potential.",
    tag: "Growth",
  },
  {
    icon: Star,
    title: "E-SLC",
    desc: "Celebrating milestones and inspiring the next steps for young learners and their families.",
    tag: "Transition",
  },
  {
    icon: Clipboard,
    title: "E-SMME",
    desc: "Making self-learning fun and simple—helping children explore, practice, and grow at their own pace.",
    tag: "Independence",
  },
  {
    icon: Book,
    title: "E-MAG",
    desc: "Inspiring parents, educators, and young minds with ideas, tips, and stories for early learning success.",
    tag: "Insight",
  },
  {
    icon: Code,
    title: "E-Skills",
    desc: "Building essential skills in young learners—creativity, problem-solving, and social-emotional growth through fun and engaging activities",
    tag: "Development",
  },
  {
    icon: Home,
    title: "E-LAP",
    desc: "Securing safe and inspiring spaces for early learning—building the foundation for growth, play, and discovery.",
    tag: "Foundation",
  },
  {
    icon: Utensils,
    title: "E-Food Bank",
    desc: "Providing nutritious meals and essential food support to help young children grow, learn, and thrive.",
    tag: "Nourish",
  },
  {
    icon: Rocket,
    title: "E-Pasum",
    desc: "Bringing parents together to learn, connect, and gain practical insights for raising confident and thriving young children.",
    tag: "Empowerment",
  },
  {
    icon: Soup,
    title: "E-Breakfast",
    desc: "Starting young minds strong with healthy breakfasts that fuel focus, energy, and a productive day of learning.",
    tag: "Fuel",
  },
  {
    icon: Handshake,
    title: "E-Co-op",
    desc: "Uniting parents to support one another, share resources, and create stronger foundations for their children’s growth and success.",
    tag: "Unity",
  },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  const firstSix = services.slice(0, 6);
  const lastSix = services.slice(6);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const renderCard = (service, index) => (
    <motion.div
      key={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-400 group h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
          <service.icon
            size={26}
            className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
          />
        </div>
        <span className="font-body text-xs font-500 text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
          {service.tag}
        </span>
      </div>

      <h3 className="font-display text-lg font-700 text-foreground mb-3 flex items-center gap-2">
        {service.title}
        <ArrowUpRight
          size={16}
          className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </h3>

      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
        {service.desc}
      </p>
    </motion.div>
  );

  return (
    <section id="services" className="py-28 bg-green-light">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-card border border-border font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6 shadow-soft">
              Services
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-800 mb-4">
              What We Offer
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="font-body text-base max-w-lg mx-auto">
              Comprehensive programs and resources tailored to support children
              and families at every stage of development.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {firstSix.map(renderCard)}

          <AnimatePresence>
            {showAll &&
              lastSix.map((service, index) =>
                renderCard(service, index + 6)
              )}
          </AnimatePresence>
        </div>

        {/* See More / See Less */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-primary font-display font-600 text-sm hover:gap-3 transition-all duration-300"
          >
            {showAll ? "See Less" : "See More"}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;