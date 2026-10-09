const shapes = {
  arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
  arrowDown: <path d="M12 4v16m0 0 7-7m-7 7-7-7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 5-5m-5 5-5-5" />
      <path d="M5 17v3h14v-3" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.2V13H10v8h3.4Z"
    />
  ),
  linkedin: (
    <>
      <path d="M5 9v10M5 5v.1M10 19v-6a4 4 0 0 1 8 0v6M10 10v9" />
      <circle cx="5" cy="5" r="1" />
    </>
  ),
  design: (
    <>
      <path d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  prototype: (
    <>
      <path d="M5 3v15l4-4 3 6 2-1-3-6h6L5 3Z" />
      <path d="M17 4v4m-2-2h4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  pen: (
    <>
      <path d="m4 16-.8 4.8L8 20l11-11-4-4L4 16Z" />
      <path d="m13.5 6.5 4 4M3 21h18" />
    </>
  ),
  office: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
};
export default function Icon({ name, size = 18, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false">
      {shapes[name] || shapes.design}
    </svg>
  );
}
