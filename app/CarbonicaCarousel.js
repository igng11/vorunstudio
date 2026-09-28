"use client";

import FanCardCarousel from "./FanCardCarousel";

const cards = [
  "/2-Esencia de marca.png",
  "/3-Concepto del símbolo.png",
  "/4-Proporciones del símbolo.png",
  "/11-Paleta de colores.png",
  "/13-Recursos gráficos.png",
  "/14-Aplicaciones conceptuales.png",
];

export default function CarbonicaCarousel() {
  return (
    <FanCardCarousel
      cards={cards}
      initialIndex={cards.indexOf("/13-Recursos gráficos.png")}
      ariaLabel="Galería de identidad de Carbónica"
      altPrefix="Carbónica — página de identidad"
    />
  );
}
