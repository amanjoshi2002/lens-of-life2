"use client";

import { motion, useInView } from "framer-motion";
import Link from 'next/link';
import { useRef } from 'react';

const Services = () => {
  const services = [
    {
      title: "DESTINATION WEDDING",
      description:
        "Celebrate your love with stunning destination wedding photography. From scenic beaches to grand venues, we capture every emotion and detail, turning your special day into timeless memories. Let us frame your love story beautifully!",
      image: "/images/services/Destination wedding.jpg",
      category: "destination-wedding",
    },
    {
      title: "GOAN WEDDING",
      description:
        "Experience the magic of a Goan wedding with stunning photography that captures every vibrant moment. From sun-kissed beaches to grand heritage venues, we bring your love story to life with breathtaking shots, rich in tradition, joy, and scenic beauty. Let us preserve your special day with timeless elegance!",
      image: "/images/services/Goan Wedding.jpg",
      category: "goan-wedding",
    },
    {
      title: "PRE-WEDDING",
      description:
        "Celebrate your love story with a dreamy pre-wedding photoshoot. Whether it's on Goa's golden beaches, lush landscapes, or charming streets, we capture your chemistry in stunning frames. Let us create timeless memories before your big day!",
      image: "/images/services/Pre wedding.jpg",
      category: "pre-wedding",
    },
    {
      title: "CONFERENCE AND EVENTS",
      description:
        "Capture the energy and essence of your live events and conferences with professional photography. From keynote speeches to candid interactions, we document every moment with precision and creativity, ensuring your event is remembered for years to come.",
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
