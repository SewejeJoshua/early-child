import { Star } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";

const testimonials = [
  {
    quote:
      "Early Childhood has been a blessing for our family. My daughter has blossomed into a confident, curious learner thanks to their incredible team.",
    name: "Sarah Mitchell",
    role: "Parent",
    rating: 5,
  },
  {
    quote:
      "The warmth and dedication of the educators here is unmatched. Every child is treated as an individual with unique gifts to share.",
    name: "James Lawson",
    role: "Partner Educator",
    rating: 5,
  },
  {
    quote:
      "I love how they involve parents in the learning journey. The workshops gave me practical tools to support my son's development at home.",
    name: "Amara Kimani",
    role: "Parent",
    rating: 5,
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6">
              Testimonials
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">
              Trusted by Families
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="font-body text-muted-foreground text-base max-w-lg mx-auto">
              Hear from the parents and educators who experience the difference every day.
            </p>
          </ScrollReveal>
        </div>

        {/* GRID */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {testimonials.map((t, index) => (
            <StaggerItem key={`${t.name}-${index}`}>
              <article
                className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col h-full"
                aria-label={`Testimonial from ${t.name}`}
              >

                {/* STARS */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: Math.min(t.rating, 5) }).map((_, i) => (
                    <Star
                      key={`${t.name}-star-${i}`}
                      size={14}
                      className="fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* QUOTE */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-8">
                  “{t.quote}”
                </p>

                {/* AUTHOR */}
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-display font-700 text-sm text-secondary-foreground">
                      {getInitials(t.name)}
                    </span>
                  </div>

                  <div>
                    <p className="font-display font-600 text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>

              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

export default Testimonials;