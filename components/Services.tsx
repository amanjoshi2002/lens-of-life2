"use client";

import { motion, useInView } from "framer-motion";
import Link from 'next/link';
import { useRef } from 'react';

const Services = () => {
  const services = [
    {
      title: "DESTINATION WEDDING",
      description:
        "We are specialized in destination wedding photography and cinematography, capturing the magic of your love story in breathtaking locations worldwide. From intimate beach elopements to luxury international weddings, our expert team delivers cinematic videography, aerial drone footage, and authentic storytelling that reflect the beauty and culture of your chosen destination. We travel globally to turn your special day into timeless, visually stunning memories.",
      image: "/images/services/Destination wedding.jpg",
      category: "destination-wedding",
    },
    {
      title: "GOAN WEDDING",
      description:
        "We offer expert Goan wedding photography and cinematography, capturing the vibrant traditions, beachside beauty, and cultural charm that make weddings in Goa truly magical. From traditional rituals to modern celebrations, our team documents every moment with stunning detail, combining local expertise with artistic storytelling to preserve the essence of your special day in Goa.",
      image: "/images/services/Goan Wedding.jpg",
      category: "goan-wedding",
    },
    {
      title: "PRE-WEDDING",
      description:
        "We specialize in pre-wedding photoshoots that capture the excitement, romance, and chemistry between you and your partner. Whether it's a scenic outdoor session or a stylish urban shoot, our personalized approach ensures every frame reflects your unique love story. From candid moments to cinematic poses, we create timeless visuals that set the perfect tone for your wedding day.",
      image: "/images/services/Pre wedding.jpg",
      category: "pre-wedding",
    },
    {
      title: "CONFERENCE AND EVENTS",
      description:
        "We offer expert event and conference photography for corporate seminars, business conferences, trade shows, product launches, and social gatherings. Our professional team captures every key moment—candid audience reactions, dynamic speaker shots, and event highlights—with precision and creativity. We deliver high-quality, tailored visuals that reflect the energy and importance of your event.",
      image: "/images/services/Conference and Events.jpg",
      category: "live-events-and-conference",
    },
  ];

  const backgroundColors = [
    "bg-neutral-900 text-white",
    "bg-neutral-200 text-black",
    "bg-neutral-800 text-white",
    "bg-neutral-100 text-black",
  ];

  return (
    <section className="pt-10 sm:pt-20 pb-0">
      {services.map((service, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });

        return (
          <div key={service.title} className={`w-full ${backgroundColors[index]} p-6 sm:p-10`}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut",
                delay: index * 0.2 
              }}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12 mb-16 md:mb-20`}
            >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ 
                  duration: 1,
                  ease: "easeOut",
                  delay: (index * 0.2) + 0.3 
                }}
                className="flex-1 text-center md:text-left"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: (index * 0.2) + 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6"
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: (index * 0.2) + 0.5 }}
                  className="text-base sm:text-lg mb-6 sm:mb-8"
                >
                  {service.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: (index * 0.2) + 0.6 }}
                >
                  <Link href={`/service?category=${service.category}`}>
                    <button className="border border-current bg-white text-black px-5 sm:px-7 py-2 font-medium 
                                     transition-all duration-300 hover:bg-black hover:text-white">
                      LEARN MORE
                    </button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeOut",
                  delay: (index * 0.2) + 0.2 
                }}
                className="flex-1 w-full overflow-hidden rounded-lg"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover shadow-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
};

export default Services;
