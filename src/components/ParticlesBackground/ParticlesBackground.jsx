import { useEffect } from "react";
import "./ParticlesBackground.css";
const options = {
  fullScreen: { enable: false },
  fpsLimit: 30,
  detectRetina: false,
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 34, density: { enable: true, area: 1000 } },
    color: { value: "#a996ff" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.12, max: 0.38 } },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      distance: 135,
      color: "#a996ff",
      opacity: 0.14,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.35,
      direction: "none",
      outModes: { default: "out" },
    },
    reduceDuplicates: true,
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: false },
      resize: { enable: true },
    },
    modes: { grab: { distance: 115, links: { opacity: 0.2 } } },
  },
  pauseOnBlur: true,
};
export default function ParticlesBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let retryTimer;
    let container;
    let tries = 0;
    const mount = async () => {
      const engine = window.tsParticles;
      const loadSlim = window.loadSlim;
      if (!engine || !loadSlim) {
        if (tries++ < 60) retryTimer = window.setTimeout(mount, 100);
        return;
      }
      try {
        await loadSlim(engine);
        if (cancelled) return;
        container = await engine.load({ id: "portfolio-particles", options });
        if (cancelled) container?.destroy();
      } catch {
        return;
      }
    };
    mount();
    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      container?.destroy();
    };
  }, []);
  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-gradient" />
      <div id="portfolio-particles" />
    </div>
  );
}
