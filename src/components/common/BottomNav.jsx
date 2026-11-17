const navItems = [
  {
    label: "Home",
    icon: "fa-solid fa-house",
    page: "home",
  },
  {
    label: "Explore",
    icon: "fa-regular fa-compass",
    page: "explore",
  },
  {
    label: "Community",
    icon: "fa-solid fa-people-group",
    page: "community",
  },
  {
    label: "Profile",
    icon: "fa-regular fa-user",
    page: "profile",
  },
];

export default function BottomNav({
  activePage = "home",
  onNavigate,
}) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-[calc(72px+env(safe-area-inset-bottom))] w-full max-w-[430px] -translate-x-1/2 items-center justify-around border-t border-[#E9E1D4] bg-[#FFFCF5]/[0.95] pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl min-[600px]:bottom-5 min-[600px]:h-[72px] min-[600px]:rounded-b-[25px]">

      {navItems.map((item) => {
        const active = activePage === item.page;

        return (
          <button
            key={item.page}
            type="button"
            onClick={() => onNavigate?.(item.page)}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-[72px] min-w-[62px] flex-col items-center justify-center gap-[5px] bg-transparent transition-all duration-300 ${
              active
                ? "text-[#174735] opacity-100"
                : "text-[#777C75] opacity-70"
            }`}
          >
            {active && (
              <span className="absolute top-0 h-[3px] w-[26px] rounded-b-[4px] bg-[#174735]" />
            )}

            <i className={`${item.icon} text-[19px]`} />

            <span className="text-[10.5px] font-medium">
              {item.label}
            </span>
          </button>
        );
      })}

    </nav>
  );
}