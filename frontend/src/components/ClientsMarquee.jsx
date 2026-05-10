import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ClientsMarquee() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get(`${API}/clients`).then((r) => setClients(r.data)).catch(() => {});
  }, []);

  if (!clients.length) return null;

  const loop = [...clients, ...clients];

  return (
    <section className="mt-7" data-testid="clients-section">
      <div className="flex items-end justify-between mb-3">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-white lowercase">our clients</h3>
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/45 font-mono">{clients.length}+ brands</span>
      </div>

      <div className="-mx-5">
        <div className="marquee">
          <div className="marquee-track clients-track">
            {loop.map((c, i) => (
              <div key={`${c.id}-${i}`} data-testid={`client-${c.id}`} className="client-chip">
                <span className="client-mark">
                  <Sparkle size={12} className="text-[var(--cred-lime)]" fill="currentColor" />
                </span>
                <div className="text-left leading-tight">
                  <p className="font-display text-base font-extrabold tracking-tight lowercase">{c.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/45 font-mono">{c.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
