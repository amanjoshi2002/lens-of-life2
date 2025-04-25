"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Instagram } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsSubmitted(true);
      setFormState({ name: "", phone: "", date: "", service: "", message: "" });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      // Reset submission status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
    <Navbar />
    <section className="py-16 px-6 md:px-0 w-full max-w-7xl mx-auto pt-20">
      {/* Map Section - Moved to top */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 w-full rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="relative w-full h-0 pb-[56.25%] sm:pb-[45%] md:pb-[35%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.5524143959547!2d73.92431827507825!3d15.496519185132392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfbfb94ae7549b%3A0x6badb125297ccb94!2sLens%20Of%20Life%20Creations%20-%20Best%20Wedding%20Photographers%20In%20Goa!5e0!3m2!1sen!2sin!4v1709669669261!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio Location"
          ></iframe>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm p-6 text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Visit Our Studio</h3>
          <p className="text-gray-600">
            Located in the heart of Leeds, our studio is easily accessible by public transport and has ample parking space.
          </p>
        </motion.div>
      </motion.div>

      {/* Contact Section - Original content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block px-3 py-1 mb-4 text-xs tracking-wider uppercase bg-black/5 rounded-full"
        >
          Get in touch
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-light tracking-tight mb-4"
        >
          Contact Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto text-gray-500"
        >
          I'd love to hear about your project. Let's create something beautiful together.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="md:col-span-1 space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mr-4">
              <Phone className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Phone</h3>
              <a
                href="tel:+12345678901"
                className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
              >
                +91 8999903681
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mr-4">
              <Mail className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Email</h3>
              <a
                href="mailto:lensoflifecreations@gmail.com"
                className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
              >
                info@lensoflifecreations.in
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mr-4">
              <MapPin className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Studio</h3>
              <address className="text-gray-500 not-italic">
              Lake View Apartment, Panjim Road<br />
              Old Goa, Goa 403402
              </address>
            </div>
          </motion.div>

          {/* <motion.div variants={itemVariants} className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mr-4">
              <Instagram className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Social</h3>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
              >
                @photographer
              </a>
            </div>
          </motion.div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="md:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm"
        >
          {isSubmitted ? (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="h-full flex flex-col items-center justify-center text-center py-10"
            >
              <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <Send className="h-7 w-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-light mb-3">Message Sent</h3>
              <p className="text-gray-500 max-w-md">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="text-gray-700 placeholder:text-gray-700 w-full px-4 py-3 border-gray-200 rounded-lg focus:ring-0 focus:border-gray-400 transition-colors duration-300 bg-gray-50"                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    className="text-gray-700 placeholder:text-gray-700 w-full px-4 py-3 border-gray-200 rounded-lg focus:ring-0 focus:border-gray-400 transition-colors duration-300 bg-gray-50"                    placeholder="Whatsapp number"
                    pattern="[0-9]{10}"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Event
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}
                  required
                  className="text-gray-700 placeholder:text-gray-700 w-full px-4 py-3 border-gray-200 rounded-lg focus:ring-0 focus:border-gray-400 transition-colors duration-300 bg-gray-50"                />
              </motion.div>

              {/* Add Service Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  required
                  className="text-gray-700 placeholder:text-gray-700 w-full px-4 py-3 border-gray-200 rounded-lg focus:ring-0 focus:border-gray-400 transition-colors duration-300 bg-gray-50 appearance-none"                >
                  <option value="" disabled>Select a service</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Pre Wedding">Pre Wedding</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Live streaming">Live Streaming</option>
                  <option value="Others">Others</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="text-gray-700 placeholder:text-gray-700 w-full px-4 py-3 border-gray-200 rounded-lg focus:ring-0 focus:border-gray-400 transition-colors duration-300 bg-gray-50"                  placeholder="Tell me about your project..."
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Contact;