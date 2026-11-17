
import { useMemo, useState } from "react";
import BottomNav from "../components/common/BottomNav";
import emotionStyles from "../data/emotionStyles.json";
import emotionData from "../data/emotionData.json";
import InnerPageHeader from "../components/layout/InnerPageHeader";

export default function SubtopicPage({ feeling, onNavigate }) {
  const [search, setSearch] = useState("");

  const emotionName = feeling?.name || "Sadness";

  const style = emotionStyles[emotionName] || {
    icon: "fa-solid fa-leaf",
    color: "bg-[#E6EEE7] text-[#416C4B]",
  };

  const subtopics = Object.keys(emotionData[emotionName] || {});

  const filteredSubtopics = useMemo(() => {
    return subtopics.filter((topic) =>
      topic.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [subtopics, search]);

  const handleSubtopicClick = (subtopic) => {
    onNavigate?.("questions", {
      feeling,
      subtopic,
    });
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[112px] text-[#1D211D] shadow-[0_10px_45px_rgba(0,0,0,0.10)]">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-[90px] -top-[120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.20),transparent_68%)]" />

      {/* Header */}
      <InnerPageHeader
  onBack={() => onNavigate("explore")}
  backLabel="Back to explore"
/>

      {/* Selected emotion */}
      <section className="relative animate-[rise_0.6s_ease_both] px-[22px] pb-5 pt-5">
        <span className="mb-[10px] block text-[10.5px] font-semibold uppercase tracking-[2px] text-[#174735]">
          Explore / {emotionName}
        </span>

        <div className="mb-5 flex items-center gap-3">
          <div
            className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[17px] text-[23px] ${style.color}`}
          >
            <i className={style.icon} />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[1.4px] text-[#A7864C]">
              Your heart today
            </p>

            <h1 className="font-serif text-[29px] font-medium leading-tight">
              {emotionName}
            </h1>
          </div>
        </div>

        <div className="my-4 h-[2px] w-[34px] rounded-full bg-[#D8AD55]" />

        <h2 className="font-serif text-[25px] font-medium leading-[1.2]">
          What best describes <em className="font-normal">how you feel?</em>
        </h2>

        <p className="mt-3 max-w-[315px] text-[13.5px] leading-[1.65] text-[#77766E]">
          Every situation is different. Choose the one that feels closest
          to what you're experiencing.
        </p>
      </section>

      {/* Search */}
      <div className="relative mx-[22px] mt-1">
        <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#77766E]" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Find your situation..."
          aria-label="Search situations"
          className="h-[50px] w-full rounded-[16px] border border-[#EAE3D5] bg-[#FFFCF5] pl-[42px] pr-4 text-[14px] outline-none transition placeholder:text-[#9A988E] focus:border-[#174735] focus:ring-[3px] focus:ring-[#174735]/10"
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between px-[22px] pb-3 pt-6">
        <p className="text-[12px] text-[#77766E]">
          <strong className="font-semibold text-[#1D211D]">
            {filteredSubtopics.length}
          </strong>{" "}
          {filteredSubtopics.length === 1 ? "situation" : "situations"}
        </p>

        <span className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#A7864C]">
          Choose one
        </span>
      </div>

      {/* Subtopic cards */}
      {filteredSubtopics.length > 0 ? (
        <section className="relative space-y-3 px-[22px]">
          {filteredSubtopics.map((subtopic, index) => (
            <button
              key={subtopic}
              type="button"
              onClick={() => handleSubtopicClick(subtopic)}
              className="group flex min-h-[76px] w-full items-center gap-3 rounded-[18px] border border-[#EAE3D5] bg-[#FFFCF5] px-4 py-3 text-left transition duration-200 hover:-translate-y-[2px] hover:border-[#C6BDAA] hover:shadow-[0_8px_18px_rgba(35,50,37,0.07)] active:scale-[0.99]"
              style={{
                animation: `rise 0.45s ease ${index * 0.04}s both`,
              }}
            >
              <div className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-full bg-[#F3EEE3] text-[12px] font-semibold text-[#A7864C]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <span className="flex-1 pr-1 font-serif text-[16px] font-medium leading-[1.35] text-[#1D211D]">
                {subtopic}
              </span>

              <div className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#F7F2E8] text-[11px] text-[#77766E] transition group-hover:translate-x-1 group-hover:bg-[#E6EEE7] group-hover:text-[#174735]">
                <i className="fa-solid fa-arrow-right" />
              </div>
            </button>
          ))}
        </section>
      ) : (
        <div className="mx-[22px] mt-5 rounded-[20px] border border-dashed border-[#D8CFBC] bg-[#FFFCF5] px-5 py-7 text-center">
          <i className="fa-solid fa-magnifying-glass mb-3 text-[22px] text-[#174735]" />

          <p className="font-serif text-[16px]">
            No situation found
          </p>

          <small className="mt-1 block text-[12.5px] text-[#77766E]">
            Try a different search.
          </small>
        </div>
      )}

      {/* Gentle note */}
      <div className="mx-[22px] mt-7 flex items-start gap-3 rounded-[18px] bg-[#E6EEE7] p-4">
        <i className="fa-solid fa-heart mt-1 text-[14px] text-[#416C4B]" />

        <p className="text-[11.5px] leading-[1.65] text-[#416C4B]">
          You don't have to figure everything out right now. Take a moment,
          choose what feels right, and let Scripture guide you.
        </p>
      </div>

      {/* Bottom navigation */}
      <BottomNav
        activePage="explore"
        onNavigate={onNavigate}
      />
    </main>
  );
}
