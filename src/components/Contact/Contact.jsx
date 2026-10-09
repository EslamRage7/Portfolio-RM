import { useState } from "react";
import Icon from "../Icons.jsx";
import "./Contact.css";
import "./ContactLinks.css";
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
          <a
            className="contact-email"
            href="mailto:reemoustafa2001@gmail.com">
            <span className="contact-link-icon">
              <Icon name="mail" size={16} />
            </span>
            <span className="contact-email-address">
              reemoustafa2001@gmail.com
            </span>
            <Icon
              name="arrowUpRight"
              size={14}
              className="contact-link-arrow"
            />
          </a>
          <div className="contact-socials">
            <a
              href="https://www.facebook.com/share/19pL6u7YYV/"
              target="_blank"
              rel="noreferrer">
              <Icon
                name="facebook"
                size={16}
                className="contact-social-icon"
              />
              <span>Facebook</span>
              <Icon
                name="arrowUpRight"
                size={13}
                className="contact-link-arrow"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/reem-moustafa-a3920724a"
              target="_blank"
              rel="noreferrer">
              <Icon
                name="linkedin"
                size={16}
                className="contact-social-icon"
              />
              <span>LinkedIn</span>
              <Icon
                name="arrowUpRight"
                size={13}
                className="contact-link-arrow"
              />
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
            <span>{sent ? "Thanks for reaching out!" : "Send a message"}</span>
            <span className="contact-submit-icon" aria-hidden="true">
              {sent ? "✓" : <Icon name="arrowUpRight" size={16} />}
            </span>
          </button>
          {sent && (
            <span role="status">Thanks! You can also email me directly.</span>
          )}
        </form>
      </div>
    </section>
  );
}
