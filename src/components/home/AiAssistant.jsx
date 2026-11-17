import { useState } from "react";

const suggestions = [
  "I'm anxious about tomorrow",
  "Help me pray",
  "I need encouragement",
];

export default function AiAssistant({ onSend }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const value = message.trim();
    if (!value) return;

    onSend?.(value);
    setMessage("");
  };

  return (
    <section className="relative mx-[22px] mt-2 overflow-hidden rounded-[24px] bg-[linear-gradient(125deg,#1B5240,#0F2E24)] px-[18px] pb-[18px] pt-5 text-white shadow-[0_16px_32px_rgba(20,54,39,0.28)]">
      {/* Gold radial glow */}
      <div className="pointer-events-none absolute -right-[50px] -top-[50px] h-[180px] w-[180px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.26),rgba(216,173,85,0)_70%)]" />

      <div className="relative z-[1] flex items-center gap-[14px]">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] border border-white/[0.16] bg-white/10 text-[22px] text-[#E8BD5E]">
          <i className="fa-solid fa-crown" />
        </div>

        <div>
          <h3 className="font-serif text-[21px] font-medium">
            Talk to Asher AI
          </h3>

          <p className="mt-[3px] text-[12.5px] leading-[1.45] text-[#DCE3D9]">
            Personalized Bible guidance, reflection and prayer.
          </p>
        </div>
      </div>

      <div className="relative z-[1] mt-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setMessage(suggestion);
            }}
            className="rounded-full border border-white/[0.18] bg-white/[0.08] px-3 py-2 text-[12px] text-[#F2F5EE] transition hover:bg-white/[0.16]"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
        className="relative z-[1] mt-[14px] flex items-center gap-2 rounded-2xl bg-[#FFFCF5]/[0.97] py-[6px] pl-4 pr-[6px]"
      >
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Share what's on your heart…"
          aria-label="Message Asher AI"
          className="min-w-0 flex-1 border-0 bg-transparent py-[10px] text-[14px] text-[#1D211D] outline-none placeholder:text-[#8D8B82] focus:ring-0"
        />

        <button
          type="submit"
          aria-label="Send"
          className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-[#174735] text-[15px] text-white transition hover:scale-[1.06]"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>
      </form>
    </section>
  );
}