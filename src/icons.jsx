const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const GithubIcon = () => (
  <svg {...base}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
);
export const LinkedinIcon = () => (
  <svg {...base}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
export const MailIcon = () => (
  <svg {...base}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
export const ArrowIcon = () => (
  <svg {...base} width="16" height="16"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const SunIcon = () => (
  <svg {...base}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const MoonIcon = () => (
  <svg {...base}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg>
);

// Hand-drawn-ish shelf objects. Ink stroke + one accent fill.
const s = { viewBox: "0 0 64 64", fill: "none", stroke: "var(--ink)", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export function ShelfIcon({ kind }) {
  switch (kind) {
    case "manga":
      return (
        <svg {...s}>
          <rect x="16" y="6" width="32" height="52" rx="2" fill="var(--accent)" />
          <path d="M22 6v52" />
          <circle cx="36" cy="24" r="7" fill="var(--paper)" />
          <path d="M31 40h11M31 46h8" />
          <text x="34" y="54" fontSize="7" fontFamily="monospace" fill="var(--ink)" stroke="none" textAnchor="middle">∞</text>
        </svg>
      );
    case "book":
      return (
        <svg {...s}>
          <rect x="12" y="10" width="40" height="46" rx="2" fill="var(--c-load)" />
          <path d="M18 10v46M26 22h18M26 28h14" />
          <path d="M40 6v16l4-3 4 3V6" fill="var(--pink)" />
        </svg>
      );
    case "notebook":
      return (
        <svg {...s}>
          <rect x="14" y="8" width="38" height="50" rx="3" fill="var(--paper)" />
          <path d="M10 16h8M10 26h8M10 36h8M10 46h8" />
          <text x="33" y="30" fontSize="9" fontFamily="monospace" fontWeight="700" fill="var(--ink)" stroke="none" textAnchor="middle">DSA</text>
          <text x="33" y="42" fontSize="7" fontFamily="monospace" fill="var(--ink)" stroke="none" textAnchor="middle">java</text>
        </svg>
      );
    case "sticky":
      return (
        <svg {...s}>
          <path d="M12 12h40v30L40 54H12z" fill="#ffe066" />
          <path d="M40 54V42h12" />
          <path d="M18 22h26M18 30h22M18 38h14" />
        </svg>
      );
    case "badge":
      return (
        <svg {...s}>
          <path d="M22 40l-6 18 10-5 6 7 2-20M42 40l6 18-10-5-6 7" fill="var(--pink)" />
          <circle cx="32" cy="26" r="17" fill="#ff9f1c" />
          <text x="32" y="30" fontSize="10" fontFamily="monospace" fontWeight="700" fill="var(--ink)" stroke="none" textAnchor="middle">AWS</text>
        </svg>
      );
    case "duck":
      return (
        <svg {...s}>
          <path d="M14 42c0-9 8-14 18-12 1-9 5-16 13-16 6 0 9 5 8 10l6 2-6 3c-1 5-4 7-7 8 5 3 6 9 4 13-3 5-9 6-20 6-10 0-16-5-16-14z" fill="#ffd43b" />
          <circle cx="46" cy="21" r="1.8" fill="var(--ink)" />
          <path d="M22 44c4 4 12 4 16 0" />
        </svg>
      );
    case "mug":
      return (
        <svg {...s}>
          <path d="M14 22h30v26a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8z" fill="var(--paper)" />
          <path d="M44 28h4a6 6 0 0 1 0 12h-4" />
          <path d="M16 30h26" stroke="var(--accent)" strokeWidth="5" />
          <path d="M24 8c-2 3 2 5 0 9M34 8c-2 3 2 5 0 9" className="steam" />
        </svg>
      );
    case "star":
      return (
        <svg {...s}>
          <path d="M32 6l7 14 15 2-11 11 3 15-14-7-14 7 3-15L10 22l15-2z" fill="#ffd43b" />
          <path d="M26 50h12v8H26z" fill="var(--accent)" />
        </svg>
      );
    default:
      return null;
  }
}
