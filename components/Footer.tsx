"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif mb-4">
              Lens Of Life <span className="text-pink-400">Creations</span>
            </h3>
            <p className="text-gray-400">
              Luxury portrait photography capturing life's most precious moments.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +918999903681
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@lensoflifecreations.com
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif mb-4">Follow</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/lens_of_life_creations/" className="hover:text-gray-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100002133198474&ref=ig_profile_ac" className="hover:text-gray-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif mb-4">Studio</h3>
            <p className="text-gray-400">
              Goa, India
              <br />
              By appointment only
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Lens Of Life Creation. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;