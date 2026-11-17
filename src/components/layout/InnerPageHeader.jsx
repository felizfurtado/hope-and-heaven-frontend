
import logo from "../../assets/logo3.png";

export default function InnerPageHeader({
  onBack,
  backLabel = "Go back",
}) {
  return (
    <header className="relative flex h-[76px] items-center px-[22px]">

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        aria-label={backLabel}
        className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-[#EAE3D5] bg-[#FFFCF5] text-[15px] text-[#174735] transition-all duration-200 hover:-translate-x-0.5 hover:shadow-md active:scale-95"
      >
        <i className="fa-solid fa-arrow-left" />
      </button>

      {/* Exactly centered branding */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[9px]">
        <img
          src={logo}
          alt="Hope & Heaven logo"
          className="h-[43px] w-[43px] object-contain"
        />

        <div className="flex flex-col">
          <span className="whitespace-nowrap font-serif text-[21px] font-semibold leading-[1.05] tracking-[-0.5px] text-[#174735]">
            Hope & Heaven
          </span>

          <span className="mt-[4px] text-center font-sans text-[9px] font-medium uppercase tracking-[3px] text-[#174735]">
            BY ASHER
          </span>
        </div>
      </div>

    </header>
  );
}
