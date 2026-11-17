
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/api";
import emotionStyles from "../../data/emotionStyles.json";

export default function EmotionPicker({ onSeeAll, onSelect }) {
  const [feelings, setFeelings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeelings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(apiUrl("feelings/"), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load feelings.");
        }

        const data = await response.json();
        setFeelings(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Couldn't load feelings. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFeelings();

    return () => controller.abort();
  }, []);

  return (
    <section className="px-[22px] pt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-[21px] font-medium text-[#1D211D]">
            Choose what you feel
          </h3>

          <p className="mt-1 text-[12px] text-[#77766E]">
            It's okay to feel what you feel.
          </p>
        </div>

        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-1 text-[12px] font-semibold text-[#174735]"
        >
          See all
          <i className="fa-solid fa-arrow-right text-[10px]" />
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[105px] animate-pulse rounded-[18px] bg-[#EAE3D5]"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-[18px] border border-[#EAE3D5] bg-[#FFFCF5] p-4 text-center">
          <p className="text-sm text-[#77766E]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-semibold text-[#174735]"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && feelings.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {feelings.map((feeling) => {
            const style = emotionStyles[feeling.name] || {
              icon: "fa-solid fa-leaf",
              color: "bg-[#E6EEE7] text-[#416C4B]",
            };

            return (
              <button
                key={feeling.id}
                type="button"
                onClick={() => onSelect?.(feeling)}
                className="flex min-h-[105px] flex-col items-center justify-center gap-2 rounded-[18px] border border-[#EAE3D5] bg-[#FFFCF5] px-2 py-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm active:scale-95"
              >
                <div
                  className={`grid h-[42px] w-[42px] place-items-center rounded-[14px] text-[18px] ${style.color}`}
                >
                  <i className={style.icon} />
                </div>

                <span className="text-center text-[11.5px] font-medium leading-tight text-[#1D211D]">
                  {feeling.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {!loading && !error && feelings.length === 0 && (
        <p className="py-5 text-center text-sm text-[#77766E]">
          No feelings available right now.
        </p>
      )}
    </section>
  );
}
