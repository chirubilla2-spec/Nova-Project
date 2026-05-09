import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Bell, Check, Sparkle, User2, Building2 } from "lucide-react";
import { toast } from "sonner";

const INTEREST_OPTIONS = [
  "Branding", "Web", "Mobile", "AI", "Marketing", "Strategy",
  "E-commerce", "SaaS", "Fintech", "Healthcare", "Real Estate", "Education",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [business, setBusiness] = useState(user?.business || "");

  const next = () => {
    if (step === 1 && interests.length === 0) return toast.error("Pick at least one");
    if (step === 2 && !name.trim()) return toast.error("Tell us your name");
    if (step === 3) {
      completeOnboarding({ interests, name, business, notifications: true });
      toast.success("All set");
      return navigate("/home");
    }
    setStep((s) => s + 1);
  };

  const skipNotif = () => {
    updateUser({ interests, name, business, notifications: false, onboarded: true });
    navigate("/home");
  };

  const toggle = (k) => setInterests((arr) => (arr.includes(k) ? arr.filter((x) => x !== k) : [...arr, k]));

  return (
    <div className="auth-shell" data-testid="onboarding-screen">
      <div className="auth-card fade-up">
        {/* progress */}
        <div className="flex items-center gap-1.5 mb-6" data-testid="onboarding-progress">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-black" : "bg-black/10"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div data-testid="step-interests">
            <div className="w-12 h-12 rounded-2xl bg-black grid place-items-center mb-5">
              <Sparkle size={20} className="text-white" fill="white" />
            </div>
            <h2 className="auth-title">What are you into?</h2>
            <p className="auth-sub">Pick a few — we'll tailor your feed.</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {INTEREST_OPTIONS.map((k) => {
                const sel = interests.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    data-testid={`interest-${k.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => toggle(k)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
                      sel
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black/15 hover:bg-black/5"
                    }`}
                  >
                    {sel && <Check size={12} className="inline -mt-0.5 mr-1" />}
                    {k}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div data-testid="step-profile">
            <div className="w-12 h-12 rounded-2xl bg-black grid place-items-center mb-5">
              <User2 size={20} className="text-white" />
            </div>
            <h2 className="auth-title">Tell us about you</h2>
            <p className="auth-sub">A name and your business — that's it.</p>
            <div className="space-y-3 mt-5">
              <label className="auth-field">
                <User2 size={16} className="text-black/45" />
                <input
                  data-testid="onboarding-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 bg-transparent outline-none text-sm py-3 placeholder:text-black/35"
                />
              </label>
              <label className="auth-field">
                <Building2 size={16} className="text-black/45" />
                <input
                  data-testid="onboarding-business"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Business name (optional)"
                  className="flex-1 bg-transparent outline-none text-sm py-3 placeholder:text-black/35"
                />
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div data-testid="step-notifications">
            <div className="w-12 h-12 rounded-2xl bg-black grid place-items-center mb-5">
              <Bell size={20} className="text-white" />
            </div>
            <h2 className="auth-title">Stay in the loop</h2>
            <p className="auth-sub">We'll ping you about deals, updates and anything important. Promise we won't spam.</p>
            <div className="mt-5 rounded-2xl bg-black/5 p-4 text-sm text-black/75 space-y-2">
              <Bullet>Drops on new services</Bullet>
              <Bullet>Plan reminders & invoices</Bullet>
              <Bullet>Replies from your strategist</Bullet>
            </div>
            <button
              data-testid="skip-notifications"
              onClick={skipNotif}
              className="text-xs text-black/55 underline mt-3"
            >
              Maybe later
            </button>
          </div>
        )}

        <button data-testid="onboarding-next" onClick={next} className="auth-cta mt-6">
          {step === 3 ? "Allow & finish" : "Continue"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div className="flex items-center gap-2">
      <Check size={14} className="text-black" /> {children}
    </div>
  );
}
