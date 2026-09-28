"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  "/14-Aplicaciones conceptuales.png",
  "/4-Proporciones del símbolo.png",
  "/2-Esencia de marca.png",
  "/13-Recursos gráficos.png",
];

const positions = [
  { left: 0, top: 0.315, zIndex: 4, rotation: 1 },
  { left: 0.1, top: 0.21, zIndex: 3, rotation: 1.5 },
  { left: 0.2, top: 0.105, zIndex: 2, rotation: 2 },
  { left: 0.3, top: 0, zIndex: 1, rotation: 3 },
];

export default function CarbonicaShuffle() {
  const cardsRef = useRef(null);
  const activeIndexRef = useRef(0);
  const wheelRef = useRef({ locked: false, timeoutId: null });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < 2 || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      if (wheelRef.current.locked) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const current = activeIndexRef.current;
      event.preventDefault();
      wheelRef.current.locked = true;
      const next = (current + direction + cards.length) % cards.length;
      activeIndexRef.current = next;
      setActiveIndex(next);
      wheelRef.current.timeoutId = window.setTimeout(() => {
        wheelRef.current.locked = false;
      }, 450);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.clearTimeout(wheelRef.current.timeoutId);
    };
  }, []);

  return (
    <div className="carbonica-shuffle">
      <div className="carbonica-shuffle-copy">
        <span>SISTEMA DE IDENTIDAD</span>
        <p>Símbolo, color, recursos y aplicaciones construyen una identidad coherente.</p>
      </div>
      <div
        ref={cardsRef}
        className="carbonica-shuffle-cards"
        role="region"
        aria-label="Galería de identidad de Carbónica"
      >
        {cards.map((src, cardIndex) => {
          const position = positions[(cardIndex - activeIndex + cards.length) % cards.length];
          const rotation = position.rotation;

          return (
            <figure
              className="carbonica-shuffle-card"
              key={src}
              style={{
                left: `${position.left * 100}%`,
                top: `${position.top * 100}%`,
                zIndex: position.zIndex,
                transform: `rotate(${rotation}deg) rotateX(${-rotation}deg) rotateY(${rotation}deg)`,
              }}
            >
              <img
                src={src}
                alt={`Carbónica — página de identidad ${String(cardIndex + 1).padStart(2, "0")}`}
                width="1300"
                height="800"
                loading={cardIndex === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
