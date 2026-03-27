import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

const pageVariants = {
  initial: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, scale: 1.05, filter: "blur(6px)", transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const PageTransition = ({ children, pageKey }: PageTransitionProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={pageKey}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default PageTransition;
