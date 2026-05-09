import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import ProfileDrawer from "../components/ProfileDrawer";
import { Bell, Sparkles, ArrowUpRight, Quote } from "lucide-react";

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
      .catch((e) => console.error(e));
  }, []);

  return (
    <PhoneFrame>
      {/* top bar */}
      <div className="flex items-center justify-between" data-testid="home-topbar">
        <ProfileDrawer
          profile={profile}
          trigger={
            <button data-testid="open-profile" className="w-10 h-10 rounded-full bg-[var(--nova-peach-light)] grid place-items-center border border-black/10 hover:scale-105 transition">
              <img src={profile?.avatar || "https://i.pravatar.cc/80"} alt="me" className="w-full h-full rounded-full object-cover" />
            </button>
          }
        />
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black text-white text-[11px] tracking-widest">
          <Sparkles size={12} className="text-[var(--nova-peach)]" />
          NOVA · LIVE
        </div>
        <button data-testid="notifications-btn" className="w-10 h-10 rounded-full bg-white border border-black/10 grid place-items-center relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
        </button>
      </div>

      {/* hero */}
      <div className="mt-6 relative overflow-hidden rounded-3xl bg-black text-white p-5 fade-up" data-testid="home-hero">
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-[var(--nova-peach)] opacity-50 blur-2xl" />
        <p className="text-[11px] tracking-[0.3em] text-white/60">NOVACNKT · BUSINESS VERTICAL</p>
        <h2 className="font-display text-3xl font-black tracking-tight mt-2 leading-[1.05]">
          Build with <span className="text-[var(--nova-peach)]">intent</span>.<br />Ship with NOVA.
        </h2>
        <div className="flex items-center gap-2 mt-4">
          <button className="px-4 py-2 rounded-full bg-[var(--nova-peach)] text-black text-sm font-semibold flex items-center gap-1">
            Discover <ArrowUpRight size={14} />
          </button>
          <button className="px-4 py-2 rounded-full border border-white/30 text-white text-sm">Watch reel</button>
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hide flex-1 -mx-5 px-5">
        {/* Browse Services */}
        <Section title="Browse Services" cta="See all" testid="services-section">
          <div className="grid grid-cols-3 gap-2.5">
            {services.slice(0, 6).map((s, i) => (
              <button
                key={s.id}
                data-testid={`service-${s.id}`}
                className="rounded-2xl p-3 text-left border border-black/10 hover:-translate-y-0.5 transition-transform"
                style={{ background: i % 2 === 0 ? "var(--nova-peach)" : "var(--nova-peach-light)" }}
              >
                <div className="w-7 h-7 rounded-lg bg-black/85 text-white grid place-items-center mb-2">
                  <Sparkles size={14} />
                </div>
                <p className="text-[12px] font-bold leading-tight text-black">{s.title}</p>
                <p className="text-[10px] text-black/60 mt-0.5">{s.blurb}</p>
              </button>
            ))}
          </div>
        </Section>

        {/* Industries */}
        <Section title="Industries we serve" testid="industries-section">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5">
            {industries.map((it) => (
              <div
                key={it.id}
                data-testid={`industry-${it.id}`}
                className="shrink-0 w-28 h-28 rounded-2xl peach-card grid place-items-center text-black border border-black/10"
              >
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest opacity-60">Industry</div>
                  <div className="text-sm font-bold mt-1">{it.name}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Why Choose Us */}
        <Section title="Why choose us" testid="why-section">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { k: "AI-native", v: "Tools built around intelligent workflows." },
              { k: "Fast cycles", v: "Ideas to launch in 30-day sprints." },
              { k: "Senior team", v: "Every project led by founders." },
              { k: "Outcome-led", v: "We measure what truly matters." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-white border border-black/10 p-3.5">
                <p className="font-display text-2xl font-black tracking-tight">0{i + 1}</p>
                <p className="text-[12px] font-bold mt-1">{c.k}</p>
                <p className="text-[11px] text-black/60 mt-1 leading-snug">{c.v}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section title="Testimonials" testid="testimonials-section">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
            {testimonials.map((t) => (
              <div key={t.id} data-testid={`testimonial-${t.id}`} className="shrink-0 w-72 rounded-2xl bg-white border border-black/10 p-4">
                <Quote size={16} className="text-[var(--nova-peach-deep)]" />
                <p className="text-sm leading-snug mt-2">"{t.quote}"</p>
                <div className="flex items-center gap-2 mt-3">
                  <img src={t.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-[12px] font-semibold leading-tight">{t.name}</p>
                    <p className="text-[10px] text-black/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Founder say */}
        <Section title="Founder's say" testid="founder-section">
          <div className="rounded-2xl bg-black text-white p-4 relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[var(--nova-peach)] opacity-30 blur-2xl" />
            <p className="text-[11px] tracking-[0.3em] text-white/60">A NOTE</p>
            <p className="text-base mt-2 leading-snug">
              "We don't sell services. We hand you leverage — clarity, momentum, and the technology to compound it."
            </p>
            <div className="flex items-center gap-2 mt-4">
              <img src="https://i.pravatar.cc/80?img=53" className="w-8 h-8 rounded-full" alt="" />
              <div>
                <p className="text-[12px] font-semibold">Vikrant Khanna</p>
                <p className="text-[10px] text-white/60">Founder, NOVACNKT</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Blogs & Case Studies */}
        <Section title="Blogs & Case Studies" testid="blogs-section">
          <div className="grid grid-cols-3 gap-2.5">
            {blogs.map((b) => (
              <a key={b.id} data-testid={`blog-${b.id}`} className="block rounded-2xl overflow-hidden border border-black/10 hover:-translate-y-0.5 transition-transform">
                <div className="aspect-[4/3] bg-[var(--nova-peach-light)] overflow-hidden">
                  {b.cover && <img src={b.cover} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="p-2">
                  <p className="text-[10px] uppercase tracking-widest text-black/50">{b.tag}</p>
                  <p className="text-[12px] font-semibold leading-tight mt-0.5 line-clamp-2">{b.title}</p>
                </div>
              </a>
            ))}
          </div>
        </Section>

        <div className="h-2" />
      </div>
    </PhoneFrame>
  );
}

function Section({ title, cta, children, testid }) {
  return (
    <section className="mt-6" data-testid={testid}>
      <div className="flex items-end justify-between mb-3">
        <h3 className="font-display text-lg font-extrabold tracking-tight">{title}</h3>
        {cta && <button className="text-[11px] uppercase tracking-widest link-line">{cta}</button>}
      </div>
      {children}
    </section>
  );
}
