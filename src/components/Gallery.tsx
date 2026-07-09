import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Images

import Img1 from "@/assets/images/gal1.jpeg";
import Img2 from "@/assets/images/gal2.jpeg";
import Img3 from "@/assets/images/gal3.jpeg";
import Img4 from "@/assets/images/gal4.jpeg";
import Img5 from "@/assets/images/gal5.jpeg";
import Img6 from "@/assets/images/gal6.jpeg";
import Img7 from "@/assets/images/gal7.jpeg";
import Img8 from "@/assets/images/gal8.jpeg";
import Img9 from "@/assets/images/gal9.jpeg";
import Img10 from "@/assets/images/gal10.jpeg";
import Img11 from "@/assets/images/gal11.jpeg";

// Videos

import Vid1 from "@/assets/videos/galvid1.mp4";
import Vid2 from "@/assets/videos/galvid2.mp4";
import Vid3 from "@/assets/videos/galvid5.mp4";

const pictures = [
  { src: Img1, title: "Committee", desc: "Managing operations on behalf of the board." },
  { src: Img2, title: "Outdoor Fun", desc: "Healthy outdoor engagement." },
  { src: Img3, title: "Outdoor Fun", desc: "Healthy outdoor engagement." },
  { src: Img4, title: "Guests", desc: "Notable individuals who have visited our center." },
  { src: Img5, title: "Committee", desc: "Managing operations on behalf of the board." },
  { src: Img6, title: "Our Notebook", desc: "Unveiling our new notebook." },
  { src: Img7, title: "Grand Launching", desc: "Unveiling our new books." },
  { src: Img8, title: "Committee ", desc: "Managing operations on behalf of the board." },
  { src: Img9, title: "Our Notebook", desc: "Unveiling our new notebooks." },
  { src: Img10, title: "Health Outreach", desc: "Creating health awareness." },
  { src: Img11, title: "Our Notebook", desc: "Unveiling our new jotter." },
];

const videos = [
  {
    video: Vid1,
    title: "About EarlyChildhood ",
  },
  {
    video: Vid2,
    title: "EarlyChildhood Savings and Investment",
  },
  {
    video: Vid3,
    title: "Fun Activities",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Gallery = () => {
  const [activeImage, setActiveImage] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<any>(null);

  return (
    <div>
      <Navbar />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">

          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold">Our Gallery</h2>
            <p className="text-muted-foreground mt-4">
              Moments of creativity, growth, and joyful learning.
            </p>
          </div>

          {/* ================= PICTURES ================= */}
          <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-10 text-center">
              Pictures
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6"
            >
              {pictures.map((img, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                    <h4 className="text-white font-semibold">
                      {img.title}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {img.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ================= VIDEOS ================= */}
          <div>
            <h3 className="text-2xl font-semibold mb-10 text-center">
              Videos
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos.map((vid, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(vid)}
                > 
                  <video
                    src={vid.video}
                    className="w-full h-[220px] object-cover"
                    muted
                  />

                  <div className="p-3 font-medium">
                    {vid.title}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* IMAGE MODAL */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-8 right-8 text-white"
          >
            <X size={32} />
          </button>

          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={activeImage.src}
            className="max-h-[80vh] rounded-xl"
          />
        </div>
      )}

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-8 right-8 text-white"
          >
            <X size={32} />
          </button>

          <motion.video
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            controls
            autoPlay
            className="max-h-[80vh] rounded-xl"
          >
            <source src={activeVideo.video} type="video/mp4" />
          </motion.video>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;