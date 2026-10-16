import { useEffect } from "react";
import "./ParticlesBackground.css";

const options = {
  fullScreen: { enable: false },
  fpsLimit: 30,
  detectRetina: false,
  background: { color: { value: "transparent" } },

  particles: {
    number: {
      value: 42,
      density: { enable: true, area: 1000 },
    },

    color: { value: "#b9a8ff" },
    shape: { type: "circle" },

    opacity: {
      value: { min: 0.3, max: 0.75 },
    },

    size: {
      value: { min: 1.5, max: 3.5 },
    },

    links: {
      enable: true,
      distance: 155,
      color: "#a996ff",
      opacity: 0.3,
      width: 1.2,
    },

    move: {
      enable: true,
      speed: 0.55,
      direction: "none",
      outModes: { default: "out" },
    },

    reduceDuplicates: true,
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: { enable: true },
    },

    modes: {
      grab: {
        distance: 160,
        links: { opacity: 0.55 },
      },
      push: {
        quantity: 4,
      },
    },
  },

  pauseOnBlur: true,
};

export default function ParticlesBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let retryTimer;
    let container;
    let tries = 0;

    const mount = async () => {
      const engine = window.tsParticles;
      const loadSlim = window.loadSlim;

      if (!engine || !loadSlim) {
        if (tries++ < 60) {
          retryTimer = window.setTimeout(mount, 100);
        }
        return;
      }

      try {
        await loadSlim(engine);

        if (cancelled) return;

        container = await engine.load({
          id: "portfolio-particles",
          options,
        });

        if (cancelled) {
          container?.destroy();
        }
      } catch (error) {
        console.error("Particles failed to load:", error);
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
