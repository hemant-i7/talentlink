import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampEffect = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 antialiased">
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute -left-28 -right-28 top-1/2 bg-cyan-500 blur-2xl h-1/3" />
        </motion.div>
      </div>
      <div className="relative z-10 flex-none">
        {/* Content can be placed here */}
      </div>
    </div>
  );
};