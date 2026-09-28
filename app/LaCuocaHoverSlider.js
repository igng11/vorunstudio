"use client";

import { preload } from "react-dom";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "./HoverSlider";

const slides = [
  { label: "INICIO", imageUrl: "/lacuoca-full.png", width: 1440, height: 4627, frame: { width: "115%", left: "-7.5%", top: "0px", mobileTop: "0px" } },
  { label: "PRODUCTOS", imageUrl: "/la-cuoca-pedidos.png", width: 1440, height: 1000, frame: { width: "118%", left: "-9%", top: "-14px", mobileTop: "-9px" } },
  { label: "PEDIDOS", imageUrl: "/la-cuoca-contenido.png", width: 1440, height: 1000, frame: { width: "112%", left: "-8%", top: "0px", mobileTop: "0px" } },
  { label: "GESTIÓN", imageUrl: "/la-cuoca-backend.png", width: 1440, height: 1000, frame: { width: "118%", left: "-9%", top: "-10px", mobileTop: "-6px" } },
];

export default function LaCuocaHoverSlider() {
  slides.forEach((slide) => {
    preload(slide.imageUrl, { as: "image", fetchPriority: "high" });
  });

  return (
    <HoverSlider className="portfolio-visual lacuoca-hover-slider">
      <div className="lacuoca-hover-triggers" aria-label="Áreas del proyecto La Cuoca">
        {slides.map((slide, index) => (
          <TextStaggerHover
            className="lacuoca-hover-trigger"
            text={slide.label}
            index={index}
            key={slide.label}
          />
        ))}
      </div>
      <HoverSliderImageWrap className="lacuoca-hover-images">
        {slides.map((slide, index) => (
          <HoverSliderImage
            className="lacuoca-hover-image"
            index={index}
            imageUrl={slide.imageUrl}
            alt={`La Cuoca — ${slide.label.toLowerCase()}`}
            width={slide.width}
            height={slide.height}
            style={{
              "--slide-width": slide.frame.width,
              "--slide-left": slide.frame.left,
              "--slide-top": slide.frame.top,
              "--slide-top-mobile": slide.frame.mobileTop,
            }}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            draggable="false"
            key={slide.imageUrl}
          />
        ))}
      </HoverSliderImageWrap>
    </HoverSlider>
  );
}
