import { GraduationCap, Users, Brain, Globe, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";

const services = [
  {
    icon: GraduationCap,
    title: "Learning Programs",
    desc: "Age-appropriate curricula designed to spark curiosity and build foundational skills through creative play and structured activities.",
    tag: "Core",
  },
  {
    icon: Users,
    title: "Parent Support",
    desc: "Workshops, resources, and one-on-one guidance to help parents navigate early childhood development with confidence.",
    tag: "Family",
  },
  {
    icon: Brain,
    title: "Child Development",
    desc: "Expert assessments and personalized plans that support each child's unique cognitive, emotional, and social growth.",
    tag: "Growth",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    desc: "Connecting families with local resources, events, and support networks to strengthen our community together.",
    tag: "Impact",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 bg-green-light">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-card border border-border  font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6 shadow-soft">
              Services
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-800 mb-4">
              What We Offer
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body   text-base max-w-lg mx-auto">
              Comprehensive programs and resources tailored to support children
              and families at every stage of development.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-card hover:translate-y-[-4px] transition-all duration-400 group h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <service.icon size={26} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-body text-xs font-500 text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                    {service.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-700 text-foreground mb-3 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
