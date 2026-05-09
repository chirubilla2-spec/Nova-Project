import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import { ArrowUpRight } from "lucide-react";

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
        <p className="text-[10px] tracking-[0.3em] text-white/45 font-mono">DISCOVER THE EXPERTISE</p>
        <h1 className="font-display text-[34px] font-extrabold tracking-tight leading-[0.95] text-white lowercase">
          portfolio<span className="text-[var(--cred-lime)]">.</span>
        </h1>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5" data-testid="portfolio-filters">
        {cats.map((c) => (
          <button
            key={c}
            data-testid={`filter-${c.toLowerCase()}`}
            onClick={() => setFilter(c)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[12px] font-semibold transition-colors lowercase ${
              filter === c
                ? "cta-lime border-transparent"
                : "chip hover:bg-white/8"
            }`}
          >
            {c.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide -mx-5 px-5 mt-4">
        {filtered[0] && (
          <a
            data-testid={`portfolio-feature-${filtered[0].id}`}
            className="block rounded-3xl overflow-hidden surface relative group"
          >
            <img src={filtered[0].cover} alt="" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--cred-lime)] font-mono">{filtered[0].category}</p>
                <p className="font-display text-2xl font-extrabold tracking-tight leading-tight text-white lowercase mt-1">{filtered[0].title}</p>
              </div>
              <span className="cta-lime w-10 h-10 rounded-full grid place-items-center">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
        )}

        <div className="grid grid-cols-3 gap-2 mt-3" data-testid="portfolio-grid">
          {filtered.slice(1).map((it) => (
            <a key={it.id} data-testid={`portfolio-${it.id}`} className="block surface rounded-2xl overflow-hidden group">
              <div className="aspect-square bg-white/5 overflow-hidden">
                <img src={it.cover} alt="" className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-2">
                <p className="text-[10px] font-bold leading-tight truncate text-white lowercase">{it.title}</p>
                <p className="text-[9px] text-[var(--cred-lime)] font-mono">{it.category.toLowerCase()}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center" data-testid="portfolio-stats">
          <Stat n="120+" l="projects" />
          <Stat n="40" l="brands" />
          <Stat n="14" l="industries" />
        </div>

        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}

function Stat({ n, l }) {
  return (
    <div className="surface rounded-2xl py-3">
      <p className="font-display text-2xl font-extrabold tracking-tight text-white">{n}</p>
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 font-mono">{l}</p>
    </div>
  );
}
