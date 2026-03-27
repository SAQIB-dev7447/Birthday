import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Unlock, Volume2, ArrowLeft } from "lucide-react";
import NavButton from "@/components/NavButton";

const SecretPage = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2830") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
      // Shake animation effect could be added here
    }
  };

  return (
    <div className="page-container overflow-hidden">
      {/* Dim overlay */}
      <AnimatePresence>
        {(unlocked || showInput) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-xl z-30"
          />
        )}
      </AnimatePresence>

      <div className="radial-glow w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(348 100% 70% / 0.2), transparent 70%)" }} />

      {!unlocked ? (
        <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-display text-glow-soft text-foreground mb-12 text-center z-10"
          >
            A Secret For You
          </motion.h2>

          {!showInput ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsla(var(--glow-primary) / 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInput(true)}
              className="glass-card glow-border p-12 md:p-16 flex flex-col items-center gap-6 cursor-pointer group z-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative pointer-events-none">
                <Lock className="w-16 h-16 text-primary group-hover:opacity-0 transition-all duration-500 transform group-hover:scale-110" />
                <Unlock className="w-16 h-16 text-primary absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-125" />
              </div>
              <span className="font-romantic text-xl text-muted-foreground italic group-hover:text-foreground transition-colors">Click to reveal your heart 💖</span>
            </motion.button>
          ) : (
            <motion.form
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              onSubmit={handleUnlock}
              className="glass-card glow-border-strong p-8 md:p-12 flex flex-col items-center gap-6 z-40 w-full max-w-sm relative"
            >
              <h3 className="font-display text-xl text-foreground mb-2">Enter the key ✨</h3>
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hint: Your special date..."
                className="bg-transparent border-b-2 border-primary/30 focus:border-primary outline-none text-center text-2xl font-display tracking-[0.5em] w-full py-2 transition-colors mb-2"
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-primary text-sm font-romantic italic"
                  >
                    Incorrect key, try again love...
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex gap-4 w-full mt-4">
                <button
                  type="button"
                  onClick={() => { setShowInput(false); setError(false); setPassword(""); }}
                  className="btn-ghost-romantic flex-1 py-3 text-xs tracking-widest"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-romantic flex-1 py-3 text-xs tracking-widest"
                >
                  UNLOCK
                </button>
              </div>
            </motion.form>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-12 z-10 ${showInput ? 'opacity-20 pointer-events-none transition-opacity' : ''}`}
          >
            <button onClick={onBack} className="btn-ghost-romantic flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)", y: 20 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="glass-card glow-border-strong p-10 md:p-16 max-w-xl text-center z-40 relative animate-float"
        >
          {/* Pulsing glow ring */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-40 shadow-[0_0_50px_hsla(var(--glow-primary)/0.3)]"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ background: "linear-gradient(135deg, hsl(348 100% 65% / 0.3), transparent 50%, hsl(348 60% 72% / 0.3))" }}
          />

          <div className="relative">
            <span className="text-6xl mb-6 block drop-shadow-lg">💌</span>
            <h3 className="font-display text-3xl md:text-4xl text-foreground text-glow mb-6">My Dearest…</h3>
            <p className="font-romantic text-xl md:text-2xl text-foreground/90 leading-relaxed italic font-medium px-2">
              You are the most beautiful thing that has ever happened to me.
              Every moment with you feels like a dream I never want to wake up from.
              You deserve the world, and I'll spend every day trying to give it to you.
            </p>

            <div className="mt-12">
              <NavButton onClick={onNext} label="Our Final Chapter" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SecretPage;
