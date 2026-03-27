import { motion } from "framer-motion";
import NavButton from "@/components/NavButton";
import { ArrowLeft } from "lucide-react";

const stories = [
  {
    emoji: "✨",
    title: "The day I met you…",
    text: "Everything changed in a heartbeat. The world felt brighter, warmer — like the universe had been waiting for this exact moment.",
  },
  {
    emoji: "💫",
    title: "When I knew you were special…",
    text: "It wasn't just one moment. It was every glance, every laugh, every quiet second spent together that told me — you're the one.",
  },
  {
    emoji: "💖",
    title: "Missing you every single day…",
    text: "Distance only makes the heart grow fonder. Not a single hour goes by without a thought of you crossing my mind. You're my constant 'wish you were here'.",
  },
  {
    emoji: "📱",
    title: "Our daily reel therapy…",
    text: "From the wholesome to the hilarious, sharing those little clips is my favorite ritual. It's how we stay connected, one 'OMG watch this' at a time.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 50, rotateX: 8 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const StoryPage = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  return (
    <div className="page-container-scrollable py-20 px-4">
      <div className="radial-glow w-[500px] h-[500px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(348 60% 72% / 0.3), transparent 70%)" }} />

      <motion.h2
        initial={{ opacity: 0, y: -30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-display text-glow-soft text-foreground mb-12 text-center z-10"
      >
        Our Story
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-8 max-w-xl w-full z-10 mb-10"
        style={{ perspective: "2000px" }}
      >
        {stories.map((s, i) => (
          <motion.div
            key={i}
            variants={cardAnim}
            whileHover={{ 
              rotateY: 2, 
              rotateX: -1, 
              scale: 1.02,
              boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)"
            }}
            className="glass-card glow-border p-6 md:p-10 cursor-default relative group overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="text-4xl mb-4 block"
            >
              {s.emoji}
            </motion.span>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
            <p className="font-romantic text-lg md:text-xl text-muted-foreground leading-relaxed italic opacity-90">{s.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-6 mt-6 z-10"
      >
        <button onClick={onBack} className="btn-ghost-romantic flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        <NavButton onClick={onNext} label="Memory Lane" />
      </motion.div>
    </div>
  );
};

export default StoryPage;
