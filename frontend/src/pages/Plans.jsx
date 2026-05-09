import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import { Check, Sparkles, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [active, setActive] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    axios.get(`${API}/plans`).then((r) => {
      setPlans(r.data);
      const def = r.data.find((p) => p.highlighted) || r.data[0];
      setActive(def?.id);
    }).catch(console.error);
  }, []);

  const onPay = async () => {
    if (!active) return;
    setPaying(true);
    try {
      const { data } = await axios.post(`${API}/payments`, { plan_id: active });
      toast.success(`payment ${data.status} · $${data.amount}`);
    } catch {
      toast.error("payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <PhoneFrame>
      <div data-testid="plans-topbar">
        <p className="text-[10px] tracking-[0.3em] text-white/45 font-mono">DISCOVER THE EXPERTISE</p>
        <h1 className="font-display text-[34px] font-extrabold tracking-tight leading-[0.95] text-white lowercase">
          choose a plan<br />that <span className="font-serif-i text-[var(--cred-lime)]">moves with you.</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide -mx-5 px-5 mt-5">
        <div className="space-y-3" data-testid="plan-list">
          {plans.map((p) => {
            const isActive = active === p.id;
            return (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                data-testid={`plan-${p.tier.toLowerCase()}`}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(p.id); } }}
                className={`cursor-pointer outline-none focus:ring-2 focus:ring-[var(--cred-lime)]/40 rounded-3xl transition-all duration-300 ${
                  isActive ? "" : "surface hover:bg-white/[0.06]"
                }`}
              >
                {isActive ? (
                  <div className="plan-premium rounded-3xl p-5 relative overflow-hidden">
                    <div className="absolute -top-12 -right-10 w-44 h-44 rounded-full bg-[var(--cred-lime)] opacity-15 blur-3xl" />
                    <div className="flex items-start justify-between relative">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] text-[var(--cred-lime)] font-mono">CURRENT · BEST VALUE</p>
                        <h3 className="font-display text-4xl font-extrabold mt-1 lowercase text-white">{p.tier}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/55 font-mono">USD / mo</p>
                        <p className="font-display text-3xl font-extrabold text-white">${p.price}</p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-2 relative">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[13px] text-white/90">
                          <span className="w-5 h-5 rounded-full bg-[var(--cred-lime)] text-black grid place-items-center"><Check size={12} strokeWidth={3} /></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      data-testid="pay-now-btn"
                      onClick={(e) => { e.stopPropagation(); onPay(); }}
                      disabled={paying}
                      className="cta-lime mt-5 w-full py-3.5 rounded-2xl tracking-[0.25em] text-sm uppercase disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {paying ? "processing…" : <>pay now <ArrowRight size={14} /></>}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 font-mono">plan</p>
                      <h3 className="font-display text-2xl font-extrabold tracking-tight text-white lowercase">{p.tier}</h3>
                      <p className="text-[11px] text-white/55 mt-0.5">{p.features.length} features included</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-extrabold text-white">${p.price}</p>
                      <p className="text-[10px] text-white/45 font-mono">/mo</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-2 text-[10px] text-white/55 font-mono">
          <Lock size={11} /> SECURE CHECKOUT · CANCEL ANYTIME
        </div>

        <div className="mt-3 surface-elevated rounded-2xl p-4 flex items-center gap-3" data-testid="plans-cta">
          <Sparkles size={18} className="text-[var(--cred-lime)]" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">need something custom?</p>
            <p className="text-[11px] text-white/55 font-mono">talk to a nova strategist.</p>
          </div>
          <ArrowRight size={16} className="text-white/55" />
        </div>
        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}
