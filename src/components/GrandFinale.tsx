import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const FloatingHeart = ({ delay }: { delay: number }) => {
  const left = Math.random() * 100;
  const size = Math.random() * 16 + 12;
  const duration = Math.random() * 3 + 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: -400, x: Math.sin(delay) * 40 }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: Math.random() * 2 }}
      className="absolute bottom-0 text-primary"
      style={{ left: `${left}%` }}
    >
      <Heart className="fill-current" style={{ width: size, height: size }} />
    </motion.div>
  );
};

const Firework = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return { dx: Math.cos(angle) * 60, dy: Math.sin(angle) * 60 };
  });

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], x: p.dx, y: p.dy }}
          transition={{ duration: 1.2, delay: delay + i * 0.03, repeat: Infinity, repeatDelay: 4 }}
        />
      ))}
    </>
  );
};

const GrandFinale = () => {
  const [hearts] = useState(() => Array.from({ length: 15 }, (_, i) => i * 0.3));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(348 100% 65%), transparent 60%)" }} />
      </div>

      {/* Fireworks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Firework x={100} y={150} delay={0} />
        <Firework x={300} y={100} delay={1.5} />
        <Firework x={200} y={200} delay={3} />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((delay, i) => (
          <FloatingHeart key={i} delay={delay} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-display text-glow text-foreground mb-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Happy Birthday
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-glow" fill="currentColor" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="font-romantic text-xl md:text-2xl text-muted-foreground italic max-w-md mx-auto"
        >
          You are my forever, my always, my everything.
          Here's to another year of making beautiful memories together.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="font-romantic text-2xl md:text-3xl text-primary text-glow mt-8"
        >
          With all my love ❤️
        </motion.p>
      </motion.div>
    </section>
  );
};

export default GrandFinale;
