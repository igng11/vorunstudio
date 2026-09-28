"use client";

import { useEffect, useRef } from "react";

const STOP_AT_IMAGE_RATIO = 0.835;
const AUTO_SPEED = 14;
const WHEEL_FACTOR = 1.4;
const SMOOTHING = 8;

export default function OsaMonitorScroll({ number, name, meta, headline }) {
  const mockupRef = useRef(null);
  const screenRef = useRef(null);
  const siteRef = useRef(null);
  const frameRef = useRef(null);
  const motionRef = useRef({ current: 0, target: 0, maximum: 0, lastTime: 0, visible: false });

  useEffect(() => {
    const mockup = mockupRef.current;
    const screen = screenRef.current;
    const site = siteRef.current;
    if (!mockup || !screen || !site) return;

    const updateBounds = () => {
      const imageHeight = site.getBoundingClientRect().height;
      const targetBottom = imageHeight * STOP_AT_IMAGE_RATIO;
      const maximum = Math.max(0, Math.min(imageHeight - screen.clientHeight, targetBottom - screen.clientHeight));
      const motion = motionRef.current;
      motion.maximum = maximum;
      motion.target = Math.min(motion.target, maximum);
      motion.current = Math.min(motion.current, maximum);
    };

    const handleWheel = (event) => {
      const motion = motionRef.current;
      const movingDown = event.deltaY > 0;
      const movingUp = event.deltaY < 0;
      const atEnd = motion.current >= motion.maximum - 0.5 && motion.target >= motion.maximum - 0.5;
      const atStart = motion.current <= 0.5 && motion.target <= 0.5;

      if ((movingDown && atEnd) || (movingUp && atStart) || (!movingDown && !movingUp)) return;
      event.preventDefault();
      motion.target = Math.max(0, Math.min(motion.maximum, motion.target + event.deltaY * WHEEL_FACTOR));
    };

    const animate = (time) => {
      const motion = motionRef.current;
      const delta = motion.lastTime ? Math.min((time - motion.lastTime) / 1000, 0.05) : 0;
      motion.lastTime = time;

      if (motion.visible && motion.target < motion.maximum) {
        motion.target = Math.min(motion.maximum, motion.target + AUTO_SPEED * delta);
      }

      const ease = 1 - Math.exp(-SMOOTHING * delta);
      motion.current += (motion.target - motion.current) * ease;
      if (Math.abs(motion.target - motion.current) < 0.01) motion.current = motion.target;
      site.style.transform = `translate3d(0, ${-motion.current}px, 0)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(updateBounds);
    observer.observe(screen);
    observer.observe(site);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      motionRef.current.visible = entry.isIntersecting;
      motionRef.current.lastTime = performance.now();
    }, { threshold: 0.05 });
    visibilityObserver.observe(screen);

    mockup.addEventListener("wheel", handleWheel, { passive: false });
    updateBounds();
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      visibilityObserver.disconnect();
      mockup.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="osa-monitor-scroll">
      <div className="osa-monitor-sticky">
        <div className="osa-project-heading">
          <header className="portfolio-header">
            <div><span>({number})</span><h3>{name}</h3></div>
            <p>{meta}</p>
          </header>
          <h4>{headline}</h4>
        </div>

        <div className="osa-monitor-stage">
          <div className="osa-monitor-mockup" ref={mockupRef}>
            <div className="osa-monitor-screen" ref={screenRef}>
              <img
                ref={siteRef}
                className="osa-monitor-site"
                src="/osa-full.png"
                alt="Sitio web de OSA"
                width="1257"
                height="6521"
                draggable="false"
              />
            </div>
            <img className="osa-monitor-frame" src="/pc.png" alt="" width="1080" height="620" draggable="false" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
