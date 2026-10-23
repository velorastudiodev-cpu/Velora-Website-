"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.9,
      }}
    >
      {children}
    </MotionConfig>
  );
}
