'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define interfaces for Category and Subcategory
interface Category {
  _id: string;
  name: string;
}

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  const handleContactClick = () => {
    router.push('/contact');
  };
  

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
            >
              HOME
            </Link>
            <Link 
              href="/portfolio" // Direct link to the portfolio page
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
            >
              PORTFOLIO
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
              >
                <span>SERVICES</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: -5 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-sm rounded-md overflow-hidden"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/service?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-6 py-3 text-white hover:bg-gray-800 transition-colors duration-300 text-sm tracking-wide"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link 
              href="/blog" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
            >
              BLOG
            </Link>
          </div>

          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl font-light tracking-[0.2em] text-white">Lens Of Life</span>
              <span className="text-xs tracking-[0.3em] text-gray-400">Creations</span>
            </motion.div>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              href="/faq" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
            >
              FAQs
            </Link>
            <button
              onClick={handleContactClick}
              className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider rounded-full"
            >
              CONTACT
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-between items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            <div className="space-y-2">
              <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>

          <Link href="/" className="text-center">
            <div className="text-xl font-light tracking-widest text-white">Lens Of Life </div>
            <div className="text-xs tracking-wider text-gray-400">Creations</div>
          </Link>

          <div className="w-8"></div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4"
            >
              <div className="flex flex-col space-y-4 py-4">
                <Link 
                  href="/" 
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
                >
                  HOME
                </Link>
                <Link 
                  href="/portfolio" // Direct link to the portfolio page
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
                >
                  PORTFOLIO
                </Link>
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider flex items-center"
                  >
                    SERVICES
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-2"
                      >
                        {categories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/blog?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link 
                  href="/blog" 
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
                >
                  BLOG
                </Link>
                <Link 
                  href="/faq" 
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm tracking-wider"
                >
                  FAQs
                </Link>
                <button
                  onClick={handleContactClick}
                  className="inline-block px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider rounded-full text-center"
                >
                  CONTACT
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};

export default Navbar;