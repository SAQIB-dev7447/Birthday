import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const memories = [
  { title: "First Adventure", color: "from-primary/20 to-secondary/20" },
  { title: "Midnight Talks", color: "from-secondary/20 to-glow-soft/20" },
  { title: "Our Happy Place", color: "from-glow-soft/20 to-primary/20" },
  { title: "Silly Moments", color: "from-primary/20 to-glow-soft/20" },
  { title: "Forever Yours", color: "from-secondary/20 to-primary/20" },
];

const MemoryGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const newActive = Math.max(0, Math.min(memories.length - 1, active + dir));
    setActive(newActive);
    const card = scrollRef.current.children[newActive] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-display text-center text-glow-soft text-foreground mb-12 md:mb-16 px-6"
      >
        Memory Gallery
      </motion.h2>

      <div className="relative max-w-6xl mx-auto px-6">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {memories.map((mem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex-shrink-0 w-[280px] md:w-[320px] snap-center cursor-pointer transition-all duration-500 ${
                i === active ? "scale-105" : "scale-95 opacity-60"
              }`}
              onClick={() => setActive(i)}
              whileHover={{ rotateY: 5, rotateX: -3 }}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="glass-card glow-border overflow-hidden">
                <div className={`aspect-[3/4] bg-gradient-to-br ${mem.color} flex items-center justify-center`}>
                  <div className="text-6xl opacity-30">📸</div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg text-foreground text-center">{mem.title}</h3>
                  <p className="font-romantic text-sm text-muted-foreground text-center mt-1 italic">Add your photo here</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nav buttons */}
        <button onClick={() => scroll(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full glow-border z-10">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={() => scroll(1)} className="absolute right-2 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full glow-border z-10">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default MemoryGallery;
