import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarField from "@/components/StarField";
import ProgressIndicator from "@/components/ProgressIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import HeroPage from "@/pages/HeroPage";
import StoryPage from "@/pages/StoryPage";
import MemoryPage from "@/pages/MemoryPage";
import FunPage from "@/pages/FunPage";
import SecretPage from "@/pages/SecretPage";
import FinalePage from "@/pages/FinalePage";

const TOTAL_PAGES = 6;

const pageVariants = {
  enter: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  center: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)", 
    transition: { 
      duration: 0.8, 
      ease: [0.33, 1, 0.68, 1] as const
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.03, 
    filter: "blur(2px)", 
    transition: { 
      duration: 0.6, 
      ease: [0.33, 1, 0.68, 1] as const
    } 
  },
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const next = useCallback(() => setPage((p) => Math.min(p + 1, TOTAL_PAGES - 1)), []);
  const back = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);
  const restart = useCallback(() => setPage(0), []);

  const pages: Record<number, React.ReactNode> = {
    0: <HeroPage onNext={next} />,
    1: <StoryPage onNext={next} onBack={back} />,
    2: <MemoryPage onNext={next} onBack={back} />,
    3: <FunPage onNext={next} onBack={back} />,
    4: <SecretPage onNext={next} onBack={back} />,
    5: <FinalePage onRestart={restart} />,
  };

  return (
    <div className="fixed inset-0 bg-background">
      <StarField />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <ProgressIndicator current={page} total={TOTAL_PAGES} />

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="fixed inset-0"
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Index;
