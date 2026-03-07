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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3000, suffix: "+", label: "Children Supported" },
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Parent Satisfaction" },
];

const Hero = () => {
  const leftContent = useRef(null);
  const rightContentRef = useRef([]);
  const rightContainerRef = useRef(null);

  // Typing effect
  const fullText = "Building a ";
  const fullSentence = "Building a Complete Child"; // reserve full width
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [showCompleteChild, setShowCompleteChild] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1000);
          setShowCompleteChild(true);
        }
      } else {
        setDisplayText(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) {
          setIsDeleting(false);
          setShowCompleteChild(false);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  // Left animation
  useEffect(() => {
    gsap.from(leftContent.current, {
      y: 50,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  // Image slider
  useEffect(() => {
    const images = rightContentRef.current;
    gsap.set(images, { xPercent: 100, opacity: 0, position: "absolute" });
    gsap.set(images[0], { xPercent: 0, opacity: 1 });
    const tl = gsap.timeline({
      repeat: -1,
      scrollTrigger: {
        trigger: rightContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    images.forEach((img, i) => {
      const next = images[(i + 1) % images.length];
      tl.to(img, { xPercent: -100, opacity: 0, duration: 1, ease: "power3.inOut" })
        .fromTo(next, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1, ease: "power3.inOut" }, "<")
        .to({}, { duration: 2 });
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-green-light pt-24 pb-16">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <div ref={leftContent} className="max-w-xl w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground text-sm px-4 py-2 rounded-full mb-8 shadow-soft"
            >
              <CheckCircle2 size={14} className="text-primary" />
              Trusted by 500+ families
            </motion.div>

            {/* TYPING SECTION */}
            <div className="relative mb-6 min-h-[6rem] lg:min-h-[8rem]">
              {/* Invisible full sentence to reserve height */}
              <span className="invisible absolute pointer-events-none font-display font-900 text-foreground leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-[5rem]">
                {fullSentence}
              </span>

              {/* Typing container: responsive, wrap on small screens */}
              <h1 className="absolute top-0 left-0 font-display font-900 text-foreground leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text[5rem] w-full break-words">
                <span className="inline-block">
                  {displayText}
                  <span className="inline-block w-3">
                    <span className="animate-pulse">|</span>
                  </span>
                  {showCompleteChild && (
                    <span className="gradient-text ml-1">Complete Child</span>
                  )}
                </span>
              </h1>
            </div>

            {/* STATIC PARAGRAPH */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg mb-10 leading-relaxed lg:py-5"
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
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-base px-7 py-3.5 rounded-xl shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                Get Started <ArrowRight size={16} />
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground text-base px-7 py-3.5 rounded-xl shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-10 mt-14 pt-10 border-t border-border flex-wrap"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-800 text-foreground">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div className="relative lg:block z-0">
            <div
              ref={rightContainerRef}
              className="relative rounded-3xl overflow-hidden shadow-elevated aspect-[4/5]"
            >
              {[Childfour, Childthree, Childfive, Childsix, Childseven].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`slide-${index}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    ref={(el) => (rightContentRef.current[index] = el)}
                  />
                )
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-elevated"
            >
              <div className="text-2xl font-800 text-primary">14+</div>
              <div className="text-sm">Years of Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;