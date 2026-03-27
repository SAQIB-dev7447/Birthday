import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
    {Array.from({ length: total }, (_, i) => (
      <motion.div
        key={i}
        className={`rounded-full transition-all duration-500 ${
          i < current
            ? "w-2 h-2 bg-primary"
            : i === current
            ? "w-6 h-2 bg-primary glow-border"
            : "w-2 h-2 bg-muted"
        }`}
        layout
      />
    ))}
  </div>
);

export default ProgressIndicator;
