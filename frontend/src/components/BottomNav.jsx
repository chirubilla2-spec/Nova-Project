import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Briefcase, Sparkles, Monitor, LayoutGrid } from "lucide-react";

const items = [
  { to: "/home", icon: HomeIcon, label: "Home", testid: "nav-home" },
  { to: "/explore", icon: Briefcase, label: "Explore", testid: "nav-explore" },
  { to: "/ai", icon: Sparkles, label: "AI", testid: "nav-ai" },
  { to: "/plans", icon: Monitor, label: "Plans", testid: "nav-plans" },
  { to: "/portfolio", icon: LayoutGrid, label: "Portfolio", testid: "nav-portfolio" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  return (
    <div data-testid="bottom-nav" className="sticky bottom-0 left-0 right-0 mt-6">
      <div className="flex items-center justify-between px-3 py-3 bg-white border-t border-black/10">
        {items.map(({ to, icon: Icon, label, testid }) => (
          <NavLink
            key={to}
            to={to}
            data-testid={testid}
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center mx-1 h-11 rounded-2xl transition-all duration-300 ${
                isActive ? "nav-pill text-black" : "text-black/70 hover:text-black"
              }`
            }
          >
            <Icon size={22} strokeWidth={2.2} aria-label={label} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
