import { motion } from "framer-motion";
import { useState } from "react";
import NavButton from "@/components/NavButton";
import { ArrowLeft, RotateCcw } from "lucide-react";

const memories = [
  { front: "📸", title: "First Adventure", back: "That spontaneous trip where everything felt possible. Just us against the world." },
  { front: "🌙", title: "Midnight Talks", back: "Those 5 AM conversations where we forgot time existed. Every word a treasure." },
  { front: "☀️", title: "Our Happy Place", back: "The spot where we always ended up. Where the world felt perfectly still." },
  { front: "😂", title: "Silly Moments", back: "All those uncontrollable laughs — the ones that made my cheeks hurt. Pure joy." },
  { front: "💝", title: "Forever Yours", back: "Not just a memory — a promise. Every day with you is my favorite." },
  { front: "🌸", title: "Spring Days", back: "When the flowers bloomed and so did my love for you. Endlessly." },
];

const FlipCard = ({ front, title, back, index }: { front: string; title: string; back: string; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className="flip-card w-full aspect-[3/4] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flip-card-front glass-card glow-border flex flex-col items-center justify-center p-4 gap-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.span 
            animate={flipped ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            {front}
          </motion.span>
          <h3 className="font-display text-base md:text-lg text-foreground text-center">{title}</h3>
          <p className="text-[10px] uppercase tracking-tighter text-muted-foreground mt-1 opacity-70">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className="flip-card-back glass-card glow-border-strong flex flex-col items-center justify-center p-5 relative">
          <div className="absolute top-2 right-2 opacity-20">✨</div>
          <p className="font-romantic text-sm md:text-lg text-foreground leading-relaxed italic text-center font-medium">{back}</p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="mt-4"
          >
            <RotateCcw className="w-4 h-4 text-primary/60" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const MemoryPage = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  return (
    <div className="page-container-scrollable py-20 px-4 mt-8">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-display text-glow-soft text-foreground mb-4 text-center z-10"
        >
          Memory Lane
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-romantic text-muted-foreground text-center mb-10 italic z-10 text-lg"
        >
          Each card holds a whisper of our story…
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full z-10 px-2 pb-10">
          {memories.map((m, i) => (
            <FlipCard key={i} {...m} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-4 mt-10 z-10"
      >
        <button onClick={onBack} className="btn-ghost-romantic flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <NavButton onClick={onNext} label="Continue" />
      </motion.div>
    </div>
  );
};

export default MemoryPage;
