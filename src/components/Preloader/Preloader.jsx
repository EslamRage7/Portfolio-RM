import { useEffect, useState } from "react";
import "./Preloader.css";

const MINIMUM_DISPLAY_MS = 3000;
const EXIT_DURATION_MS = 700;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let hideTimer;
    let unmountTimer;
    document.body.classList.add("preloader-active");

    const finishLoading = () => {
      hideTimer = window.setTimeout(
        () => {
          setLeaving(true);
          document.body.classList.remove("preloader-active");
          unmountTimer = window.setTimeout(
            () => setVisible(false),
            EXIT_DURATION_MS,
          );
        },
        Math.max(0, MINIMUM_DISPLAY_MS - (Date.now() - startedAt)),
      );
    };

    if (document.readyState === "complete") finishLoading();
    else window.addEventListener("load", finishLoading, { once: true });

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(hideTimer);
      window.clearTimeout(unmountTimer);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`preloader${leaving ? " preloader-leaving" : ""}`}
      role="status"
      aria-label="Loading portfolio">
      <div className="preloader-mark" aria-hidden="true">
        <div className="preloader-cube">
          <span className="cube-front">R</span>
          <span className="cube-back">R</span>
          <span className="cube-right" />
          <span className="cube-left" />
          <span className="cube-top" />
          <span className="cube-bottom" />
        </div>
        <i />
      </div>
      <span className="preloader-name">REEM MOUSTAFA</span>
      <div className="preloader-track" aria-hidden="true">
        <i />
      </div>
      <span className="preloader-caption">PREPARING PORTFOLIO</span>
    </div>
  );
}
