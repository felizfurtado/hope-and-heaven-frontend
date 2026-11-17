
import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import HeroBanner from "../components/home/HeroBanner";
import EmotionPicker from "../components/home/EmotionPicker";
import VerseCard from "../components/home/VerseCard";
import QuickActions from "../components/home/QuickActions";
import BottomNav from "../components/common/BottomNav";
import { apiUrl } from "../services/api";

export default function HomePage({ user, onNavigate }) {
  const [toast, setToast] = useState("");

  const [dailyVerse, setDailyVerse] = useState(null);
  const [verseLoading, setVerseLoading] = useState(true);

  const [savedCount, setSavedCount] = useState(0);

  // Fetch random Bible verse from Django
  useEffect(() => {
    const controller = new AbortController();

    const fetchDailyVerse = async () => {
      try {
        setVerseLoading(true);

        const response = await fetch(
          apiUrl("bible/random-verse/"),
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Bible verse");
        }

        const data = await response.json();
        setDailyVerse(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Verse loading error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setVerseLoading(false);
        }
      }
    };

    fetchDailyVerse();

    return () => controller.abort();
  }, []);

  // Fetch saved verse count
  const fetchSavedCount = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) return;

      const response = await fetch(apiUrl("saved-verses/"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved verses");
      }

      const data = await response.json();
      setSavedCount(data.length);
    } catch (error) {
      console.error("Saved count error:", error);
    }
  };

  useEffect(() => {
    fetchSavedCount();
  }, []);

  // Toast
  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast("");
    }, 1800);

    return () => clearTimeout(timeout);
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  const firstName =
    user?.first_name ||
    user?.full_name?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    "there";

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
      ? "Good afternoon"
      : "Good evening";

  const dateLine = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[112px] shadow-[0_10px_45px_rgba(0,0,0,0.10)] min-[600px]:my-5 min-[600px]:min-h-[850px] min-[600px]:rounded-[25px]">

      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Greeting */}
      <div className="reveal flex items-end justify-between gap-4 px-[22px] pb-4 [animation-delay:150ms]">
        <div>
          <small className="mb-[2px] block text-[12px] text-[#77766E]">
            {dateLine}
          </small>

          <h2 className="font-serif text-[23px] font-medium tracking-[-0.3px] text-[#1D211D]">
            {greeting}, {firstName}
          </h2>
        </div>

        {/* Saved verses shortcut */}
        <button
          type="button"
          onClick={() => onNavigate?.("saved")}
          className="flex shrink-0 items-center gap-[7px] rounded-full border border-[#EAE3D5] bg-[#FFFCF5] px-[13px] py-[8px] text-[12px] transition hover:border-[#174735] hover:shadow-sm"
        >
          <i className="fa-solid fa-bookmark text-[12px] text-[#B68C52]" />

          <span className="font-medium text-[#77766E]">
            Saved
          </span>

          <span className="font-semibold text-[#1D211D]">
            {savedCount} {savedCount === 1 ? "verse" : "verses"}
          </span>
        </button>
      </div>

      {/* Hero */}
      <HeroBanner />

      {/* Emotion selection */}
      <div className="reveal [animation-delay:450ms]">
        <EmotionPicker
  onSeeAll={() => onNavigate?.("explore")}
  onSelect={(feeling) => onNavigate?.("subtopics", feeling)}
/>
      </div>

      {/* Verse of the day */}
      <div className="reveal [animation-delay:600ms]">
        <VerseCard
          verse={dailyVerse}
          loading={verseLoading}
          onToast={showToast}
        />
      </div>

      {/* Quick actions */}
      <div className="reveal [animation-delay:600ms]">
        <QuickActions
          onPrayer={() => onNavigate?.("prayer")}
          onBible={() => onNavigate?.("bible")}
        />
      </div>

      {/* Bottom navigation */}
      <BottomNav
        activePage="home"
        onNavigate={onNavigate}
      />

      {/* Toast */}
      <div
        className={`fixed bottom-[96px] left-1/2 z-[30] -translate-x-1/2 rounded-full bg-[#103629] px-4 py-[10px] text-[12.5px] text-white transition-all duration-300 ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>

    </main>
  );
}
