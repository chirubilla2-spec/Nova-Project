import React, { useState } from "react";
import PhoneFrame from "../components/PhoneFrame";
import { Sparkles, Send } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { from: "nova", text: "Hi, I'm NOVA. Ask me anything about your business vertical." },
  ]);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { from: "me", text: input }];
    setMessages(next);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "nova", text: "I'm a UI demo for now — wire me to your favourite LLM and I'll come alive." }]);
    }, 600);
  };

  return (
    <PhoneFrame>
      <div className="flex items-center gap-2" data-testid="ai-topbar">
        <div className="w-10 h-10 rounded-2xl bg-black text-white grid place-items-center">
          <Sparkles size={16} className="text-[var(--nova-peach)]" />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] text-black/50">NOVA · AI</p>
          <h1 className="font-display text-lg font-extrabold tracking-tight">Companion</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide mt-4 space-y-2.5" data-testid="ai-thread">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                m.from === "me"
                  ? "bg-black text-white rounded-br-md"
                  : "bg-[var(--nova-peach-light)] text-black rounded-bl-md border border-black/10"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="mt-3 flex items-center gap-2 bg-white border border-black/10 rounded-full pl-4 pr-1.5 py-1.5" data-testid="ai-form">
        <input
          data-testid="ai-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message NOVA…"
          className="flex-1 bg-transparent outline-none text-sm py-2"
        />
        <button data-testid="ai-send" className="w-9 h-9 rounded-full bg-black text-white grid place-items-center" aria-label="send">
          <Send size={14} />
        </button>
      </form>
    </PhoneFrame>
  );
}
