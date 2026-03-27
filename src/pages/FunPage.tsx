import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Smile } from "lucide-react";
import NavButton from "@/components/NavButton";
import { ArrowLeft } from "lucide-react";

const funItems = [
  { icon: <Smile className="w-8 h-8" />, text: "Your smile is my favorite notification 📱" },
  { icon: <Star className="w-8 h-8" />, text: "You're not just a star — you're my entire galaxy 🌌" },
  { icon: <Heart className="w-8 h-8" />, text: "My heart literally skips a beat when you laugh 💓" },
  { icon: <Sparkles className="w-8 h-8" />, text: "If cuteness was a crime, you'd be serving a life sentence 🔒" },
];

const FloatingEmoji = ({ emoji, delay, x }: { emoji: string; delay: number; x: number }) => (
  <motion.span
    className="absolute text-2xl pointer-events-none"
    style={{ left: `${x}%`, bottom: "10%" }}
    animate={{ y: [0, -300, -500], opacity: [0, 1, 0], rotate: [0, 20, -10] }}
    transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 2 }}
  >
    {emoji}
  </motion.span>
);

const FunPage = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const emojis = ["💕", "🦋", "✨", "🌸", "💫", "🥰", "💖"];

  return (
    <div className="page-container-scrollable py-20 px-4">
      {/* Floating emojis */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {emojis.map((e, i) => (
          <FloatingEmoji key={i} emoji={e} delay={i * 0.7} x={5 + i * 15} />
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-display text-glow-soft text-foreground mb-4 text-center z-10"
      >
        Little Truths 💝
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-romantic text-lg md:text-xl text-muted-foreground text-center mb-12 italic z-10"
      >
        Things I never said out loud… until now
      </motion.p>

      <div className="flex flex-col gap-6 max-w-lg w-full z-10">
        {funItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ 
              scale: 1.05, 
              rotateX: i % 2 === 0 ? 2 : -2,
              boxShadow: "0 15px 35px -15px hsla(var(--glow-primary) / 0.4)"
            }}
            className="glass-card glow-border p-6 flex items-center gap-5 transition-all"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="text-primary shrink-0 drop-shadow-sm"
            >
              {item.icon}
            </motion.div>
            <p className="font-romantic text-lg md:text-xl text-foreground italic leading-tight">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-6 mt-10 z-10"
      >
        <button onClick={onBack} className="btn-ghost-romantic flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        <NavButton onClick={onNext} label="Unlock Secret" />
      </motion.div>
    </div>
  );
};

export default FunPage;
