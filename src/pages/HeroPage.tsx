import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlowingHeart3D from "@/components/GlowingHeart3D";
import NavButton from "@/components/NavButton";

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(iv);
    }, 90);
    return () => clearInterval(iv);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="text-primary">|</motion.span>
      )}
    </span>
  );
};

const HeroPage = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="page-container overflow-hidden">
      {/* Background glow */}
      <div className="radial-glow w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{ background: "radial-gradient(circle, hsl(348 100% 70% / 0.4), transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="animate-float relative z-10"
      >
        <GlowingHeart3D />
      </motion.div>

      <div className="flex flex-col items-center z-10 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-display text-glow text-foreground mt-6 text-center animate-pulse-glow"
        >
          <TypingText text="Hey Beautiful…" delay={1200} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3.2, duration: 1.2, ease: "easeOut" }}
          className="font-romantic text-lg md:text-2xl text-muted-foreground text-center max-w-md italic px-4"
        >
          This is not just a website… it's something I made for you ❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.8, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-6"
        >
          <NavButton onClick={onNext} label="Start the Journey" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroPage;
