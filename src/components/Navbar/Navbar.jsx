import { useEffect, useState } from "react";
import "./Navbar.css";
const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "services"],
  ["Projects", "work"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = links
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const navHeight =
        document.querySelector(".site-nav")?.getBoundingClientRect().height ??
        75;
      const activationPoint = navHeight + 24;
      let currentSection = sections[0]?.id ?? "home";

      sections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= activationPoint && bottom > activationPoint) {
          currentSection = section.id;
        }
      });

      setActiveSection((active) =>
        active === currentSection ? active : currentSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-nav">
      <a
        className="signature"
        href="#home"
        aria-label="Reem Moustafa — Home"
        onClick={() => setActiveSection("home")}>
        <span className="photoshop-logo" aria-hidden="true">
          Ps
        </span>
      </a>
      <button
        className={
          open ? "nav-menu-button nav-menu-button-open" : "nav-menu-button"
        }
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-controls="site-navigation">
        <span />
        <span />
      </button>
      <nav
        id="site-navigation"
        className={open ? "nav-items nav-items-open" : "nav-items"}>
        {links.map(([name, id]) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={"#" + id}
              className={isActive ? "nav-link-active" : undefined}
              aria-current={isActive ? "location" : undefined}
              onClick={() => {
                setActiveSection(id);
                setOpen(false);
              }}>
              {name}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
