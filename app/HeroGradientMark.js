"use client";

import { useEffect, useRef } from "react";

const gradientConfig = {
  colors: [
    { color: "#000000", enabled: true },
    { color: "#23D4E8", enabled: true },
    { color: "#0B6C77", enabled: true },
    { color: "#9CF5FF", enabled: true },
    { color: "#FFFFFF", enabled: true },
    { color: "#16F9F5", enabled: true }
  ],
  speed: 4.5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 2.5,
  waveFrequencyY: 2.5,
  waveAmplitude: 6,
  secondaryWaveEnabled: false,
  secondaryWaveFrequencyX: 3,
  secondaryWaveFrequencyY: 3,
  secondaryWaveAmplitude: 5,
  secondaryWaveSpeed: 0.6,
  secondaryWaveAngle: 1,
  shadows: 10,
  highlights: 1,
  colorBrightness: 1,
  colorSaturation: 0,
  wireframe: false,
  antialias: false,
  colorBlending: 3,
  backgroundColor: "#E4E4E4",
  backgroundAlpha: 1,
  grainScale: 4,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0.5,
  resolution: 0.9,
  yOffset: 200,
  yOffsetWaveMultiplier: 4,
  yOffsetColorMultiplier: 4,
  yOffsetFlowMultiplier: 10,
  flowDistortionA: 1.2,
  flowDistortionB: 1.8,
  flowScale: 1.5,
  flowEase: 0.25,
  flowEnabled: false,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureMode: "bitmap",
  bakeEdgeSoftness: 1,
  textureVoidLikelihood: 0.27,
  textureVoidWidthMin: 60,
  textureVoidWidthMax: 420,
  textureBandDensity: 1.2,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.5,
  proceduralBackgroundColor: "#0E0707",
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0.25,
  vignetteRadius: 0.35,
  fresnelEnabled: false,
  fresnelPower: 1.3,
  fresnelIntensity: 0,
  fresnelColor: "#ffffff",
  iridescenceEnabled: false,
  iridescenceIntensity: 0.8,
  iridescenceSpeed: 1.5,
  prismEdgeEnabled: false,
  prismEdgeIntensity: 0.5,
  prismEdgeThinness: 3,
  prismEdgeSpread: 1,
  prismEdgeSpeed: 0.5,
  prismEdgeRipple: 1,
  bloomIntensity: 0.1,
  bloomThreshold: 0.1,
  chromaticAberration: 3,
  shapeType: "sphere",
  shapeRotationX: -2.49,
  shapeRotationY: -0.89,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 1,
  shapeAutoRotateSpeedY: 1.2,
  sphereRadius: 21,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.55,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: false,
  cameraLock: false,
  cameraX: 22.5,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0.853,
  cameraRotationY: -0.007,
  cameraRotationZ: 0,
  cameraZoom: 2.6
};

export default function HeroGradientMark({ label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let gradient = null;
    let cancelled = false;
    let revision = 0;

    const initialize = async () => {
      const currentRevision = ++revision;
      gradient?.destroy();
      gradient = null;

      const { NeatGradient } = await import("@firecms/neat");
      if (cancelled || currentRevision !== revision || !canvas) return;

      gradient = new NeatGradient({
        ref: canvas,
        ...gradientConfig,
        speed: reducedMotion.matches ? 0 : gradientConfig.speed
      });
    };

    const handleMotionPreference = () => void initialize();
    void initialize();
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      cancelled = true;
      revision += 1;
      reducedMotion.removeEventListener("change", handleMotionPreference);
      gradient?.destroy();
    };
  }, []);

  return (
    <svg
      className="hero-gradient-mark"
      viewBox="0 0 512 512"
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id="vorun-hero-diagonal-clip" clipPathUnits="userSpaceOnUse">
          <rect
            width="64"
            height="94"
            transform="translate(56 93) scale(1.78125)"
          />
          <polygon
            points="224 27 224 0 158.71 0 0 158.71 0 183 68 183 224 27"
            transform="translate(56 93) scale(1.78125)"
          />
        </clipPath>
      </defs>
      <g transform="translate(56 93) scale(1.78125)">
        <rect className="hero-mark-static" width="64" height="94" />
        <polygon
          className="hero-mark-fallback"
          points="224 27 224 0 158.71 0 0 158.71 0 183 68 183 224 27"
        />
      </g>
      <g clipPath="url(#vorun-hero-diagonal-clip)">
        <foreignObject x="0" y="0" width="512" height="512">
          <canvas ref={canvasRef} className="hero-gradient-canvas" aria-hidden="true" />
        </foreignObject>
      </g>
    </svg>
  );
}
