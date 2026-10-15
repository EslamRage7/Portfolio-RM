import { useEffect, useRef, useState } from "react";
import reem from "../../assets/reem.jpg";
import Icon from "../Icons.jsx";
import "./Hero.css";
const phrases = [
  "UI / UX",
  "digital design ",
  "branding",
  "graphic design",
  "web design",
];
export default function Hero() {
  const [text, setText] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? phrases[0]
      : "",
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [squeezeProgress, setSqueezeProgress] = useState(0);
  const typeLineRef = useRef(null);
  const portraitRef = useRef(null);
  useEffect(() => {
    const updateSqueeze = () => {
      const line = typeLineRef.current;
      const portrait = portraitRef.current;
      if (
        !line ||
        !portrait ||
        !window.matchMedia("(min-width: 992px)").matches
      ) {
        setSqueezeProgress(0);
        return;
      }
      const gap =
        portrait.getBoundingClientRect().left -
        line.getBoundingClientRect().right;
      const approach = 28;
      setSqueezeProgress(Math.max(0, Math.min(1, (approach - gap) / approach)));
    };
    updateSqueeze();
    window.addEventListener("resize", updateSqueeze);
    return () => window.removeEventListener("resize", updateSqueeze);
  }, [text]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const phrase = phrases[phraseIndex];
    let timer;
    if (!deleting) {
      if (text.length < phrase.length)
        timer = window.setTimeout(
          () => setText(phrase.slice(0, text.length + 1)),
          90,
        );
      else timer = window.setTimeout(() => setDeleting(true), 1350);
    } else if (text.length > 0)
      timer = window.setTimeout(() => setText(text.slice(0, -1)), 42);
    else
      timer = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 0);
    return () => window.clearTimeout(timer);
  }, [text, phraseIndex, deleting]);
  return (
    <section className="intro" id="home">
      <div className="intro-main container row align-items-center justify-content-center">
        <div
          className="intro-title col-12 col-lg-7 order-2 order-lg-1 text-center text-lg-start"
          data-aos="fade-up">
          <p className="hello">
            <span className="hello-dot" /> GRAPHIC DESIGNER <i>·</i> CAIRO,
            EGYPT
          </p>
          <h2 className="intro-name">Reem Moustafa</h2>
          <h1>
            <span className="type-line" ref={typeLineRef}>
              {text}
              <i className="type-caret" aria-hidden="true" />
            </span>
          </h1>
          <p className="intro-description">
            Graphic design and user experiences made with clarity, care, and
            purpose.
          </p>
          <div className="intro-actions">
            <a href="#work" className="hero-work-link">
              Explore my work <Icon name="arrowDown" size={16} />
            </a>
            <a
              href="/src/assets/REEM_MOUSTAFA_CV.pdf"
              download="Reem-Moustafa-CV.pdf"
              className="hero-cv-link">
              <Icon name="download" size={17} /> Download CV
            </a>
          </div>
        </div>
        <div
          className="intro-portrait col-10 col-sm-8 col-lg-4 order-1 order-lg-2"
          ref={portraitRef}
          style={{
            "--image-scale": 1 - squeezeProgress * 0.16,
            "--squeeze-gap": squeezeProgress * 17 + "%",
          }}
          data-aos="fade-left"
          data-aos-delay="120">
          <div className="intro-portrait-frame">
            <img
              src={reem}
              alt="Portrait representing graphic designer Reem Moustafa"
            />
            <span className="portrait-note">
              REEM MOUSTAFA
              <br />
              GRAPHIC DESIGNER
            </span>
          </div>
        </div>
      </div>
      <nav className="hero-socials" aria-label="Social media">
        <span>FIND ME</span>
        <a
          href="https://www.facebook.com/share/19pL6u7YYV/"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook">
          <Icon name="facebook" size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/reem-moustafa-a3920724a"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn">
          <Icon name="linkedin" size={15} />
        </a>
      </nav>
    </section>
  );
}
