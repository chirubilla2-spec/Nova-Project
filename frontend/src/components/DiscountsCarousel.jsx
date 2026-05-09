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
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios.get(`${API}/discounts`).then((r) => setDiscounts(r.data)).catch(console.error);
  }, []);

  const onScroll = (e) => {
    const w = e.currentTarget.clientWidth;
    setActive(Math.round(e.currentTarget.scrollLeft / w));
  };

  const apply = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast.success(`${code} applied · code copied`);
  };

  if (!discounts.length) return null;

  return (
    <section className="mt-7" data-testid="discounts-section">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-white lowercase">instant discounts</h3>
        <Flame size={18} className="text-[var(--cred-amber)]" fill="currentColor" />
      </div>

      <div
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 snap-x snap-mandatory"
        data-testid="discounts-track"
      >
        {discounts.map((d) => {
          const a = ACCENTS[d.accent] || ACCENTS.lime;
          return (
            <div
              key={d.id}
              data-testid={`coupon-${d.code.toLowerCase()}`}
              className="shrink-0 snap-center w-[88%] coupon"
              style={{ "--bg": a.bg, "--stub": a.stub, "--ink": a.ink }}
            >
              <div className="coupon-card relative overflow-hidden rounded-2xl" style={{ background: a.bg, color: a.ink }}>
                {/* big lightning bolt watermark */}
                <Zap
                  size={300}
                  className="absolute -right-12 -top-6 opacity-20 pointer-events-none"
                  fill="rgba(255,255,255,0.25)"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={1}
                />

                <div className="flex">
                  {/* Stub with vertical DISCOUNT label + perforation dots */}
                  <div className="relative" style={{ background: a.stub, width: 56 }}>
                    <div className="absolute inset-y-0 -right-1.5 flex flex-col justify-evenly">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="w-3 h-3 rounded-full bg-[#0a0a0e]" />
                      ))}
                    </div>
                    <div className="h-44 flex items-center justify-center">
                      <span
                        className="font-display font-extrabold tracking-[0.4em] text-white text-[14px]"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        DISCOUNT
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 p-4 flex flex-col justify-between min-h-[176px] relative">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-2xl font-extrabold tracking-tight leading-none">
                        {d.code}
                      </h4>
                      <button
                        data-testid={`apply-${d.code.toLowerCase()}`}
                        onClick={() => apply(d.code)}
                        className="rounded-lg px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] transition active:scale-95"
                        style={{ background: a.apply, color: a.applyText }}
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[13px] leading-snug font-semibold opacity-95 max-w-[88%]">
                      {d.description}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-mono opacity-70">
                      {d.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {discounts.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-[var(--cred-lime)]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
