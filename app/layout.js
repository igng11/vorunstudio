import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://portfolio-nocturno-2026.igng44.chatgpt.site"),
  title: "Vorun Studio — Video, diseño y web",
  description: "Vorun Studio ayuda a negocios locales a mejorar su presencia digital mediante contenido audiovisual, diseño y desarrollo web.",
  openGraph: {
    title: "Vorun Studio — Video, diseño y web",
    description: "Mostramos mejor el valor de tu marca mediante contenido audiovisual, diseño y desarrollo web.",
    url: "/",
    siteName: "Vorun Studio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vorun Studio" }],
    locale: "es_AR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vorun Studio — Video, diseño y web",
    description: "Mostramos mejor el valor de tu marca.",
    images: ["/og.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/italiana-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/brand-mark-dark.png" as="image" type="image/png" />
        <link rel="preload" href="/brand-mark-light.png" as="image" type="image/png" />
      </head>
      <body data-sidebar="collapsed">{children}</body>
    </html>
  );
}
