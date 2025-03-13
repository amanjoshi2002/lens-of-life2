"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-12 sm:py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif"
            >
              About
            </motion.h2>
            <p className="text-base sm:text-lg leading-relaxed">
              I'm Anja, a creative soul and a dedicated mother based in Leeds. I'm thrilled to offer a unique portrait experience designed to capture the beauty and emotion of motherhood. Understanding the fleeting nature of life's precious moments, I've tailored a photoshoot process that respects your time and reflects your needs.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Located in the vibrant city of Leeds, my studio is a sanctuary where art meets emotion. Each session is bespoke, crafted to reflect your personal story and style.
            </p>
          </div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="/images/about/logo.jpg"
              alt="Studio shot"
              className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-lg"
            />
            <img
              src="/images/about/Screenshot 2025-03-02 at 11.39.49 AM.png"
              alt="Portrait shot"
              className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-lg mt-4 sm:mt-8"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;