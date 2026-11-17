
import { useState } from "react";
import BottomNav from "../components/common/BottomNav";
import InnerPageHeader from "../components/layout/InnerPageHeader";

export default function BibleVersePage({
  feeling,
  subtopic,
  question,
  onNavigate,
}) {
  const [saved, setSaved] = useState(false);
  const [activeVerse, setActiveVerse] = useState(0);
  const [expanded, setExpanded] = useState({
    reflection: true,
    saint: false,
    hymn: false,
    prayer: false,
  });

  const verses = [
    {
      reference: "Psalm 139:1–3",
      title: "God knows you completely",
      text: "You are never invisible to God. He knows your thoughts, understands your heart, and sees everything you are going through.",
    },
    {
      reference: "Hebrews 4:15–16",
      title: "You are understood",
      text: "You can approach God with confidence, knowing that He understands your weaknesses and welcomes you with grace.",
    },
    {
      reference: "Exodus 3:7",
      title: "God sees your pain",
      text: "God sees the suffering of His people. Your pain does not go unnoticed, and your cries are not unheard.",
    },
  ];

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const currentQuestion =
    typeof question === "string"
      ? question
      : question?.question ||
        "Do you feel like nobody understands what you are going through?";

  const emotionName = feeling?.name || feeling || "Sadness";
  const subtopicName = subtopic || "Feeling lonely and abandoned";

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#1D211D]">
      <div className="mx-auto min-h-screen w-full max-w-[430px] pb-28">

        {/* Header */}
<InnerPageHeader
  onBack={() => onNavigate("questions")}
  backLabel="Back to home"
/>

        
{/* Intro */}
<section className="px-[22px] pt-2">
  <div className="flex items-center gap-2">
    <span className="h-[1px] w-5 bg-[#D8AD55]" />
    <span className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#8A897E]">
      Your moment with God
    </span>
  </div>

  <div className="mt-5">
    <div className="inline-flex items-center gap-2 rounded-full border border-[#EAE3D5] bg-[#FFFCF5] px-3 py-[7px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#D8AD55]" />
      <span className="text-[10px] font-semibold text-[#174735]">
        {emotionName}
      </span>
      <span className="text-[10px] text-[#B7B0A2]">/</span>
      <span className="text-[10px] text-[#77766E]">
        {subtopicName}
      </span>
    </div>

    <h1 className="mt-5 max-w-[340px] font-serif text-[38px] font-medium leading-[1.13] tracking-[-1.2px] text-[#174735]">
      You are never
      <br />
      <span className="italic text-[#A18451]">truly alone.</span>
    </h1>

    <p className="mt-4 max-w-[310px] text-[13px] leading-[1.9] text-[#77766E]">
      Take a moment to slow down. Let God's Word remind you that He is always near.
    </p>
  </div>

  <div className="mt-6 flex items-center gap-3">
    <div className="h-[2px] w-9 rounded-full bg-[#D8AD55]" />
    <div className="h-[1px] flex-1 bg-[#EAE3D5]" />
    <i className="fa-solid fa-leaf text-[11px] text-[#9BAA98]" />
  </div>
</section>


        {/* Selected question */}
        <section className="mx-[22px] mt-7 rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5] p-5">
          <div className="mb-3 flex items-center gap-2">
            <i className="fa-regular fa-heart text-[13px] text-[#B08B50]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#8A897E]">
              What you're feeling
            </span>
          </div>
          <p className="font-serif text-[19px] leading-[1.5] text-[#263F32]">
            {currentQuestion}
          </p>
        </section>

        {/* Scripture */}
        <section className="mt-9 px-[22px]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#8A897E]">
                01 / Scripture
              </p>
              <h2 className="mt-1 font-serif text-[25px] text-[#1D211D]">
                A word from God
              </h2>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6EEE7]">
              <i className="fa-solid fa-book-open text-[#174735]" />
            </div>
          </div>

          <div className="rounded-[22px] bg-[#174735] p-5 text-[#FFFCF5]">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[1.3px] text-[#D4DDCF]">
                {activeVerse + 1} of {verses.length} passages
              </span>
              <i className="fa-solid fa-quote-right text-[22px] text-[#D8AD55]" />
            </div>

            <h3 className="font-serif text-[27px] leading-tight">
              {verses[activeVerse].reference}
            </h3>
            <p className="mt-2 text-[12px] font-medium text-[#D8DCCF]">
              {verses[activeVerse].title}
            </p>
            <p className="mt-5 font-serif text-[17px] leading-[1.8] text-[#F7F2E8]">
              {verses[activeVerse].text}
            </p>

            <div className="mt-7 flex items-center justify-between">
              <button
                disabled={activeVerse === 0}
                onClick={() => setActiveVerse((v) => v - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 disabled:opacity-30"
              >
                <i className="fa-solid fa-chevron-left text-[11px]" />
              </button>

              <div className="flex gap-1.5">
                {verses.map((verse, index) => (
                  <button
                    key={verse.reference}
                    onClick={() => setActiveVerse(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeVerse === index
                        ? "w-6 bg-[#D8AD55]"
                        : "w-1.5 bg-white/35"
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={activeVerse === verses.length - 1}
                onClick={() => setActiveVerse((v) => v + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 disabled:opacity-30"
              >
                <i className="fa-solid fa-chevron-right text-[11px]" />
              </button>
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] text-[#8A897E]">
            Reflection summaries · Read the full Bible passage for context
          </p>
        </section>

        {/* Reflection */}
        <section className="mt-9 px-[22px]">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#8A897E]">
              02 / Reflection
            </p>
            <h2 className="mt-1 font-serif text-[25px]">Let it sink in.</h2>
          </div>

          <div className="rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E6EEE7]">
              <i className="fa-regular fa-sun text-[#174735]" />
            </div>

            <h3 className="font-serif text-[22px] leading-snug text-[#174735]">
              God sees the parts of you that others don't.
            </h3>

            <p className="mt-4 text-[13px] leading-[1.9] text-[#68685F]">
              There may be moments when you feel misunderstood, overlooked,
              or alone. You might try to explain what is happening inside
              you, but the words never seem enough.
            </p>

            <p className="mt-3 text-[13px] leading-[1.9] text-[#68685F]">
              But God knows you more deeply than anyone ever could. He sees
              the tears you hide, hears the prayers you struggle to say, and
              understands even the silence in your heart.
            </p>

            <p className="mt-3 text-[13px] leading-[1.9] text-[#68685F]">
              You do not have to pretend to be okay before coming to Him.
              Bring your heart as it is.
            </p>

            <div className="mt-5 border-t border-[#EAE3D5] pt-4">
              <p className="font-serif text-[16px] italic leading-relaxed text-[#174735]">
                "You are known, you are seen, and you are loved."
              </p>
            </div>
          </div>
        </section>

        {/* Personal reflection prompt */}
        <section className="mt-7 px-[22px]">
          <div className="rounded-[20px] bg-[#E6EEE7] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#56715F]">
              A moment for yourself
            </p>
            <h3 className="mt-2 font-serif text-[21px] leading-snug text-[#174735]">
              What would you like to tell God today?
            </h3>
            <textarea
              placeholder="Write your thoughts here..."
              rows={3}
              className="mt-4 w-full resize-none rounded-xl border border-[#D6E0D5] bg-[#FFFCF5] p-3 text-[13px] leading-relaxed text-[#1D211D] outline-none placeholder:text-[#A4A297] focus:border-[#174735]"
            />
            <p className="mt-2 text-[10px] text-[#718174]">
              Your thoughts are personal.
            </p>
          </div>
        </section>

        {/* Saint */}
        <section className="mt-9 px-[22px]">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#8A897E]">
              03 / Saintly companion
            </p>
            <h2 className="mt-1 font-serif text-[25px]">Walk with the saints.</h2>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5]">
            <div className="relative h-[170px] overflow-hidden bg-[#E8E2D4]">
              <img
                src="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=900&q=85"
                alt="Quiet church interior"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172B20]/70 to-transparent" />
              <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[1.5px] text-white">
                Saint of the day
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-serif text-[26px] text-[#174735]">
                St. Dymphna
              </h3>
              <p className="mt-1 text-[11px] font-medium text-[#9B8152]">
                Patron saint of those experiencing emotional and mental distress
              </p>
              <p className="mt-4 text-[13px] leading-[1.8] text-[#77766E]">
                St. Dymphna is remembered for her faith, courage, and
                compassion. You can ask for her intercession as you seek
                comfort, strength, and peace.
              </p>

              <button
                onClick={() => toggleSection("saint")}
                className="mt-4 flex w-full items-center justify-between border-t border-[#EAE3D5] pt-4 text-[12px] font-semibold text-[#174735]"
              >
                {expanded.saint ? "Close saint story" : "Discover her story"}
                <i className={`fa-solid fa-chevron-${expanded.saint ? "up" : "right"} text-[10px]`} />
              </button>

              {expanded.saint && (
                <p className="mt-3 text-[13px] leading-[1.8] text-[#77766E]">
                  Her story is traditionally associated with courage in
                  suffering and care for those experiencing distress.
                  Take a moment to ask for her prayers and intercession.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hymn */}
        <section className="mt-9 px-[22px]">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#8A897E]">
              04 / Sacred music
            </p>
            <h2 className="mt-1 font-serif text-[25px]">Let the music speak.</h2>
          </div>

          <div className="flex items-center gap-4 rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5] p-4">
            <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[16px] bg-[#174735]">
              <i className="fa-solid fa-music text-[25px] text-[#D8AD55]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#9B8152]">
                A hymn for reflection
              </p>
              <h3 className="mt-1 font-serif text-[18px] text-[#174735]">
                Be Still, My Soul
              </h3>
              <p className="mt-1 text-[11px] text-[#88877D]">
                A hymn of trust and comfort
              </p>
            </div>

            <button
              onClick={() => toggleSection("hymn")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6EEE7] text-[#174735]"
            >
              <i className={`fa-solid fa-${expanded.hymn ? "pause" : "play"} text-[13px]`} />
            </button>
          </div>

          {expanded.hymn && (
            <p className="mt-2 text-[11px] text-[#8A897E]">
              Demo play control only. Connect a licensed audio source when
              the hymn catalogue is ready.
            </p>
          )}
        </section>

        {/* Prayer */}
        <section className="mt-9 px-[22px]">
          <div className="rounded-[24px] bg-[#174735] p-6 text-[#FFFCF5]">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#D8DCCF]">
                05 / A prayer for you
              </p>
              <i className="fa-solid fa-hands-praying text-[20px] text-[#D8AD55]" />
            </div>

            <h2 className="mt-3 font-serif text-[28px] leading-tight">
              Let us pray.
            </h2>

            <p className="mt-5 font-serif text-[17px] leading-[1.9] text-[#F7F2E8]">
              Dear Lord,
              <br /><br />
              You know my heart and everything I carry within it. When I feel
              alone or misunderstood, remind me that You are always near.
              Help me find comfort in Your presence and courage in Your love.
              <br /><br />
              Teach me to trust You, even in the quiet moments. Let me never
              forget that I am seen, heard, and loved by You.
              <br /><br />
              Amen.
            </p>

            <button
              onClick={() => toggleSection("prayer")}
              className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-[#D8DCCF]"
            >
              <i className="fa-regular fa-copy" />
              Copy prayer
            </button>
          </div>
        </section>

        {/* Finish */}
        <section className="px-[22px] pt-8">
          <p className="text-center font-serif text-[20px] italic text-[#174735]">
            Carry His peace with you.
          </p>
          <p className="mt-2 text-center text-[11px] text-[#8A897E]">
            You can return to this moment whenever you need it.
          </p>

          <button
            onClick={() => onNavigate?.("explore")}
            className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#174735] text-[13px] font-semibold text-white"
          >
            Finish reflection
            <i className="fa-solid fa-arrow-right text-[11px]" />
          </button>
        </section>
      </div>

      <BottomNav activePage="explore" onNavigate={onNavigate} />
    </div>
  );
}
