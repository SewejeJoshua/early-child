import { Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

import Josh from "@/assets/images/mamap.jpeg";
import Wiz from "@/assets/images/papa.jpeg";
import Chi from "@/assets/images/mum-b.jpeg";

const team = [
  {
    name: "Ebu Friday Chukwuma",
    role: "Founder / CEO",
    image: Wiz,
    linkedin: "#",
    twitter: "https://x.com/wisdom_ade87034",
  },
  {
    name: "Ebu Folake Christiana",
    role: "Business Manager",
    image: Josh,
    linkedin: "https://www.linkedin.com/in/joshua-seweje-7746732a1",
    twitter: "https://x.com/Joshuathajosh",
  },
  {
    name: "Bisade Philips",
    role: "Chief Strategy Officer",
    image: Chi,
    linkedin: "https://www.linkedin.com/in/chris-chiboka-36b6b7203",
    twitter: "https://x.com/chiboka_xd",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Team = () => {
  return (
    <section id="team" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs uppercase tracking-wider px-3 py-1.5 rounded-md mb-6">
            Our Team
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Meet the People Behind EarlyChildhood
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            A passionate team committed to nurturing children and creating a
            brighter future through quality early childhood education.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="group w-full max-w-[320px] overflow-hidden rounded-3xl bg-card shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 pb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <p className="text-white text-sm uppercase tracking-[0.2em] font-medium">
                      {member.role}
                    </p>

                    <div className="mt-5 flex justify-center gap-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-white hover:text-black"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}

                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-white hover:text-black"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-5 text-center">
                <h3 className="text-xl font-bold text-foreground">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;