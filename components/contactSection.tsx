"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      // Send email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');
      form.reset();

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center justify-between p-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-xl max-w-6xl mx-auto my-16"
    >
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-4">
          Let's Talk
        </h2>
        <p className="text-gray-600 text-lg font-lato">
          Reach out to embark on a luxurious journey of custom styling and photography
          that celebrates your life's most special moments!
        </p>
      </div>
      
      <div className="md:w-1/2 w-full mt-6 md:mt-0 md:pl-8">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-md">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none font-lato text-gray-700 placeholder:text-gray-700 bg-white"
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              required
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none font-lato text-gray-700 placeholder:text-gray-700 bg-white"
            />
          </div>
          
          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp number"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none font-lato text-gray-700 placeholder:text-gray-700 bg-white"
          />
          
          <div className="relative">
            <select
              name="service"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none font-lato text-gray-700 appearance-none bg-white pr-10"
              defaultValue="Select Service"
            >
              <option value="Select Service">Select Service</option>
              <option value="Wedding">Wedding</option>
              <option value="Pre Wedding">Pre Wedding</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Engagement">Engagement</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Live streaming">Live Streaming</option>
              <option value="Others">Others</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <textarea
            name="message"
            placeholder="Message"
            required
            className="p-3 border rounded-lg h-32 focus:ring-2 focus:ring-black outline-none font-lato text-gray-700 placeholder:text-gray-700 bg-white"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`bg-gray-400 text-white py-3 rounded-lg hover:bg-black transition-transform transform hover:scale-105 font-lato font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
          
          {submitStatus === 'success' && (
            <p className="text-green-600 text-center mt-4">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center mt-4">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactSection;