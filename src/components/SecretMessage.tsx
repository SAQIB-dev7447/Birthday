import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Unlock, Volume2 } from "lucide-react";

const SecretMessage = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="relative py-20 md:py-32 px-6 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Dimming overlay when unlocked */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setUnlocked(false)}
          />
        )}
      </AnimatePresence>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-display text-center text-glow-soft text-foreground mb-12"
      >
        A Secret For You
      </motion.h2>

      {!unlocked ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setUnlocked(true)}
          className="glass-card glow-border p-8 md:p-12 flex flex-col items-center gap-4 cursor-pointer group z-10"
        >
          <Lock className="w-12 h-12 text-primary group-hover:hidden transition-all" />
          <Unlock className="w-12 h-12 text-primary hidden group-hover:block transition-all" />
          <span className="font-romantic text-xl text-muted-foreground italic">Click to unlock</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card glow-border p-8 md:p-12 max-w-lg text-center z-50 relative"
        >
          {/* Animated glow border */}
          <div className="absolute -inset-px rounded-2xl animate-pulse-glow opacity-50"
            style={{ background: "linear-gradient(135deg, hsl(348 100% 65% / 0.3), transparent, hsl(348 60% 72% / 0.3))" }} />

          <div className="relative">
            <span className="text-4xl mb-4 block">💌</span>
            <h3 className="font-display text-2xl md:text-3xl text-foreground text-glow mb-4">My Dearest…</h3>
            <p className="font-romantic text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              You are the most beautiful thing that has ever happened to me.
              Every moment with you feels like a dream I never want to wake up from.
              You deserve the world, and I'll spend every day trying to give it to you.
            </p>

            <button className="mt-6 glass-card px-6 py-3 rounded-full flex items-center gap-2 mx-auto text-muted-foreground hover:text-foreground transition-colors">
              <Volume2 className="w-4 h-4" />
              <span className="font-romantic text-sm">Play voice message</span>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default SecretMessage;
