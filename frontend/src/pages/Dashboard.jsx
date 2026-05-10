import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneFrame from "../components/PhoneFrame";
import { useAuth } from "../context/AuthContext";
import { TrendingUp, Receipt, Users, ArrowUpRight, Activity, Crown, ChevronRight, MessageSquarePlus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [openRequest, setOpenRequest] = useState(false);
  const [reqType, setReqType] = useState("Article");
  const [reqBrief, setReqBrief] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [showLinkBox, setShowLinkBox] = useState(false);
  const fileRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const videoRef = React.useRef(null);

  const addFiles = (kind, files) => {
    if (!files?.length) return;
    const next = Array.from(files).map((f) => ({
      id: `${Date.now()}_${f.name}`,
      kind,
      name: f.name,
      size: f.size,
    }));
    setAttachments((a) => [...a, ...next]);
    toast.success(`${next.length} ${kind} attached`);
  };
  const addLink = () => {
    const url = linkInput.trim();
    if (!url) return;
    setAttachments((a) => [...a, { id: `${Date.now()}_link`, kind: "link", name: url }]);
    setLinkInput("");
    setShowLinkBox(false);
    toast.success("Link attached");
  };
  const addVoice = () => {
    setAttachments((a) => [...a, { id: `${Date.now()}_voice`, kind: "voice", name: `voice-note-${a.length + 1}.m4a` }]);
    toast.success("Voice note attached");
  };
  const removeAttachment = (id) => setAttachments((a) => a.filter((x) => x.id !== id));

  const closeSheet = () => {
    setOpenRequest(false);
  };

  useEffect(() => {
    axios.get(`${API}/plans`).then((r) => setPlans(r.data)).catch(() => {});
  }, []);

  const payments = user?.payments || [];
  const totalSpent = payments.reduce((s, p) => s + (p.amount || 0), 0);
  const activePlan = payments[0]?.tier || "—";

  return (
    <PhoneFrame>
      <div data-testid="dashboard-topbar" className="flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-white/45 font-mono">DASHBOARD</p>
          <h1 className="font-display text-[34px] font-extrabold tracking-tight leading-[0.95] text-white lowercase">
            hi, <span className="font-serif-i text-[var(--cred-lime)]">{(user?.name || "founder").split(" ")[0].toLowerCase()}.</span>
          </h1>
        </div>
        <span className="chip rounded-full px-3 py-1 text-[10px] font-mono tracking-[0.25em] text-[var(--cred-lime)]">LIVE</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide -mx-5 px-5 mt-5 space-y-3" data-testid="dashboard-body">
        {/* Request content CTA */}
        <button
          data-testid="request-content-btn"
          onClick={() => setOpenRequest(true)}
          className="request-content-btn"
        >
          <span className="request-content-icon">
            <MessageSquarePlus size={18} />
          </span>
          <span className="flex-1 text-left">
            <span className="block font-display text-[18px] font-extrabold tracking-tight lowercase">request content</span>
            <span className="block text-[11px] opacity-80 mt-0.5">brief in &lt; 60 sec · delivered fast</span>
          </span>
          <ArrowUpRight size={18} />
        </button>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-2.5">
          <StatTile icon={Receipt} label="total spent" value={`$${totalSpent.toFixed(0)}`} sub={`${payments.length} payments`} />
          <StatTile icon={Crown} label="active plan" value={activePlan} sub={user?.notifications ? "notifications on" : "subscribe"} highlight />
          <StatTile icon={TrendingUp} label="growth" value="+38%" sub="vs last month" />
          <StatTile icon={Users} label="referrals" value="0" sub="invite & earn" />
        </div>

        {/* Activity list */}
        <div className="surface rounded-3xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-base font-extrabold tracking-tight text-white lowercase">activity</p>
            <button
              data-testid="dashboard-view-all"
              onClick={() => navigate("/plans")}
              className="text-[10px] uppercase tracking-[0.25em] text-white/55 hover:text-[var(--cred-lime)] font-mono"
            >
              view all
            </button>
          </div>
          {payments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center text-sm text-white/55">
              <Activity size={18} className="mx-auto mb-2 text-white/40" />
              No activity yet — your moves will show up here.
            </div>
          ) : (
            <ul className="space-y-2">
              {payments.slice(0, 6).map((p, i) => (
                <li key={i} data-testid={`activity-${i}`} className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-3">
                  <span className="w-9 h-9 rounded-xl bg-[var(--cred-lime)] text-black grid place-items-center">
                    <Receipt size={16} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{p.tier || "Plan"} · ${p.amount}</p>
                    <p className="text-[11px] text-white/55 font-mono">{new Date(p.ts).toLocaleString()}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[var(--cred-lime)]">{p.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-2.5" data-testid="dashboard-quick-actions">
          <QuickAction title="explore plans" sub="upgrade & save" onClick={() => navigate("/plans")} accent />
          <QuickAction title="see portfolio" sub="our recent work" onClick={() => navigate("/portfolio")} />
          <QuickAction title="browse services" sub="find what fits" onClick={() => navigate("/explore")} />
          <QuickAction title="ask nova ai" sub="your companion" onClick={() => navigate("/ai")} />
        </div>

        <div className="h-2" />
      </div>

      {openRequest && (
        <div className="sheet-backdrop" onClick={closeSheet}>
          <div
            data-testid="request-content-sheet"
            onClick={(e) => e.stopPropagation()}
            className="request-sheet fade-up"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-9 h-9 rounded-xl bg-[var(--cred-lime)] text-black grid place-items-center">
                <FileText size={16} />
              </span>
              <p className="font-display text-xl font-extrabold tracking-tight text-white lowercase">request content</p>
            </div>
            <p className="text-[12px] text-white/55 mb-4">tell us what you need — your strategist will pick it up within an hour.</p>

            <div className="grid grid-cols-3 gap-2 mb-3" data-testid="request-types">
              {["Article", "Design", "Reel", "Strategy", "Code", "Other"].map((t) => (
                <button
                  key={t}
                  data-testid={`req-type-${t.toLowerCase()}`}
                  onClick={() => setReqType(t)}
                  className={`px-2 py-2 rounded-xl text-xs font-bold transition ${
                    reqType === t
                      ? "bg-[var(--cred-lime)] text-black"
                      : "surface text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <textarea
              data-testid="request-brief"
              value={reqBrief}
              onChange={(e) => setReqBrief(e.target.value)}
              placeholder="e.g. 800-word LinkedIn article on retail AI trends, energetic tone…"
              rows={3}
              className="w-full surface rounded-2xl p-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-1 focus:ring-[var(--cred-lime)]/40 resize-none"
            />

            {/* Attachment options */}
            <div className="mt-3" data-testid="attachment-options">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/45 font-mono flex items-center gap-1.5">
                  <Paperclip size={12} /> attach
                </span>
                <span className="text-[11px] text-white/45 font-mono">{attachments.length} added</span>
              </div>

              <div className="flex gap-2" data-testid="attachment-row">
                <AttachBtn
                  testid="attach-file"
                  icon={FileText}
                  label="File"
                  onClick={() => fileRef.current?.click()}
                />
                <AttachBtn
                  testid="attach-image"
                  icon={ImageIcon}
                  label="Image"
                  onClick={() => imageRef.current?.click()}
                />
                <AttachBtn
                  testid="attach-video"
                  icon={Video}
                  label="Video"
                  onClick={() => videoRef.current?.click()}
                />
                <AttachBtn
                  testid="attach-voice"
                  icon={Mic}
                  label="Voice"
                  onClick={addVoice}
                />
                <AttachBtn
                  testid="attach-link"
                  icon={Link2}
                  label="Link"
                  onClick={() => setShowLinkBox((s) => !s)}
                  active={showLinkBox}
                />
              </div>

              <input ref={fileRef} type="file" hidden multiple onChange={(e) => addFiles("file", e.target.files)} />
              <input ref={imageRef} type="file" hidden multiple accept="image/*" onChange={(e) => addFiles("image", e.target.files)} />
              <input ref={videoRef} type="file" hidden multiple accept="video/*" onChange={(e) => addFiles("video", e.target.files)} />

              {showLinkBox && (
                <div className="mt-2 flex gap-2" data-testid="link-input-row">
                  <input
                    data-testid="link-input"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="paste a url…"
                    className="flex-1 surface rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:ring-1 focus:ring-[var(--cred-lime)]/40"
                  />
                  <button
                    data-testid="link-add"
                    onClick={addLink}
                    className="cta-lime rounded-xl px-4 text-xs uppercase tracking-[0.2em]"
                  >
                    add
                  </button>
                </div>
              )}

              {attachments.length > 0 && (
                <ul className="mt-3 space-y-1.5" data-testid="attachment-list">
                  {attachments.map((a) => (
                    <li
                      key={a.id}
                      data-testid={`attachment-${a.kind}`}
                      className="flex items-center gap-2 surface rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <AttachIcon kind={a.kind} />
                      <span className="flex-1 truncate">{a.name}</span>
                      <button
                        onClick={() => removeAttachment(a.id)}
                        className="w-6 h-6 rounded-full hover:bg-white/10 grid place-items-center text-white/55"
                        aria-label="remove"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={closeSheet}
                className="flex-1 py-3 rounded-2xl border border-white/10 text-white/75 text-sm font-semibold hover:bg-white/[0.04]"
              >
                Cancel
              </button>
              <button
                data-testid="request-submit"
                onClick={() => {
                  if (!reqBrief.trim()) return toast.error("Add a quick brief");
                  toast.success(`Request submitted · ${attachments.length} attachment${attachments.length === 1 ? "" : "s"}`);
                  setOpenRequest(false);
                  setReqBrief("");
                  setAttachments([]);
                }}
                className="flex-1 cta-lime rounded-2xl py-3 text-sm tracking-[0.2em] uppercase"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}

function AttachBtn({ icon: Icon, label, onClick, testid, active }) {
  return (
    <button
      data-testid={testid}
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-bold transition ${
        active
          ? "bg-[var(--cred-lime)] text-black"
          : "surface text-white/85 hover:bg-white/[0.06]"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function AttachIcon({ kind }) {
  const map = { file: FileText, image: ImageIcon, video: Video, voice: Mic, link: Link2 };
  const I = map[kind] || FileText;
  return (
    <span className="w-7 h-7 rounded-lg bg-[var(--cred-lime)] text-black grid place-items-center">
      <I size={12} />
    </span>
  );
}

function StatTile({ icon: Icon, label, value, sub, highlight }) {
  return (
    <div className={`rounded-3xl p-4 ${highlight ? "plan-premium" : "surface"}`}>
      <div className="flex items-center justify-between">
        <span className={`w-8 h-8 rounded-xl grid place-items-center ${highlight ? "bg-[var(--cred-lime)] text-black" : "bg-white/10 text-white"}`}>
          <Icon size={14} />
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-white/45">{label}</span>
      </div>
      <p className="font-display text-2xl font-extrabold tracking-tight text-white mt-3 lowercase">{value}</p>
      <p className="text-[11px] text-white/55 mt-0.5">{sub}</p>
    </div>
  );
}

function QuickAction({ title, sub, onClick, accent }) {
  return (
    <button onClick={onClick} className={`text-left rounded-3xl p-4 transition-transform hover:-translate-y-0.5 ${accent ? "cta-lime" : "surface text-white"}`}>
      <div className="flex items-center justify-between">
        <p className={`font-display text-base font-extrabold tracking-tight lowercase ${accent ? "text-black" : "text-white"}`}>{title}</p>
        <ChevronRight size={14} className={accent ? "text-black" : "text-white/55"} />
      </div>
      <p className={`text-[11px] mt-1 ${accent ? "text-black/60" : "text-white/55"}`}>{sub}</p>
    </button>
  );
}
