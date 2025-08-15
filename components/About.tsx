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
                visual storytelling. At Lens of Life Creations, we specialize in luxury wedding photography, pre-wedding shoots, and cinematic videography across Goa and destination weddings in India. We believe every couple’s story is unique, and we capture it with candid moments, timeless elegance, and creative flair. From sun-kissed beaches to heritage venues, we turn your love story into unforgettable visual memories.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-neutral-700"
              >
                With years of experience in Goa’s wedding and portrait photography industry, our team blends artistry, storytelling, and technical excellence to create images that speak from the heart. We cover traditional weddings, Catholic weddings, pre-wedding sessions, couple portraits, and destination celebrations. Our cinematic approach ensures every frame is full of life, emotion, and personality. Whether it’s a sunset beach proposal, a vibrant haldi ceremony, or an elegant church wedding, we capture every detail so you can relive your special day forever.

              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-neutral-700"
              >
                Wedding Photography & Videography in Goa, Pre-Wedding Shoots & Save the Date Films, Couple Portrait Sessions, Destination Weddings in India, Event & Lifestyle Photography, Your wedding is a once-in-a-lifetime story — let us tell it beautifully. Contact Lens of Life Creations today to discuss your wedding photography and videography needs in Goa or beyond. Book early to secure your dates.
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
