import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import ProfileDrawer from "../components/ProfileDrawer";
import DiscountsCarousel from "../components/DiscountsCarousel";
import PaymentsSection from "../components/PaymentsSection";
import { Bell, Sparkles, ArrowUpRight, Quote, TrendingUp, Play } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home() {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/services`),
      axios.get(`${API}/industries`),
      axios.get(`${API}/testimonials`),
      axios.get(`${API}/blogs`),
      axios.get(`${API}/profile`),
    ])
      .then(([s, i, t, b, p]) => {
        setServices(s.data); setIndustries(i.data);
        setTestimonials(t.data); setBlogs(b.data); setProfile(p.data);
      })
      .catch(console.error);
  }, []);

  return (
    <PhoneFrame>
      <div className="flex items-center justify-between" data-testid="home-topbar">
        <ProfileDrawer
          profile={profile}
          trigger={
            <button data-testid="open-profile" className="surface rounded-full p-1 hover:scale-105 transition">
              <img src={profile?.avatar || "https://i.pravatar.cc/80"} alt="me" className="w-9 h-9 rounded-full object-cover" />
            </button>
          }
        />
        <div className="surface rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-white/85 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cred-lime)] glow-pulse" />
          NOVA · LIVE
        </div>
        <button data-testid="notifications-btn" className="surface w-10 h-10 rounded-full grid place-items-center relative">
          <Bell size={16} className="text-white/85" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--cred-lime)]" />
        </button>
      </div>

      {/* Hero — premium credit-card-like surface */}
      <div className="mt-5 fade-up" data-testid="home-hero">
        <div className="surface-elevated rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[var(--cred-lime)] opacity-15 blur-3xl" />
          <div className="absolute -left-12 -bottom-16 w-44 h-44 rounded-full bg-[var(--cred-violet)] opacity-25 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-[34px] font-extrabold tracking-tight leading-[0.95] text-white">
              build with <span className="font-serif-i text-[var(--cred-lime)]">intent</span>.<br />
              ship with nova<span className="text-[var(--cred-lime)]">.</span>
            </h2>
            <div className="flex items-center gap-2 mt-5">
              <button className="cta-lime rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] flex items-center gap-1.5">
                discover <ArrowUpRight size={12} />
              </button>
              <button className="cta-dark rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]">watch reel</button>
            </div>
            <div className="divider-shine my-5" />
            <div className="grid grid-cols-3 gap-3 text-white">
              <Stat n="120+" l="projects" />
              <Stat n="40" l="brands" />
              <Stat n="4.9" l="rating" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hide flex-1 -mx-5 px-5 mt-2">
        <PaymentsSection />
        <DiscountsCarousel />

        <Section title="browse services" cta="see all" testid="services-section">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 snap-x">
            {services.map((s) => (
              <a
                key={s.id}
                data-testid={`service-${s.id}`}
                className="prime-card snap-start"
              >
                <img src={s.image} alt={s.title} className="prime-card-img" />
                <div className="prime-card-shade" />
                {s.badge && (
                  <span className={`prime-card-badge ${s.badge !== "PRIME" ? "muted" : ""}`}>
                    {s.badge === "PRIME" && <span style={{ marginRight: 4 }}>★</span>}
                    {s.badge}
                  </span>
                )}
                <div className="prime-card-body">
                  <p className="prime-card-title">{s.title}</p>
                  <p className="prime-card-blurb">{s.blurb}</p>
                </div>
                <span className="prime-card-arrow">
                  <Play size={14} fill="currentColor" />
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="industries we serve" testid="industries-section">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 snap-x">
            {industries.map((it, i) => {
              const badge = i === 0 ? "PRIME" : i === 1 ? "TRENDING" : i === 2 ? "NEW" : "";
              return (
                <a
                  key={it.id}
                  data-testid={`industry-${it.id}`}
                  className="prime-card snap-start"
                >
                  <img src={it.image} alt={it.name} className="prime-card-img" />
                  <div className="prime-card-shade" />
                  {badge && (
                    <span className={`prime-card-badge ${badge !== "PRIME" ? "muted" : ""}`}>
                      {badge === "PRIME" && <span style={{ marginRight: 4 }}>★</span>}
                      {badge}
                    </span>
                  )}
                  <div className="prime-card-body">
                    <p className="prime-card-title">{it.name}</p>
                    <p className="prime-card-blurb">{it.tagline}</p>
                  </div>
                  <span className="prime-card-arrow">
                    <Play size={14} fill="currentColor" />
                  </span>
                </a>
              );
            })}
          </div>
        </Section>

        <Section title="why choose us" testid="why-section">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { k: "AI-native", v: "Tools built around intelligent workflows." },
              { k: "Fast cycles", v: "Ideas to launch in 30-day sprints." },
              { k: "Senior team", v: "Every project led by founders." },
              { k: "Outcome-led", v: "We measure what truly matters." },
            ].map((c, i) => (
              <div key={i} className="surface rounded-2xl p-3.5">
                <p className="font-display text-3xl font-extrabold tracking-tight text-[var(--cred-lime)]">0{i + 1}</p>
                <p className="text-[12px] font-bold mt-1 text-white">{c.k}</p>
                <p className="text-[11px] text-white/55 mt-1 leading-snug">{c.v}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="testimonials" testid="testimonials-section">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {testimonials.map((t) => (
              <div key={t.id} data-testid={`testimonial-${t.id}`} className="shrink-0 w-72 rounded-2xl p-4 bg-white text-[#0a0a0e] border border-black/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
                <Quote size={16} className="text-[#caa215]" fill="currentColor" />
                <p className="text-sm leading-snug mt-2 font-serif-i">"{t.quote}"</p>
                <div className="flex items-center gap-2 mt-3">
                  <img src={t.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-black/10" />
                  <div>
                    <p className="text-[12px] font-semibold leading-tight">{t.name}</p>
                    <p className="text-[10px] text-black/55 font-mono">{t.role}</p>
                  </div>
                  <TrendingUp size={14} className="ml-auto text-[#caa215]" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="founder's say" testid="founder-section">
          <div className="surface-elevated rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -bottom-12 -right-10 w-44 h-44 rounded-full bg-[var(--cred-violet)] opacity-30 blur-3xl" />
            <p className="text-[10px] tracking-[0.3em] text-white/45 font-mono">A NOTE</p>
            <p className="font-serif-i text-lg mt-2 leading-snug text-white/90">
              "we don't sell services. we hand you leverage — clarity, momentum, and the technology to compound it."
            </p>
            <div className="flex items-center gap-2 mt-4 relative">
              <img src="https://i.pravatar.cc/80?img=53" className="w-9 h-9 rounded-full border border-white/10" alt="" />
              <div>
                <p className="text-[12px] font-semibold text-white">Vikrant Khanna</p>
                <p className="text-[10px] text-white/55 font-mono">Founder · NOVACNKT</p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="blogs & case studies" testid="blogs-section">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2 snap-x">
            {blogs.map((b, i) => (
              <a
                key={b.id}
                data-testid={`blog-${b.id}`}
                className="prime-card prime-card-wide snap-start"
              >
                <img src={b.cover} alt={b.title} className="prime-card-img" />
                <div className="prime-card-shade" />
                <span className={`prime-card-badge ${i === 0 ? "" : "muted"}`}>{b.tag}</span>
                <div className="prime-card-body">
                  <p className="prime-card-title" style={{ fontSize: 18 }}>{b.title}</p>
                  <p className="prime-card-blurb line-clamp-1">{b.excerpt}</p>
                </div>
                <span className="prime-card-arrow">
                  <Play size={14} fill="currentColor" />
                </span>
              </a>
            ))}
          </div>
        </Section>

        <div className="h-3" />
      </div>
    </PhoneFrame>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold tracking-tight">{n}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 font-mono">{l}</p>
    </div>
  );
}

function IndustryCard() { return null; /* legacy, replaced by inline pill */ }

function Section({ title, cta, children, testid }) {
  return (
    <section className="mt-7" data-testid={testid}>
      <div className="flex items-end justify-between mb-3">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-white lowercase">{title}</h3>
        {cta && <button className="text-[10px] uppercase tracking-[0.25em] link-line text-white/55 hover:text-[var(--cred-lime)] font-mono">{cta}</button>}
      </div>
      {children}
    </section>
  );
}
