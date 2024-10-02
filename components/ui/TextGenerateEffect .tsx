import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const TextGenerateEffect = ({ words, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <motion.div className={className} initial={{ opacity: 0 }} animate={controls}>
      {words}
    </motion.div>
  );
};