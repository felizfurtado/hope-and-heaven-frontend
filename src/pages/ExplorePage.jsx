
import { useEffect, useMemo, useState } from "react";
import BottomNav from "../components/common/BottomNav";
import emotionStyles from "../data/emotionStyles.json";
import Header from "../components/layout/Header";
import { apiUrl } from "../services/api";

export default function ExplorePage({ onNavigate }) {
  const [feelings, setFeelings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeelings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(apiUrl("feelings/"));

        if (!response.ok) {
          throw new Error("Unable to load emotions.");
        }

        const data = await response.json();
        setFeelings(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeelings();
  }, []);

  const filteredFeelings = useMemo(() => {
    return feelings.filter((feeling) =>
      feeling.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [feelings, search]);

  // Open SubtopicPage with the selected emotion
  const handleFeelingClick = (feeling) => {
    onNavigate("subtopics", feeling);
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[112px] text-[#1D211D] shadow-[0_10px_45px_rgba(0,0,0,0.10)]">

      <div className="pointer-events-none absolute -right-[90px] -top-[120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.20),transparent_68%)]" />

      {/* Header */}
      
{/* Header */}
<Header onNavigate={onNavigate} />


      {/* Page title */}
      <section className="relative animate-[rise_0.6s_ease_both] px-[22px] py-4">
        <span className="mb-[10px] block text-[10.5px] font-semibold uppercase tracking-[2px] text-[#174735]">
          Explore
        </span>

        <h1 className="font-serif text-[36px] font-medium leading-[1.08] tracking-[-1px]">
          How is your <em className="font-normal">heart</em> today?
        </h1>

        <div className="my-4 h-[2px] w-[34px] rounded-full bg-[#D8AD55]" />

        <p className="max-w-[290px] text-[13.5px] leading-[1.55] text-[#77766E]">
          Choose what you feel and receive a word of comfort from Scripture.
        </p>
      </section>

      {/* Search */}
      <div className="relative mx-[22px] mt-2 animate-[rise_0.6s_0.1s_ease_both]">
        <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#77766E]" />

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a feeling…"
          aria-label="Search feelings"
          className="h-[50px] w-full rounded-[16px] border border-[#EAE3D5] bg-[#FFFCF5] pl-[42px] pr-4 text-[14px] outline-none transition placeholder:text-[#9A988E] focus:border-[#174735] focus:ring-[3px] focus:ring-[#174735]/10"
        />
      </div>

      {/* Results count */}
      <div className="px-[22px] pb-3 pt-5 text-[12px] text-[#77766E]">
        <strong className="font-semibold text-[#1D211D]">
          {filteredFeelings.length}
        </strong>{" "}
        {filteredFeelings.length === 1 ? "emotion" : "emotions"}
      </div>

      {/* Loading */}
      {loading && (
        <div className="px-[22px] py-10 text-center text-sm text-[#77766E]">
          <i className="fa-solid fa-spinner fa-spin mr-2" />
          Loading emotions...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mx-[22px] rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5] p-5 text-center">
          <p className="text-sm text-[#B75A54]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-semibold text-[#174735]"
          >
            Try again
          </button>
        </div>
      )}

      


{/* Emotion cards */}
{!loading && !error && filteredFeelings.length > 0 && (
  <section className="grid grid-cols-2 gap-3 px-[22px]">
    {filteredFeelings.map((feeling, index) => {
      const style = emotionStyles[feeling.name] || {
        icon: "fa-solid fa-leaf",
        color: "bg-[#E6EEE7] text-[#174735]",
      };

      return (
        <button
          key={feeling.id}
          type="button"
          onClick={() => handleFeelingClick(feeling)}
          className="group relative flex min-h-[118px] flex-col gap-2 rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5] p-3 text-left shadow-[0_4px_10px_rgba(35,50,37,0.03)] transition duration-200 hover:-translate-y-[2px] hover:border-[#D5CBB9] hover:shadow-[0_6px_14px_rgba(35,50,37,0.06)] active:scale-[0.98]"
          style={{
            animation: `rise 0.5s ease ${index * 0.05}s both`,
          }}
        >
          {/* Icon */}
          <div
            className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[13px] text-[17px] ${style.color}`}
          >
            <i className={style.icon} />
          </div>

          {/* Emotion name */}
          <div className="min-w-0 flex-1 pr-6">
            <h3 className="font-serif text-[16px] font-semibold leading-[1.25] text-[#1D211D]">
              {feeling.name}
            </h3>
          </div>

          {/* Arrow */}
          <div className="absolute bottom-3 right-3 grid h-[24px] w-[24px] place-items-center rounded-full bg-[#F7F2E8] text-[10px] text-[#174735] transition-transform duration-200 group-hover:translate-x-0.5">
            <i className="fa-solid fa-arrow-right" />
          </div>
        </button>
      );
    })}
  </section>
)}



      {/* Empty state */}
      {!loading && !error && filteredFeelings.length === 0 && (
        <div className="mx-[22px] mt-6 rounded-[20px] border border-dashed border-[#D8CFBC] bg-[#FFFCF5] px-5 py-7 text-center">
          <i className="fa-solid fa-magnifying-glass mb-3 text-[22px] text-[#174735]" />

          <p className="font-serif text-[16px]">
            No emotion found
          </p>

          <small className="mt-1 block text-[12.5px] text-[#77766E]">
            Try a different word.
          </small>
        </div>
      )}

      <BottomNav activePage="explore" onNavigate={onNavigate} />
    </main>
  );
}
