"use client";

import { Fragment, useEffect, useState } from "react";

const projects = [
  {
    n: "01",
    type: "Osa",
    title: "Plataforma de\nmarketing automation",
    tone: "cyan",
    href: "https://www.osarevops.com",
    aspect: "1080 / 653",
    art: { src: "/osa-proyect.png", webp: "/osa-proyect.png", width: 1080, height: 653 }
  },
  {
    n: "02",
    type: "Mads",
    title: "Sistema web,\nmarca y app",
    tone: "red",
    href: "https://app-mads.vercel.app/",
    aspect: "1076 / 650",
    art: { src: "/appMads-proyect.png", webp: "/appMads-proyect.png", width: 1076, height: 650 }
  },
  {
    n: "03",
    type: "La Cuoca",
    title: "Gestión de pedidos\ny publicaciones gastronómicas",
    tone: "sand",
    href: "https://www.tiktok.com/@vorun.studio/video/7649178100726566151",
    aspect: "1080 / 620",
    art: { src: "/lacuoca-proyecto.png", webp: "/lacuoca-proyecto.png", width: 1080, height: 620 }
  }
];

const contactEmail = "igng_11@hotmail.com";

const translations = {
  es: {
    nav: ["Para quién", "Nuestro trabajo", "Proceso", "Resultado", "FAQ"],
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
      "": "DESCUBRÍ VORUN",
      audiencia: "MIRÁ NUESTRO TRABAJO",
      proyectos: "CONOCÉ EL PROCESO",
      proceso: "DESCUBRÍ EL RESULTADO",
      beneficios: "RESOLVÉ TUS DUDAS",
      faq: "HABLEMOS DE TU NEGOCIO",
      contacto: "MOSTRANOS TU NEGOCIO"
    },
    work: {
      index: "02 / NUESTRO TRABAJO",
      title: ["Nuestro trabajo,", "hecho para destacar."],
      text: "Cada proyecto combina estrategia, identidad y ejecución para mostrar mejor el valor de una marca.",
      projects: [
        "Plataforma de\nmarketing automation",
        "Sistema web,\nmarca y app",
        "Gestión de pedidos\ny publicaciones gastronómicas"
      ],
      cases: [
        {
          headline: "Una plataforma que convierte la complejidad comercial en claridad.",
          summary: "Osa reúne marketing automation, estrategia y operación en una experiencia digital pensada para explicar una propuesta compleja de forma simple y convincente.",
          created: "Estrategia digital · Diseño web · Desarrollo",
          differential: "Transformar un servicio técnico en una marca clara, cercana y preparada para crecer.",
          cta: "CONOCER OSA"
        },
        {
          headline: "Una marca conectada en todos sus puntos de contacto.",
          summary: "Mads integra identidad, plataforma web y aplicación dentro de un mismo sistema, evitando que cada pieza funcione como una experiencia aislada.",
          created: "Identidad visual · Sistema web · Aplicación",
          differential: "Una experiencia coherente que acompaña a la marca desde la primera impresión hasta el uso cotidiano.",
          cta: "VER PROYECTO MADS"
        },
        {
          headline: "La operación gastronómica convertida en contenido que abre el apetito.",
          summary: "La Cuoca une gestión de pedidos y comunicación visual para que la experiencia del negocio también se perciba con claridad en sus canales digitales.",
          created: "Contenido audiovisual · Comunicación · Experiencia digital",
          differential: "Combinar utilidad y deseo: resolver la operación sin perder el atractivo propio de una marca gastronómica.",
          cta: "VER LA CUOCA"
        }
      ]
    },
    audience: {
      index: "01 / PARA QUIÉN ES VORUN",
      title: ["Tu negocio ya tiene valor.", "Hagámoslo visible."],
      kicker: "NEGOCIOS LOCALES · EMPRENDIMIENTOS · PYMES",
      lead: "Para negocios que trabajan bien, pero cuya presencia digital todavía no refleja su verdadero valor.",
      bio: "Cafeterías, gastronomía, pet shops, talleres, barberías, tiendas y servicios. No necesitás ser más grande: necesitás mostrarte mejor."
    },
    process: {
      index: "03 / CÓMO TRABAJAMOS",
      title: ["Simple, directo", "y listo para publicar."],
      text: "Un proceso claro para pasar de tu negocio real a una propuesta que lo represente mejor.",
      steps: [
        ["NOS MOSTRÁS TU NEGOCIO", "Compartís tu producto, servicio y el material disponible."],
        ["CREAMOS LA PROPUESTA", "Definimos el enfoque y desarrollamos las piezas adecuadas."],
        ["RECIBÍS EL CONTENIDO", "Te entregamos el resultado final, listo para usar y publicar."]
      ]
    },
    benefit: {
      index: "04 / EL RESULTADO",
      title: ["Una mejor", "primera impresión."],
      kicker: "MÁS ATENCIÓN · MÁS CONFIANZA · MEJOR PERCEPCIÓN",
      lead: "No inventamos grandeza. Hacemos visible la calidad que ya existe en tu negocio.",
      bio: "Mejoramos cómo se presenta tu marca sin convertirla en algo que no es. El negocio permanece delante; la tecnología, detrás."
    },
    faq: {
      index: "05 / PREGUNTAS FRECUENTES",
      title: ["Todo claro", "antes de empezar."],
      kicker: "SIN FRICCIONES · SIN LETRA CHICA",
      items: [
        ["¿Qué puede hacer Vorun por mi negocio?", "Trabajamos sobre la forma en que tu negocio se presenta: desde contenido audiovisual y piezas gráficas hasta identidad visual y desarrollo web. Podemos resolver una necesidad puntual o desarrollar una propuesta más completa según lo que necesites."],
        ["¿Necesito tener fotos o videos profesionales?", "No. Podemos trabajar con el material que ya tengas y evaluar qué podemos aprovechar. Dependiendo del proyecto, también podemos crear nuevos recursos visuales y combinarlos con tus fotos, productos e identidad actual."],
        ["¿Los videos muestran mi negocio tal como es?", "Nuestro objetivo no es hacer que tu negocio parezca algo que no es, sino presentar mejor lo que ya existe. Podemos crear situaciones y recursos visuales con IA, pero siempre buscamos que la pieza sea coherente con tu producto, identidad y propuesta."],
        ["¿Trabajan solamente con videos hechos con IA?", "No. La IA es una de nuestras herramientas, no el servicio. Según el proyecto podemos combinar generación audiovisual, edición, diseño gráfico, branding y desarrollo web."],
        ["¿Cuánto demora un proyecto?", "Depende del trabajo. Una pieza audiovisual sencilla puede resolverse en pocos días, mientras que una identidad visual, una web o un proyecto más elaborado requieren otros tiempos. Antes de empezar acordamos alcance, plazo y entregables."],
        ["¿Cómo empezamos?", "Contanos sobre tu negocio y qué necesitás mejorar. Si todavía no lo tenés claro, también podés mostrarnos tu marca actual y contarnos qué querés conseguir. A partir de ahí evaluamos qué podemos hacer y te presentamos una propuesta."]
      ],
      ctaTitle: "Mostranos tu negocio.",
      ctaLabel: "HABLEMOS POR WHATSAPP"
    },
    footer: {
      index: "06 / CONTACTO",
      title: ["Mostranos", "tu negocio."],
      kicker: "TE CONTAMOS CÓMO PODRÍA MOSTRARSE MEJOR",
      location: "BUENOS AIRES · ARGENTINA\nTRABAJANDO CON NEGOCIOS DE HABLA HISPANA",
      copyright: "© 2026 — VORUN STUDIO"
    },
    backToTop: "Volver arriba"
  },
  en: {
    nav: ["Who it's for", "Our work", "Process", "Result", "FAQ"],
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
      "": "DISCOVER VORUN",
      audiencia: "EXPLORE OUR WORK",
      proyectos: "SEE OUR PROCESS",
      proceso: "DISCOVER THE RESULT",
      beneficios: "CLEAR YOUR DOUBTS",
      faq: "LET'S TALK ABOUT YOUR BUSINESS",
      contacto: "SHOW US YOUR BUSINESS"
    },
    work: {
      index: "02 / OUR WORK",
      title: ["Our work,", "made to stand out."],
      text: "Every project combines strategy, identity, and execution to present a brand's value more clearly.",
      projects: [
        "Marketing automation\nplatform",
        "Web platform,\nbrand and app",
        "Order management\nand food publishing"
      ],
      cases: [
        {
          headline: "A platform that turns commercial complexity into clarity.",
          summary: "Osa brings marketing automation, strategy, and operations into a digital experience designed to explain a complex offer simply and convincingly.",
          created: "Digital strategy · Web design · Development",
          differential: "Turning a technical service into a clear, approachable brand ready to grow.",
          cta: "DISCOVER OSA"
        },
        {
          headline: "One connected brand across every touchpoint.",
          summary: "Mads brings identity, web platform, and application into one system, preventing each piece from feeling like an isolated experience.",
          created: "Visual identity · Web system · Application",
          differential: "A coherent experience that supports the brand from first impression to everyday use.",
          cta: "VIEW MADS PROJECT"
        },
        {
          headline: "Food operations transformed into content that builds appetite.",
          summary: "La Cuoca combines order management and visual communication so the business experience is also perceived clearly across its digital channels.",
          created: "Audiovisual content · Communication · Digital experience",
          differential: "Combining utility and desire: solving operations without losing the appeal of a food brand.",
          cta: "VIEW LA CUOCA"
        }
      ]
    },
    audience: {
      index: "01 / WHO VORUN IS FOR",
      title: ["Your business already has value.", "Let's make it visible."],
      kicker: "LOCAL BUSINESSES · ENTREPRENEURS · SMALL COMPANIES",
      lead: "For businesses that do great work, but whose digital presence does not yet reflect their true value.",
      bio: "Coffee shops, restaurants, pet shops, workshops, barbershops, stores, and services. You don't need to be bigger: you need to present yourself better."
    },
    process: {
      index: "03 / HOW WE WORK",
      title: ["Simple, direct,", "and ready to publish."],
      text: "A clear process to turn your real business into a proposal that represents it better.",
      steps: [
        ["SHOW US YOUR BUSINESS", "Share your product, service, and the material you already have."],
        ["WE CREATE THE PROPOSAL", "We define the approach and develop the right pieces."],
        ["YOU RECEIVE THE CONTENT", "We deliver the final result, ready to use and publish."]
      ]
    },
    benefit: {
      index: "04 / THE RESULT",
      title: ["A better", "first impression."],
      kicker: "MORE ATTENTION · MORE TRUST · BETTER PERCEPTION",
      lead: "We don't invent greatness. We make the quality already present in your business visible.",
      bio: "We improve how your brand presents itself without turning it into something it is not. Your business stays in front; technology stays behind."
    },
    faq: {
      index: "05 / FREQUENTLY ASKED QUESTIONS",
      title: ["Everything clear", "before we begin."],
      kicker: "NO FRICTION · NO FINE PRINT",
      items: [
        ["What can Vorun do for my business?", "We work on how your business presents itself, from audiovisual content and graphic pieces to visual identity and web development. We can solve a specific need or develop a more complete proposal based on what you need."],
        ["Do I need professional photos or videos?", "No. We can work with the material you already have and assess what can be used. Depending on the project, we can also create new visual resources and combine them with your photos, products, and current identity."],
        ["Do the videos show my business as it really is?", "Our goal is not to make your business look like something it is not, but to present what already exists more effectively. We can create situations and visual resources with AI, but we always aim for each piece to remain coherent with your product, identity, and proposition."],
        ["Do you only work with AI-generated videos?", "No. AI is one of our tools, not the service itself. Depending on the project, we can combine audiovisual generation, editing, graphic design, branding, and web development."],
        ["How long does a project take?", "It depends on the work. A simple audiovisual piece may be completed in a few days, while a visual identity, website, or more elaborate project requires a different timeline. Before starting, we agree on the scope, schedule, and deliverables."],
        ["How do we get started?", "Tell us about your business and what you need to improve. If you are not sure yet, you can also show us your current brand and tell us what you want to achieve. From there, we assess what we can do and present a proposal."]
      ],
      ctaTitle: "Show us your business.",
      ctaLabel: "LET'S TALK ON WHATSAPP"
    },
    footer: {
      index: "06 / CONTACT",
      title: ["Show us", "your business."],
      kicker: "WE'LL TELL YOU HOW IT COULD PRESENT ITSELF BETTER",
      location: "BUENOS AIRES · ARGENTINA\nWORKING WITH SPANISH-SPEAKING BUSINESSES",
      copyright: "© 2026 — VORUN STUDIO"
    },
    backToTop: "Back to top"
  }
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="1" />
      <path d="M16 8V5H5v11h3" />
    </svg>
  );
}

function Multiline({ text }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}{index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
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
  const [emailCopied, setEmailCopied] = useState(false);
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
      const sectionIds = ["audiencia", "proyectos", "proceso", "beneficios", "faq", "contacto"];
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

  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1600);
  };
  const scrollGuide = {
    "": { label: t.guides[""], href: "#audiencia", arrow: "↓" },
    audiencia: { label: t.guides.audiencia, href: "#proyectos", arrow: "↓" },
    proyectos: { label: t.guides.proyectos, href: "#proceso", arrow: "↓" },
    proceso: { label: t.guides.proceso, href: "#beneficios", arrow: "↓" },
    beneficios: { label: t.guides.beneficios, href: "#faq", arrow: "↓" },
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
      <header className="site-header">
        <a className="logo" href="#inicio" aria-label={t.home}>
          <img
            src={theme === "dark" ? "/brand-mark-dark.png" : "/brand-mark-light.png"}
            alt="Vorun Studio"
            width="48"
            height="48"
          />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} id="nav-principal">
          <a className={activeSection === "audiencia" ? "active" : ""} href="#audiencia" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="audience" /></span>
            <span className="nav-label">{t.nav[0]}</span>
          </a>
          <a className={activeSection === "proyectos" ? "active" : ""} href="#proyectos" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="work" /></span>
            <span className="nav-label">{t.nav[1]}</span>
          </a>
          <a className={activeSection === "proceso" ? "active" : ""} href="#proceso" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="process" /></span>
            <span className="nav-label">{t.nav[2]}</span>
          </a>
          <a className={activeSection === "beneficios" ? "active" : ""} href="#beneficios" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="result" /></span>
            <span className="nav-label">{t.nav[3]}</span>
          </a>
          <a className={activeSection === "faq" ? "active" : ""} href="#faq" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="faq" /></span>
            <span className="nav-label">{t.nav[4]}</span>
          </a>
          <a className={activeSection === "contacto" ? "mobile-nav-contact active" : "mobile-nav-contact"} href="#contacto" onClick={closeMenu}>
            <span className="nav-icon" aria-hidden="true"><SidebarIcon name="contact" /></span>
            <span className="nav-label">{t.contact}</span>
          </a>
        </nav>
        <a className={activeSection === "contacto" ? "header-contact active" : "header-contact"} href="#contacto">
          <span className="nav-icon" aria-hidden="true"><SidebarIcon name="contact" /></span>
          <span className="header-contact-label">{t.contact}</span>
        </a>
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
          <img
            className="portrait-image portrait-dark"
            src="/hero-dark.svg"
            alt={t.portraitAlt}
            width="224"
            height="220"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
          <img
            className="portrait-image portrait-light"
            src="/hero-white.svg"
            alt=""
            width="224"
            height="220"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
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
          <button
            className="cv-download"
            type="button"
            aria-label={t.cvSoon}
            title={t.cvSoon}
            disabled
          >
            VORUN
          </button>
          <button
            className="copy-email-button"
            type="button"
            onClick={copyEmail}
            aria-label={emailCopied ? t.emailCopied : t.copyEmail}
            title={emailCopied ? t.emailCopied : contactEmail}
          >
            <span>{emailCopied ? "COPIED" : "MAIL"}</span>
            <CopyIcon />
          </button>
          <a className="hero-contact-button" href="#contacto">{t.contact.toUpperCase()}</a>
        </div>
        <div className="hero-intro">
          <div className="hero-name">
            <h1>VORUN STUDIO</h1>
            <div className="hero-caption-copy"><span>CREATIVE</span><span>STUDIO</span></div>
          </div>
          <p>{t.heroText}</p>
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

      <section className="statement section-pad" id="audiencia">
        <div className="section-heading reveal">
          <div className="section-index">{t.audience.index}</div>
          <h2>{t.audience.title[0]}<br /><em>{t.audience.title[1]}</em></h2>
          <p>{t.audience.kicker}</p>
        </div>
        <div className="statement-grid reveal">
          <p className="lead">{t.audience.lead}</p>
          <div className="bio"><p>{t.audience.bio}</p></div>
        </div>
      </section>

      <section className="work section-pad" id="proyectos">
        <div className="section-heading reveal">
          <div className="section-index">{t.work.index}</div>
          <h2>{t.work.title[0]}<br /><em>{t.work.title[1]}</em></h2>
          <p>{t.work.text}</p>
        </div>
        <div className="project-list">
          {projects.map((project, projectIndex) => (
            <article className={`project-case ${project.tone} reveal`} key={project.n}>
              <div className="project-case-header">
                <span className="project-n">({project.n})</span>
                <span className="project-type">{project.type}</span>
                <span className="project-case-service"><Multiline text={t.work.projects[projectIndex]} /></span>
              </div>
              <a className="project-case-media" href={project.href} target="_blank" rel="noopener" aria-label={`${t.work.cases[projectIndex].cta}: ${project.type}`}>
                <img
                  src={project.art.src}
                  alt={`${project.type} — ${t.work.projects[projectIndex].replace("\n", " ")}`}
                  width={project.art.width}
                  height={project.art.height}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-case-copy">
                <h3>{t.work.cases[projectIndex].headline}</h3>
                <p className="project-case-summary">{t.work.cases[projectIndex].summary}</p>
                <div className="project-case-details">
                  <div>
                    <span>{language === "es" ? "CREAMOS" : "WE CREATED"}</span>
                    <p>{t.work.cases[projectIndex].created}</p>
                  </div>
                  <div>
                    <span>{language === "es" ? "DIFERENCIAL" : "DIFFERENTIAL"}</span>
                    <p>{t.work.cases[projectIndex].differential}</p>
                  </div>
                </div>
                <a className="project-case-link" href={project.href} target="_blank" rel="noopener">
                  {t.work.cases[projectIndex].cta}<span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience section-pad" id="proceso">
        <div className="section-heading reveal">
          <div className="section-index">{t.process.index}</div>
          <h2>{t.process.title[0]}<br /><em>{t.process.title[1]}</em></h2>
          <p>{t.process.text}</p>
        </div>
        <div className="profile-grid">
          {t.process.steps.map(([title, text], index) => (
            <article className="profile-card reveal" key={title}>
              <div className="profile-number">({String(index + 1).padStart(2, "0")})</div>
              <div className="profile-icons">
                <span className="tech-icon"><b style={{ "--icon-color": "#F04A32" }}>{String(index + 1).padStart(2, "0")}</b></span>
              </div>
              <div className="profile-content">
                <span>{t.process.index}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement section-pad" id="beneficios">
        <div className="section-heading reveal">
          <div className="section-index">{t.benefit.index}</div>
          <h2>{t.benefit.title[0]}<br /><em>{t.benefit.title[1]}</em></h2>
          <p>{t.benefit.kicker}</p>
        </div>
        <div className="statement-grid reveal">
          <p className="lead">{t.benefit.lead}</p>
          <div className="bio"><p>{t.benefit.bio}</p></div>
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
        <div className="statement-grid reveal">
          <p className="lead">{t.faq.ctaTitle}</p>
          <div className="bio">
            <a className="project-case-link" href="https://wa.me/5491133221897" target="_blank" rel="noopener">
              {t.faq.ctaLabel}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer id="contacto">
        <div className="footer-top section-pad">
          <div className="section-heading footer-heading reveal">
            <div className="section-index">{t.footer.index}</div>
            <h2>{t.footer.title[0]}<br /><em>{t.footer.title[1]}</em></h2>
            <p>{t.footer.kicker}</p>
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
          <p><Multiline text={t.footer.location} /></p>
          <div className="socials">
            <a href="https://www.tiktok.com/@vorun.studio" target="_blank" rel="noopener">TikTok</a>
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
