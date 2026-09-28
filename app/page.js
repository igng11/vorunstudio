"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import CarbonicaShuffle from "./CarbonicaShuffle";
import OsaMonitorScroll from "./OsaMonitorScroll";
import HeroGradientMark from "./HeroGradientMark";
import StepTimelinePro from "./StepTimelinePro";
import LaCuocaHoverSlider from "./LaCuocaHoverSlider";

const portfolioProjects = [
  {
    key: "carbonica",
    n: "01",
    art: { src: "/carbonica.png", width: 3981, height: 2480 }
  },
  {
    key: "lacuoca",
    n: "02",
    href: "https://www.tiktok.com/@vorun.studio/video/7649178100726566151",
    art: { src: "/lacuoca-proyecto.png", width: 1080, height: 620 }
  },
  {
    key: "osa",
    n: "03",
    href: "https://www.osarevops.com",
    art: { src: "/osa-proyect.png", width: 1080, height: 653 }
  },
  {
    key: "content",
    n: "04"
  }
];

const contactEmail = "vorustudio@gmail.com";

const translations = {
  es: {
    nav: ["Nuestro trabajo", "Qué hacemos", "Proceso", "Preguntas frecuentes"],
    contact: "Contacto",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    home: "Inicio",
    portraitAlt: "Vorun Studio",
    lightMode: "Activar modo claro",
    darkMode: "Activar modo oscuro",
    language: "Cambiar idioma a inglés",
    cvSoon: "Conocé Vorun Studio",
    copyEmail: "Copiar email",
    emailCopied: "Email copiado",
    heroText: "Ayudamos a negocios locales a verse como marcas más grandes.",
    services: "Servicios",
    marqueeServices: ["VIDEO", "DISEÑO", "WEB", "CONTENIDO", "IDENTIDAD", "LANDING PAGES", "REDES", "CAMPAÑAS"],
    servicesOrbit: "VIDEO · DISEÑO · WEB · CONTENIDO · IDENTIDAD · PRESENCIA DIGITAL · ",
    guides: {
      "": "MIRÁ NUESTRO TRABAJO",
      proyectos: "CONOCÉ QUÉ HACEMOS",
      servicios: "CONOCÉ EL PROCESO",
      proceso: "RESOLVÉ TUS DUDAS",
      faq: "HABLEMOS DE TU NEGOCIO",
      contacto: "MOSTRANOS TU NEGOCIO"
    },
    work: {
      index: "01 / NUESTRO TRABAJO",
      title: ["Mirá lo que", "hacemos."],
      gallery: {
        label: "04 / CONTENIDO AUDIOVISUAL / 2026",
        items: [
          ["04.1", "PIZZERÍA", "CAMPAÑA", "/pizzeria.mp4", "Una campaña para abrir el apetito.", "128", "12"],
          ["04.2", "CAFETERÍA", "CONTENIDO", "/cafeteria.mp4", "El ritual de cada pausa.", "96", "8"],
          ["04.3", "TRIVUM", "CULTURA", "/cultura.mp4", "Cultura que se vive en equipo.", "74", "6"]
        ]
      },
      items: [
        { name: "CARBÓNICA", meta: "IDENTIDAD / BRANDING", headline: "Identidad visual construida desde cero." },
        { name: "LA CUOCA", meta: "PRODUCTO DIGITAL / CONTENIDO", headline: "Experiencia digital para mostrar, vender y gestionar.", cta: "VER LA CUOCA" },
        { name: "OSA", meta: "WEB / REVOPS / CRM", headline: "Presencia digital clara para un servicio complejo.", cta: "CONOCER OSA" },
        { name: "CONTENIDO", meta: "VIDEO / CONTENIDO DIGITAL", headline: "Piezas para que negocios locales destaquen en redes." }
      ]
    },
    services: {
      index: "02 / QUÉ HACEMOS",
      title: ["Una marca.", "Distintas herramientas."],
      groups: [
        ["IDENTIDAD", ["Branding", "Dirección visual", "Piezas gráficas"]],
        ["CONTENIDO", ["Video", "Campañas", "Redes"]],
        ["DIGITAL", ["Web", "Landing pages", "Productos digitales"]]
      ]
    },
    process: {
      index: "03 / CÓMO TRABAJAMOS",
      title: ["Simple, directo.", "De principio a fin."],
      steps: [
        [["Nos mostrás", "tu negocio"], "Compartís lo que tenés y qué querés mejorar."],
        [["Creamos", "la propuesta"], "Definimos qué hacer y cómo llevarlo adelante."],
        [["Recibís", "el resultado"], "Te entregamos todo terminado y listo para usar."]
      ]
    },
    editorial: {
      title: ["El negocio permanece delante.", "La tecnología, detrás."]
    },
    faq: {
      index: "04 / PREGUNTAS FRECUENTES",
      title: ["Todo claro", "antes de empezar."],
      kicker: "SIN FRICCIONES · SIN LETRA CHICA",
      items: [
        ["¿Qué podemos hacer por tu negocio?", "Trabajamos sobre la forma en que tu negocio se presenta: desde contenido audiovisual y piezas gráficas hasta identidad visual y desarrollo web. Podemos resolver una necesidad puntual o desarrollar una propuesta más completa según lo que necesites."],
        ["¿Necesito tener fotos o videos profesionales?", "No. Podemos trabajar con el material que ya tengas y evaluar qué podemos aprovechar. Dependiendo del proyecto, también podemos crear nuevos recursos visuales y combinarlos con tus fotos, productos e identidad actual."],
        ["¿Los videos muestran mi negocio tal como es?", "Nuestro objetivo no es hacer que tu negocio parezca algo que no es, sino presentar mejor lo que ya existe. Podemos crear situaciones y recursos visuales con IA, pero siempre buscamos que la pieza sea coherente con tu producto, identidad y propuesta."],
        ["¿Trabajan solamente con videos hechos con IA?", "No. La IA es una de nuestras herramientas, no el servicio. Según el proyecto podemos combinar generación audiovisual, edición, diseño gráfico, branding y desarrollo web."],
        ["¿Cuánto demora un proyecto?", "Depende del trabajo. Una pieza audiovisual sencilla puede resolverse en pocos días, mientras que una identidad visual, una web o un proyecto más elaborado requieren otros tiempos. Antes de empezar acordamos alcance, plazo y entregables."],
        ["¿Cómo empezamos?", "Contanos sobre tu negocio y qué necesitás mejorar. Si todavía no lo tenés claro, también podés mostrarnos tu marca actual y contarnos qué querés conseguir. A partir de ahí evaluamos qué podemos hacer y te presentamos una propuesta."]
      ]
    },
    footer: {
      index: "05 / CONTACTO",
      title: ["Mostranos", "tu negocio."],
      support: "No necesitás llegar con una idea resuelta. Mandanos tu web, Instagram o proyecto y vemos qué podemos hacer.",
      ctaLabel: "HABLEMOS POR WHATSAPP ↗",
      copyright: "© 2026 — VORUN STUDIO"
    },
    backToTop: "Volver arriba"
  },
  en: {
    nav: ["Our work", "What we do", "Process", "FAQ"],
    contact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    home: "Home",
    portraitAlt: "Vorun Studio",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    language: "Switch language to Spanish",
    cvSoon: "Discover Vorun Studio",
    copyEmail: "Copy email",
    emailCopied: "Email copied",
    heroText: "We help local businesses look like bigger brands.",
    services: "Services",
    marqueeServices: ["VIDEO", "DESIGN", "WEB", "CONTENT", "BRANDING", "LANDING PAGES", "SOCIAL MEDIA", "CAMPAIGNS"],
    servicesOrbit: "VIDEO · DESIGN · WEB · CONTENT · BRANDING · DIGITAL PRESENCE · ",
    guides: {
      "": "EXPLORE OUR WORK",
      proyectos: "SEE WHAT WE DO",
      servicios: "SEE OUR PROCESS",
      proceso: "CLEAR YOUR DOUBTS",
      faq: "LET'S TALK ABOUT YOUR BUSINESS",
      contacto: "SHOW US YOUR BUSINESS"
    },
    work: {
      index: "01 / OUR WORK",
      title: ["See what we", "do."],
      gallery: {
        label: "04 / AUDIOVISUAL CONTENT / 2026",
        items: [
          ["04.1", "PIZZERÍA", "CAMPAIGN", "/pizzeria.mp4", "A campaign made to spark appetite.", "128", "12"],
          ["04.2", "CAFETERÍA", "CONTENT", "/cafeteria.mp4", "The ritual behind every pause.", "96", "8"],
          ["04.3", "TRIVUM", "CULTURE", "/cultura.mp4", "A culture lived as a team.", "74", "6"]
        ]
      },
      items: [
        { name: "CARBÓNICA", meta: "IDENTITY / BRANDING", headline: "Visual identity built from scratch." },
        { name: "LA CUOCA", meta: "DIGITAL PRODUCT / CONTENT", headline: "Digital experience to showcase, sell, and manage.", cta: "VIEW LA CUOCA" },
        { name: "OSA", meta: "WEB / REVOPS / CRM", headline: "Clear digital presence for a complex service.", cta: "DISCOVER OSA" },
        { name: "CONTENT", meta: "VIDEO / DIGITAL CONTENT", headline: "Pieces that help local businesses stand out on social media." }
      ]
    },
    services: {
      index: "02 / WHAT WE DO",
      title: ["One brand.", "Different tools."],
      groups: [
        ["IDENTITY", ["Branding", "Visual direction", "Graphic pieces"]],
        ["CONTENT", ["Video", "Campaigns", "Social media"]],
        ["DIGITAL", ["Web", "Landing pages", "Digital products"]]
      ]
    },
    process: {
      index: "03 / HOW WE WORK",
      title: ["Simple, direct.", "From start to finish."],
      steps: [
        [["Show us", "your business"], "Share what you have and what you want to improve."],
        [["We create", "the proposal"], "We define what to do and how to move it forward."],
        [["You receive", "the result"], "We deliver everything finished and ready to use."]
      ]
    },
    editorial: {
      title: ["The business stays in front.", "Technology stays behind."]
    },
    faq: {
      index: "04 / FREQUENTLY ASKED QUESTIONS",
      title: ["Everything clear", "before we begin."],
      kicker: "NO FRICTION · NO FINE PRINT",
      items: [
        ["What can we do for your business?", "We work on how your business presents itself, from audiovisual content and graphic pieces to visual identity and web development. We can solve a specific need or develop a more complete proposal based on what you need."],
        ["Do I need professional photos or videos?", "No. We can work with the material you already have and assess what can be used. Depending on the project, we can also create new visual resources and combine them with your photos, products, and current identity."],
        ["Do the videos show my business as it really is?", "Our goal is not to make your business look like something it is not, but to present what already exists more effectively. We can create situations and visual resources with AI, but we always aim for each piece to remain coherent with your product, identity, and proposition."],
        ["Do you only work with AI-generated videos?", "No. AI is one of our tools, not the service itself. Depending on the project, we can combine audiovisual generation, editing, graphic design, branding, and web development."],
        ["How long does a project take?", "It depends on the work. A simple audiovisual piece may be completed in a few days, while a visual identity, website, or more elaborate project requires a different timeline. Before starting, we agree on the scope, schedule, and deliverables."],
        ["How do we get started?", "Tell us about your business and what you need to improve. If you are not sure yet, you can also show us your current brand and tell us what you want to achieve. From there, we assess what we can do and present a proposal."]
      ]
    },
    footer: {
      index: "05 / CONTACT",
      title: ["Show us", "your business."],
      support: "You don't need to arrive with a finished idea. Send us your website, Instagram, or project and we'll see what we can do.",
      ctaLabel: "LET'S TALK ON WHATSAPP ↗",
      copyright: "© 2026 — VORUN STUDIO"
    },
    backToTop: "Back to top"
  }
};

function Multiline({ text }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}{index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

function SocialIcon({ name }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  if (name === "heart") return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>;
  if (name === "comment") return <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg>;
  if (name === "share") return <svg {...common}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>;
  if (name === "save") return <svg {...common}><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" /></svg>;
  return <svg {...common}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>;
}

function SidebarIcon({ name }) {
  switch (name) {
    case "audience":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h16M6 10v10h12V10M5 10l2-6h10l2 6" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );
    case "work":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
        </svg>
      );
    case "process":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 5h12M6 12h12M6 19h12" />
          <path d="M3 5h.01M3 12h.01M3 19h.01" />
        </svg>
      );
    case "result":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 19V9M12 19V5M19 19v-7" />
          <path d="M3 19h18" />
        </svg>
      );
    case "faq":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 5h14v11H9l-4 3V5Z" />
          <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" />
          <path d="M12 14.8h.01" />
        </svg>
      );
    case "contact":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16v12H4z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("es");
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerHideTimer = useRef(null);
  const t = translations[language];

  const changeTheme = async (nextTheme) => {
    const target = document.querySelector(nextTheme === "light" ? ".portrait-light" : ".portrait-dark");
    if (target?.decode) {
      try {
        await target.decode();
      } catch {}
    }
    setTheme(nextTheme);
  };

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    const updateScrollState = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      const sectionIds = ["proyectos", "servicios", "proceso", "faq", "contacto"];
      const current = sectionIds.reduce((active, id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= marker ? id : active;
      }, "");
      setActiveSection(current);
    };
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      reveal.disconnect();
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      void changeTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("language");
    if (storedLanguage === "es" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const desktop = window.matchMedia("(min-width: 901px)");
    const isNearTop = () => window.scrollY <= window.innerHeight * 0.12;

    const clearHideTimer = () => {
      if (headerHideTimer.current) window.clearTimeout(headerHideTimer.current);
    };
    const scheduleHide = () => {
      clearHideTimer();
      if (desktop.matches && !menuOpen && !isNearTop()) {
        headerHideTimer.current = window.setTimeout(() => {
          setHeaderVisible(isNearTop());
        }, 3200);
      }
    };
    const revealHeader = () => {
      setHeaderVisible(true);
      scheduleHide();
    };
    const handlePointerMove = (event) => {
      if (event.clientY <= 112) revealHeader();
    };
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isNearTop() || currentScrollY < lastScrollY - 4) {
        revealHeader();
      } else if (currentScrollY > lastScrollY + 4 && currentScrollY > 80 && !menuOpen) {
        clearHideTimer();
        setHeaderVisible(false);
      }
      lastScrollY = currentScrollY;
    };
    const handleFocus = (event) => {
      if (event.target.closest?.(".site-header")) revealHeader();
    };

    if (isNearTop() || menuOpen) revealHeader();
    else scheduleHide();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("focusin", handleFocus);
    return () => {
      clearHideTimer();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("focusin", handleFocus);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const scrollGuide = {
    "": { label: t.guides[""], href: "#proyectos", arrow: "↓" },
    proyectos: { label: t.guides.proyectos, href: "#servicios", arrow: "↓" },
    servicios: { label: t.guides.servicios, href: "#proceso", arrow: "↓" },
    proceso: { label: t.guides.proceso, href: "#faq", arrow: "↓" },
    faq: { label: t.guides.faq, href: "#contacto", arrow: "↓" },
    contacto: {
      label: t.guides.contacto,
      href: "https://wa.me/5491133221897",
      arrow: "↗",
      external: true
    }
  }[activeSection];

  return (
    <main>
      <header className={headerVisible || menuOpen ? "site-header" : "site-header is-hidden"}>
        <a className="logo" href="#inicio" aria-label={t.home}>
          <img
            src={theme === "dark" ? "/brand-mark-dark.png" : "/brand-mark-light.png"}
            alt="Vorun Studio"
            width="48"
            height="48"
          />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} id="nav-principal">
          <a className={activeSection === "proyectos" ? "active" : ""} href="#proyectos" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="work" /></span>
            <span className="nav-label">{t.nav[0]}</span>
          </a>
          <a className={activeSection === "servicios" ? "active" : ""} href="#servicios" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="audience" /></span>
            <span className="nav-label">{t.nav[1]}</span>
          </a>
          <a className={activeSection === "proceso" ? "active" : ""} href="#proceso" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="process" /></span>
            <span className="nav-label">{t.nav[2]}</span>
          </a>
          <a className={activeSection === "faq" ? "active" : ""} href="#faq" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="faq" /></span>
            <span className="nav-label">{t.nav[3]}</span>
          </a>
        </nav>
        <div className="hero-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => void changeTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t.lightMode : t.darkMode}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
          <button
            className="language-toggle"
            type="button"
            onClick={() => setLanguage((current) => current === "es" ? "en" : "es")}
            aria-label={t.language}
          >
            <span className={language === "es" ? "active" : ""}>ES</span>
            <i aria-hidden="true">/</i>
            <span className={language === "en" ? "active" : ""}>EN</span>
          </button>
          <div className="hero-caption">
            <a className="hero-contact-button" href="#contacto">{t.contact.toUpperCase()}</a>
          </div>
        </div>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t.menuClose : t.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="nav-principal"
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="portrait-wrap">
          <HeroGradientMark label={t.portraitAlt} />
        </div>
        <div className="service-orbit" aria-hidden="true">
          <svg className="service-orbit-ring" viewBox="0 0 160 160">
            <defs>
              <path id="service-orbit-path" d="M80,80 m-59,0 a59,59 0 1,1 118,0 a59,59 0 1,1 -118,0" />
            </defs>
            <text textLength="355" lengthAdjust="spacing">
              <textPath href="#service-orbit-path" startOffset="0%">{t.servicesOrbit}</textPath>
            </text>
          </svg>
          <svg className="service-orbit-star" viewBox="0 0 64 64">
            <path d="M32 6 37 27 58 32 37 37 32 58 27 37 6 32 27 27Z" />
          </svg>
        </div>
        <div className="hero-ui">
          <div className="hero-intro">
            <div className="hero-name">
              <h1>Vorun Studio</h1>
              <p>{t.heroText}</p>
            </div>
          </div>
        </div>
        <div className="hero-tech-marquee" aria-label={t.services}>
          <div className="hero-tech-track">
            {[false, true].map((duplicate) => (
              <div className="hero-tech-group" aria-hidden={duplicate} key={duplicate ? "duplicate" : "original"}>
                {[...t.marqueeServices, ...t.marqueeServices, ...t.marqueeServices].map((service, index) => (
                  <span className="hero-service-item" key={`${duplicate ? "duplicate" : "original"}-${service}-${index}`}>
                    {service}<i aria-hidden="true">✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <a
          className={activeSection === "contacto" ? "scroll-note contact" : "scroll-note"}
          href={scrollGuide.href}
          target={scrollGuide.external ? "_blank" : undefined}
          rel={scrollGuide.external ? "noopener" : undefined}
        >
          <strong>{scrollGuide.label}</strong>
          <span aria-hidden="true">{scrollGuide.arrow}</span>
        </a>
      </section>

      <section className="work section-pad" id="proyectos">
        <div className="section-heading reveal">
          <div className="section-index">{t.work.index}</div>
          <h2>{t.work.title[0]}<br /><em>{t.work.title[1]}</em></h2>
        </div>
        <div className="project-list">
          {portfolioProjects.map((project, projectIndex) => {
            const item = t.work.items[projectIndex];
            const visual = project.key === "carbonica" ? (
              <CarbonicaShuffle />
            ) : project.key === "lacuoca" ? (
              <LaCuocaHoverSlider />
            ) : project.key === "osa" ? (
              <OsaMonitorScroll number={project.n} name={item.name} meta={item.meta} headline={item.headline} />
            ) : project.key === "content" ? (
              <div className="portfolio-visual portfolio-visual-content" aria-label={t.work.gallery.label}>
                <div className="work-gallery-track">
                  {t.work.gallery.items.map(([number, name, type, src, socialCaption, likes, comments]) => (
                    <div className="work-gallery-item" key={number}>
                      <div className="work-gallery-media">
                        <div className="work-gallery-screen">
                          <video
                            className="work-gallery-video"
                            src={src}
                            aria-label={`${name} — ${type}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                          <div className="work-social-ui" aria-hidden="true">
                            <div className="work-social-actions">
                              <span><SocialIcon name="heart" /><small>{likes}</small></span>
                              <span><SocialIcon name="comment" /><small>{comments}</small></span>
                              <span><SocialIcon name="share" /></span>
                              <span><SocialIcon name="save" /></span>
                            </div>
                            <div className="work-social-meta">
                              <strong>@vorunstudio</strong>
                              <p><b>{name}</b> · {socialCaption}</p>
                              <span><SocialIcon name="audio" /> {language === "es" ? "audio original" : "original audio"}</span>
                            </div>
                          </div>
                        </div>
                        <img className="work-gallery-phone-frame" src="/phone.png" alt="" width="324" height="650" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : project.href ? (
              <a className="portfolio-visual" href={project.href} target="_blank" rel="noopener" aria-label={`${item.cta}: ${item.name}`}>
                <img src={project.art.src} alt={`${item.name} — ${item.meta}`} width={project.art.width} height={project.art.height} loading="lazy" decoding="async" />
              </a>
            ) : (
              <figure className="portfolio-visual">
                <img src={project.art.src} alt={`${item.name} — ${item.meta}`} width={project.art.width} height={project.art.height} loading="eager" fetchPriority="low" decoding="async" />
              </figure>
            );

            return (
              <article className={`portfolio-item portfolio-item-${project.key} reveal`} id={project.key === "carbonica" || project.key === "osa" ? project.key : undefined} key={project.key}>
                {project.key !== "osa" ? <>
                  <header className="portfolio-header">
                    <div><span>({project.n})</span><h3>{item.name}</h3></div>
                    <p>{item.meta}</p>
                  </header>
                  <h4>{item.headline}</h4>
                </> : null}
                {visual}
                {project.href ? <a className="portfolio-cta" href={project.href} target="_blank" rel="noopener">{item.cta}<span aria-hidden="true">↗</span></a> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="statement section-pad" id="servicios">
        <div className="section-heading reveal">
          <div className="section-index">{t.services.index}</div>
          <h2>{t.services.title[0]}<br /><em>{t.services.title[1]}</em></h2>
        </div>
        {t.services.groups.map(([group, items]) => (
          <div className="statement-grid reveal" key={group}>
            <p className="lead">{group}</p>
            <div className="bio"><p><Multiline text={items.join("\n")} /></p></div>
          </div>
        ))}
      </section>

      <section className="experience process-section section-pad" id="proceso">
        <StepTimelinePro
          eyebrow={t.process.index.split(" / ").at(-1)}
          heading={t.process.title}
          steps={t.process.steps}
        />
      </section>

      <section className="statement section-pad" id="editorial">
        <div className="section-heading footer-heading reveal">
          <div className="section-index" aria-hidden="true" />
          <h2>{t.editorial.title[0]}<br /><em>{t.editorial.title[1]}</em></h2>
        </div>
      </section>

      <section className="statement section-pad" id="faq">
        <div className="section-heading reveal">
          <div className="section-index">{t.faq.index}</div>
          <h2>{t.faq.title[0]}<br /><em>{t.faq.title[1]}</em></h2>
          <p>{t.faq.kicker}</p>
        </div>
        {t.faq.items.map(([question, answer]) => (
          <div className="statement-grid reveal" key={question}>
            <p className="lead">{question}</p>
            <div className="bio"><p>{answer}</p></div>
          </div>
        ))}
      </section>

      <footer id="contacto">
        <div className="footer-top section-pad">
          <div className="section-heading footer-heading reveal">
            <div className="section-index">{t.footer.index}</div>
            <h2>{t.footer.title[0]}<br /><em>{t.footer.title[1]}</em></h2>
            <p>
              <span>{t.footer.support}</span><br /><br />
              <a href="https://wa.me/5491133221897" target="_blank" rel="noopener">{t.footer.ctaLabel}</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="logo inverse">
            <img
              src={theme === "dark" ? "/brand-mark-dark.png" : "/brand-mark-light.png"}
              alt="Vorun Studio"
              width="48"
              height="48"
              loading="lazy"
            />
          </div>
          <div className="socials">
            <a href="https://www.instagram.com/vorunstudio/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://wa.me/5491133221897" target="_blank" rel="noopener">WhatsApp</a>
            <a href={`mailto:${contactEmail}`}>Mail</a>
          </div>
          <p className="copyright">{t.footer.copyright}</p>
        </div>
      </footer>

      {activeSection === "contacto" ? (
        <button
          className="back-to-top"
          type="button"
          aria-label={t.backToTop}
          onClick={() => window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          })}
        >
          <span aria-hidden="true">↑</span>
          <small>Top</small>
        </button>
      ) : null}
    </main>
  );
}
