import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Projects.css";
const projectFiles = import.meta.glob("../../assets/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const projectGroups = Object.entries(projectFiles).reduce(
  (groups, [path, src]) => {
    const match = path.match(/\.\.\/\.\.\/assets\/([^/]+)\/([^/]+)$/);
    if (!match) return groups;
    const [, folderName, fileName] = match;
    groups[folderName] ??= [];
    groups[folderName].push([
      fileName.replace(/\.[^.]+$/, "").replaceAll("_", " "),
      src,
    ]);
    return groups;
  },
  {},
);
const folders = Object.entries(projectGroups)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, images], index) => ({
    id: "project-" + index,
    name,
    color: ["lilac", "orange", "blue"][index % 3],
    images: images.sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true }),
    ),
  }));
export default function Projects() {
  const [opened, setOpened] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const closeTimer = useRef(null);
  const active = folders.find((folder) => folder.id === opened);
  const closeFolder = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setSelectedImage(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpened(null);
      setIsClosing(false);
      return;
    }
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setOpened(null);
      setIsClosing(false);
    }, 420);
  }, []);
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (selectedImage !== null) setSelectedImage(null);
        else closeFolder();
      }
      if (selectedImage !== null && e.key === "ArrowRight") {
        setSelectedImage((index) => (index + 1) % active.images.length);
      }
      if (selectedImage !== null && e.key === "ArrowLeft") {
        setSelectedImage(
          (index) => (index - 1 + active.images.length) % active.images.length,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("folder-overlay-active");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("folder-overlay-active");
    };
  }, [active, closeFolder, selectedImage]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  return (
    <section className="projects-section section-wrap" id="work">
      <div className="section-label" data-aos="fade-up">
        <span>03 / SELECTED PROJECTS</span>
        <span>CLICK A FOLDER TO EXPLORE ↘</span>
      </div>
      <div className="projects-heading" data-aos="fade-up">
        <h2>
          Projects
          <br />
          <em>& experiments.</em>
        </h2>
        <p>
          Selected graphic and digital design concepts. Some are unofficial
          practice projects; team work is credited.
        </p>
      </div>
      <div className="project-carousel" aria-label="Project folders">
        <button
          className="project-carousel-arrow project-carousel-previous"
          type="button"
          aria-label="Previous project"
          onClick={() =>
            setCurrentIndex(
              (index) => (index - 1 + folders.length) % folders.length,
            )
          }>
          ←
        </button>
        <div className="project-carousel-stage">
          {folders.map((folder, index) => (
            <div
              className={
                "project-slide " +
                (index === currentIndex
                  ? "project-slide-active"
                  : index ===
                      (currentIndex - 1 + folders.length) % folders.length
                    ? "project-slide-previous"
                    : index === (currentIndex + 1) % folders.length
                      ? "project-slide-next"
                      : "project-slide-hidden")
              }
              key={folder.id}>
              <button
                type="button"
                className={
                  "folder-card folder-" +
                  folder.color +
                  (opened === folder.id ? " folder-active" : "") +
                  " w-100 h-100"
                }
                onClick={() => {
                  window.clearTimeout(closeTimer.current);
                  setIsClosing(false);
                  if (index === currentIndex) setOpened(folder.id);
                  else setCurrentIndex(index);
                }}
                aria-haspopup={index === currentIndex ? "dialog" : undefined}
                aria-label={
                  (index === currentIndex ? "Open " : "Select ") +
                  folder.name +
                  " folder"
                }>
                <span className="folder-tab" />
                <span className="folder-paper">
                  <span className="folder-preview">
                    {folder.images.slice(0, 2).map(([name, image]) => (
                      <img
                        key={name}
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </span>
                </span>
              </button>
              <p className="project-slide-title">{folder.name}</p>
            </div>
          ))}
        </div>
        <button
          className="project-carousel-arrow project-carousel-next"
          type="button"
          aria-label="Next project"
          onClick={() =>
            setCurrentIndex((index) => (index + 1) % folders.length)
          }>
          →
        </button>
      </div>
      <div className="project-carousel-counter" aria-live="polite">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <i />
        {String(folders.length).padStart(2, "0")}
      </div>

      {active &&
        createPortal(
          <>
            <div
              className={
                "folder-overlay" + (isClosing ? " folder-overlay-closing" : "")
              }
              role="presentation"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) closeFolder();
              }}>
              <div
                className={"folder-dialog folder-" + active.color}
                role="dialog"
                aria-modal="true"
                aria-labelledby="folder-dialog-title">
                <div className="folder-dialog-top">
                  <button
                    onClick={closeFolder}
                    aria-label="Close project folder">
                    CLOSE <b>×</b>
                  </button>
                </div>
                <h3 id="folder-dialog-title">
                  {active.name}
                  <span> ↘</span>
                </h3>
                <div className="folder-gallery">
                  {active.images.map(([name, image], i) => (
                    <figure
                      className={"gallery-photo gallery-photo-" + i}
                      key={name}
                      style={{
                        "--image-index": i,
                        "--image-count": active.images.length,
                      }}>
                      <button
                        className="gallery-photo-button"
                        type="button"
                        onClick={() => setSelectedImage(i)}
                        aria-label={"View " + name + " image"}>
                        <img
                          src={image}
                          alt={name + " design image"}
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                      <figcaption></figcaption>
                    </figure>
                  ))}
                </div>
                <div className="folder-dialog-foot">
                  <button onClick={closeFolder}>BACK TO FOLDERS ↑</button>
                </div>
              </div>
            </div>
            {selectedImage !== null && (
              <div
                className="image-lightbox"
                role="presentation"
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setSelectedImage(null);
                }}>
                <div
                  className="image-lightbox-dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-label={active.images[selectedImage][0] + " image"}>
                  <button
                    className="image-lightbox-close"
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close image">
                    ×
                  </button>
                  <button
                    className="image-lightbox-arrow"
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        (index) =>
                          (index - 1 + active.images.length) %
                          active.images.length,
                      )
                    }
                    aria-label="Previous image">
                    ←
                  </button>
                  <img
                    src={active.images[selectedImage][1]}
                    alt={active.images[selectedImage][0] + " design image"}
                    loading="eager"
                    decoding="async"
                  />
                  <button
                    className="image-lightbox-arrow"
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        (index) => (index + 1) % active.images.length,
                      )
                    }
                    aria-label="Next image">
                    →
                  </button>
                </div>
              </div>
            )}
          </>,
          document.body,
        )}
    </section>
  );
}
