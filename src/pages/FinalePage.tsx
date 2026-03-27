import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const FloatingHeart = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const size = Math.random() * 18 + 10;
  const dur = Math.random() * 3.5 + 3;

  return (
    <motion.div
      className="absolute bottom-0 text-primary pointer-events-none"
      style={{ left: `${x}%` }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: [0, 0.8, 0.8, 0], y: -600, x: Math.sin(delay * 2) * 30 }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: Math.random() * 2 + 1 }}
    >
      <Heart style={{ width: size, height: size }} fill="currentColor" />
    </motion.div>
  );
};

const FinalePage = ({ onRestart }: { onRestart: () => void }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hearts = Array.from({ length: 25 }, (_, i) => i * 0.35);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { scale: 0.2, opacity: 0, filter: "blur(40px)", y: 50 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 2.5, ease: "power4.out", delay: 0.5 }
      );
      gsap.to(titleRef.current, {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });
      
      // Floating effect for the whole title
      gsap.to(titleRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div className="page-container overflow-hidden">
      {/* Big radial glow */}
      <div className="radial-glow w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(348 100% 70% / 0.4), transparent 60%)" }} />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((d, i) => <FloatingHeart key={i} delay={d} />)}
      </div>

      {/* Firework bursts enhanced */}
      {[
        { x: "10%", y: "15%", delay: 0.5, color: "#ff4d6d" },
        { x: "85%", y: "12%", delay: 1.5, color: "#ff85a1" },
        { x: "50%", y: "20%", delay: 3, color: "#ffccd5" },
        { x: "25%", y: "75%", delay: 2.2, color: "#ff4d6d" },
        { x: "75%", y: "70%", delay: 1, color: "#ff85a1" },
        { x: "40%", y: "50%", delay: 4.5, color: "#ff4d6d" },
      ].map((fw, fi) => (
        <div key={fi} className="absolute pointer-events-none" style={{ left: fw.x, top: fw.y }}>
          {Array.from({ length: 12 }, (_, pi) => {
            const angle = (pi / 12) * Math.PI * 2;
            return (
              <motion.div
                key={pi}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: fw.color, filter: `blur(${pi % 2 === 0 ? '0px' : '2px'})` }}
                animate={{
                  x: [0, Math.cos(angle) * 80],
                  y: [0, Math.sin(angle) * 80],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{ duration: 1.5, delay: fw.delay + pi * 0.05, repeat: Infinity, repeatDelay: 5 }}
              />
            );
          })}
        </div>
      ))}

      <div className="text-center relative z-10 flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Heart className="w-16 h-16 text-primary mb-8 animate-pulse shadow-primary/20" fill="currentColor" style={{ filter: "drop-shadow(0 0 25px hsla(var(--glow-primary) / 0.6))" }} />
        </motion.div>

        <h2
          ref={titleRef}
          className="text-5xl md:text-8xl lg:text-9xl font-display text-glow text-foreground mb-8 cursor-default select-none"
          style={{ opacity: 0 }}
        >
          Happy Birthday
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="font-romantic text-2xl md:text-3xl lg:text-4xl text-muted-foreground/90 italic max-w-2xl leading-tight"
        >
          You mean everything to me.
          <br />
          Here's to another year of beautiful memories together.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4.5, duration: 1.2 }}
          className="font-romantic text-3xl md:text-5xl text-primary text-glow mt-10 font-bold"
        >
          With all my love ❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.5 }}
          className="mt-16"
        >
          <button
            onClick={onRestart}
            className="btn-ghost-romantic flex items-center gap-3 px-8 py-3 group hover:border-primary/40"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-500" />
            <span className="text-base">Replay Journey</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalePage;
