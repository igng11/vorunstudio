"use client";

import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";

const ITEMS = [
  { text: "HERO", src: "/osa-full 1.png" },
  { text: "ALIADOS", src: "/osa-full 2.png" },
  { text: "SERVICIOS", src: "/osa-full 3.png" },
  { text: "PROCESO", src: "/osa-full 4.png" }
];

export default function OsaImageScroller({ number, name, meta, headline }) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const scrollHeight = useMemo(() => Math.max(ITEMS.length * 100, 100), []);

  const updateFromScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const distance = Math.max(1, rect.height - window.innerHeight);
    const scrollYProgress = Math.min(1, Math.max(0, -rect.top / distance));
    const nextIndex = Math.min(Math.floor(scrollYProgress * ITEMS.length), ITEMS.length - 1);

    if (nextIndex === activeIndexRef.current) return;
    const previousIndex = activeIndexRef.current;
    activeIndexRef.current = nextIndex;
    startTransition(() => {
      setVisited((currentVisited) => new Set(currentVisited).add(previousIndex));
      setActiveIndex(nextIndex);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(updateFromScroll);
    };
    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateFromScroll]);

  useEffect(() => {
    const previousHtml = document.documentElement.style.overscrollBehaviorY;
    const previousBody = document.body.style.overscrollBehaviorY;
    document.documentElement.style.overscrollBehaviorY = "none";
    document.body.style.overscrollBehaviorY = "none";
    return () => {
      document.documentElement.style.overscrollBehaviorY = previousHtml;
      document.body.style.overscrollBehaviorY = previousBody;
    };
  }, []);

  const handleThumbnailClick = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = window.scrollY + container.getBoundingClientRect().top;
    window.scrollTo({ top: containerTop + index * window.innerHeight, behavior: "smooth" });
  };

  return (
    <div
      className="osa-image-scroller"
      ref={containerRef}
      style={{ height: `${scrollHeight}vh` }}
    >
      <div className="osa-image-sticky-group">
        <div className="osa-project-heading">
          <header className="portfolio-header">
            <div><span>({number})</span><h3>{name}</h3></div>
            <p>{meta}</p>
          </header>
          <h4>{headline}</h4>
        </div>

        <div className="osa-image-sticky">
          {ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            const isOutgoing = visited.has(index) && !isActive;
            return (
              <div
                className={`osa-image-item${isActive ? " is-active" : isOutgoing ? " is-outgoing" : ""}`}
                aria-hidden={!isActive}
                key={item.text}
              >
                <div className="osa-image-background" style={{ backgroundImage: `url("${item.src}")` }} />
              </div>
            );
          })}

          <div className="osa-image-dock" aria-label="Navegación visual de OSA">
            <div
              className="osa-image-outline"
              style={{ transform: `translateX(calc(var(--osa-dock-step) * ${activeIndex}))` }}
              aria-hidden="true"
            />
            {ITEMS.map((item, index) => (
              <button
                type="button"
                className={activeIndex === index ? "is-active" : ""}
                onClick={() => handleThumbnailClick(index)}
                aria-label={item.text}
                aria-current={activeIndex === index ? "step" : undefined}
                key={item.text}
              >
                <span style={{ backgroundImage: `url("${item.src}")` }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
