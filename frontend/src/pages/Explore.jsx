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
          <p className="text-[11px] tracking-[0.3em] text-black/50">EXPLORE</p>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Find what fits.</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-black text-white grid place-items-center">
          <Search size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 bg-[var(--nova-peach-light)] rounded-full pl-4 pr-1.5 py-1.5 border border-black/10">
        <Search size={16} className="text-black/60" />
        <input data-testid="explore-search" placeholder="Search services, industries…" className="flex-1 bg-transparent outline-none text-sm py-2" />
      </div>

      <div className="overflow-y-auto scrollbar-hide flex-1 -mx-5 px-5 mt-4">
        {/* About us */}
        <section data-testid="about-section">
          <h2 className="font-display text-base font-extrabold tracking-tight">About us</h2>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[1,2,3,4].map((n) => (
              <div key={n} className="aspect-square rounded-full bg-[var(--nova-peach)] border border-black/10 grid place-items-center text-[10px] font-bold">
                0{n}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-white border border-black/10 p-4">
            <p className="text-sm leading-snug">
              <span className="font-bold">NOVACNKT</span> is a multi-disciplinary studio with a single conviction:
              the next generation of brands will be built around <em>intelligence</em>, not just identity.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mt-6" data-testid="services-explore">
          <div className="flex items-end justify-between mb-2">
            <h2 className="font-display text-base font-extrabold tracking-tight">Browse services</h2>
            <span className="text-[10px] uppercase tracking-widest text-black/50">{services.length} total</span>
          </div>
          <div className="space-y-2">
            {services.map((s) => (
              <button key={s.id} data-testid={`explore-service-${s.id}`} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-black/10 hover:bg-[var(--nova-peach-light)] transition-colors text-left">
                <span className="w-10 h-10 rounded-xl peach-card grid place-items-center font-bold text-black">{s.title.charAt(0)}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{s.title}</p>
                  <p className="text-[11px] text-black/60">{s.blurb}</p>
                </div>
                <ChevronRight size={16} className="text-black/40" />
              </button>
            ))}
          </div>
        </section>

        {/* Others */}
        <section className="mt-6" data-testid="others-section">
          <h2 className="font-display text-base font-extrabold tracking-tight">Industries</h2>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {industries.map((i) => (
              <div key={i.id} data-testid={`explore-industry-${i.id}`} className="aspect-square rounded-full peach-card-soft border border-black/10 grid place-items-center text-center">
                <span className="text-[10px] font-bold leading-tight px-1">{i.name}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}
