
import { useState } from "react";
import BottomNav from "../components/common/BottomNav";

const initialNotifications = [
  {
    id: 1,
    type: "verse",
    title: "A little reminder for today",
    message:
      "God is our refuge and strength, an ever-present help in trouble. — Psalm 46:1",
    time: "Just now",
    unread: true,
    icon: "fa-book-bible",
  },
  {
    id: 2,
    type: "journey",
    title: "Your next step awaits",
    message:
      "Continue your journey and spend a quiet moment with God today.",
    time: "2 hours ago",
    unread: true,
    icon: "fa-hands-praying",
  },
  {
    id: 3,
    type: "prayer",
    title: "Take a moment to pray",
    message:
      "Even a small prayer can bring you closer to God. He is always listening.",
    time: "Yesterday",
    unread: false,
    icon: "fa-heart",
  },
  {
    id: 4,
    type: "app",
    title: "Welcome to Hope & Heaven",
    message:
      "Your space for faith, comfort and hope. We're glad you're here.",
    time: "2 days ago",
    unread: false,
    icon: "fa-sparkles",
  },
];

export default function NotificationsPage({ onNavigate }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const viewedCount = notifications.length - unreadCount;

  const filteredNotifications =
    activeFilter === "unread"
      ? notifications.filter((item) => item.unread)
      : activeFilter === "viewed"
      ? notifications.filter((item) => !item.unread)
      : notifications;

  // Mark individual notification as viewed
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  // Mark all notifications as viewed
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  // Delete individual notification
  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Delete all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  const getIconStyle = (type) => {
    const styles = {
      verse: "bg-[#E6EEE7] text-[#174735]",
      journey: "bg-[#F5EEDC] text-[#A7864C]",
      prayer: "bg-[#F7EAE6] text-[#B47767]",
      app: "bg-[#E9EDF0] text-[#526B7A]",
    };

    return styles[type] || styles.app;
  };

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "viewed", label: "Viewed", count: viewedCount },
  ];

  return (
    <div className="min-h-screen bg-[#F7F2E8] pb-[105px]">
      <div className="mx-auto min-h-screen max-w-[430px]">

        {/* Header */}
        <header className="flex items-center justify-between px-5 pb-5 pt-7">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            aria-label="Go back"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#EAE3D5] bg-[#FFFCF5] text-[#174735] transition-all duration-200 hover:border-[#174735] hover:bg-[#174735] hover:text-white active:scale-95"
          >
            <i className="fa-solid fa-arrow-left text-[14px]" />
          </button>

          <div className="text-center">
            <h1 className="font-serif text-[23px] font-semibold text-[#174735]">
              Notifications
            </h1>
            <p className="mt-0.5 text-[10px] font-medium tracking-[1.8px] text-[#A7864C]">
              YOUR LITTLE REMINDERS
            </p>
          </div>

          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#EAE3D5] bg-[#FFFCF5] text-[#174735]">
            <i className="fa-regular fa-bell text-[16px]" />
          </div>
        </header>

        {/* Intro Card */}
        <section className="px-5 pb-5">
          <div className="rounded-[22px] bg-[#174735] px-5 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-[21px]">
                  A moment just for you.
                </p>
                <p className="mt-1 text-[12px] leading-5 text-white/70">
                  Gentle reminders to keep your heart close to God.
                </p>
              </div>

              <div className="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full bg-white/10">
                <i className="fa-regular fa-envelope-open text-[21px] text-[#E8D5A8]" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3">
              <span className="h-[7px] w-[7px] rounded-full bg-[#D8AD55]" />

              <p className="text-[11px] text-white/80">
                {unreadCount === 0
                  ? "You're all caught up"
                  : `${unreadCount} unread ${
                      unreadCount === 1
                        ? "notification"
                        : "notifications"
                    }`}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full border px-4 py-[9px] text-[11px] font-semibold transition-all duration-200 ${
                    activeFilter === filter.id
                      ? "border-[#174735] bg-[#174735] !text-white"
                      : "border-[#EAE3D5] bg-[#FFFCF5] text-[#77766E] hover:border-[#174735] hover:bg-[#174735] hover:!text-white"
                  }`}
                >
                  {filter.label}
                  <span className="ml-1">{filter.count}</span>
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="shrink-0 text-[10px] font-semibold text-[#174735] transition hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
        </section>

        {/* Notification List */}
        <section className="px-5 pb-5 pt-5">
          {filteredNotifications.length > 0 ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-serif text-[17px] font-semibold text-[#1D211D]">
                  {activeFilter === "unread"
                    ? "New notifications"
                    : activeFilter === "viewed"
                    ? "Previously viewed"
                    : "Recent"}
                </h2>

                <span className="text-[10px] text-[#99958A]">
                  {filteredNotifications.length} items
                </span>
              </div>

              <div className="space-y-3">
                {filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    className={`group relative flex gap-3 rounded-[19px] border p-4 transition-all duration-200 ${
                      item.unread
                        ? "border-[#D5E3D6] bg-[#FFFCF5] shadow-[0_3px_12px_rgba(23,71,53,0.035)]"
                        : "border-[#EAE3D5] bg-[#F2EEE5]"
                    }`}
                  >
                    {/* Notification Icon */}
                    <button
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      aria-label={`View ${item.title}`}
                      className={`flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-[14px] transition ${getIconStyle(
                        item.type
                      )}`}
                    >
                      <i className={`fa-solid ${item.icon} text-[16px]`} />
                    </button>

                    {/* Notification Content */}
                    <button
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <h3
                        className={`text-[13px] font-semibold leading-5 ${
                          item.unread
                            ? "text-[#1D211D]"
                            : "text-[#77766E]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-[18px] text-[#77766E]">
                        {item.message}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-medium text-[#A7864C]">
                          <i className="fa-regular fa-clock mr-1" />
                          {item.time}
                        </span>

                        {/* Read / Unread Status */}
                        {item.unread ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6EEE7] px-2.5 py-1 text-[9px] font-bold tracking-[0.5px] text-[#174735]">
                            <span className="h-[5px] w-[5px] rounded-full bg-[#174735]" />
                            NEW
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#E6EEE7] px-2.5 py-1 text-[9px] font-semibold tracking-[0.4px] text-[#52715B]">
                            <i className="fa-solid fa-check text-[8px]" />
                            VIEWED
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => deleteNotification(item.id)}
                      aria-label={`Delete ${item.title}`}
                      title="Delete notification"
                      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[#B5A99A] transition-all duration-200 hover:bg-[#F7EAE6] hover:text-[#B75A54] active:scale-90"
                    >
                      <i className="fa-regular fa-trash-can text-[12px]" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear All */}
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[15px] border border-[#EAE3D5] bg-[#FFFCF5] py-3.5 text-[11px] font-semibold text-[#A4776F] transition-all duration-200 hover:border-[#B75A54] hover:bg-[#B75A54] hover:text-white active:scale-[0.99]"
              >
                <i className="fa-regular fa-trash-can text-[12px]" />
                Clear all notifications
              </button>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5] px-6 py-12 text-center">
              <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-[#E6EEE7]">
                <i className="fa-regular fa-bell-slash text-[25px] text-[#174735]" />
              </div>

              <h3 className="mt-5 font-serif text-[21px] font-semibold text-[#174735]">
                {activeFilter === "unread"
                  ? "You're all caught up"
                  : activeFilter === "viewed"
                  ? "Nothing viewed yet"
                  : "No notifications yet"}
              </h3>

              <p className="mt-2 max-w-[240px] text-[12px] leading-5 text-[#77766E]">
                {activeFilter === "unread"
                  ? "You have no unread notifications right now."
                  : activeFilter === "viewed"
                  ? "Notifications you have opened will appear here."
                  : "We'll keep this space for your little reminders."}
              </p>

              {activeFilter !== "all" && notifications.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className="mt-5 rounded-full bg-[#174735] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#245B43]"
                >
                  View all notifications
                </button>
              )}
            </div>
          )}
        </section>

        {/* Footer Note */}
        <div className="px-5 pb-6 text-center">
          <p className="font-serif text-[12px] italic text-[#A49B8A]">
            "Be still, and know that I am God." — Psalm 46:10
          </p>
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          activePage="home"
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
