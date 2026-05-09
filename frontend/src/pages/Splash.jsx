import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { Search, Mic, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Splash() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] tracking-[0.3em] text-black/50">NOVACNKT</span>
          <span className="text-[11px] tracking-[0.3em] text-black/50">v1.0</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <div className="relative mb-6 fade-up">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(244,184,168,.55),transparent_60%)] blur-xl" />
            <div className="relative w-20 h-20 rounded-3xl bg-black grid place-items-center">
              <Sparkles size={32} className="text-[var(--nova-peach)]" strokeWidth={2.4} />
            </div>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight text-black fade-up">NOVA</h1>
          <p className="mt-3 text-sm text-black/70 max-w-[260px] fade-up" style={{ animationDelay: ".1s" }}>
            Your AI-powered digital companion for the next era of business.
          </p>

          <div className="mt-12 w-full max-w-sm fade-up" style={{ animationDelay: ".2s" }}>
            <form
              data-testid="splash-search-form"
              onSubmit={(e) => { e.preventDefault(); navigate(`/home${q ? `?q=${encodeURIComponent(q)}` : ""}`); }}
              className="flex items-center gap-2 bg-[var(--nova-peach-light)] rounded-full pl-4 pr-1.5 py-1.5 border border-black/10"
            >
              <Mic size={18} className="text-black/70" />
              <input
                data-testid="splash-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ask Nova anything…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-black/40 py-2"
              />
              <button
                type="submit"
                data-testid="splash-search-submit"
                className="w-9 h-9 rounded-full bg-[var(--nova-peach-deep)] grid place-items-center hover:bg-black hover:text-white transition-colors"
                aria-label="search"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pb-2 flex items-center justify-center gap-2">
          <Button
            data-testid="splash-enter-btn"
            onClick={() => navigate("/home")}
            className="rounded-full px-6 bg-black text-white hover:bg-black/85"
          >
            Enter the Vertical
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
