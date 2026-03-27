import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const stories = [
  { title: "The day I met you…", text: "Everything changed in that one moment. The world felt brighter, warmer, more alive. You walked in and my story began.", icon: "✨" },
  { title: "That moment you made me smile…", text: "Your laugh became my favorite sound. Every joke, every silly face — each one a treasure I keep replaying in my heart.", icon: "😊" },
  { title: "When I knew you were special…", text: "It wasn't a single moment, it was every moment. The way you care, the way you love, the way you make everything magical.", icon: "💫" },
  { title: "Every day with you…", text: "Is a gift I never knew I deserved. You are my favorite chapter in a story I never want to end.", icon: "💝" },
];

const StorySection = () => {
  return (
    <section className="relative py-20 md:py-32 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-display text-center text-glow-soft text-foreground mb-16 md:mb-24"
      >
        Our Story
      </motion.h2>

      <div className="max-w-2xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        {stories.map((story, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`relative mb-16 md:mb-20 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full bg-primary glow-border z-10">
              <div className="absolute inset-0 rounded-full bg-primary animate-pulse-glow" />
            </div>

            <div className="glass-card p-6 md:p-8 glow-border group hover:scale-[1.02] transition-transform duration-500">
              <span className="text-2xl mb-3 block">{story.icon}</span>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{story.title}</h3>
              <p className="font-romantic text-base md:text-lg text-muted-foreground leading-relaxed italic">{story.text}</p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Heart className="w-8 h-8 text-primary animate-pulse-glow" fill="currentColor" />
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
