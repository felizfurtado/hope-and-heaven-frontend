
import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

export default function VerseCard({ verse, loading, onToast }) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkingSaved, setCheckingSaved] = useState(false);

  // Check whether this verse is already saved
  useEffect(() => {
    if (!verse?.id || loading) {
      setSaved(false);
      return;
    }

    const controller = new AbortController();

    const checkSaved = async () => {
      try {
        setCheckingSaved(true);

        const response = await apiFetch("saved-verses/", {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to check saved verses.");
        }

        const data = await response.json();

        setSaved(
          Array.isArray(data) &&
          data.some((item) => item.verse_id === verse.id)
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Check saved verse error:", error);
          setSaved(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCheckingSaved(false);
        }
      }
    };

    checkSaved();

    return () => controller.abort();
  }, [verse?.id, loading]);

  // Save or remove verse
  const handleSave = async () => {
    if (!verse?.id || saving || checkingSaved || loading) return;

    if (!localStorage.getItem("access")) {
      onToast?.("Please sign in to save verses.");
      return;
    }

    setSaving(true);

    try {
      const response = await apiFetch(
        saved
          ? `saved-verses/${verse.id}/`
          : "saved-verses/",
        {
          method: saved ? "DELETE" : "POST",
          headers: saved
            ? {}
            : { "Content-Type": "application/json" },
          ...(!saved && {
            body: JSON.stringify({
              verse_id: verse.id,
            }),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update saved verse.");
      }

      const nextState = !saved;
      setSaved(nextState);

      onToast?.(
        nextState
          ? "Verse saved to your library"
          : "Verse removed from saved"
      );
    } catch (error) {
      console.error("Save verse error:", error);
      onToast?.(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Share verse
  const handleShare = async () => {
    if (!verse) return;

    const text = `${verse.text} — ${verse.reference}`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled the share sheet.
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        onToast?.("Verse copied to clipboard");
      } catch {
        onToast?.("Unable to copy verse");
      }
    } else {
      onToast?.("Sharing is not available on this browser");
    }
  };

  return (
    <section className="mx-[22px] mt-4 rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5] p-[18px]">

      {/* Heading */}
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.4px] text-[#174735]">
        <i className="fa-solid fa-book-bible text-[12px]" />
        Verse of the Day
      </div>

      {/* Verse */}
      <blockquote className="my-3 font-serif text-[19px] leading-[1.45] text-[#1D211D]">
        {loading ? (
          <span className="text-[15px] text-[#77766E]">
            Finding a verse for you...
          </span>
        ) : verse ? (
          verse.text
        ) : (
          <span className="text-[15px] text-[#77766E]">
            Unable to load verse. Please try again later.
          </span>
        )}
      </blockquote>

      {/* Reference */}
      {verse && !loading && (
        <cite className="text-[12.5px] not-italic text-[#77766E]">
          {verse.reference}
        </cite>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-2">

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={!verse || loading || saving || checkingSaved}
          className={`inline-flex items-center gap-2 rounded-full border px-[14px] py-[9px] text-[12.5px] font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
            saved
              ? "border-[#174735] bg-[#174735] !text-white"
              : "border-[#EAE3D5] bg-[#F7F2E8] text-[#1D211D] hover:border-[#174735]"
          }`}
        >
          <i
            className={`fa-bookmark ${
              saved ? "fa-solid !text-white" : "fa-regular"
            }`}
          />

          <span className={saved ? "!text-white" : "text-[#1D211D]"}>
            {saving ? "Saving..." : saved ? "Saved" : "Save"}
          </span>
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          disabled={!verse || loading}
          className="inline-flex items-center gap-2 rounded-full border border-[#EAE3D5] bg-[#F7F2E8] px-[14px] py-[9px] text-[12.5px] font-medium text-[#1D211D] transition-all duration-200 hover:border-[#174735] active:border-[#174735] active:bg-[#174735] active:!text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-solid fa-share-nodes active:!text-white" />
          Share
        </button>

      </div>
    </section>
  );
}
