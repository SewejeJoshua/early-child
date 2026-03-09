import { Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Josh from "@/assets/images/childfour.jpeg";
import Wiz from "@/assets/images/childfour.jpeg";
import Chi from "@/assets/images/childfour.jpeg"; 

const team = [
  {
    name: "Wisdom",
    role: "Founder & CEO",
    image: Wiz,
    linkedin: "#",
    twitter: "https://x.com/wisdom_ade87034",
  },
  {
    name: "Joshua",
    role: "Co-Founder",
    image: Josh,
    linkedin: "https://www.linkedin.com/in/joshua-seweje-7746732a1",
    twitter: "https://x.com/Joshuathajosh",
  },
  {
    name: "Chris",
    role: "Lead Brand & UX Designer",
    image: Chi,
    linkedin: "https://www.linkedin.com/in/chris-chiboka-36b6b7203",
    twitter: "https://x.com/chiboka_xd",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Team = () => {
  return (
    <section id="team" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-body font-500 text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6">
            Our Team
          </span>
          <h2 className="mt-4 font-display text-2xl md:text-4xl font-bold text-foreground">
            Meet the People Behind Early Childhood
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A diverse team of experts passionate about creating exceptional digital experiences.
          </p>
        </div>

        {/* Team Cards */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-6 lg:gap-[50px]">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 w-[340px] sm:w-[360px] md:w-[380px] lg:w-[350px]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              {/* Image */}
              <div className="relative w-full h-[260px] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Social hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div className="p-6 text-center">
                <h3 className="font-display text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;