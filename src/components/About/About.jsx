import "./About.css";
const facts = [
  ["03", "years of experience"],
  ["2025", "Helwan University"],
  ["UI/UX", "and graphic design"],
];
export default function About() {
  return (
    <section className="about-section section-wrap" id="about">
      <div className="section-label" data-aos="fade-up">
        <span>01 / ABOUT ME</span>
      </div>
      <div className="about-layout">
        <h2 data-aos="fade-up">
          Design that
          <br />
          makes ideas
          <br />
          <em>clear.</em>
        </h2>
        <div className="about-copy" data-aos="fade-up" data-aos-delay="100">
          <p className="about-lead">
            Detail-oriented Graphic Designer with 3 years of experience creating
            visual concepts, branding, and digital content that communicate
            ideas effectively.
          </p>
          <p>
            Skilled in Adobe Creative Suite and modern design tools, with a
            strong eye for typography, layout, and color. I create work that
            balances aesthetics with functionality and helps brands connect with
            their audiences.
          </p>
          <p>
            I'm also an experienced UI/UX designer, passionate about intuitive,
            user-centered experiences. I work across wireframing, prototyping,
            user research, and collaboration with cross-functional teams.
          </p>
          <a className="under-link" href="#contact">
            Let’s work together <span>↗</span>
          </a>
        </div>
      </div>
      <div className="about-facts">
        {facts.map(([n, label], i) => (
          <div
            data-aos="zoom-in"
            data-aos-delay={i * 80}
            style={{ "--aos-delay": i * 80 + "ms" }}
            key={label}>
            <strong>{n}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
