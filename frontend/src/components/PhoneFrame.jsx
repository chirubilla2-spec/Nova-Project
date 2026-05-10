import React from "react";
import BottomNav from "./BottomNav";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function PhoneFrame({ children, padding = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onAI = location.pathname === "/ai";

  return (
    <div className="phone-shell">
      <div className="phone-frame flex flex-col" data-testid="phone-frame">
        <div className="pt-2">
          <div className="notch" />
        </div>
        <div className={`flex-1 flex flex-col ${padding ? "px-5 pt-5 pb-2" : ""}`}>
          {children}
        </div>

        {/* Floating AI button — above bottom nav, right-aligned */}
        {!onAI && (
          <button
            data-testid="ai-fab"
            onClick={() => navigate("/ai")}
            className="ai-fab"
            aria-label="Open NOVA AI"
          >
            <span className="ai-fab-glow" aria-hidden />
            <Sparkles size={20} className="relative" strokeWidth={2.4} />
          </button>
        )}

        <BottomNav />
      </div>
    </div>
  );
}
