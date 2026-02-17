"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingMedicines() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.children;
    if (!items) return;

    gsap.from(items, {
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(items, {
      y: "+=25",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="absolute text-7xl">💊</div>
      <div className="absolute top-16 left-16 text-6xl">🩺</div>
      <div className="absolute bottom-16 right-20 text-7xl">💉</div>
      <div className="absolute top-1/3 right-12 text-6xl">🧴</div>
      <div className="absolute bottom-12 left-12 text-6xl">🩹</div>
    </div>
  );
}
