import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NavButtonProps {
  onClick: () => void;
  label: string;
  variant?: "primary" | "ghost";
  icon?: boolean;
}

const NavButton = ({ onClick, label, variant = "primary", icon = true }: NavButtonProps) => (
  <motion.button
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 0 30px hsla(var(--glow-primary) / 0.5)",
      y: -2
    }}
    whileTap={{ scale: 0.96, y: 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    onClick={onClick}
    className={variant === "primary" ? "btn-romantic flex items-center gap-2 group" : "btn-ghost-romantic flex items-center gap-2 group"}
  >
    <span className="relative">
      {label}
      <motion.span 
        className="absolute -bottom-1 left-0 w-full h-0.5 bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />
    </span>
    {icon && (
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>
    )}
  </motion.button>
);

export default NavButton;
