import { useState } from "react";
import Icon from "../Icons.jsx";
import "./Contact.css";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="contact-section section-wrap" id="contact">
      <div className="section-label" data-aos="fade-up">
        <span>05 / GET IN TOUCH</span>
      </div>
      <div className="contact-layout">
        <div data-aos="fade-up">
          <h2>
            Let’s make
            <br />
            <em>something good.</em>
          </h2>
          <p>
            Have a design project or opportunity in mind? I’d love to hear from
            you.
          </p>
          <a className="contact-email" href="mailto:reemoustafa2001@gmail.com">
            reemoustafa2001@gmail.com ↗
          </a>
          <div className="contact-socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer">
              Facebook <Icon name="arrowUpRight" size={13} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer">
              LinkedIn <Icon name="arrowUpRight" size={13} />
            </a>
          </div>
        </div>
        <form
          data-aos="fade-up"
          data-aos-delay="120"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}>
          <label>
            Your name
            <input required placeholder="What should I call you?" />
          </label>
          <label>
            Your email
            <input type="email" required placeholder="you@somewhere.com" />
          </label>
          <label>
            Tell me about the project
            <textarea rows="3" placeholder="A little about what you need…" />
          </label>
          <button type="submit">
            {sent ? "Thanks for reaching out!" : "Send a message ↗"}
          </button>
          {sent && (
            <span role="status">Thanks! You can also email me directly.</span>
          )}
        </form>
      </div>
    </section>
  );
}
