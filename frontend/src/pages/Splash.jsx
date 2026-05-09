import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { ArrowRight, Mic, Sparkles } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] tracking-[0.35em] text-white/45 font-mono">NOVACNKT</span>
          <span className="text-[10px] tracking-[0.35em] text-white/45 font-mono">v1.0</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <div className="relative mb-8 fade-up">
            <div className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(212,255,84,0.25),transparent_60%)] blur-2xl glow-pulse" />
            <div className="relative w-20 h-20 rounded-3xl surface-elevated grid place-items-center">
              <Sparkles size={30} className="text-[var(--cred-lime)]" strokeWidth={2.4} />
            </div>
          </div>

          <h1 className="font-display text-7xl sm:text-8xl font-extrabold tracking-tight text-white fade-up">
            nova<span className="text-[var(--cred-lime)]">.</span>
          </h1>
          <p className="mt-3 text-sm text-white/65 max-w-[280px] fade-up" style={{ animationDelay: ".08s" }}>
            Your AI-powered <span className="font-serif-i text-white/85">digital companion</span> for the next era of business.
          </p>

          <div className="mt-12 w-full max-w-sm fade-up" style={{ animationDelay: ".15s" }}>
            <form
              data-testid="splash-search-form"
              onSubmit={(e) => { e.preventDefault(); navigate(`/home${q ? `?q=${encodeURIComponent(q)}` : ""}`); }}
              className="surface rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2"
            >
              <Mic size={18} className="text-white/55" />
              <input
                data-testid="splash-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ask nova anything…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/35 py-2 text-white"
              />
              <button
                type="submit"
                data-testid="splash-search-submit"
                className="cta-lime w-9 h-9 rounded-full grid place-items-center"
                aria-label="search"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[10px] text-white/45 font-mono fade-up" style={{ animationDelay: ".22s" }}>
            <span className="w-1 h-1 rounded-full bg-[var(--cred-lime)] glow-pulse" />
            INDIA'S MOST PREMIUM BUSINESS COMPANION
          </div>
        </div>

        <div className="pb-2 flex items-center justify-center gap-2 fade-up" style={{ animationDelay: ".3s" }}>
          <button
            data-testid="splash-enter-btn"
            onClick={() => navigate("/home")}
            className="cta-lime rounded-full px-6 py-3 text-sm uppercase tracking-[0.25em]"
          >
            enter →
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
