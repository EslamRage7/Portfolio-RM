import Icon from "../Icons.jsx";
import "./Services.css";
const skills = [
  {
    n: "01",
    title: "Graphic Design",
    tools: ["Photoshop", "Illustrator", "InDesign"],
    icon: "design",
  },
  {
    n: "02",
    title: "UI / UX Design",
    tools: ["Figma", "Adobe XD", "User research"],
    icon: "layout",
  },
  {
    n: "03",
    title: "Prototyping",
    tools: ["Wireframes", "Interactive prototypes"],
    icon: "prototype",
  },
  {
    n: "04",
    title: "Digital Content",
    tools: ["After Effects", "Premiere Pro", "Video editing"],
    icon: "video",
  },
  {
    n: "05",
    title: "Creative Skills",
    tools: ["Copywriting", "Visual storytelling"],
    icon: "pen",
  },
  {
    n: "06",
    title: "Productivity",
    tools: ["Microsoft Office"],
    icon: "office",
  },
];
export default function Services() {
  return (
    <section className="services-section section-wrap" id="services">
      <div className="section-label" data-aos="fade-up">
        <span>02 / SKILLS & TOOLS</span>
      </div>
      <div className="services-heading">
        <h2 data-aos="fade-up">
          Creative eye.
          <br />
          <em>Practical skills.</em>
        </h2>
        <p data-aos="fade-up" data-aos-delay="100">
          From early research and wireframes to polished visual design and final
          content.
        </p>
      </div>
      <div className="services-list">
        {skills.map((skill, i) => (
          <article
            className="service-item"
            data-aos="fade-up"
            data-aos-delay={i * 70}
            style={{ "--aos-delay": i * 70 + "ms" }}
            key={skill.n}>
            <div className="skill-card-top">
              <span>{skill.n}</span>
              <i>
                <Icon name={skill.icon} size={23} />
              </i>
            </div>
            <h3>{skill.title}</h3>
            <div className="skill-tools">
              {skill.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
