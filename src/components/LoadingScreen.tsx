import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 text-primary" fill="currentColor" />
          </motion.div>

          <div className="flex gap-1.5 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary loader-dot" />
            <div className="w-2 h-2 rounded-full bg-primary loader-dot" />
            <div className="w-2 h-2 rounded-full bg-primary loader-dot" />
          </div>

          <p className="font-romantic text-muted-foreground text-lg mt-6 italic">
            Preparing something special…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
