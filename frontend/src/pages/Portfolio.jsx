import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import { ArrowUpRight, Filter } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get(`${API}/portfolio`).then((r) => setItems(r.data)).catch(console.error);
  }, []);

  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <PhoneFrame>
      <div data-testid="portfolio-topbar">
        <p className="text-[11px] tracking-[0.3em] text-black/50">DISCOVER THE EXPERTISE</p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight leading-tight">Portfolio.</h1>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5" data-testid="portfolio-filters">
        {cats.map((c) => (
          <button
            key={c}
            data-testid={`filter-${c.toLowerCase()}`}
            onClick={() => setFilter(c)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[12px] font-semibold transition-colors ${
              filter === c ? "bg-black text-white border-black" : "bg-white text-black border-black/15 hover:bg-[var(--nova-peach-light)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide -mx-5 px-5 mt-4">
        {/* feature tile */}
        {filtered[0] && (
          <a
            data-testid={`portfolio-feature-${filtered[0].id}`}
            className="block rounded-3xl overflow-hidden border border-black/10 relative group"
          >
            <img src={filtered[0].cover} alt="" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/70">{filtered[0].category}</p>
                <p className="font-display text-xl font-extrabold tracking-tight leading-tight">{filtered[0].title}</p>
              </div>
              <span className="w-9 h-9 rounded-full bg-[var(--nova-peach)] text-black grid place-items-center">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
        )}

        {/* grid 3-col like wireframe */}
        <div className="grid grid-cols-3 gap-2 mt-3" data-testid="portfolio-grid">
          {filtered.slice(1).map((it) => (
            <a key={it.id} data-testid={`portfolio-${it.id}`} className="block rounded-xl overflow-hidden border border-black/10 group">
              <div className="aspect-square bg-[var(--nova-peach)] overflow-hidden">
                <img src={it.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-1.5 bg-white">
                <p className="text-[10px] font-bold leading-tight truncate">{it.title}</p>
                <p className="text-[9px] text-black/50">{it.category}</p>
              </div>
            </a>
          ))}
        </div>

        {/* counters */}
        <div className="mt-5 grid grid-cols-3 gap-2 text-center" data-testid="portfolio-stats">
          <Stat n="120+" l="Projects" />
          <Stat n="40" l="Brands" />
          <Stat n="14" l="Industries" />
        </div>

        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}

function Stat({ n, l }) {
  return (
    <div className="rounded-2xl bg-white border border-black/10 py-3">
      <p className="font-display text-2xl font-black tracking-tight">{n}</p>
      <p className="text-[10px] uppercase tracking-widest text-black/50">{l}</p>
    </div>
  );
}
