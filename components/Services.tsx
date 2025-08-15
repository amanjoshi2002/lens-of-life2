"use client";

import { motion, useInView } from "framer-motion";
import Link from 'next/link';
import { useRef } from 'react';

const Services = () => {
 const services = [
    {
      title: "DESTINATION WEDDING",
      description:
        " Capture the magic of your destination wedding in Goa with our expert wedding photography and wedding videography services. Specializing in cinematic wedding films, aerial drone wedding photography, and authentic storytelling, we transform your special day into timeless memories. Whether you're planning a romantic beach elopement, an intimate Goa destination wedding, or a grand luxury wedding in Goa, our experienced team delivers stunning visuals that reflect the beauty and culture of this tropical paradise. From breathtaking aerial drone footage over Goa’s pristine beaches to intimate moments captured amidst the vibrant landscapes and historic charm, we ensure every detail of your wedding is beautifully documented. Our goal is to craft a cinematic wedding experience that tells your unique love story, preserving every emotion and moment of your Goa destination wedding for years to come.",
      image: "/images/services/Destination wedding.jpg",
      category: "destination-wedding",
    },
    {
      title: "GOAN WEDDING",
      description:
        "Capture the beauty and tradition of your Goan Catholic wedding with our expert wedding photography and wedding videography services. Specializing in cinematic wedding films, aerial drone wedding photography, and authentic storytelling, we document every precious moment of your special day. Whether you’re celebrating a traditional Goan Catholic church wedding, a beach elopement, or a lavish luxury wedding in Goa, our team creates stunning visuals that reflect the unique culture and charm of Goa. From beautiful aerial drone footage of the church and coastal landscapes to intimate moments captured in Goa’s historic venues, we ensure every detail is beautifully preserved. Our aim is to craft a cinematic wedding experience that tells your unique love story, capturing the emotion, faith, and heritage of your Goan Catholic wedding for generations to cherish.",
      image: "/images/services/GOAN WEDDING.jpg",
      category: "goan-wedding",
    },
    {
      title: "PRE-WEDDING",
      description:
        "Capture the essence of your love story with our expert prewedding photography and prewedding videography services in stunning locations like Goa, Kerala, Manali, and Jaipur. Specializing in cinematic wedding films, aerial drone footage, and authentic storytelling, we bring your prewedding moments to life. Whether you're looking for a beachside prewedding shoot in Goa, a serene backwater prewedding shoot in Kerala, a majestic mountain prewedding shoot in Manali, or a royal prewedding shoot in Jaipur, our team captures every intimate moment against the backdrop of these iconic destinations. From breathtaking aerial drone photography to intimate, candid shots, we document the magic of your love in a way that reflects both the beauty of the location and your unique connection. Our goal is to create a cinematic prewedding experience that you'll cherish forever, ensuring that each moment in Goa, Kerala, Manali, or Jaipur is captured with perfection.",
      image: "/images/services/Pre wedding.jpg",
      category: "pre-wedding",
    },
    {
      title: "CONFERENCE AND EVENTS",
      description:
        "Capture the essence of your corporate events, conferences, and special occasions with our expert event photography and event videography services. Specializing in cinematic event films, aerial drone footage, and dynamic storytelling, we bring your event to life with high-quality visuals. Whether you're hosting a corporate conference, a product launch, a seminar, or a large-scale corporate event, our team ensures every moment is documented with precision and creativity. From engaging conference photography to professional event videography, we specialize in creating compelling content that showcases the energy, key moments, and atmosphere of your event. Our team captures aerial drone shots for large outdoor events, as well as candid interactions, speeches, and performances, ensuring every important detail is preserved. Let us turn your conference or event into a cinematic experience, preserving the highlights and emotions of the day for your business or brand.",
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
