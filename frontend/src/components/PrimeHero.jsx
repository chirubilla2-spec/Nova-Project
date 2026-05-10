import React from "react";
import { ArrowRight, Check, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * NOVA Prime — Amazon Prime membership card style hero.
 * Deep navy gradient + yellow accent (palette-faithful), wordmark + benefits + activate CTA.
 */
export default function PrimeHero() {
  const navigate = useNavigate();
  const benefits = ["Unlimited AI requests", "Priority delivery", "Exclusive discounts", "Dedicated strategist"];

  return (
    <div className="prime-hero" data-testid="prime-hero">
      {/* Repeating chip pattern */}
      <svg className="prime-hero-pattern" aria-hidden viewBox="0 0 200 200" preserveAspectRatio="none">
        <defs>
          <pattern id="primeDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.16)" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#primeDots)" />
      </svg>

      <div className="prime-hero-orb" />

      <div className="prime-hero-top">
        <div className="prime-hero-mark">
          <Crown size={14} className="text-[var(--cred-lime)]" />
          <span>nova prime</span>
        </div>
        <span className="prime-hero-tier">membership</span>
      </div>

      <h2 className="prime-hero-title">
        the smart way<br />to <span className="font-serif-i text-[var(--cred-lime)]">grow.</span>
      </h2>

      <ul className="prime-hero-benefits">
        {benefits.map((b) => (
          <li key={b}>
            <Check size={12} className="text-[var(--cred-lime)]" strokeWidth={3} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="prime-hero-foot">
        <div>
          <p className="prime-hero-amount">
            $9<span className="text-base">.99</span>
            <span className="text-xs font-normal opacity-65 ml-1">/mo</span>
          </p>
          <p className="prime-hero-trial">7-day free trial</p>
        </div>
        <button
          data-testid="prime-activate"
          onClick={() => navigate("/plans")}
          className="prime-hero-cta"
        >
          activate <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
