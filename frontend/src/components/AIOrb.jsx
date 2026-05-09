import React from "react";

/**
 * Animated AI Orb — pulsing core with ripple rings + orbiting particles.
 */
export default function AIOrb({ size = 84, className = "", thinking = false }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" width={size} height={size} className="block">
        <defs>
          <radialGradient id="orbCore" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#f5ffd5" />
            <stop offset="40%" stopColor="#ffd93d" />
            <stop offset="100%" stopColor="#5a7a14" />
          </radialGradient>
          <radialGradient id="orbHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,217,61,0.55)" />
            <stop offset="100%" stopColor="rgba(255,217,61,0)" />
          </radialGradient>
          <filter id="orbBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* halo */}
        <circle cx="50" cy="50" r="46" fill="url(#orbHalo)">
          <animate attributeName="r" values="42;48;42" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ripple rings */}
        <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,217,61,0.5)" strokeWidth="0.6">
          <animate attributeName="r" values="20;42" dur={thinking ? "1.2s" : "2.4s"} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur={thinking ? "1.2s" : "2.4s"} repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(107,92,255,0.4)" strokeWidth="0.5">
          <animate attributeName="r" values="20;46" dur={thinking ? "1.6s" : "3.2s"} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur={thinking ? "1.6s" : "3.2s"} repeatCount="indefinite" />
        </circle>

        {/* orbiting dots */}
        <g style={{ transformOrigin: "50px 50px", animation: "orb-rotate 6s linear infinite" }}>
          <circle cx="50" cy="14" r="1.4" fill="#ffd93d" filter="url(#orbBlur)" />
        </g>
        <g style={{ transformOrigin: "50px 50px", animation: "orb-rotate-rev 8s linear infinite" }}>
          <circle cx="50" cy="86" r="1.1" fill="#6b5cff" filter="url(#orbBlur)" />
        </g>

        {/* core */}
        <circle cx="50" cy="50" r="16" fill="url(#orbCore)">
          <animate attributeName="r" values="14;17;14" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="46" cy="44" r="4" fill="rgba(255,255,255,0.7)" filter="url(#orbBlur)" />
      </svg>

      <style>{`
        @keyframes orb-rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes orb-rotate-rev { from { transform: rotate(0); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}
