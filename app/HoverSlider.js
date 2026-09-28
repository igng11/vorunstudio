"use client";

import { createContext, forwardRef, useCallback, useContext, useState } from "react";
import { MotionConfig, motion } from "framer-motion";

const HoverSliderContext = createContext(undefined);

function useHoverSliderContext() {
  const context = useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error("useHoverSliderContext must be used within a HoverSlider");
  }
  return context;
}

function splitText(text) {
  return text.split(" ").map((word) => `${word} `).flatMap((word) => word.split(""));
}

export const HoverSlider = forwardRef(function HoverSlider({ children, className = "", ...props }, ref) {
  const [activeSlide, setActiveSlide] = useState(0);
  const changeSlide = useCallback((index) => setActiveSlide(index), []);

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  );
});

export const TextStaggerHover = forwardRef(function TextStaggerHover(
  { text, index, className = "", ...props },
  ref,
) {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const characters = splitText(text);
  const isActive = activeSlide === index;
  const activate = () => changeSlide(index);

  return (
    <span
      ref={ref}
      className={className}
      role="button"
      tabIndex="0"
      aria-label={text}
      aria-current={isActive ? "true" : undefined}
      onMouseEnter={activate}
      onFocus={activate}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      }}
      {...props}
    >
      <span className="hover-slider-text" aria-hidden="true">
        {characters.map((char, characterIndex) => (
          <span className="hover-slider-character" key={`${char}-${characterIndex}`}>
            <MotionConfig
              transition={{
                delay: characterIndex * 0.025,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="hover-slider-character-muted"
                initial={{ y: "0%" }}
                animate={isActive ? { y: "-110%" } : { y: "0%" }}
              >
                {char === " " ? "\u00a0" : char}
              </motion.span>
              <motion.span
                className="hover-slider-character-active"
                initial={{ y: "110%" }}
                animate={isActive ? { y: "0%" } : { y: "110%" }}
              >
                {char === " " ? "\u00a0" : char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>
    </span>
  );
});

export const HoverSliderImageWrap = forwardRef(function HoverSliderImageWrap(
  { className = "", ...props },
  ref,
) {
  return <div ref={ref} className={className} {...props} />;
});

export const HoverSliderImage = forwardRef(function HoverSliderImage(
  { index, imageUrl, className = "", alt = "", ...props },
  ref,
) {
  const { activeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <motion.div
      className="hover-slider-image-mask"
      initial={false}
      animate={{ height: isActive ? "100%" : "0%" }}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      style={{ zIndex: isActive ? 2 : 1 }}
      aria-hidden={!isActive}
    >
      <img
        ref={ref}
        className={className}
        src={imageUrl}
        alt={alt}
        {...props}
      />
    </motion.div>
  );
});
