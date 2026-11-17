
import { useState } from "react";

import Header from "../components/layout/Header";
import BottomNav from "../components/common/BottomNav";

const profileSections = [
  {
    heading: "Your spiritual space",
    items: [
      {
        title: "My Saved Verses",
        description: "Scripture you've kept close to your heart.",
        icon: "fa-solid fa-bookmark",
        action: "saved",
      },
      {
        title: "My Prayer Journal",
        description: "Your personal moments with God.",
        icon: "fa-solid fa-book-open",
        locked: true,
      },
      {
        title: "My Healing Journeys",
        description: "Continue your spiritual growth.",
        icon: "fa-solid fa-mountain-sun",
        locked: true,
      },
      {
        title: "AI Conversations",
        description: "Your personal conversations and reflections.",
        icon: "fa-solid fa-wand-magic-sparkles",
        locked: true,
      },
    ],
  },
  {
    heading: "Account & preferences",
    items: [
      {
        title: "Membership & Subscription",
        description: "Manage your Hope & Heaven membership.",
        icon: "fa-solid fa-crown",
        locked: true,
      },
      {
        title: "Help & Support",
        description: "We're here if you need help.",
        icon: "fa-regular fa-circle-question",
        action: "support",
      },
      {
        title: "About Hope & Heaven",
        description: "Learn more about our mission.",
        icon: "fa-solid fa-heart",
        action: "about",
      },
    ],
  },
];

export default function ProfilePage({ user, onNavigate, onLogout }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // User information
  const fullName =
    user?.full_name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.name ||
    user?.username ||
    "Friend";

  const email = user?.email || "Email not available";

  // Generate initials
  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  // Google profile picture
  const profileImage =
    user?.profile_picture ||
    user?.picture ||
    user?.avatar ||
    user?.photo ||
    user?.image ||
    null;

  // Handle profile menu clicks
  const handleItemClick = (item) => {
    if (item.locked) return;

    if (item.action === "saved") {
      onNavigate?.("saved");
    }

    if (item.action === "support") {
      setActiveModal("support");
    }

    if (item.action === "about") {
      setActiveModal("about");
    }
  };

  // Confirm sign out
  const handleSignOut = () => {
    setActiveModal(null);
    onLogout?.();
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-[112px] text-[#1D211D] shadow-[0_10px_45px_rgba(0,0,0,0.10)]">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-[90px] -top-[120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(216,173,85,0.20),transparent_68%)]" />

      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Page heading */}
      <section className="relative px-[22px] pb-5 pt-4">
        <span className="mb-[10px] block text-[10.5px] font-semibold uppercase tracking-[2px] text-[#174735]">
          Your account
        </span>

        <h1 className="font-serif text-[36px] font-medium leading-[1.08] tracking-[-1px] text-[#174735]">
          Your <em className="font-normal">profile.</em>
        </h1>

        <div className="my-4 h-[2px] w-[34px] rounded-full bg-[#D8AD55]" />

        <p className="max-w-[300px] text-[13.5px] leading-[1.65] text-[#77766E]">
          Your personal space for faith, reflection and your journey with God.
        </p>
      </section>

      {/* Profile card */}
      <section className="relative mx-[22px] overflow-hidden rounded-[24px] border border-[#EAE3D5] bg-[#FFFCF5] p-5 shadow-[0_8px_22px_rgba(35,50,37,0.06)]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-12 -top-14 h-[150px] w-[150px] rounded-full bg-[#E6EEE7]/70" />

        <div className="relative flex items-center gap-4">

          {/* Profile image / initials */}
          <div className="grid h-[68px] w-[68px] shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-[#E6EEE7] bg-[#174735] font-serif text-[24px] font-semibold text-white">
            {profileImage && !imageFailed ? (
              <img
                src={profileImage}
                alt={fullName}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              initials
            )}
          </div>

          {/* User information */}
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-serif text-[21px] font-semibold text-[#174735]">
              {fullName}
            </h2>

            <p className="mt-1 truncate text-[12px] text-[#77766E]">
              {email}
            </p>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#E6EEE7] px-2.5 py-1 text-[10px] font-semibold text-[#416C4B]">
              <i className="fa-solid fa-circle-check text-[9px]" />
              Hope & Heaven member
            </div>
          </div>

          
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-[#EAE3D5]" />

        {/* Profile message */}
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-seedling mt-1 text-[16px] text-[#A7864C]" />

          <p className="font-serif text-[14px] italic leading-[1.6] text-[#55594F]">
            "Grow in faith, find peace in His presence, and remember you are never alone."
          </p>
        </div>
      </section>

      {/* Profile sections */}
      {profileSections.map((section, sectionIndex) => (
        <section
          key={section.heading}
          className="relative px-[22px] pt-7"
        >
          <div className="mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#A7864C]">
              {sectionIndex === 0 ? "Your journey" : "Personal settings"}
            </span>

            <h2 className="mt-1 font-serif text-[25px] font-medium text-[#174735]">
              {section.heading}
            </h2>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#EAE3D5] bg-[#FFFCF5]">
            {section.items.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => handleItemClick(item)}
                disabled={item.locked}
                aria-disabled={item.locked}
                className={`group flex w-full items-center gap-3 border-b border-[#EAE3D5] px-4 py-4 text-left last:border-b-0 ${
                  item.locked
                    ? "cursor-not-allowed"
                    : "cursor-pointer transition-all duration-200 hover:bg-[#174735]"
                }`}
              >
                {/* Icon */}
                <div
                  className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] text-[17px] transition-all duration-200 ${
                    item.locked
                      ? "bg-[#F0EDE5] text-[#A6A397]"
                      : "bg-[#E6EEE7] text-[#174735] group-hover:bg-white/15 group-hover:!text-white"
                  }`}
                >
                  <i className={item.icon} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-serif text-[15px] font-semibold transition-colors duration-200 ${
                      item.locked
                        ? "text-[#8D8A80]"
                        : "text-[#1D211D] group-hover:!text-white"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-1 text-[11px] leading-[1.45] transition-colors duration-200 ${
                      item.locked
                        ? "text-[#A6A397]"
                        : "text-[#77766E] group-hover:!text-white/75"
                    }`}
                  >
                    {item.description}
                  </p>

                  {item.locked && (
                    <span className="mt-1.5 inline-block text-[9px] font-semibold uppercase tracking-[1px] text-[#A7864C]">
                      Coming soon
                    </span>
                  )}
                </div>

                {/* Lock / Arrow */}
                {item.locked ? (
                  <i className="fa-solid fa-lock shrink-0 text-[12px] text-[#A7864C]" />
                ) : (
                  <i className="fa-solid fa-chevron-right shrink-0 text-[11px] text-[#A6A397] transition-all duration-200 group-hover:translate-x-0.5 group-hover:!text-white" />
                )}
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* Sign out */}
      <section className="px-[22px] pt-7">
        <button
          type="button"
          onClick={() => setActiveModal("logout")}
          className="group flex w-full items-center justify-center gap-2 rounded-[17px] border border-[#E9D5D0] bg-[#FFF9F5] py-4 text-[13px] font-semibold !text-[#B75A54] transition-all duration-200 hover:!border-[#174735] hover:!bg-[#174735] hover:!text-white active:scale-[0.99]"
        >
          <i className="fa-solid fa-arrow-right-from-bracket !text-[#B75A54] transition-colors duration-200 group-hover:!text-white" />
          <span className="!text-[#B75A54] transition-colors duration-200 group-hover:!text-white">
            Sign out
          </span>
        </button>

        <p className="mt-4 text-center font-serif text-[12px] italic text-[#A6A397]">
          Made with faith and love.
        </p>

        <p className="mt-1 text-center text-[10px] text-[#A6A397]">
          Hope & Heaven by Asher
        </p>
      </section>

      {/* Popup backdrop */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17251D]/45 px-6 backdrop-blur-[3px]"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="relative w-full max-w-[370px] overflow-hidden rounded-[26px] border border-[#EAE3D5] bg-[#FFFCF5] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Close popup"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#F2EEE4] text-[#77766E] transition hover:bg-[#174735] hover:text-white"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            {/* Help & Support */}
            {activeModal === "support" && (
              <>
                <div className="mb-5 grid h-[54px] w-[54px] place-items-center rounded-[18px] bg-[#E6EEE7] text-[#174735]">
                  <i className="fa-regular fa-envelope text-[23px]" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#A7864C]">
                  We're here for you
                </span>

                <h2
                  id="profile-modal-title"
                  className="mt-2 font-serif text-[28px] font-medium leading-tight text-[#174735]"
                >
                  Need a little help?
                </h2>

                <p className="mt-3 text-[13px] leading-[1.7] text-[#77766E]">
                  Have a question, need assistance, or want to share feedback?
                  We'd love to hear from you.
                </p>

                <div className="mt-5 rounded-[17px] border border-[#EAE3D5] bg-[#F7F2E8] p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#A7864C]">
                    Contact us at
                  </span>

                  <a
                    href="mailto:support@asher.com"
                    className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-[#174735] hover:text-[#A7864C]"
                  >
                    <i className="fa-regular fa-envelope" />
                    support@asher.com
                  </a>
                </div>

                <a
                  href="mailto:support@asher.com"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#174735] py-3.5 text-[13px] font-semibold text-white transition hover:bg-[#245B43] active:scale-[0.98]"
                >
                  <i className="fa-regular fa-paper-plane" />
                  Send us an email
                </a>
              </>
            )}

            {/* About */}
            {activeModal === "about" && (
              <>
                <div className="mb-5 grid h-[54px] w-[54px] place-items-center rounded-[18px] bg-[#E6EEE7] text-[#174735]">
                  <i className="fa-solid fa-heart text-[23px]" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#A7864C]">
                  Our purpose
                </span>

                <h2
                  id="profile-modal-title"
                  className="mt-2 font-serif text-[28px] font-medium leading-tight text-[#174735]"
                >
                  About Hope & Heaven.
                </h2>

                <div className="my-4 h-[2px] w-[34px] rounded-full bg-[#D8AD55]" />

                <p className="text-[13px] leading-[1.8] text-[#77766E]">
                  Hope & Heaven is a space to find comfort, strength and hope
                  through God's Word.
                </p>

                <p className="mt-3 text-[13px] leading-[1.8] text-[#77766E]">
                  Whether you're going through a difficult moment or simply
                  looking to grow closer to God, we're here to make your
                  journey with Scripture more personal and meaningful.
                </p>

                <div className="mt-5 rounded-[17px] bg-[#E6EEE7] p-4 text-center">
                  <p className="font-serif text-[16px] italic leading-[1.6] text-[#174735]">
                    "You are never alone."
                  </p>

                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[1.5px] text-[#66816D]">
                    Hope & Heaven by Asher
                  </span>
                </div>
              </>
            )}

            {/* Sign out confirmation */}
            {activeModal === "logout" && (
              <>
                <div className="mx-auto mb-5 grid h-[58px] w-[58px] place-items-center rounded-full bg-[#FBEDEA] text-[#B75A54]">
                  <i className="fa-solid fa-arrow-right-from-bracket text-[22px]" />
                </div>

                <span className="block text-center text-[10px] font-semibold uppercase tracking-[2px] text-[#A7864C]">
                  Before you go
                </span>

                <h2
                  id="profile-modal-title"
                  className="mt-2 text-center font-serif text-[27px] font-medium text-[#174735]"
                >
                  Are you sure?
                </h2>

                <p className="mt-3 text-center text-[13px] leading-[1.7] text-[#77766E]">
                  Are you sure you want to sign out of Hope & Heaven? You can
                  always come back whenever you need a moment with God.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="flex-1 rounded-full border border-[#EAE3D5] bg-white py-3.5 text-[12px] font-semibold text-[#55594F] transition hover:border-[#174735] hover:bg-[#174735] hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex-1 rounded-full bg-[#B75A54] py-3.5 text-[12px] font-semibold text-white transition hover:bg-[#963F3A] active:scale-[0.98]"
                  >
                    Yes, sign out
                  </button>
                </div>
              </>
            )}

            {/* Close action for other popups */}
            {activeModal !== "logout" && (
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="mt-4 w-full rounded-full border border-[#EAE3D5] py-3 text-[12px] font-semibold text-[#77766E] transition hover:border-[#174735] hover:bg-[#174735] hover:text-white"
              >
                Close
              </button>
            )}

          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <BottomNav
        activePage="profile"
        onNavigate={onNavigate}
      />

    </main>
  );
}
