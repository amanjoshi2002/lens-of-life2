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
                alt="Professional photographer at work"
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
                alt="Wedding photography sample"
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
                Hello, I'm Glen Almeida, the proud founder of Lens of Life Creations. 
                What started as a passion for photography has now grown into a mission 
                to preserve the most precious moments of your life through the art of 
                visual storytelling. At Lens of Life Creations, we specialize in wedding 
                photography, pre-wedding shoots, candid moments, cinematic videography, 
                and drone photography — offering a wide range of services to capture 
                every aspect of your unique journey.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-neutral-700"
              >
                With years of experience and a keen eye for detail, I personally oversee 
                every project, ensuring that every shot reflects the emotions, beauty, 
                and essence of your story. We take pride in creating authentic, heartfelt, 
                and cinematic images that not only showcase the beauty of the day but 
                also the emotions, connections, and bonds shared with your loved ones. 
                Every smile, every tear, every joyous moment — we ensure that no detail 
                is ever missed.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-neutral-700"
              >
                Lens of Life Creations is more than just a photography service; it's a 
                journey we take with you. We are honored to be part of your story, 
                capturing memories that will last a lifetime. Your love, your moments, 
                your story — let us help you tell it beautifully.
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
              src="/images/about/cameraperson.png"
              alt="Professional photographer at work"
              className="w-full h-auto object-cover rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;