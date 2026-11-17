
import Header from "../components/layout/Header";
import BottomNav from "../components/common/BottomNav";

const communityItems = [
  {
    title: "Stories of Hope",
    description: "Real experiences that bring encouragement.",
    icon: "fa-solid fa-book-open",
    premium: false,
  },
  {
    title: "Prayer Circle",
    description: "Share a prayer request or pray for others.",
    icon: "fa-solid fa-hands-praying",
    premium: false,
  },
  {
    title: "Healing Journeys",
    description: "Step-by-step spiritual journeys for your healing.",
    icon: "fa-solid fa-mountain-sun",
    premium: true,
  },
  {
    title: "Scripture Experiences",
    description: "How God's Word made a difference in real lives.",
    icon: "fa-solid fa-book-bible",
    premium: false,
  },
  {
    title: "AI Companion",
    description: "Find guidance, comfort and encouragement through faith.",
    icon: "fa-solid fa-wand-magic-sparkles",
    premium: true,
    wide: true,
  },
];

export default function CommunityPage({ onNavigate }) {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[112px] text-[#1D211D] shadow-[0_10px_45px_rgba(0,0,0,0.10)]">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-[90px] -top-[120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.20),transparent_68%)]" />

      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Page heading */}
      <section className="relative animate-[rise_0.6s_ease_both] px-[22px] py-4">
        <span className="mb-[10px] block text-[10.5px] font-semibold uppercase tracking-[2px] text-[#174735]">
          Connect / Grow / Share
        </span>

        <h1 className="font-serif text-[36px] font-medium leading-[1.08] tracking-[-1px] text-[#174735]">
          Faith is better <em className="font-normal">together.</em>
        </h1>

        <div className="my-4 h-[2px] w-[34px] rounded-full bg-[#D8AD55]" />

        <p className="max-w-[315px] text-[13.5px] leading-[1.65] text-[#77766E]">
          Faith grows when we share, pray and encourage one another.
          Find a space where your heart feels at home.
        </p>
      </section>

      {/* Hero banner */}
      <section className="relative mx-[22px] mt-2 h-[220px] overflow-hidden rounded-[24px] border border-[#EAE3D5] bg-[#263F2D] shadow-[0_8px_20px_rgba(35,50,37,0.10)]">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/community-banner.png')",
            backgroundPosition: "center",
          }}
        />

        {/* Left-side readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/80 via-[#10291F]/45 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full max-w-[285px] flex-col justify-center px-5">
          <span className="mb-2 text-[9px] font-semibold uppercase tracking-[2px] text-[#E9D6AD]">
            A place to belong
          </span>

          <h2 className="font-serif text-[29px] font-semibold leading-[1.15] text-[#FFFCF5]">
            You are not alone.
          </h2>

          <p className="mt-2 text-[12px] leading-[1.6] text-white">
            Find people, prayers and experiences that meet you where you are.
          </p>

          <div className="mt-4 flex w-fit items-center gap-2 rounded-full bg-[#F7F2E8] px-4 py-[9px] text-[11px] font-semibold text-[#174735]">
            <span>Explore the Community</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </div>
        </div>
      </section>

      {/* Explore heading */}
      <section className="px-[22px] pb-3 pt-7">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#A7864C]">
              Find your space
            </span>

            <h2 className="mt-1 font-serif text-[27px] font-medium text-[#174735]">
              Explore Community
            </h2>
          </div>

          <span className="text-[11px] text-[#77766E]">
            05 spaces
          </span>
        </div>
      </section>

      {/* Community cards */}
      <section className="grid grid-cols-2 gap-3 px-[22px]">
        {communityItems.map((item, index) => (
          <div
            key={item.title}
            className={`group relative flex min-h-[145px] flex-col gap-3 overflow-hidden rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5] p-4 text-left shadow-[0_5px_12px_rgba(35,50,37,0.04)] transition duration-200 ${
              item.wide
                ? "col-span-2 min-h-[125px] flex-row items-center px-5"
                : ""
            }`}
            style={{
              animation: `rise 0.5s ease ${index * 0.05}s both`,
            }}
          >
            {/* Icon */}
            <div className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[15px] bg-[#E6EEE7] text-[19px] text-[#174735]">
              <i className={item.icon} />
            </div>

            {/* Content */}
            <div className="relative min-w-0 flex-1 pr-2">
              <h3 className="font-serif text-[16px] font-semibold leading-[1.25] text-[#1D211D]">
                {item.title}
              </h3>

              <p className="mt-2 text-[11.5px] leading-[1.55] text-[#77766E]">
                {item.description}
              </p>
            </div>

            {/* Premium crown */}
            {item.premium && (
              <div className="absolute right-3 top-3 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#F3E7CA] text-[10px] text-[#A7864C]">
                <i className="fa-solid fa-crown" />
              </div>
            )}

            {/* Arrow */}
            <div
              className={`absolute grid h-[25px] w-[25px] place-items-center rounded-full bg-[#F7F2E8] text-[10px] text-[#174735] ${
                item.wide
                  ? "right-4 top-1/2 -translate-y-1/2"
                  : "bottom-3 right-3"
              }`}
            >
              <i className="fa-solid fa-arrow-right" />
            </div>
          </div>
        ))}
      </section>

      {/* Inspirational quote */}
      <section className="mx-[22px] mt-7 rounded-[22px] border border-[#EAE3D5] bg-[#F0E8D9] px-5 py-6 text-center">
        <i className="fa-solid fa-quote-left text-[20px] text-[#A7864C]" />

        <p className="mx-auto mt-3 max-w-[310px] font-serif text-[18px] italic leading-[1.55] text-[#343A32]">
          Sometimes, knowing someone else has walked the same road makes
          the journey feel less lonely.
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#B9AE94]" />
          <i className="fa-solid fa-seedling text-[16px] text-[#8A9871]" />
          <span className="h-px w-10 bg-[#B9AE94]" />
        </div>
      </section>

      {/* Bottom navigation */}
      <BottomNav
        activePage="community"
        onNavigate={onNavigate}
      />

    </main>
  );
}
