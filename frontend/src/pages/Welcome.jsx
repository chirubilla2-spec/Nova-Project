import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkle, X } from "lucide-react";

/**
 * Luma-inspired Welcome screen — light pastel, floating 3D-emoji-like elements,
 * Get Started CTA opens a bottom-sheet with Continue with Phone/Email/Apple/Google.
 */
export default function Welcome() {
  const navigate = useNavigate();
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <div className="welcome-shell" data-testid="welcome-screen">
      {/* Floating orbits */}
      <div className="welcome-stage">
        <div className="welcome-ring r1" />
        <div className="welcome-ring r2" />
        <div className="welcome-ring r3" />

        {/* Center sparkle */}
        <div className="welcome-center" data-testid="welcome-sparkle">
          <Sparkle size={42} className="text-white" fill="url(#welcomeGrad)" strokeWidth={1.2} />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="welcomeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff8a65" />
                <stop offset="50%" stopColor="#ff5fa2" />
                <stop offset="100%" stopColor="#a36bff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating elements (emoji 3D-ish) */}
        <FloatingItem className="float-a" emoji="📅" />
        <FloatingItem className="float-b" emoji="🎟️" />
        <FloatingItem className="float-c" emoji="🌐" />
        <FloatingItem className="float-d" emoji="🎉" />

        {/* Avatar pins */}
        <Avatar className="ava-1" src="https://i.pravatar.cc/100?img=12" />
        <Avatar className="ava-2" src="https://i.pravatar.cc/100?img=32" />
        <Avatar className="ava-3" src="https://i.pravatar.cc/100?img=15" />
        <Avatar className="ava-4" src="https://i.pravatar.cc/100?img=47" />
        <Avatar className="ava-5" src="https://i.pravatar.cc/100?img=68" />

        {/* Map pin floating */}
        <div className="map-pin">
          <svg viewBox="0 0 64 80" width="64" height="80" aria-hidden>
            <defs>
              <linearGradient id="pinGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c46bff" />
                <stop offset="100%" stopColor="#7a3fff" />
              </linearGradient>
            </defs>
            <path d="M32 2C16 2 4 14 4 30c0 18 22 42 28 48 6-6 28-30 28-48C60 14 48 2 32 2z" fill="url(#pinGrad)" />
            <circle cx="32" cy="28" r="9" fill="#0a0a0e" />
          </svg>
        </div>
      </div>

      {/* Bottom content */}
      <div className="welcome-bottom">
        <p className="font-mono text-xs tracking-[0.4em] text-black/45">nova<span className="text-[#a36bff]">+</span></p>
        <h1 className="welcome-title">
          Delightful Business
          <br />
          <span className="welcome-gradient">Start Here</span>
        </h1>
        <button
          data-testid="welcome-get-started"
          onClick={() => setOpenSheet(true)}
          className="welcome-cta"
        >
          Get Started
        </button>
      </div>

      {/* Bottom sheet */}
      {openSheet && (
        <div className="sheet-backdrop" onClick={() => setOpenSheet(false)}>
          <div className="get-started-sheet fade-up" onClick={(e) => e.stopPropagation()} data-testid="get-started-sheet">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-black grid place-items-center">
                <Sparkle size={18} className="text-white" fill="white" />
              </div>
              <button onClick={() => setOpenSheet(false)} className="w-9 h-9 rounded-full bg-black/5 grid place-items-center text-black/60" data-testid="sheet-close">
                <X size={16} />
              </button>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">Get Started</h3>
            <p className="text-sm text-black/55 mt-1.5 leading-snug">
              Register for services, subscribe to plans and manage business workflows in one place.
            </p>

            <div className="space-y-2.5 mt-5">
              <button
                data-testid="continue-phone"
                onClick={() => navigate("/signup?method=phone")}
                className="w-full bg-black text-white py-3.5 rounded-2xl text-sm font-semibold hover:bg-black/90 transition"
              >
                Continue with Phone
              </button>
              <button
                data-testid="continue-email"
                onClick={() => navigate("/signup?method=email")}
                className="w-full bg-black/5 text-black py-3.5 rounded-2xl text-sm font-semibold hover:bg-black/10 transition"
              >
                Continue with Email
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  data-testid="continue-apple"
                  onClick={() => navigate("/signup?method=apple")}
                  className="bg-black/5 py-3.5 rounded-2xl flex items-center justify-center hover:bg-black/10 transition"
                  aria-label="Continue with Apple"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7 1.6c0 1-.4 2-1.1 2.7-.8.9-2 1.5-3.1 1.4-.1-1 .4-2.1 1.1-2.8.8-.8 2.1-1.4 3.1-1.3zm3.4 16.4c-.6 1.2-.9 1.8-1.6 2.9-1 1.6-2.4 3.5-4.2 3.5-1.6 0-2-1-4.1-1-2.1 0-2.6 1-4.1 1-1.7 0-3-1.7-4-3.3-2.8-4.4-3.1-9.7-1.4-12.5 1.2-2 3.2-3.2 5-3.2 1.9 0 3 1 4.5 1 1.5 0 2.4-1 4.6-1 1.7 0 3.4.9 4.7 2.5-4.1 2.3-3.4 8.3.6 10.1z" /></svg>
                </button>
                <button
                  data-testid="continue-google"
                  onClick={() => navigate("/signup?method=google")}
                  className="bg-black/5 py-3.5 rounded-2xl flex items-center justify-center hover:bg-black/10 transition font-extrabold"
                  aria-label="Continue with Google"
                >
                  <span className="text-xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>G</span>
                </button>
              </div>
              <button
                data-testid="open-login"
                onClick={() => navigate("/login")}
                className="w-full text-center text-xs text-black/55 mt-3 py-2 hover:text-black"
              >
                Already a member? <span className="font-semibold underline">Log in</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingItem({ className, emoji }) {
  return <div className={`floating-emoji ${className}`}>{emoji}</div>;
}

function Avatar({ className, src }) {
  return (
    <div className={`welcome-avatar ${className}`}>
      <img src={src} alt="" />
    </div>
  );
}
