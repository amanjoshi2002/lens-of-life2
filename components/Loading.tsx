// filepath: d:\agency\lens-of-life2\src\components\Loading.tsx
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      >
        <Camera className="text-white w-16 h-16" />
      </motion.div>
    </div>
  );
}