"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CARD_WIDTH = 680;
const CARD_HEIGHT = CARD_WIDTH * (800 / 1300);
const FAN_SPREAD = 195;
const ROTATION_ANGLE = 8;
const ACTIVE_SCALE = 1.04;
const INACTIVE_SCALE = 0.85;
const MOBILE_CAROUSEL_SCALE = 0.8;
const SPRING_STIFFNESS = 260;
const SPRING_DAMPING = 20;

function SpringCard({ cards, altPrefix, index, activeIndex, metrics, dragOffset, isDragging, onHover }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const stateRef = useRef(null);
  const distance = index - activeIndex;
  const absDistance = Math.abs(distance);
  const isActive = index === activeIndex;
  const isHovered = metrics.isDesktop && metrics.hoveredIndex === index && !isActive;
  const target = {
    x: distance * metrics.fanSpread + (isActive ? dragOffset * metrics.dragElastic : 0),
    y: absDistance * metrics.verticalStep - (isHovered ? 10 : 0),
    rotate: distance * metrics.rotation,
    scale: (isActive ? metrics.activeScale : Math.max(0.4, metrics.inactiveScale - absDistance * 0.05)) * (isHovered ? 1.05 : 1)
  };

  useLayoutEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    if (!stateRef.current) {
      stateRef.current = {
        values: { ...target },
        velocity: { x: 0, y: 0, rotate: 0, scale: 0 }
      };
    }

    cancelAnimationFrame(frameRef.current);
    let previousTime = performance.now();

    const animate = (time) => {
      const state = stateRef.current;
      const delta = Math.min((time - previousTime) / 1000, 1 / 30);
      previousTime = time;
      let settled = true;

      for (const key of Object.keys(target)) {
        const displacement = target[key] - state.values[key];
        const acceleration = displacement * SPRING_STIFFNESS - state.velocity[key] * SPRING_DAMPING;
        state.velocity[key] += acceleration * delta;
        state.values[key] += state.velocity[key] * delta;
        if (Math.abs(displacement) > 0.01 || Math.abs(state.velocity[key]) > 0.01) settled = false;
      }

      const { x, y, rotate, scale } = state.values;
      node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      if (!settled) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target.x, target.y, target.rotate, target.scale]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <figure
      ref={cardRef}
      className={`carbonica-fan-card${isActive ? " is-active" : ""}${isDragging && isActive ? " is-dragging" : ""}`}
      data-card-index={index}
      style={{ width: metrics.cardWidth, height: metrics.cardHeight, zIndex: cards.length - absDistance }}
      onPointerEnter={() => onHover(index)}
      onPointerLeave={() => onHover(null)}
    >
      <img
        src={cards[index]}
        alt={`${altPrefix} ${String(index + 1).padStart(2, "0")}`}
        width="1300"
        height="800"
        loading={absDistance <= 1 ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
      />
    </figure>
  );
}

// Reusable fan card carousel.
// Preserved from the original Carbónica portfolio implementation.
// Keep interaction mechanics intact when reusing.
export default function FanCardCarousel({ cards, initialIndex, ariaLabel, altPrefix }) {
  const containerRef = useRef(null);
  const dragRef = useRef({ active: false, pointerId: null, startX: 0, cardIndex: null });
  const activeIndexRef = useRef(initialIndex);
  const wheelRef = useRef({ locked: false, timeoutId: null });
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(activeIndexRef.current);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < 2 || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const current = activeIndexRef.current;
      const isBoundary = direction > 0 ? current === cards.length - 1 : current === 0;

      if (isBoundary) return;
      event.preventDefault();
      if (wheelRef.current.locked) return;

      wheelRef.current.locked = true;
      const next = current + direction;
      activeIndexRef.current = next;
      setActiveIndex(next);
      wheelRef.current.timeoutId = window.setTimeout(() => {
        wheelRef.current.locked = false;
      }, 500);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.clearTimeout(wheelRef.current.timeoutId);
    };
  }, []);

  const mobile = containerWidth < 640;
  const tablet = containerWidth >= 640 && containerWidth < 1024;
  const cardWidth = mobile
    ? Math.min(CARD_WIDTH * MOBILE_CAROUSEL_SCALE, containerWidth * 0.78)
    : tablet
      ? Math.min(CARD_WIDTH * 0.88, containerWidth * 0.46)
      : CARD_WIDTH;
  const metrics = {
    cardWidth,
    cardHeight: mobile || tablet ? cardWidth * (CARD_HEIGHT / CARD_WIDTH) : CARD_HEIGHT,
    fanSpread: mobile
      ? Math.min(FAN_SPREAD * MOBILE_CAROUSEL_SCALE * 0.72, cardWidth * 0.52)
      : tablet
        ? FAN_SPREAD * 0.78
        : FAN_SPREAD,
    rotation: mobile ? ROTATION_ANGLE * 0.45 : tablet ? ROTATION_ANGLE * 0.7 : ROTATION_ANGLE,
    activeScale: mobile ? Math.min(ACTIVE_SCALE, 1) : tablet ? Math.min(ACTIVE_SCALE, 1.05) : ACTIVE_SCALE,
    inactiveScale: mobile ? Math.min(INACTIVE_SCALE, 0.78) : tablet ? Math.min(INACTIVE_SCALE, 0.82) : INACTIVE_SCALE,
    verticalStep: mobile ? 32 : tablet ? 46 : 60,
    dragElastic: mobile ? 0.3 : 0.2,
    isDesktop: !mobile && !tablet,
    hoveredIndex
  };

  const moveBy = (direction, wrap = false) => {
    setActiveIndex((current) => {
      const next = wrap
        ? (current + direction + cards.length) % cards.length
        : Math.max(0, Math.min(cards.length - 1, current + direction));
      activeIndexRef.current = next;
      return next;
    });
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const card = event.target.closest("[data-card-index]");
    if (!card) return;
    containerRef.current.setPointerCapture(event.pointerId);
    dragRef.current = { active: true, pointerId: event.pointerId, startX: event.clientX, cardIndex: Number(card.dataset.cardIndex) };
    setDragOffset(0);
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;
    setDragOffset(event.clientX - drag.startX);
  };

  const finishDrag = (event) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;
    const offset = event.clientX - drag.startX;
    const threshold = mobile ? 30 : 50;
    drag.active = false;
    if (containerRef.current?.hasPointerCapture(event.pointerId)) containerRef.current.releasePointerCapture(event.pointerId);
    if (Math.abs(offset) >= threshold) moveBy(offset > 0 ? -1 : 1);
    else if (Math.abs(offset) < 6 && drag.cardIndex !== activeIndex) {
      activeIndexRef.current = drag.cardIndex;
      setActiveIndex(drag.cardIndex);
    }
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveBy(event.key === "ArrowRight" ? 1 : -1, true);
  };

  return (
    <div
      ref={containerRef}
      className={`portfolio-visual carbonica-fan-carousel${isDragging ? " is-dragging" : ""}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex="0"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onKeyDown={handleKeyDown}
    >
      {containerWidth > 0 && cards.map((_, index) => (
        <SpringCard
          key={cards[index]}
          cards={cards}
          altPrefix={altPrefix}
          index={index}
          activeIndex={activeIndex}
          metrics={metrics}
          dragOffset={dragOffset}
          isDragging={isDragging}
          onHover={setHoveredIndex}
        />
      ))}
    </div>
  );
}
