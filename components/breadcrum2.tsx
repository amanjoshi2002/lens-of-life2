'use client'; 
import { motion } from 'framer-motion';

interface BreadcrumbProps {
  imageUrl: string;
  text: string;
}

const Breadcrumb2 = ({ imageUrl, text }: BreadcrumbProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative flex h-full items-end pb-8 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-white drop-shadow-lg ml-4"
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Breadcrumb2;