// ============================================================
// 🎓 REACT PORTFOLIO — Beginner Friendly with Comments
// ============================================================
// React is a JavaScript library for building UIs using
// "components" — small reusable pieces of the page.
// Each component is just a JavaScript FUNCTION that returns HTML-like code (called JSX).

// 📦 STEP 1: Import — bring in tools we need
import { useState, useEffect } from "react"; // useState & useEffect are "Hooks" (explained below)

// ============================================================
// 🧩 COMPONENT: NavBar
// A component is a function that returns JSX (looks like HTML).
// Props = data passed into a component from its parent.
// ============================================================
function NavBar({ activeSection, onNavClick }) {
  // "activeSection" and "onNavClick" are PROPS — data passed from the parent component
  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <nav style={styles.nav}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
          <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" fill="none" stroke="#c9a227" strokeWidth="2" />
          <path d="M14 17 Q14 14 17 14 L23 14 Q26 14 26 17 Q26 20 20 20 Q26 20 26 23 Q26 26 23 26 L17 26 Q14 26 14 23" stroke="#c9a227" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </svg>
        <div style={{ width: "1.5px", height: "40px", backgroundColor: "#c9a227", opacity: 0.7, flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 }}>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#c9a227", letterSpacing: "2px", lineHeight: "1", display: "block" }}>SABARISH</span>
          <span style={{ fontSize: "15px", color: "#c9a227", letterSpacing: "3px", lineHeight: "1", opacity: 0.85, display: "block" }}>INSIGHTS | SOLUTIONS | IMPACT</span>
        </div>
      </div>
      <div style={styles.navLinks}>
        {/* 🔁 .map() loops over an array and renders one element per item */}
        {links.map((link) => (
          <button
            key={link} // React needs a unique "key" when rendering lists
            onClick={() => onNavClick(link.toLowerCase())} // Call function passed via props
            className="nav-link-hover"
            style={{
              ...styles.navBtn,
              // Conditional styling — changes color if this is the active section
              color: activeSection === link.toLowerCase() ? "#4f46e5" : "#475569",
              borderBottom: activeSection === link.toLowerCase() ? "2px solid #4f46e5" : "2px solid transparent",
            }}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ============================================================
// 🧩 COMPONENT: HeroSection
// ============================================================
function HeroSection({ onNavClick }) {
  // useState Hook: creates a variable that React tracks.
  // When it changes, React re-renders the component automatically.
  // Syntax: const [value, setValue] = useState(initialValue)
  const [typed, setTyped] = useState("");
  const fullText = " Problem Solver | Solution-Oriented Professional";

  // useEffect Hook: runs code AFTER the component appears on screen.
  // Used for timers, API calls, animations, etc.
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1)); // Update state character by character
      i++;
      if (i === fullText.length) clearInterval(interval); // Stop when done
    }, 60);
    return () => clearInterval(interval); // 🧹 Cleanup: stop interval when component is removed
  }, []); // The [] means: run this effect only ONCE when component first loads

  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <p style={styles.greeting}>👋 Hello, World! I'm</p>
        <h1 style={styles.heroName}>Sabarish</h1>
        {/* Typed text — driven by state */}
        <h2 style={styles.heroTagline}>
          {typed}
          <span style={styles.cursor}>|</span>
        </h2>
        <p style={styles.heroDesc}>
          Turning business needs into insights and solutions that create real value.
          Passionate about analyzing problems, improving processes, and supporting smarter business decisions.
        </p>
        <div style={styles.heroButtons}>
          <button style={styles.btnPrimary} className="btn-primary-hover" onClick={() => onNavClick("projects")}>
            View My Work
          </button>
          <button style={styles.btnSecondary} className="btn-secondary-hover" onClick={() => onNavClick("contact")}>
            Get In Touch
          </button>
        </div>
      </div>
      {/* Decorative blobs — pure CSS visuals */}
      <div style={styles.blob} className="float-element-1"></div>
      <div style={styles.blob2} className="float-element-2"></div>
    </section>
  );
}

// ============================================================
// 🧩 COMPONENT: AboutSection
// ============================================================
function AboutSection() {
  const facts = [
    { icon: "🎓", label: "Education", value: "Integrated M.Tech Software Engineering" },
    { icon: "📍", label: "Location", value: "Vellore, India" },
    { icon: "💼", label: "Status", value: "Open to Opportunities" },
    { icon: "❤️", label: "Interests", value: "Music, Cricket" },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>About <span style={styles.accent}>Me</span></h2>
      <div style={styles.aboutGrid}>
        <div style={styles.aboutText}>
          <p style={styles.para}>
            I’m an aspiring web developer with a strong interest in frontend development and business analysis.
          </p>
          <p style={styles.para}>
            Currently, I’m focused on strengthening my skills in both software development and business analysis by building projects and exploring modern technologies.
            I enjoy taking on new challenges, understanding requirements, solving problems, and quickly mastering the skills needed to deliver efficient, user-friendly, and business-focused solutions.
          </p>
        </div>
        {/* Render fact cards using .map() */}
        <div style={styles.factsGrid}>
          {facts.map((fact) => (
            <div key={fact.label} style={styles.factCard}>
              <span style={styles.factIcon}>{fact.icon}</span>
              <div>
                <div style={styles.factLabel}>{fact.label}</div>
                <div style={styles.factValue}>{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 🧩 COMPONENT: SkillBar
// A small reusable component — used multiple times with different props
// ============================================================
function SkillBar({ name, level, color }) {
  // useState for animation trigger
  const [animated, setAnimated] = useState(false);

  // useEffect to trigger animation after render
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.skillRow}>
      <div style={styles.skillMeta}>
        <span style={styles.skillName}>{name}</span>
        <span style={styles.skillPercent}>{level}%</span>
      </div>
      <div style={styles.skillTrack}>
        {/* Width animates from 0 to "level%" — driven by state */}
        <div
          style={{
            ...styles.skillFill,
            width: animated ? `${level}%` : "0%",
            background: color,
            transition: "width 1s ease",
          }}
        />
      </div>
    </div>
  );
}

// ============================================================
// 🧩 COMPONENT: SkillsSection
// ============================================================
function SkillsSection() {
  const skills = [
    { name: "HTML & CSS", level: 70, color: "linear-gradient(90deg,#4f46e5,#818cf8)" },
    { name: "JavaScript", level: 70, color: "linear-gradient(90deg,#f59e0b,#fbbf24)" },
    { name: "React", level: 60, color: "linear-gradient(90deg,#06b6d4,#67e8f9)" },
    { name: "Next.js", level: 40, color: "linear-gradient(90deg,#0f172a,#334155)" },
    { name: "Git & GitHub", level: 60, color: "linear-gradient(90deg,#7c3aed,#a78bfa)" },
  ];

  return (
    <section style={{ ...styles.section, background: "#ffffff" }}>
      <h2 style={styles.sectionTitle}>My <span style={styles.accent}>Skills</span></h2>
      <div style={styles.skillsContainer}>
        {skills.map((skill) => (
          // Spread operator (...skill) passes all object properties as props
          <SkillBar key={skill.name} {...skill} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// 🧩 COMPONENT: ProjectCard
// Receives data as props and renders a card
// ============================================================
function ProjectCard({ title, description, tags, emoji, link }) {
  // useState for hover effect
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 45px -5px rgba(79,70,229,0.12), 0 10px 20px -10px rgba(79,70,229,0.08)"
          : "0 10px 30px -5px rgba(15,23,42,0.04), 0 8px 10px -6px rgba(15,23,42,0.04)",
        border: hovered ? "1px solid rgba(79,70,229,0.3)" : "1px solid rgba(15,23,42,0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      // Event handlers — like addEventListener but in JSX
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.cardEmoji}>{emoji}</div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{description}</p>
      <div style={styles.tagRow}>
        {tags.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>
      <a href={link} style={styles.cardLink} target="_blank" rel="noreferrer">
        View Project <span style={{ marginLeft: "4px", transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none" }}>→</span>
      </a>
    </div>
  );
}

// ============================================================
// 🧩 COMPONENT: ProjectsSection
// ============================================================
function ProjectsSection() {
  // Data defined as an array of objects — a common React pattern
  const projects = [
    {
      emoji: "🛒",
      title: "Inventory Reservation Platform",
      description: "Built a multi-warehouse inventory reservation platform for retail and D2C brands. Implemented race-condition-safe stock holds, live countdown timers, and idempotent API handling for reliable inventory management.",
      tags: ["Next JS",],
      link: "https://inventory-allo.vercel.app/",
    },
    {
      emoji: "🌤️",
      title: "Movie Search Website",
      description: "Developed a movie search application using React JS that allows users to search for movies and view details like ratings and descriptions by fetching data from a movie API.",
      tags: ["React", "API", "useEffect"],
      link: "https://github.com/sabarishvit/Movie-search-website",

    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>Featured <span style={styles.accent}>Projects</span></h2>
      <div style={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// 🧩 COMPONENT: ContactSection
// Demonstrates controlled inputs — state linked to form fields
// ============================================================
function ContactSection() {
  // One state object for all form fields — a common pattern
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Handles any input change — uses computed property [field] to update the right key
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // prev = old state, we spread it and override just the changed field
  }

  function handleSubmit() {
    if (form.name && form.email && form.message) {
      setSent(true); // Show success message
      setForm({ name: "", email: "", message: "" }); // Reset form
    }
  }

  return (
    <section style={{ ...styles.section, background: "#ffffff" }}>
      <h2 style={styles.sectionTitle}>Get In <span style={styles.accent}>Touch</span></h2>
      <div style={styles.contactWrapper}>
        <div style={styles.contactInfo}>
          <h3 style={styles.contactHeading}>Let's work together!</h3>
          <p style={styles.para}>
            I'm currently open to freelance projects, internships, and full-time
            opportunities. Drop me a message and I'll get back to you!
          </p>
          {[
            { icon: "📧", label: "sabuelan@gmail.com" },
            { icon: "📱", label: "+91 96556 44509" },
            { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/sabarish-e-b533aa3aa/" },
            { icon: "📍", label: "GitHub", href: "https://github.com/sabarishvit" },
          ].map((item) => (
            <div key={item.label} style={styles.contactItem}>
              <span>{item.icon}</span>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactText, color: "#475569", textDecoration: "none" }}>
                  {item.label}
                </a>
              ) : (
                <span style={styles.contactText}>{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Controlled Form — every input's value is tied to state */}
        <div style={styles.formBox}>
          {sent ? (
            <div style={styles.successMsg}>
              ✅ Message sent! I'll reply soon.
            </div>
          ) : (
            <>
              <input
                style={styles.input}
                className="input-focus"
                placeholder="Your Name"
                value={form.name} // Controlled: value comes from state
                onChange={(e) => handleChange("name", e.target.value)} // Updates state on change
              />
              <input
                style={styles.input}
                className="input-focus"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <textarea
                style={{ ...styles.input, height: "120px", resize: "vertical" }}
                className="input-focus"
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
              <button style={styles.btnPrimary} className="btn-primary-hover" onClick={handleSubmit}>
                Send Message 🚀
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 🧩 ROOT COMPONENT: App
// The top-level component — assembles all sections together
// This is what gets rendered to the page
// ============================================================
export default function App() {
  // Tracks which section is active for navbar highlighting
  const [activeSection, setActiveSection] = useState("home");

  function scrollTo(section) {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={styles.app}>
      {/* NavBar receives props: data (activeSection) and a function (scrollTo) */}
      <NavBar activeSection={activeSection} onNavClick={scrollTo} />

      {/* Each section has an id so we can scroll to it */}
      <div id="home"><HeroSection onNavClick={scrollTo} /></div>
      <div id="about"><AboutSection /></div>
      <div id="skills"><SkillsSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="contact"><ContactSection /></div>

      <footer style={styles.footer}>

      </footer>
    </div>
  );
}

// ============================================================
// 🎨 STYLES — JavaScript style objects (camelCase instead of kebab-case)
// In React, inline styles use JS objects: { backgroundColor: "red" }
// ============================================================
const styles = {
  app: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    background: "#F8FAFC",
    color: "#0F172A",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
  },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2.5rem",
    background: "#0A1628",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#0d1b2e",
    minHeight: "72px",
    alignItems: "center",
  },

  logo: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "1.35rem",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: "#C9A84C",
  },

  navLinks: {
    display: "flex",
    gap: "0.35rem",
  },

  navBtn: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "none",
    cursor: "pointer",
    padding: "0.6rem 1rem",
    fontSize: "0.92rem",
    fontWeight: 600,
    color: "#94A3B8",
    borderRadius: "10px",
    transition: "all 0.25s ease",
  },

  hero: {
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    padding: "6rem 2.5rem",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(160deg, #0A1628 0%, #0F2247 60%, #0A1628 100%)",
  },

  heroContent: {
    maxWidth: "720px",
    zIndex: 1,
  },

  greeting: {
    color: "#C9A84C",
    fontWeight: 700,
    marginBottom: "0.75rem",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },

  heroName: {
    fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
    fontWeight: 800,
    margin: "0 0 1rem",
    letterSpacing: "-2.5px",
    color: "#F1F5F9",
    lineHeight: 1.08,
  },

  heroTagline: {
    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
    color: "#b8b536ff",
    fontWeight: 500,
    marginBottom: "1.5rem",
    letterSpacing: "-0.3px",
  },

  cursor: {
    display: "inline-block",
    width: "2px",
    marginLeft: "4px",
    background: "#C9A84C",
    animation: "blink 1s step-end infinite",
  },

  heroDesc: {
    color: "#a1aab6ff",
    lineHeight: 1.8,
    marginBottom: "2.5rem",
    fontSize: "1.25rem",
    maxWidth: "620px",
  },

  heroButtons: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },

  blob: {
    position: "absolute",
    right: "5%",
    top: "8%",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)",
    filter: "blur(12px)",
    pointerEvents: "none",
  },

  blob2: {
    position: "absolute",
    left: "-10%",
    bottom: "-12%",
    width: "480px",
    height: "480px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
    filter: "blur(12px)",
    pointerEvents: "none",
  },

  btnPrimary: {
    background: "#C9A84C",
    color: "#0A1628",
    border: "none",
    padding: "0.9rem 2.2rem",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95rem",
    boxShadow: "0 8px 24px rgba(201, 168, 76, 0.28)",
    transition: "all 0.25s ease",
  },

  btnSecondary: {
    background: "transparent",
    color: "#C9A84C",
    border: "1.5px solid rgba(201, 168, 76, 0.4)",
    padding: "0.9rem 2.2rem",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95rem",
    transition: "all 0.25s ease",
  },

  section: {
    padding: "6rem 2.5rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    marginBottom: "3.5rem",
    letterSpacing: "-1px",
    color: "#0F172A",
  },

  accent: {
    color: "#C9A84C",
  },

  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "3.5rem",
    alignItems: "start",
  },

  aboutText: {
    lineHeight: 1.8,
  },

  para: {
    color: "#112849ff",
    marginBottom: "1.25rem",
    lineHeight: 1.85,
    fontSize: "1.20rem",
  },

  factsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.25rem",
  },

  factCard: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 16px rgba(10, 22, 40, 0.07)",
    borderRadius: "18px",
    padding: "1.25rem",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    transition: "all 0.3s ease",
  },

  factIcon: {
    fontSize: "2.2rem",
  },

  factLabel: {
    fontSize: "0.75rem",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 700,
    marginBottom: "0.25rem",
  },

  factValue: {
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "#0F172A",
  },

  skillsContainer: {
    maxWidth: "750px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
  },

  skillRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },

  skillMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.95rem",
  },

  skillName: {
    fontWeight: 600,
    color: "#334155",
  },

  skillPercent: {
    color: "#C9A84C",
    fontWeight: 700,
  },

  skillTrack: {
    height: "8px",
    background: "#E2E8F0",
    borderRadius: "99px",
    overflow: "hidden",
  },

  skillFill: {
    height: "100%",
    borderRadius: "99px",
    background: "linear-gradient(90deg, #C9A84C, #E8C56A)",
  },

  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "22px",
    padding: "2.2rem",
    cursor: "default",
    boxShadow: "0 8px 28px rgba(10, 22, 40, 0.07)",
    transition: "all 0.3s ease",
  },

  cardEmoji: {
    fontSize: "2.6rem",
    marginBottom: "1.25rem",
  },

  cardTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: "1.3rem",
    marginBottom: "0.75rem",
    color: "#0F172A",
    letterSpacing: "-0.5px",
  },

  cardDesc: {
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: 1.75,
    marginBottom: "1.5rem",
  },

  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },

  tag: {
    background: "rgba(201, 168, 76, 0.1)",
    color: "#92731A",
    padding: "0.35rem 0.8rem",
    borderRadius: "99px",
    fontSize: "0.75rem",
    fontWeight: 600,
    border: "1px solid rgba(201, 168, 76, 0.18)",
  },

  cardLink: {
    color: "#C9A84C",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.92rem",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },

  contactWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "3.5rem",
    maxWidth: "950px",
    margin: "0 auto",
  },

  contactInfo: {},

  contactHeading: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "1.25rem",
    color: "#0F172A",
  },

  contactItem: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1.25rem",
  },

  contactText: {
    color: "#475569",
    fontSize: "1rem",
  },

  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    background: "#FFFFFF",
    padding: "2rem",
    borderRadius: "20px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 28px rgba(10, 22, 40, 0.07)",
  },

  input: {
    background: "#FFFFFF",
    border: "1px solid #CBD5E1",
    borderRadius: "12px",
    padding: "0.95rem 1.1rem",
    color: "#0F172A",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },

  successMsg: {
    background: "rgba(201, 168, 76, 0.08)",
    border: "1px solid #C9A84C",
    borderRadius: "16px",
    padding: "2.5rem",
    color: "#7A5E1A",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.1rem",
  },

  footer: {
    textAlign: "center",
    padding: "3rem 2rem",
    color: "#64748B",
    fontSize: "0.85rem",
    borderTop: "1px solid rgba(148, 163, 184, 0.16)",
    background: "#0A1628",
  },
};
