import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "../Icons.jsx";
import "./Contact.css";
import "./ContactLinks.css";
export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const emailJsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };
  const isSending = status === "sending";
  const isSent = status === "success";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return;

    const { serviceId, templateId, publicKey } = emailJsConfig;
    if (!serviceId || !templateId || !publicKey) {
      setStatus("config-error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey },
      );
      formRef.current.reset();
      setStatus("success");
    } catch (error) {
      console.error("EmailJS contact form submission failed:", error);
      setStatus("error");
    }
  };

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
          ref={formRef}
          data-aos="fade-up"
          data-aos-delay="120"
          onSubmit={handleSubmit}
          onChange={() => {
            if (!isSending) setStatus("idle");
          }}>
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              placeholder="What should I call you?"
            />
          </label>
          <label>
            Your email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@somewhere.com"
            />
          </label>
          <label>
            Tell me about the project
            <textarea
              name="message"
              rows="3"
              placeholder="A little about what you need…"
            />
          </label>
          <button type="submit" disabled={isSending}>
            <span>
              {isSending
                ? "Sending..."
                : isSent
                  ? "Thanks for reaching out!"
                  : "Send a message"}
            </span>
            <span className="contact-submit-icon" aria-hidden="true">
              {isSent ? "✓" : <Icon name="arrowUpRight" size={16} />}
            </span>
          </button>
          {status === "success" && (
            <span className="contact-form-status" role="status">
              Thanks! Your message was sent successfully.
            </span>
          )}
          {status === "error" && (
            <span className="contact-form-status contact-form-error" role="alert">
              Your message could not be sent. Please try again or email me
              directly.
            </span>
          )}
          {status === "config-error" && (
            <span className="contact-form-status contact-form-error" role="alert">
              Email sending is not configured yet. Add the EmailJS values to
              your .env.local file.
            </span>
          )}
        </form>
      </div>
    </section>
  );
}
