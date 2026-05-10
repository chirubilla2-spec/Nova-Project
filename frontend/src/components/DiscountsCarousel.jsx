import React, { useEffect, useState } from "react";
import axios from "axios";
import { Zap, Flame } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ACCENTS = {
  lime: {
    bg: "linear-gradient(135deg, #ffe982 0%, #ffd93d 45%, #f5b61b 100%)",
    ink: "#0a0a0e",
    stub: "#caa215",
    bolt: "rgba(255,255,255,0.22)",
    apply: "#0a0a0e",
    applyText: "#ffd93d",
  },
  violet: {
    bg: "linear-gradient(135deg, #8a7bff 0%, #6b5cff 50%, #4736d8 100%)",
    ink: "#fff",
    stub: "#3a2db5",
    bolt: "rgba(255,255,255,0.20)",
    apply: "#0a0a0e",
    applyText: "#fff",
  },
  amber: {
    bg: "linear-gradient(135deg, #ffc170 0%, #ff9d4d 50%, #e26a1a 100%)",
    ink: "#0a0a0e",
    stub: "#b85610",
    bolt: "rgba(255,255,255,0.22)",
    apply: "#0a0a0e",
    applyText: "#ff9d4d",
  },
};

export default function DiscountsCarousel() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/discounts`).then((r) => setDiscounts(r.data)).catch(console.error);
  }, []);

  const apply = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast.success(`${code} applied · code copied`);
  };

  if (!discounts.length) return null;
  const featured = discounts.slice(0, 1);

  return (
    <section className="mt-7" data-testid="discounts-section">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-white lowercase">instant discounts</h3>
        <Flame size={18} className="text-[var(--cred-amber)]" fill="currentColor" />
      </div>

      <div className="-mx-5 px-5" data-testid="discounts-track">
        {featured.map((d) => {
          const a = ACCENTS[d.accent] || ACCENTS.lime;
          return (
            <div
              key={d.id}
              data-testid={`coupon-${d.code.toLowerCase()}`}
              className="coupon-compact"
            >
              <div className="coupon-card relative overflow-hidden rounded-2xl" style={{ background: a.bg, color: a.ink }}>
                <Zap
                  size={180}
                  className="absolute -right-6 -top-2 opacity-20 pointer-events-none"
                  fill="rgba(255,255,255,0.25)"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={1}
                />
                <div className="flex">
                  <div className="relative" style={{ background: a.stub, width: 44 }}>
                    <div className="absolute inset-y-0 -right-1.5 flex flex-col justify-evenly">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#0a0a0e]" />
                      ))}
                    </div>
                    <div className="h-full flex items-center justify-center py-3">
                      <span
                        className="font-display font-extrabold tracking-[0.35em] text-white text-[10px]"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        DISCOUNT
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 px-4 py-3 flex items-center gap-3 relative">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-xl font-extrabold tracking-tight leading-none">{d.code}</h4>
                      <p className="text-[12px] font-semibold opacity-95 mt-1 truncate">{d.description}</p>
                    </div>
                    <button
                      data-testid={`apply-${d.code.toLowerCase()}`}
                      onClick={() => apply(d.code)}
                      className="rounded-lg px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] transition active:scale-95"
                      style={{ background: a.apply, color: a.applyText }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
