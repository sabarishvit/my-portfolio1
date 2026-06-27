// ============================================================
// SABARISH PORTFOLIO — Advanced Professional Edition
// Deep Space UI · Glassmorphism · Micro-animations
// ============================================================
import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ─── SVG ICONS ──────────────────────────────────────────────
const Icon = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2z" />
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  external: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  chevronDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  star: "⭐",
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ─── HOOK: Intersection Observer for scroll reveals ────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── HOOK: Active section tracker ─────────────────────────
function useActiveSection(sections) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [sections]);

  return active;
}

// ─── COMPONENT: ParticleCanvas ────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}

// ─── COMPONENT: NavBar ────────────────────────────────────
function NavBar({ active, onNavClick }) {
  const links = ["Home", "About", "Skills", "Projects", "Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (section) => {
    onNavClick(section);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <div className="nav-logo-group" onClick={() => handleNav("home")}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <polygon points="20,3 37,12.5 37,27.5 20,37 3,27.5 3,12.5"
              fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="20,8 32,15 32,25 20,32 8,25 8,15"
              fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeLinejoin="round" />
            <text x="20" y="24" textAnchor="middle" fill="#c9a84c" fontSize="12" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">S</text>
          </svg>
          <div className="nav-logo-text">
            <span className="nav-logo-name">SABARISH</span>
            <span className="nav-logo-sub">Insights · Solutions · Impact</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          {links.map((l) => (
            <button
              key={l}
              className={`nav-btn${active === l.toLowerCase() ? " active" : ""}`}
              onClick={() => handleNav(l.toLowerCase())}
            >
              {l}
            </button>
          ))}
          <a
            href="https://linkedin.com/in/sabarish-e-b533aa3aa/"
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "12px" }}
          >
            <button className="btn-gold" style={{ padding: "9px 22px", fontSize: "13px" }}>
              Hire Me ✦
            </button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none", transition: "all 0.3s" }} />
          <span style={{ opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none", transition: "all 0.3s" }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0, zIndex: 998,
          background: "rgba(3,7,18,0.97)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "0.5rem",
          animation: "slide-up-fade 0.25s ease both",
        }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l.toLowerCase())}
              style={{
                background: active === l.toLowerCase() ? "rgba(201,168,76,0.08)" : "transparent",
                border: `1px solid ${active === l.toLowerCase() ? "rgba(201,168,76,0.25)" : "transparent"}`,
                color: active === l.toLowerCase() ? "#c9a84c" : "#94a3b8",
                padding: "12px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 600,
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── COMPONENT: HeroSection ───────────────────────────────
function HeroSection({ onNavClick }) {
  const phrases = [
    "Business Analyst & Problem Solver",
    "Frontend Developer (React & Next.js)",
    "Solution-Oriented Professional",
    "Process Improvement Enthusiast",
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setTyped(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 55);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <section id="home" className="hero-section">
      <ParticleCanvas />
      <div className="hero-grid-bg" />
      <div className="hero-blob-1 blob-float-1" />
      <div className="hero-blob-2 blob-float-2" />
      <div className="hero-blob-3 blob-float-3" />

      <div className="hero-content" style={{ position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Available for opportunities
        </div>

        {/* Main Name */}
        <h1 className="hero-name">
          Hi, I'm{" "}
          <span className="hero-name-highlight">Sabarish</span>
        </h1>

        {/* Typewriter */}
        <h2 className="hero-tagline">
          <span style={{ color: "#94a3b8" }}>{typed}</span>
          <span className="hero-cursor" />
        </h2>

        {/* Description */}
        <p className="hero-desc">
          Turning <strong style={{ color: "#c9a84c" }}>business challenges</strong> into
          data-driven solutions and elegant digital experiences. Passionate about
          bridging the gap between technology and business strategy.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <button className="btn-gold" onClick={() => onNavClick("projects")}>
            View My Work {Icon.arrow}
          </button>
          <button className="btn-outline" onClick={() => onNavClick("contact")}>
            Get In Touch
          </button>
          <a
            href="https://github.com/sabarishvit"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button className="btn-outline">
              {Icon.github} GitHub
            </button>
          </a>
        </div>

        {/* Quick Stats */}
        <div className="hero-stats">
          {[
            { value: "2+", label: "Projects Shipped" },
            { value: "70%", label: "Frontend Proficiency" },
            { value: "100%", label: "Dedication" },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Orbit Visual */}
      <div className="hero-visual" aria-hidden="true">
        <svg viewBox="0 0 380 380" style={{ width: "100%", height: "100%", opacity: 0.5 }}>
          {/* Outer ring */}
          <circle cx="190" cy="190" r="160" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="1" strokeDasharray="6 8" />
          {/* Middle ring */}
          <circle cx="190" cy="190" r="110" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" strokeDasharray="4 6" />
          {/* Inner ring */}
          <circle cx="190" cy="190" r="60" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
          {/* Center Glow */}
          <circle cx="190" cy="190" r="25" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
          <text x="190" y="196" textAnchor="middle" fill="rgba(201,168,76,0.8)" fontSize="14" fontWeight="800">S</text>

          {/* Orbiting dots */}
          <g style={{ animation: "spin-slow 12s linear infinite", transformOrigin: "190px 190px" }}>
            <circle cx="190" cy="30" r="6" fill="#7c3aed" />
            <circle cx="350" cy="190" r="4" fill="#c9a84c" opacity="0.8" />
          </g>
          <g style={{ animation: "spin-slow 18s linear infinite reverse", transformOrigin: "190px 190px" }}>
            <circle cx="190" cy="80" r="5" fill="#06b6d4" opacity="0.7" />
            <circle cx="300" cy="190" r="3" fill="#a78bfa" opacity="0.6" />
          </g>

          {/* Tech labels */}
          {[
            { cx: 190, cy: 22, label: "React" },
            { cx: 355, cy: 190, label: "Next.js" },
            { cx: 190, cy: 358, label: "JS" },
            { cx: 25, cy: 190, label: "Git" },
          ].map(({ cx, cy, label }) => (
            <text key={label} x={cx} y={cy} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="600">
              {label}
            </text>
          ))}
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          color: "rgba(255,255,255,0.3)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px",
          textTransform: "uppercase", zIndex: 2, cursor: "pointer",
          animation: "float-up-down 3s ease-in-out infinite",
        }}
        onClick={() => onNavClick("about")}
      >
        <span>Scroll</span>
        <div style={{ animation: "float-up-down 1.5s ease-in-out infinite" }}>
          {Icon.chevronDown}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: AboutSection ──────────────────────────────
function AboutSection() {
  const [ref, visible] = useReveal(0.15);

  const facts = [
    { icon: "🎓", label: "Degree", value: "Integrated M.Tech Software Engineering" },
    { icon: "📍", label: "Location", value: "Vellore, India" },
    { icon: "💼", label: "Status", value: "Open to Opportunities" },
    { icon: "🎵", label: "Interests", value: "Music & Cricket" },
  ];

  const chips = [
    "Business Analysis", "Frontend Dev", "Process Optimization",
    "Problem Solving", "React & Next.js", "Data-Driven Thinking",
  ];

  return (
    <section id="about" className="section-wrapper alt-bg">
      <div className="section-inner" ref={ref}>
        <div className={`reveal${visible ? " visible" : ""}`}>
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            The Mind Behind<br />
            <span style={{ color: "var(--gold)" }}>the Work</span>
          </h2>
        </div>

        <div className="about-grid">
          {/* Left — Text */}
          <div className={`about-body reveal-left${visible ? " visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <p>
              I'm an aspiring developer and analyst with a deep passion for{" "}
              <strong>building things that matter</strong>. I sit at the intersection of
              technology and business — comfortable writing React components in the
              morning and mapping stakeholder requirements in the afternoon.
            </p>
            <p>
              Currently pursuing my{" "}
              <strong>Integrated M.Tech in Software Engineering</strong>, I've been
              channeling my energy into real-world projects that solve genuine business
              problems — from multi-warehouse inventory systems to consumer-facing
              applications.
            </p>
            <p>
              I thrive on <strong>understanding the "why"</strong> behind every feature,
              connecting technical solutions to business outcomes that create real value.
            </p>

            <div className="about-highlights">
              {chips.map((c) => (
                <span key={c} className="highlight-chip">
                  {Icon.check} {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Fact Cards */}
          <div className={`fact-cards reveal-right stagger${visible ? " visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {facts.map(({ icon, label, value }) => (
              <div key={label} className="fact-card">
                <span className="fact-icon">{icon}</span>
                <div className="fact-label">{label}</div>
                <div className="fact-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: SkillCard ─────────────────────────────────
function SkillCard({ icon, name, category, level, color, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [visible, delay]);

  return (
    <div ref={ref} className={`skill-card reveal${visible ? " visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="skill-header">
        <div className="skill-info">
          <div
            className="skill-icon"
            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
          >
            {icon}
          </div>
          <div>
            <div className="skill-name">{name}</div>
            <div className="skill-category">{category}</div>
          </div>
        </div>
        <div className="skill-pct">{level}%</div>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: animated ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: animated ? `0 0 12px ${color}60` : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── COMPONENT: SkillsSection ─────────────────────────────
function SkillsSection() {
  const [ref, visible] = useReveal(0.1);

  const skills = [
    { icon: "⚛️", name: "React", category: "Frontend Framework", level: 60, color: "#06b6d4" },
    { icon: "🌐", name: "HTML & CSS", category: "Web Fundamentals", level: 70, color: "#e44d26" },
    { icon: "⚡", name: "JavaScript", category: "Core Language", level: 70, color: "#f7df1e" },
    { icon: "▲", name: "Next.js", category: "Full-Stack Framework", level: 40, color: "#94a3b8" },
    { icon: "🐙", name: "Git & GitHub", category: "Version Control", level: 60, color: "#7c3aed" },
  ];

  const tools = [
    "VS Code", "Figma", "Postman", "Vercel", "npm", "Chrome DevTools",
    "GitHub", "REST APIs", "JSON", "Flexbox", "CSS Grid", "React Hooks",
  ];

  return (
    <section id="skills" className="section-wrapper">
      <div className="section-inner" ref={ref}>
        <div className={`reveal${visible ? " visible" : ""}`}>
          <span className="section-tag">Technical Expertise</span>
          <h2 className="section-title">
            Skills &<br />
            <span style={{ color: "var(--gold)" }}>Proficiency</span>
          </h2>
          <p className="section-subtitle">
            A growing stack of tools and technologies I use to craft compelling
            digital experiences and data-driven solutions.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <SkillCard key={s.name} {...s} delay={i * 80} />
          ))}
        </div>

        <div className={`tools-section reveal${visible ? " visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <div className="tools-title">Tools & Technologies</div>
          <div className="tool-chips">
            {tools.map((t) => (
              <span key={t} className="tool-chip">✦ {t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: ProjectCard ───────────────────────────────
function ProjectCard({ emoji, title, description, tags, link, ghLink, accent = "#7c3aed", delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`project-card reveal${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-card-header">
        <div
          className="project-emoji-wrap"
          style={{
            background: `${accent}10`,
            border: `1px solid ${accent}25`,
            transition: "all 0.3s ease",
            ...(hovered ? { background: `${accent}18`, boxShadow: `0 0 20px ${accent}30` } : {}),
          }}
        >
          {emoji}
        </div>
        <div className="project-links">
          {ghLink && (
            <a href={ghLink} target="_blank" rel="noreferrer" className="project-link-btn" title="View Source">
              {Icon.github}
            </a>
          )}
          <a href={link} target="_blank" rel="noreferrer" className="project-link-btn" title="Live Demo">
            {Icon.external}
          </a>
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>

        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <a href={link} target="_blank" rel="noreferrer" className="project-cta">
          View Project
          <span className="project-cta-arrow">{Icon.arrow}</span>
        </a>
      </div>
    </div>
  );
}

// ─── COMPONENT: ProjectsSection ───────────────────────────
function ProjectsSection() {
  const [ref, visible] = useReveal(0.1);

  const projects = [
    {
      emoji: "🛒",
      title: "Inventory Reservation Platform",
      description:
        "Built a multi-warehouse inventory reservation platform for retail and D2C brands. Implemented race-condition-safe stock holds, live countdown timers, and idempotent API handling for reliable inventory management at scale.",
      tags: ["Next.js", "API Design", "Real-time", "Race Conditions"],
      link: "https://inventory-allo.vercel.app/",
      ghLink: null,
      accent: "#10b981",
    },
    {
      emoji: "🎬",
      title: "Movie Search Application",
      description:
        "A React-powered movie discovery app featuring real-time search, rich metadata display, ratings, and descriptions — all fetched dynamically from a movie API with smooth UX and responsive design.",
      tags: ["React", "REST API", "useEffect", "useState"],
      link: "https://github.com/sabarishvit/Movie-search-website",
      ghLink: "https://github.com/sabarishvit/Movie-search-website",
      accent: "#7c3aed",
    },
  ];

  return (
    <section id="projects" className="section-wrapper alt-bg">
      <div className="section-inner" ref={ref}>
        <div className={`reveal${visible ? " visible" : ""}`}>
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Featured<br />
            <span style={{ color: "var(--gold)" }}>Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that demonstrate my ability to build
            scalable, user-focused solutions from the ground up.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 120} />
          ))}
        </div>

        {/* CTA to GitHub */}
        <div
          className={`reveal${visible ? " visible" : ""}`}
          style={{
            marginTop: "3rem", textAlign: "center", transitionDelay: "0.4s",
          }}
        >
          <a href="https://github.com/sabarishvit" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-outline" style={{ margin: "0 auto" }}>
              {Icon.github} See All Projects on GitHub
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: ContactSection ────────────────────────────
function ContactSection() {
  const [ref, visible] = useReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  const contactLinks = [
    {
      icon: "📧",
      label: "Email",
      value: "sabuelan@gmail.com",
      href: "mailto:sabuelan@gmail.com",
      bg: "rgba(201,168,76,0.08)",
      border: "rgba(201,168,76,0.2)",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91 96556 44509",
      href: "tel:+919655644509",
      bg: "rgba(6,182,212,0.08)",
      border: "rgba(6,182,212,0.2)",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Vellore, India",
      href: null,
      bg: "rgba(16,185,129,0.08)",
      border: "rgba(16,185,129,0.2)",
    },
  ];

  return (
    <section id="contact" className="section-wrapper">
      <div className="section-inner" ref={ref}>
        <div className={`reveal${visible ? " visible" : ""}`}>
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Let's Build<br />
            <span style={{ color: "var(--gold)" }}>Something Great</span>
          </h2>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className={`reveal-left${visible ? " visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <p className="contact-info-desc">
              I'm actively looking for new opportunities — freelance projects,
              internships, or full-time roles. If you have an exciting problem to
              solve, I'd love to connect.
            </p>

            <div className="contact-links">
              {contactLinks.map(({ icon, label, value, href, bg, border }) => {
                const inner = (
                  <div className="contact-link-item" style={{ textDecoration: "none" }}>
                    <div className="contact-link-icon" style={{ background: bg, border: `1px solid ${border}` }}>
                      {icon}
                    </div>
                    <div>
                      <div className="contact-link-label">{label}</div>
                      <div className="contact-link-value">{value}</div>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} style={{ textDecoration: "none", color: "inherit" }}>
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>

            <div className="tools-title">Find Me Online</div>
            <div className="social-row">
              <a href="https://github.com/sabarishvit" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                {Icon.github}
              </a>
              <a href="https://linkedin.com/in/sabarish-e-b533aa3aa/" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
                {Icon.linkedin}
              </a>
              <a href="mailto:sabuelan@gmail.com" className="social-btn" title="Email">
                {Icon.mail}
              </a>
            </div>
          </div>

          {/* Form Panel */}
          <div className={`reveal-right${visible ? " visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="contact-form-wrap">
              {sent ? (
                <div className="success-box">
                  <div className="success-icon">🚀</div>
                  <div className="success-title">Message Sent!</div>
                  <div className="success-desc">
                    Thanks for reaching out — I'll get back to you within 24 hours.
                  </div>
                  <button
                    className="btn-outline"
                    style={{ marginTop: "1rem" }}
                    onClick={() => setSent(false)}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px", letterSpacing: "-0.5px" }}>
                      Send a Message
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                      I read every message personally.
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold form-submit"
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
                  >
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        <span style={{ animation: "spin-slow 1s linear infinite", display: "inline-block" }}>⟳</span>
                        Sending...
                      </span>
                    ) : (
                      <span>Send Message {Icon.arrow}</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Footer ────────────────────────────────────
function Footer({ onNavClick }) {
  const links = ["Home", "About", "Skills", "Projects", "Contact"];
  return (
    <footer className="site-footer">
      <div className="footer-logo">SABARISH</div>
      <div className="footer-sub">Insights · Solutions · Impact</div>
      <nav className="footer-nav">
        {links.map((l) => (
          <span
            key={l}
            className="footer-nav-link"
            onClick={() => onNavClick(l.toLowerCase())}
          >
            {l}
          </span>
        ))}
      </nav>
      <div className="footer-copy">
        © {new Date().getFullYear()} <span>Sabarish</span>.
      </div>
    </footer>
  );
}

// ─── ROOT: App ────────────────────────────────────────────
const SECTIONS = ["home", "about", "skills", "projects", "contact"];

export default function App() {
  const active = useActiveSection(SECTIONS);

  const scrollTo = useCallback((section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <NavBar active={active} onNavClick={scrollTo} />
      <main>
        <HeroSection onNavClick={scrollTo} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer onNavClick={scrollTo} />
    </div>
  );
}
