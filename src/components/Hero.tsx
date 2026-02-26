import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CountUp from "@/components/animations/CountUp";
import Childthree from "@/assets/images/childthree.jpeg"; 
import Childfour from "@/assets/images/childfour.jpeg";
import Childfive from "@/assets/images/childfive.jpeg";
import Childsix from "@/assets/images/childsix.jpeg";
import Childseven from "@/assets/images/childseven.jpeg";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const stats = [
  { value: 500, suffix: "+", label: "Children Supported" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Parent Satisfaction" },
];

const Hero = () => {

  // Typing effect
  const fullText = "Building a";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) setTimeout(() => setIsDeleting(true), 800);
      } else {
        setDisplayText(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) setIsDeleting(false);
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  // Left content animation
  const leftContent = useRef(null);
  useEffect(() => {
    gsap.from(leftContent.current, { y: 50, duration: 2, ease: "power3.out" });
  }, []);

  // Right content slider
  const rightContentRef = useRef([]);
  const rightContainerRef = useRef(null);

  useEffect(() => {
    const images = rightContentRef.current;

    gsap.set(images, {
      xPercent: 100,
      opacity: 0,
      position: "absolute",
    });

    gsap.set(images[0], { xPercent: 0, opacity: 1 });

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power3.inOut" } });

    images.forEach((img, i) => {
      const next = images[(i + 1) % images.length];

      // Slide out current image while sliding in next image
      tl.to(img, { xPercent: -100, opacity: 0, duration: 1 })
        .fromTo(next, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1 }, "<")
        // Pause while next image is visible
        .to(next, { duration: 2 });
    });

    return () => tl.kill();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-green-light pt-24 pb-16">

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div ref={leftContent} className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-body font-500 text-sm px-4 py-2 rounded-full mb-8 shadow-soft"
            >
              <CheckCircle2 size={14} className="text-primary" />
              Trusted by 500+ families
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-[5rem] font-900 text-foreground leading-[1.1] mb-6 text-balance"
            >
              {displayText}
              <span className="animate-pulse ml-1">|</span>{" "}
              <span className="gradient-text">Complete Child</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-base md:text-lg mb-10 leading-relaxed"
            >
              We create safe, evidence-based environments where children explore,
              grow, and discover their limitless potential through structured
              play-based learning and compassionate care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-600 text-base px-7 py-3.5 rounded-xl shadow-card hover:shadow-elevated hover:translate-y-[-2px] transition-all duration-300">
                Get Started <ArrowRight size={16} />
              </a>
              <a href="#about" className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground font-display font-600 text-base px-7 py-3.5 rounded-xl shadow-soft hover:shadow-card hover:translate-y-[-2px] transition-all duration-300">
                Learn More
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-10 mt-14 pt-10 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-800 text-foreground">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-body text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image slider */}
          <motion.div className="relative lg:block">
            <div ref={rightContainerRef} className="relative rounded-3xl overflow-hidden shadow-elevated aspect-[4/5] translate-x-0">
              {[Childfour, Childthree, Childfive, Childsix, Childseven].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`slide-${idx}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  ref={(el) => (rightContentRef.current[idx] = el)}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-elevated"
            >
              <div className="font-display font-800 text-2xl text-primary">15+</div>
              <div className="font-body text-sm">Years of Excellence</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;