import React from "react";
import BottomNav from "./BottomNav";

export default function PhoneFrame({ children, padding = true }) {
  return (
    <div className="phone-shell">
      <div className="phone-frame flex flex-col" data-testid="phone-frame">
        <div className="pt-2">
          <div className="notch" />
        </div>
        <div className={`flex-1 flex flex-col ${padding ? "px-5 pt-5 pb-2" : ""}`}>
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
