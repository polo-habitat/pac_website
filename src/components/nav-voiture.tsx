/**
 * Petite voiture P.A.C. du header : silhouette maison, vitres jaunes,
 * roues qui tournent avec le scroll (CSS pur, `.pac-roue`).
 */
export function NavVoiture({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 26"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* carrosserie */}
      <path
        d="M6 18c-2.2 0-3.6-1.2-3.6-3.2 0-1.5.7-2.6 2.1-3.1l4.6-1.6 4.3-4.7C14.6 4 16 3.4 17.6 3.4h10.9c1.6 0 3.1.6 4.2 1.8l4.5 4.6 2.6.9c1.3.5 2 1.6 2 3 0 2-1.4 3.3-3.6 3.3H6Z"
        fill="currentColor"
      />
      {/* vitres */}
      <path
        d="M16.2 9.6l3-3.3c.5-.5 1.1-.8 1.8-.8h2.4v4.1h-7.2Zm9.6 0V5.5h2.7c.7 0 1.4.3 1.9.8l3 3.3h-7.6Z"
        fill="var(--jaune)"
      />
      {/* roues (groupes pac-roue : rotation liée au scroll) */}
      <g className="pac-roue">
        <circle cx="12.5" cy="18.5" r="5.4" fill="currentColor" />
        <circle cx="12.5" cy="18.5" r="2.4" fill="#fff" />
        <rect x="11.9" y="13.8" width="1.2" height="3.2" rx="0.6" fill="#fff" />
        <rect x="11.9" y="20" width="1.2" height="3.2" rx="0.6" fill="#fff" />
      </g>
      <g className="pac-roue">
        <circle cx="33.5" cy="18.5" r="5.4" fill="currentColor" />
        <circle cx="33.5" cy="18.5" r="2.4" fill="#fff" />
        <rect x="32.9" y="13.8" width="1.2" height="3.2" rx="0.6" fill="#fff" />
        <rect x="32.9" y="20" width="1.2" height="3.2" rx="0.6" fill="#fff" />
      </g>
    </svg>
  );
}
