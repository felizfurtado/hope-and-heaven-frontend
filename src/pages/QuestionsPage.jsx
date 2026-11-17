
import { useMemo, useState } from "react";
import BottomNav from "../components/common/BottomNav";
import emotionData from "../data/emotionData.json";
import emotionStyles from "../data/emotionStyles.json";
import InnerPageHeader from "../components/layout/InnerPageHeader";

export default function QuestionsPage({
  feeling,
  subtopic,
  onNavigate,
}) {
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const emotionName = feeling?.name || "Sadness";
  const subtopicName = subtopic || "";

  const style = emotionStyles[emotionName] || {
    icon: "fa-solid fa-leaf",
    color: "bg-[#E6EEE7] text-[#416C4B]",
  };

  const questions = useMemo(() => {
  return emotionData[emotionName]?.[subtopicName] || [];
}, [emotionName, subtopicName]);

  const handleContinue = () => {
    if (!selectedQuestion) return;

    onNavigate?.("reflection", {
      feeling,
      subtopic: subtopicName,
      question: selectedQuestion,
    });
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[112px] text-[#1D211D] shadow-[0_10px_45px_rgba(0,0,0,0.10)]">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-[90px] -top-[120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.20),transparent_68%)]" />

      {/* Header */}
      <InnerPageHeader
  onBack={() => onNavigate("subtopics")}
  backLabel="Back to situations"
/>

      {/* Page heading */}
      <section className="relative px-[22px] pb-5 pt-5">
        <span className="mb-[10px] block text-[10.5px] font-semibold uppercase tracking-[2px] text-[#174735]">
          {emotionName} / Reflection
        </span>

        <div className="mb-5 flex items-center gap-3">
          <div
            className={`grid h-[48px] w-[48px] shrink-0 place-items-center rounded-[16px] text-[21px] ${style.color}`}
          >
            <i className={style.icon} />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[#A7864C]">
              Your situation
            </p>

            <h1 className="font-serif text-[19px] font-medium leading-tight">
              {subtopicName}
            </h1>
          </div>
        </div>

        <div className="my-4 h-[2px] w-[34px] rounded-full bg-[#D8AD55]" />

        <h2 className="font-serif text-[27px] font-medium leading-[1.2]">
          Let's understand <em className="font-normal">your heart.</em>
        </h2>

        <p className="mt-3 text-[13.5px] leading-[1.65] text-[#77766E]">
          Take a moment with these questions. Choose the one that best
          reflects what you're experiencing right now.
        </p>
      </section>

      {/* Question count */}
      <div className="flex items-center justify-between px-[22px] pb-3 pt-2">
        <span className="text-[12px] text-[#77766E]">
          {questions.length} questions
        </span>

        <span className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#A7864C]">
          Select one
        </span>
      </div>

      {/* Questions */}
      {questions.length > 0 ? (
        <section className="space-y-3 px-[22px]">
          {questions.map((question, index) => {
            const isSelected = selectedQuestion === question;

            return (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedQuestion(question)}
                aria-pressed={isSelected}
                className={`group flex w-full items-start gap-3 rounded-[19px] border p-4 text-left transition duration-200 ${
                  isSelected
                    ? "border-[#174735] bg-[#E6EEE7] shadow-[0_5px_15px_rgba(23,71,53,0.08)]"
                    : "border-[#EAE3D5] bg-[#FFFCF5] hover:border-[#C6BDAA]"
                }`}
              >
                <span
                  className={`grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full text-[11px] font-semibold transition ${
                    isSelected
                      ? "bg-[#174735] text-white"
                      : "bg-[#F3EEE3] text-[#A7864C]"
                  }`}
                >
                  {isSelected ? (
                    <i className="fa-solid fa-check" />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>

                <span
                  className={`flex-1 pt-0.5 text-[13.5px] leading-[1.65] ${
                    isSelected
                      ? "font-medium text-[#174735]"
                      : "text-[#343A32]"
                  }`}
                >
                  {question}
                </span>
              </button>
            );
          })}
        </section>
      ) : (
        <div className="mx-[22px] rounded-[20px] border border-dashed border-[#D8CFBC] bg-[#FFFCF5] p-6 text-center">
          <p className="font-serif text-[17px]">
            No questions found
          </p>
          <p className="mt-2 text-[12px] text-[#77766E]">
            We couldn't find questions for this situation.
          </p>
        </div>
      )}

      {/* Continue */}
      <div className="px-[22px] pt-6">
        <button
  type="button"
  disabled={!selectedQuestion}
  onClick={handleContinue}
  className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#174735] !text-white text-[13px] font-semibold transition hover:bg-[#103629] disabled:cursor-not-allowed disabled:opacity-40"
>
  <span className="!text-white">Continue</span>
  <i className="fa-solid fa-arrow-right text-[11px] !text-white" />
</button>

        <p className="mt-3 text-center text-[11px] text-[#929087]">
          Take your time. There's no rush.
        </p>
      </div>

      <BottomNav
        activePage="explore"
        onNavigate={onNavigate}
      />
    </main>
  );
}
