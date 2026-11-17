
import logo from "../../assets/logo3.png";

export default function Header({ onNavigate }) {
  return (
    <header className="flex h-[76px] w-full items-center justify-between px-[22px]">

      {/* Brand */}
      <div className="flex min-w-0 items-center gap-[10px]">
        <img
          src={logo}
          alt="Hope & Heaven logo"
          className="h-[48px] w-[48px] shrink-0 object-contain"
        />

        <div className="flex flex-col">
          <span className="whitespace-nowrap font-serif text-[21px] font-semibold leading-[1.05] tracking-[-0.6px] text-[#174735]">
            Hope & Heaven
          </span>

          <span className="mt-[5px] text-[9px] font-medium uppercase tracking-[3px] text-[#77766E]">
            BY ASHER
          </span>
        </div>
      </div>

      {/* Notifications */}
      <button
  type="button"
  aria-label="Notifications"
  onClick={() => onNavigate?.("notifications")}
  className="relative grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-[#EAE3D5] bg-[#FFFCF5] text-[16px] text-[#174735] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D8AD55] hover:shadow-sm active:scale-95"
>
  <i className="fa-regular fa-bell" />

  <span className="absolute right-[9px] top-[8px] h-[7px] w-[7px] rounded-full border-[1.5px] border-[#FFFCF5] bg-[#D8AD55]" />
</button>

    </header>
  );
}
