
import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import BottomNav from "../components/common/BottomNav";
import Header from "../components/layout/Header";

export default function SavedPage({ onNavigate }) {
  const [savedVerses, setSavedVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const fetchSavedVerses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch("saved-verses/");

      if (!response.ok) {
        throw new Error("Unable to load saved verses.");
      }

      const data = await response.json();
      setSavedVerses(data);
    } catch (err) {
      console.error("Saved verses error:", err);
      setError(err.message || "Couldn't load your saved verses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedVerses();
  }, [fetchSavedVerses]);

  const handleRemove = async (verseId) => {
    try {
      setRemovingId(verseId);

      const response = await apiFetch(`saved-verses/${verseId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to remove this verse.");
      }

      setSavedVerses((previous) =>
        previous.filter((item) => item.verse_id !== verseId)
      );

      showToast("Verse removed from saved.");
    } catch (err) {
      console.error("Remove saved verse error:", err);
      showToast(err.message || "Couldn't remove verse.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleShare = async (verse) => {
    const text = `"${verse.text}"\n\n${verse.reference}\n\n— Asher`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: verse.reference,
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        showToast("Verse copied to clipboard.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share error:", err);
        showToast("Unable to share verse.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#E8E1D4] sm:py-6">
      <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[110px] shadow-xl sm:min-h-[850px] sm:rounded-[28px]">

              <div className="pointer-events-none absolute -right-[90px] -top-[120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.20),transparent_68%)]" />


        {/* Header */}
        <Header
          onBack={() => onNavigate("home")}
          backLabel="Back to home"
        />

        {/* Page heading */}
        <section className="relative px-[22px] pt-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[2px] w-7 bg-[#D8AD55]" />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#A7864C]">
              Your collection
            </span>
          </div>

          <h1 className="font-serif text-[34px] font-medium leading-tight text-[#1D211D]">
            Saved verses.
          </h1>

          <p className="mt-2 max-w-[300px] text-[13px] leading-[1.7] text-[#77766E]">
            Words of Scripture you've kept close to your heart.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex items-center gap-[7px] rounded-full border border-[#EAE3D5] bg-[#FFFCF5] px-3 py-[7px] text-[12px]">
              <i className="fa-solid fa-bookmark text-[12px] text-[#B68C52]" />
              <span className="font-semibold text-[#1D211D]">
                {savedVerses.length}{" "}
                {savedVerses.length === 1 ? "saved verse" : "saved verses"}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="relative px-[22px] pt-6">

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[170px] animate-pulse rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5]"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5] p-6 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#E6EEE7] text-[#416C4B]">
                <i className="fa-solid fa-circle-exclamation text-lg" />
              </div>

              <p className="text-sm text-[#77766E]">{error}</p>

              <button
                type="button"
                onClick={fetchSavedVerses}
                className="mt-4 rounded-full bg-[#174735] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#103629]"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && savedVerses.length === 0 && (
            <div className="rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5] px-6 py-10 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#E6EEE7] text-[#416C4B]">
                <i className="fa-solid fa-bookmark text-2xl" />
              </div>

              <h3 className="font-serif text-[22px] text-[#1D211D]">
                Nothing saved yet.
              </h3>

              <p className="mx-auto mt-2 max-w-[240px] text-[12px] leading-relaxed text-[#77766E]">
                When a verse speaks to your heart, save it here so you can
                return to it whenever you need.
              </p>

              <button
                type="button"
                onClick={() => onNavigate?.("home")}
                className="mt-6 rounded-full bg-[#174735] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#103629]"
              >
                Explore verses
              </button>
            </div>
          )}

          {/* Saved verses */}
          {!loading && !error && savedVerses.length > 0 && (
            <div className="space-y-4">
              {savedVerses.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5] p-5 shadow-[0_3px_12px_rgba(29,33,29,0.025)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-book-open text-[12px] text-[#B68C52]" />
                      <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#A7864C]">
                        Holy Scripture
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.verse_id)}
                      disabled={removingId === item.verse_id}
                      className="grid h-8 w-8 place-items-center rounded-full text-[#A39B8C] transition hover:bg-[#F5EAE4] hover:text-[#A44D3F] disabled:opacity-40"
                      aria-label="Remove saved verse"
                    >
                      {removingId === item.verse_id ? (
                        <i className="fa-solid fa-spinner animate-spin text-xs" />
                      ) : (
                        <i className="fa-solid fa-bookmark text-xs" />
                      )}
                    </button>
                  </div>

                  <p className="font-serif text-[19px] leading-[1.65] text-[#1D211D]">
                    “{item.text}”
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#EAE3D5] pt-4">
                    <div>
                      <p className="text-[13px] font-semibold text-[#174735]">
                        {item.reference}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-[1px] text-[#A39B8C]">
                        {item.translation || "WEB"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleShare(item)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#EAE3D5] text-[#174735] transition hover:bg-[#E6EEE7]"
                      aria-label="Share verse"
                    >
                      <i className="fa-solid fa-share-nodes text-xs" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-[95px] left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#174735] px-5 py-3 text-xs font-medium text-white shadow-lg">
            {toast}
          </div>
        )}

        {/* Bottom navigation */}
        <BottomNav
          activePage="saved"
          onNavigate={onNavigate}
        />
      </main>
    </div>
  );
}
