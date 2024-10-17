"use client";

import React from "react";
import styles from "./FallingStars.module.css";

const createStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;

    return (
      <div
        key={i}
        className={styles.star}
        style={{
          top: `calc(${top}% - 50px)`,
          left: `calc(${left}% - 150px)`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
};

export default function FallingStars() {
  return <div className={styles.night}>{createStars(30)}</div>;
}
