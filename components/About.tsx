"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-16 sm:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Image Section with Overlapping Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[600px] hidden md:block"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 w-4/5"
            >
              <img
                src="/images/about/cameraperson.png"
                alt="Photographer with camera"
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute bottom-0 right-0 w-3/4"
            >
              <img
                src="/images/about/logo.jpg"
                alt="Mother and child portrait"
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-6xl font-['Limelight'] text-neutral-800 mb-8"
            >
              About 
            </motion.h2>
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-neutral-700"
              >
                I'm Anja, a creative soul and a dedicated mother based in Leeds. 
                I'm thrilled to offer a unique portrait experience designed to 
                capture the beauty and emotion of motherhood. Understanding 
                the fleeting nature of life's precious moments, I've tailored a 
                photoshoot process that respects your time and reflects your 
                needs—whether you're anticipating a new arrival, celebrating 
                your newborn, or wanting to preserve timeless family moments.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-neutral-700"
              >
                Located in the vibrant city of Leeds, my studio is a sanctuary 
                where art meets emotion. Each session is bespoke, crafted to 
                reflect your personal story and style. As a mother myself, I bring 
                empathy and insight to each shoot, ensuring that your portraits 
                resonate with warmth and authenticity. This experience is more 
                than photography—it's a celebration of life's most cherished 
                stages. Let's capture these moments together, creating art that 
                will be treasured forever.
              </motion.p>
            </div>
          </div>

          {/* Mobile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="md:hidden w-full"
          >
            <img
              src="/images/about/logo.jpg"
              alt="Mother and child portrait"
              className="w-full h-auto object-cover rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;