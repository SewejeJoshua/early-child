import { useState } from "react";
import {
  GraduationCap,
  Users,
  Brain,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
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
    icon: Users,
    title: "E-SAV",
    desc: "Smart saving for your child’s future—building financial security from their earliest years.",
    tag: "Family",
  },
  {
    icon: Brain,
    title: "E-LeBuC",
    desc: "Empowering educators and caregivers with skills and tools to nurture every child’s potential.",
    tag: "Growth",
  },
  {
    icon: Globe,
    title: "E-SLC",
    desc: "Celebrating milestones and inspiring the next steps for young learners and their families.",
    tag: "Transition",
  },
  
  {
    icon: Globe,
    title: "E-SMME",
    desc: "Making self-learning fun and simple—helping children explore, practice, and grow at their own pace.",
    tag: "Independence",
  },
  {
    icon: Globe,
    title: "E-MAG",
    desc: "Inspiring parents, educators, and young minds with ideas, tips, and stories for early learning success.",
    tag: "Insight",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  const firstSix = services.slice(0, 6);
  const lastSix = services.slice(6);

  const renderCard = (service, index) => (
    <div
      key={index}
      className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-card hover:translate-y-[-4px] transition-all duration-400 group h-full flex flex-col"
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
    </div>
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
          {/* First 6 always visible */}
          {firstSix.map(renderCard)}

          {/* AnimatePresence for last 6 */}
          <AnimatePresence>
            {showAll &&
              lastSix.map((service, index) => (
                <motion.div
                  key={index + 6}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderCard(service, index + 6)}
                </motion.div>
              ))}
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