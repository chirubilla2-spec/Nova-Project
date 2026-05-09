import React from "react";
import { Receipt, CircleDollarSign, ChevronRight, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Payments dashboard block — shown only after the user has at least one payment.
 * Inspired by uploaded reference (white card, "Upcoming actions" + "Payments").
 */
export default function PaymentsSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const payments = user?.payments || [];

  if (!payments.length) return null;

  const latest = payments[0];
  const recent = payments.slice(0, 3);
  const within7d = payments.filter((p) => Date.now() - new Date(p.ts).getTime() < 7 * 24 * 3600 * 1000);

  return (
    <section className="mt-7" data-testid="payments-section">
      <h3 className="font-display text-xl font-extrabold tracking-tight text-white lowercase mb-3">your payments</h3>

      <div className="payments-card">
        <div className="flex items-center gap-3 mb-3">
          <span className="payments-icon">
            <CircleDollarSign size={16} />
          </span>
          <p className="text-base font-extrabold tracking-tight">Upcoming actions</p>
        </div>

        <Row
          label="0 Payments Due"
          subtle
          action={<button className="payments-pay" data-testid="payments-pay">Pay</button>}
        />
        <div className="payments-divider" />
        <Row
          label="No pending items to approve"
          muted
          action={<button className="payments-review" data-testid="payments-review">Review</button>}
        />
      </div>

      <div className="payments-card mt-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="payments-icon">
              <Receipt size={16} />
            </span>
            <p className="text-base font-extrabold tracking-tight">Payments</p>
          </div>
          <button
            data-testid="view-all-payments"
            onClick={() => navigate("/plans")}
            className="text-xs font-semibold bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full text-black/75 flex items-center gap-1"
          >
            View all <ChevronRight size={12} />
          </button>
        </div>
        <p className="text-xs text-black/55">Processing and recently completed payments</p>

        {within7d.length === 0 ? (
          <div className="payments-empty mt-3" data-testid="payments-empty">
            <Info size={14} className="text-black/45" />
            <span>You have no recent payments in the past 7 days</span>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-black/5">
            {recent.map((p, i) => (
              <li key={i} data-testid={`payment-${i}`} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold">${p.amount} · {p.tier || "Plan"}</p>
                  <p className="text-[11px] text-black/55">{new Date(p.ts).toLocaleDateString()} · {p.status}</p>
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] px-2 py-1 rounded-full ${p.status === "succeeded" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {latest && (
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono mt-3 text-center">
          last payment · {new Date(latest.ts).toLocaleString()}
        </p>
      )}
    </section>
  );
}

function Row({ label, action, subtle, muted }) {
  return (
    <div className={`flex items-center justify-between py-1 ${muted ? "text-black/45" : ""}`}>
      <p className={`text-sm ${subtle ? "font-bold" : ""}`}>{label}</p>
      {action}
    </div>
  );
}
