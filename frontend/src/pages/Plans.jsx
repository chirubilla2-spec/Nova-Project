import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import { Check, Sparkles, Lock } from "lucide-react";
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
      toast.success(`Payment ${data.status} · $${data.amount}`);
    } catch (e) {
      toast.error("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  const activePlan = plans.find((p) => p.id === active);

  return (
    <PhoneFrame>
      <div data-testid="plans-topbar">
        <p className="text-[11px] tracking-[0.3em] text-black/50">DISCOVER THE EXPERTISE</p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight leading-tight">
          Choose a plan that<br />moves with you.
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide -mx-5 px-5 mt-5">
        {/* Simple stack of plans */}
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
                className={`w-full text-left rounded-2xl border transition-all duration-300 p-4 cursor-pointer outline-none focus:ring-2 focus:ring-black/30 ${
                  isActive ? "border-transparent" : "border-black/10 bg-[var(--nova-peach-light)] hover:bg-[var(--nova-peach)]"
                }`}
              >
                {isActive ? (
                  <div className="plan-highlight rounded-2xl p-4 -m-4 relative overflow-hidden">
                    <div className="absolute -top-10 -right-8 w-40 h-40 rounded-full bg-white/15 blur-2xl" />
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] tracking-[0.3em] text-white/70">CURRENT</p>
                        <h3 className="font-display text-3xl font-black mt-1">{p.tier}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-white/60">USD / mo</p>
                        <p className="font-display text-2xl font-black">${p.price}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[12px] text-white/90">
                          <Check size={14} className="text-[var(--nova-peach)]" />{f}
                        </li>
                      ))}
                    </ul>
                    <button
                      data-testid="pay-now-btn"
                      onClick={(e) => { e.stopPropagation(); onPay(); }}
                      disabled={paying}
                      className="pay-btn mt-4 w-full py-3 rounded-xl tracking-widest text-sm uppercase disabled:opacity-60"
                    >
                      {paying ? "Processing…" : "Pay Now"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-black/50">Plan</p>
                      <h3 className="font-display text-xl font-extrabold tracking-tight">{p.tier}</h3>
                      <p className="text-[11px] text-black/60 mt-0.5">{p.features.length} features included</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-black">${p.price}</p>
                      <p className="text-[10px] text-black/50">/mo</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* footer note */}
        <div className="mt-5 flex items-center gap-2 text-[11px] text-black/60">
          <Lock size={12} /> Secure checkout · Cancel anytime
        </div>

        <div className="mt-3 rounded-2xl bg-black text-white p-4 flex items-center gap-3" data-testid="plans-cta">
          <Sparkles size={18} className="text-[var(--nova-peach)]" />
          <div>
            <p className="text-sm font-semibold">Need something custom?</p>
            <p className="text-[11px] text-white/60">Talk to a NOVA strategist.</p>
          </div>
        </div>
        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}
