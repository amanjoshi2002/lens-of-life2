"use client";

import { motion } from "framer-motion";
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      title: "DESTINATION WEDDING",
      description:
        "Celebrate your love with stunning destination wedding photography. From scenic beaches to grand venues, we capture every emotion and detail, turning your special day into timeless memories. Let us frame your love story beautifully!",
      image: "/images/services/destination.webp",
    },
    {
      title: "GOAN WEDDING",
      description:
        "Experience the magic of a Goan wedding with stunning photography that captures every vibrant moment. From sun-kissed beaches to grand heritage venues, we bring your love story to life with breathtaking shots, rich in tradition, joy, and scenic beauty. Let us preserve your special day with timeless elegance!",
      image: "/images/services/GOAN WEDDING.jpg",
    },
    {
      title: "PRE-WEDDING",
      description:
        "Celebrate your love story with a dreamy pre-wedding photoshoot. Whether it's on Goa's golden beaches, lush landscapes, or charming streets, we capture your chemistry in stunning frames. Let us create timeless memories before your big day!",
      image: "/images/services/prewedding.webp",
    },
    {
      title: "LIVE EVENTS AND CONFERENCCE",
      description:
        "Capture the energy and essence of your live events and conferences with professional photography. From keynote speeches to candid interactions, we document every moment with precision and creativity, ensuring your event is remembered for years to come.",
      image: "/images/services/live-event.jpg",
    },
  ];

  return (
    <section className="py-10 sm:py-20">
      <div className="container mx-auto px-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 md:gap-12 mb-16 md:mb-20`}
          >
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
                {service.title}
              </h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                {service.description}
              </p>
              <Link href="/blog">
                <button className="border border-black px-4 sm:px-6 py-2 hover:bg-black hover:text-white transition-colors">
                  LEARN MORE
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="flex-1 w-full">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;