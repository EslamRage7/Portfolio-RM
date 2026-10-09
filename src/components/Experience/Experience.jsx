import "./Experience.css";
const history = [
  [
    "3 YEARS",
    "Graphic Designer",
    "Branding, digital content, and visual design combining creativity with function.",
  ],
  [
    "2021 — 2025",
    "Bachelor of Applied Arts",
    "Advertising · Helwan University",
  ],
];
export default function Experience() {
  return (
    <section className="experience-section section-wrap" id="experience">
      <div className="section-label" data-aos="fade-up">
        <span>04 / EXPERIENCE & EDUCATION</span>
      </div>
      <div className="experience-layout">
        <h2 data-aos="fade-up">
          Learning.
          <br />
          <em>Making.</em>
        </h2>
        <div className="experience-list">
          {history.map(([date, role, place], i) => (
            <article
              data-aos="fade-left"
              data-aos-delay={i * 100}
              style={{ "--aos-delay": i * 100 + "ms" }}
              key={role}>
              <span>{date}</span>
              <div>
                <h3>{role}</h3>
                <p>{place}</p>
              </div>
              <b>↗</b>
            </article>
          ))}
        </div>
      </div>
      <aside className="client-quote" data-aos="zoom-in">
        <span>“</span>
        <blockquote>
          Passionate about creating thoughtful design solutions that engage
          audiences and strengthen brand identity.
        </blockquote>
        <p>
          REEM MOUSTAFA <i>·</i> GRAPHIC DESIGNER
        </p>
      </aside>
    </section>
  );
}
