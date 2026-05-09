import React from "react";

/**
 * Animated SVG vault — CRED-style.
 * Pure SVG + CSS, no deps. Layered ring rotates, dial pulses, lime sparks orbit.
 */
export default function VaultAnimation({ size = 160, className = "" }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 200 200" width={size} height={size} className="block">
        <defs>
          <radialGradient id="vaultBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a22" />
            <stop offset="100%" stopColor="#07070a" />
          </radialGradient>
          <linearGradient id="vaultRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4ff54" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d4ff54" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6b5cff" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="dial" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a35" />
            <stop offset="100%" stopColor="#0e0e12" />
          </linearGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* outer halo */}
        <circle cx="100" cy="100" r="92" fill="url(#vaultBg)" stroke="rgba(255,255,255,0.06)" />

        {/* rotating dashed ring */}
        <g style={{ transformOrigin: "100px 100px", animation: "vault-rotate 18s linear infinite" }}>
          <circle cx="100" cy="100" r="78" fill="none" stroke="url(#vaultRim)" strokeWidth="1.2" strokeDasharray="3 6" />
        </g>

        {/* counter-rotate inner ring */}
        <g style={{ transformOrigin: "100px 100px", animation: "vault-rotate-rev 26s linear infinite" }}>
          <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(212,255,84,0.22)" strokeWidth="0.8" strokeDasharray="1 4" />
        </g>

        {/* tick marks every 30deg */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="20"
            x2="100"
            y2="26"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}

        {/* dial body */}
        <circle cx="100" cy="100" r="46" fill="url(#dial)" stroke="rgba(255,255,255,0.10)" />
        <circle cx="100" cy="100" r="46" fill="none" stroke="rgba(212,255,84,0.10)" filter="url(#glow)" />

        {/* spokes */}
        <g style={{ transformOrigin: "100px 100px", animation: "vault-rotate 10s linear infinite" }}>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect
              key={deg}
              x="98.5"
              y="58"
              width="3"
              height="14"
              rx="1.5"
              fill="rgba(212,255,84,0.85)"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </g>

        {/* center hub */}
        <circle cx="100" cy="100" r="14" fill="#0a0a0e" stroke="#d4ff54" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="4" fill="#d4ff54">
          <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* orbiting spark */}
        <g style={{ transformOrigin: "100px 100px", animation: "vault-rotate 6s linear infinite" }}>
          <circle cx="100" cy="22" r="2.5" fill="#d4ff54" filter="url(#glow)" />
        </g>
        <g style={{ transformOrigin: "100px 100px", animation: "vault-rotate-rev 8s linear infinite" }}>
          <circle cx="100" cy="178" r="1.8" fill="#6b5cff" filter="url(#glow)" />
        </g>

        {/* status text */}
        <text
          x="100"
          y="160"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="6"
          fill="rgba(255,255,255,0.45)"
          letterSpacing="2"
        >
          NOVA · SECURE
        </text>
      </svg>

      <style>{`
        @keyframes vault-rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes vault-rotate-rev { from { transform: rotate(0); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}
