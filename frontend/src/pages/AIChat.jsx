import React, { useState } from "react";
import PhoneFrame from "../components/PhoneFrame";
import { Sparkles, Send } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { from: "nova", text: "hi, i'm nova. ask me anything about your business vertical." },
  ]);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "me", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "nova", text: "i'm a ui demo for now — wire me to your favourite llm and i'll come alive." }]);
    }, 600);
  };

  return (
    <PhoneFrame>
      <div className="flex items-center gap-3" data-testid="ai-topbar">
        <div className="w-11 h-11 rounded-2xl surface-elevated grid place-items-center relative">
          <div className="absolute inset-0 rounded-2xl bg-[var(--cred-lime)] opacity-10 blur-xl" />
          <Sparkles size={18} className="text-[var(--cred-lime)] relative" />
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] text-white/45 font-mono">NOVA · AI</p>
          <h1 className="font-display text-xl font-extrabold tracking-tight text-white lowercase">companion<span className="text-[var(--cred-lime)]">.</span></h1>
        </div>
        <span className="ml-auto chip rounded-full px-2.5 py-1 text-[10px] tracking-[0.25em] text-[var(--cred-lime)] font-mono">ONLINE</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide mt-5 space-y-2.5" data-testid="ai-thread">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                m.from === "me"
                  ? "cta-lime rounded-br-md"
                  : "surface text-white/90 rounded-bl-md"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="mt-3 surface rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2" data-testid="ai-form">
        <input
          data-testid="ai-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="message nova…"
          className="flex-1 bg-transparent outline-none text-sm py-2 text-white placeholder:text-white/35"
        />
        <button data-testid="ai-send" className="cta-lime w-9 h-9 rounded-full grid place-items-center" aria-label="send">
          <Send size={14} />
        </button>
      </form>
    </PhoneFrame>
  );
}
