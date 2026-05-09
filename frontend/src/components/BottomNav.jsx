import React from "react";
import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Compass, Sparkles, CreditCard, LayoutGrid } from "lucide-react";

const items = [
  { to: "/home", icon: HomeIcon, label: "Home", testid: "nav-home" },
  { to: "/explore", icon: Compass, label: "Explore", testid: "nav-explore" },
  { to: "/ai", icon: Sparkles, label: "AI", testid: "nav-ai" },
  { to: "/plans", icon: CreditCard, label: "Plans", testid: "nav-plans" },
  { to: "/portfolio", icon: LayoutGrid, label: "Portfolio", testid: "nav-portfolio" },
];

export default function BottomNav() {
  return (
    <div data-testid="bottom-nav" className="px-3 pb-3 pt-2 bg-[#0a0a0e] border-t border-white/5">
      <div className="flex items-center justify-between gap-1.5 surface rounded-2xl p-1.5">
        {items.map(({ to, icon: Icon, label, testid }) => (
          <NavLink
            key={to}
            to={to}
            data-testid={testid}
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center h-10 rounded-xl transition-all duration-300 ${
                isActive ? "nav-pill-active" : "text-white/55 hover:text-white"
              }`
            }
          >
            <Icon size={20} strokeWidth={2.1} aria-label={label} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
