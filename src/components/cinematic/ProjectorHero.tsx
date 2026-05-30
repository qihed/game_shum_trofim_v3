export function ProjectorHero() {
  return (
    <div className="projectorHero" aria-hidden="true">
      <svg
        className="projectorHero__svg"
        viewBox="0 0 520 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="170" cy="334" rx="140" ry="14" fill="rgba(0,0,0,0.62)" />

        {/* Tripod */}
        <path
          d="M140 232L88 336M180 232L168 336M164 232L120 336"
          stroke="#2a1f12"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M140 232L88 336M180 232L168 336M164 232L120 336"
          stroke="#5b4326"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Camera body */}
        <path
          d="M116 108C116 98 124 90 134 90H276C286 90 294 98 294 108V246C294 256 286 264 276 264H134C124 264 116 256 116 246V108Z"
          fill="url(#metal)"
          stroke="#4a3820"
          strokeWidth="2.2"
          filter="url(#metalNoise)"
        />
        <path
          d="M124 104C124 98 129 93 135 93H271C277 93 282 98 282 104V238C282 244 277 249 271 249H135C129 249 124 244 124 238V104Z"
          fill="url(#metalInner)"
          opacity="0.85"
        />
        <path
          d="M132 108H278V126H132V108Z"
          fill="#1a140e"
          opacity="0.9"
        />
        <path
          d="M132 238H278V252H132V238Z"
          fill="#1a140e"
          opacity="0.65"
        />

        {/* Film reel (top) */}
        <circle cx="160" cy="72" r="54" fill="#0d0a07" stroke="#6b5030" strokeWidth="2.5" />
        <circle cx="160" cy="72" r="42" fill="#14100a" stroke="#8a6538" strokeWidth="1.5" />
        <circle cx="160" cy="72" r="10" fill="#0d0a07" stroke="#b88a45" strokeWidth="1.2" />
        <path
          d="M160 30V114M118 72H202M132 44L188 100M188 44L132 100"
          stroke="#6b5030"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Lens block */}
        <path
          d="M294 138H340C352 138 362 148 362 160V196C362 208 352 218 340 218H294V138Z"
          fill="url(#metalDark)"
          stroke="#4a3820"
          strokeWidth="2"
        />
        <circle cx="350" cy="178" r="32" fill="#0b0907" stroke="#8a6538" strokeWidth="2.2" />
        <circle cx="350" cy="178" r="18" fill="#14100a" stroke="#b88a45" strokeWidth="1.6" opacity="0.9" />
        <circle cx="350" cy="178" r="6" fill="#e1c083" opacity="0.75" />
        <circle cx="350" cy="178" r="48" fill="url(#lensGlow)" opacity="0.55" />

        {/* Control knobs */}
        <circle cx="150" cy="170" r="12" fill="#0d0a07" stroke="#4a3820" strokeWidth="1.5" />
        <circle cx="186" cy="170" r="10" fill="#0d0a07" stroke="#4a3820" strokeWidth="1.3" />
        <rect x="138" y="204" width="62" height="16" rx="4" fill="#0d0a07" stroke="#4a3820" strokeWidth="1.2" />

        {/* Beam */}
        <path
          d="M368 178C416 156 466 142 520 134V222C466 214 416 200 368 178Z"
          fill="url(#beamFill)"
          opacity="0.9"
        />
        <path
          d="M372 178C424 155 472 145 520 138"
          stroke="url(#beamLine)"
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.22"
        />
        <defs>
          <filter id="metalNoise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.28 0"
              result="n"
            />
            <feComposite in="SourceGraphic" in2="n" operator="arithmetic" k1="1" k2="0.15" k3="0" k4="0" />
          </filter>

          <linearGradient id="metal" x1="116" y1="90" x2="294" y2="264">
            <stop offset="0" stopColor="#0c0a07" />
            <stop offset="0.35" stopColor="#171109" />
            <stop offset="0.7" stopColor="#0e0b07" />
            <stop offset="1" stopColor="#070605" />
          </linearGradient>
          <linearGradient id="metalInner" x1="124" y1="93" x2="282" y2="249">
            <stop offset="0" stopColor="#1a140e" stopOpacity="0.9" />
            <stop offset="0.45" stopColor="#0c0a07" stopOpacity="0.85" />
            <stop offset="1" stopColor="#060504" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="metalDark" x1="294" y1="138" x2="362" y2="218">
            <stop offset="0" stopColor="#0b0907" />
            <stop offset="0.6" stopColor="#15100a" />
            <stop offset="1" stopColor="#090705" />
          </linearGradient>

          <radialGradient id="lensGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(350 178) rotate(90) scale(48)">
            <stop stopColor="#e1c083" stopOpacity="0.18" />
            <stop offset="0.35" stopColor="#e1c083" stopOpacity="0.10" />
            <stop offset="1" stopColor="#e1c083" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="beamFill" x1="362" y1="178" x2="520" y2="178">
            <stop stopColor="#e1c083" stopOpacity="0.18" />
            <stop offset="0.35" stopColor="#e1c083" stopOpacity="0.1" />
            <stop offset="1" stopColor="#e1c083" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beamLine" x1="362" y1="178" x2="520" y2="178">
            <stop stopColor="#e1c083" stopOpacity="0.65" />
            <stop offset="1" stopColor="#e1c083" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="projectorHero__lensGlow" />
    </div>
  )
}
