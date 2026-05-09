import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import { Search, ChevronRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Explore() {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    Promise.all([axios.get(`${API}/services`), axios.get(`${API}/industries`)])
      .then(([s, i]) => { setServices(s.data); setIndustries(i.data); })
      .catch(console.error);
  }, []);

  return (
    <PhoneFrame>
      <div className="flex items-center justify-between" data-testid="explore-topbar">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-white/45 font-mono">EXPLORE</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white lowercase">find what fits<span className="text-[var(--cred-lime)]">.</span></h1>
        </div>
        <button className="cta-lime w-10 h-10 rounded-full grid place-items-center">
          <Search size={16} />
        </button>
      </div>

      <div className="mt-5 surface rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2">
        <Search size={16} className="text-white/55" />
        <input
          data-testid="explore-search"
          placeholder="search services, industries…"
          className="flex-1 bg-transparent outline-none text-sm py-2 text-white placeholder:text-white/35"
        />
      </div>

      <div className="overflow-y-auto scrollbar-hide flex-1 -mx-5 px-5 mt-5">
        <section data-testid="about-section">
          <h2 className="font-display text-lg font-extrabold tracking-tight text-white lowercase">about us</h2>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[1,2,3,4].map((n) => (
              <div key={n} className="aspect-square rounded-full surface grid place-items-center text-[11px] font-bold text-[var(--cred-lime)] font-mono">
                0{n}
              </div>
            ))}
          </div>
          <div className="mt-3 surface rounded-2xl p-4">
            <p className="text-sm leading-snug text-white/85">
              <span className="font-bold text-white">novacnkt</span> is a multi-disciplinary studio with a single conviction:
              the next generation of brands will be built around <span className="font-serif-i text-[var(--cred-lime)]">intelligence</span>, not just identity.
            </p>
          </div>
        </section>

        <section className="mt-7" data-testid="services-explore">
          <div className="flex items-end justify-between mb-2">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-white lowercase">browse services</h2>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/45 font-mono">{services.length} total</span>
          </div>
          <div className="space-y-2">
            {services.map((s, i) => (
              <button key={s.id} data-testid={`explore-service-${s.id}`} className="w-full flex items-center gap-3 p-3 surface rounded-2xl hover:bg-white/5 transition-colors text-left">
                <span className={`w-10 h-10 rounded-xl grid place-items-center font-bold ${i % 2 === 0 ? "bg-[var(--cred-lime)] text-black" : "bg-white/10 text-white border border-white/10"}`}>
                  {s.title.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{s.title}</p>
                  <p className="text-[11px] text-white/55">{s.blurb}</p>
                </div>
                <ChevronRight size={16} className="text-white/35" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-7" data-testid="others-section">
          <h2 className="font-display text-lg font-extrabold tracking-tight text-white lowercase">industries</h2>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {industries.map((i) => (
              <div key={i.id} data-testid={`explore-industry-${i.id}`} className="aspect-square rounded-full surface grid place-items-center text-center hover:ring-1 hover:ring-[var(--cred-lime)]/40 transition">
                <span className="text-[10px] font-bold leading-tight px-1 text-white">{i.name}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}
