export default function QuickActions({ onPrayer, onBible }) {
  return (
    <section className="mx-[22px] mt-4 grid grid-cols-2 gap-[10px]">
      <button
        type="button"
        onClick={onPrayer}
        className="flex items-center gap-3 rounded-2xl border border-[#EAE3D5] bg-[#FFFCF5] p-[14px] text-left transition hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(35,50,37,0.08)]"
      >
        <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl bg-[#E6EEE7] text-[16px] text-[#174735]">
          <i className="fa-solid fa-hands-praying" />
        </div>

        <div>
          <b className="block text-[13px] font-semibold text-[#1D211D]">
            Saved Verses
          </b>
          <small className="text-[11px] text-[#77766E]">
            Your favourite scriptures
          </small>
        </div>
      </button>

      <button
        type="button"
        onClick={onBible}
        className="flex items-center gap-3 rounded-2xl border border-[#EAE3D5] bg-[#FFFCF5] p-[14px] text-left transition hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(35,50,37,0.08)]"
      >
        <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl bg-[#E6EEE7] text-[16px] text-[#174735]">
          <i className="fa-solid fa-book-bible" />
        </div>

        <div>
          <b className="block text-[13px] font-semibold text-[#1D211D]">
            Asher AI
          </b>
          <small className="text-[11px] text-[#77766E]">
            Comming soon
          </small>
        </div>
      </button>
    </section>
  );
}