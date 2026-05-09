import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Mail, Phone, Lock, Sparkle } from "lucide-react";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const method = params.get("method") || "email";
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (method === "email" && (!email || !password)) return toast.error("Email and password required");
    if (method === "phone" && !phone) return toast.error("Phone required");
    setBusy(true);
    setTimeout(() => {
      signup({ email: email || phone, password, method });
      toast.success("Account created");
      navigate("/onboarding");
    }, 600);
  };

  return (
    <div className="auth-shell" data-testid="signup-screen">
      <div className="auth-card fade-up">
        <Link to="/welcome" className="auth-back" data-testid="signup-back">← Back</Link>
        <div className="w-12 h-12 rounded-2xl bg-black grid place-items-center mb-5">
          <Sparkle size={20} className="text-white" fill="white" />
        </div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Welcome to NOVA. Let's get you set up.</p>

        <form onSubmit={submit} className="space-y-3 mt-6">
          {method === "phone" ? (
            <Field icon={Phone} placeholder="Phone number" value={phone} onChange={setPhone} type="tel" testid="signup-phone" />
          ) : (
            <Field icon={Mail} placeholder="Email" value={email} onChange={setEmail} type="email" testid="signup-email" />
          )}
          {method !== "phone" && (
            <Field icon={Lock} placeholder="Create password" value={password} onChange={setPassword} type="password" testid="signup-password" />
          )}

          <button data-testid="signup-submit" disabled={busy} className="auth-cta">
            {busy ? "Creating…" : <>Create account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="text-center text-xs text-black/55 mt-6">
          Already a member? <Link to="/login" className="font-semibold text-black underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Email and password required");
    setBusy(true);
    setTimeout(() => {
      login({ email, password });
      toast.success("Welcome back");
      navigate("/home");
    }, 600);
  };

  return (
    <div className="auth-shell" data-testid="login-screen">
      <div className="auth-card fade-up">
        <Link to="/welcome" className="auth-back" data-testid="login-back">← Back</Link>
        <div className="w-12 h-12 rounded-2xl bg-black grid place-items-center mb-5">
          <Sparkle size={20} className="text-white" fill="white" />
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Log in to continue with NOVA.</p>

        <form onSubmit={submit} className="space-y-3 mt-6">
          <Field icon={Mail} placeholder="Email" value={email} onChange={setEmail} type="email" testid="login-email" />
          <Field icon={Lock} placeholder="Password" value={password} onChange={setPassword} type="password" testid="login-password" />
          <button data-testid="login-submit" disabled={busy} className="auth-cta">
            {busy ? "Logging in…" : <>Log in <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="text-center text-xs text-black/55 mt-6">
          New here? <Link to="/signup" className="font-semibold text-black underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, placeholder, value, onChange, type = "text", testid }) {
  return (
    <label className="auth-field">
      <Icon size={16} className="text-black/45" />
      <input
        data-testid={testid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="flex-1 bg-transparent outline-none text-sm py-3 placeholder:text-black/35"
      />
    </label>
  );
}
