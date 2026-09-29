"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const THEMES = {
  dark: {
    background: "#000000",
    accent: "#48C9AE",
    activeTitle: "#FFFFFF",
    activeText: "rgba(255,255,255,.78)",
    muted: "rgba(255,255,255,.32)",
    line: "rgba(255,255,255,.2)",
  },
  light: {
    background: "#FFFFFF",
    accent: "#48C9AE",
    activeTitle: "#000000",
    activeText: "rgba(0,0,0,.78)",
    muted: "rgba(0,0,0,.32)",
    line: "rgba(0,0,0,.2)",
  },
};

function StepRow({ index, step, activeViewportOffset, colors }) {
  const rowRef = useRef(null);
  const activeOffsetPct = activeViewportOffset * 100;
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: [`start ${activeOffsetPct + 0.1}%`, `start ${activeOffsetPct}%`],
  });

  const circleBackground = useTransform(scrollYProgress, [0, 1], [colors.background, colors.accent]);
  const circleBorder = useTransform(scrollYProgress, [0, 1], [colors.line, colors.accent]);
  const numberColor = useTransform(scrollYProgress, [0, 1], [colors.muted, colors.activeTitle]);
  const titleColor = useTransform(scrollYProgress, [0, 1], [colors.muted, colors.activeTitle]);
  const descriptionColor = useTransform(scrollYProgress, [0, 1], [colors.muted, colors.activeText]);
  const haloShadow = useTransform(
    scrollYProgress,
    (value) => `0 0 0 ${10 * value}px rgba(72,201,174,${0.15 * value})`,
  );

  return (
    <article ref={rowRef} className="process-timeline-row">
      <motion.div
        className="process-timeline-node"
        style={{
          background: circleBackground,
          borderColor: circleBorder,
          color: numberColor,
          boxShadow: haloShadow,
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
      <div className="process-timeline-copy">
        <motion.h3 style={{ color: titleColor }}>
          <span>{step[0][0]}</span>
          <em>{step[0][1]}</em>
        </motion.h3>
        <motion.p style={{ color: descriptionColor }}>{step[1]}</motion.p>
      </div>
    </article>
  );
}

export default function StepTimelinePro({ eyebrow, heading, steps, theme = "dark", activeViewportOffset = 0.5 }) {
  const timelineTrackRef = useRef(null);
  const colors = THEMES[theme] ?? THEMES.dark;
  const stepCount = Math.max(steps.length, 1);
  const activeOffsetPct = activeViewportOffset * 100;
  const { scrollYProgress: rawLineProgress } = useScroll({
    target: timelineTrackRef,
    offset: [`start ${activeOffsetPct}%`, `end ${activeOffsetPct + 100 / stepCount}%`],
  });
  const clampedLineProgress = useTransform(rawLineProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <div className="process-timeline">
      <header className="process-timeline-heading">
        <div className="process-timeline-eyebrow">{eyebrow}</div>
        <h2>{heading[0]}<br /><em>{heading[1]}</em></h2>
      </header>

      <div ref={timelineTrackRef} className="process-timeline-track" role="list" aria-label={eyebrow}>
        <div className="process-timeline-line" aria-hidden="true">
          <span />
          <motion.i style={{ scaleY: clampedLineProgress }} />
        </div>
        {steps.map((step, index) => (
          <div role="listitem" key={`${step[0][0]}-${step[0][1]}`}>
            <StepRow
              index={index}
              step={step}
              activeViewportOffset={activeViewportOffset}
              colors={colors}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
