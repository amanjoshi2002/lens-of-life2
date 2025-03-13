import { motion } from "framer-motion";

const ContactSection = () => {
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
        <form className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-md">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none font-lato"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none font-lato"
            />
          </div>
          
          <input
            type="tel"
            placeholder="Phone"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none font-lato"
          />
          
          <textarea
            placeholder="Message"
            className="p-3 border rounded-lg h-32 focus:ring-2 focus:ring-pink-400 outline-none font-lato"
          ></textarea>
          
          <button className="bg-gray-400 text-white py-3 rounded-lg hover:bg-black transition-transform transform hover:scale-105 font-lato font-medium">
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactSection;