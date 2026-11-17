
import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import SubtopicPage from "./pages/SubtopicPage";
import SavedPage from "./pages/SavedPage";
import QuestionsPage from "./pages/QuestionsPage";
import SplashScreen from "./components/layout/SplashScreen";
import { apiUrl } from "./services/api";
import BibleVersePage from "./pages/BibleVersePage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";

const GOOGLE_CLIENT_ID =
  "795808189311-jv2367fj8ilv74cmo937ihu0tcgcunem.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [message, setMessage] = useState("Sign in with Google");
  const [loading, setLoading] = useState(false);

  // App-level splash screen
  const [showSplash, setShowSplash] = useState(true);

  // Page navigation
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Google authentication
  useEffect(() => {
    if (user) return;

    let timer;

    const initializeGoogle = () => {
      if (!window.google) return false;

      const buttonContainer = document.getElementById("google-button");
      if (!buttonContainer) return false;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,

        callback: async (response) => {
          setLoading(true);
          setMessage("Verifying your account...");

          try {
            const result = await fetch(apiUrl("auth/google/"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                credential: response.credential,
              }),
            });

            const data = await result.json();

            if (!result.ok) {
              throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);
            setCurrentPage("home");
            setMessage(`Welcome, ${data.user.username}!`);
          } catch (error) {
            setMessage(error.message || "Something went wrong.");
          } finally {
            setLoading(false);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonContainer, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        width: 280,
      });

      return true;
    };

    timer = setInterval(() => {
      if (initializeGoogle()) {
        clearInterval(timer);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [user]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);
    setCurrentPage("home");
    setSelectedFeeling(null);
    setSelectedSubtopic(null);
    setSelectedQuestion(null);
    setMessage("Sign in with Google");
  };

  // Navigate between pages
  const handleNavigate = (page, data = null) => {
  if (page === "subtopics" && data) {
    setSelectedFeeling(data);
    setSelectedSubtopic(null);
    setSelectedQuestion(null);
  }

  if (page === "questions" && data) {
    setSelectedFeeling(data.feeling);
    setSelectedSubtopic(data.subtopic);
  }

  if (page === "reflection" && data) {
    setSelectedFeeling(data.feeling);
    setSelectedSubtopic(data.subtopic);
    setSelectedQuestion(data.question);
  }

  setCurrentPage(page);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  // Google sign-in screen
  const renderLogin = () => (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F2E8] px-5">
      <div className="w-full max-w-[380px] rounded-3xl border border-[#EAE3D5] bg-[#FFFCF5] p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6EEE7]">
          <i className="fa-solid fa-cross text-2xl text-[#174735]" />
        </div>

        <h1 className="font-serif text-4xl font-bold text-[#174735]">
          Asher
        </h1>

        <p className="mt-2 text-sm text-[#77766E]">
          You are never alone.
        </p>

        <div className="my-8">
          <p className="font-serif text-xl text-[#1D211D]">
            Welcome home.
          </p>

          <p className="mt-2 text-sm text-[#77766E]">
            Continue your journey with God.
          </p>
        </div>

        <div
          id="google-button"
          className="flex min-h-10 justify-center"
        />

        <p className="mt-5 text-xs text-[#77766E]">
          {loading ? "Please wait..." : message}
        </p>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    if (!user) {
      return renderLogin();
    }

    // Home
    if (currentPage === "home") {
      return (
        <HomePage
          user={user}
          onNavigate={handleNavigate}
        />
      );
    }

    // Explore
    if (currentPage === "explore") {
      return (
        <ExplorePage
          onNavigate={handleNavigate}
        />
      );
    }

    // Subtopics
    if (currentPage === "subtopics" && selectedFeeling) {
      return (
        <SubtopicPage
          feeling={selectedFeeling}
          onNavigate={handleNavigate}
        />
      );
    }

    

    // Saved verses
    if (currentPage === "saved") {
      return (
        <SavedPage
          onNavigate={handleNavigate}
        />
      );
    }


     // Questions
if (
  currentPage === "questions" &&
  selectedFeeling &&
  selectedSubtopic
) {
  return (
    <QuestionsPage
      feeling={selectedFeeling}
      subtopic={selectedSubtopic}
      onNavigate={handleNavigate}
    />
  );
}

// Profile
if (currentPage === "profile") {
  return (
    <ProfilePage
      user={user}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );
}

if (currentPage === "notifications") {
  return <NotificationsPage onNavigate={handleNavigate} />;
}

    if (
  currentPage === "reflection" &&
  selectedFeeling &&
  selectedSubtopic
) {
  return (
    <BibleVersePage
      feeling={selectedFeeling}
      subtopic={selectedSubtopic}
      question={selectedQuestion}
      onNavigate={handleNavigate}
    />
  );
}

if (currentPage === "community") {
  return <CommunityPage onNavigate={handleNavigate} />;
}

    // Temporary legacy feeling screen
    if (currentPage === "verse" && selectedFeeling) {
      return (
        <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#F7F2E8] px-[22px] py-8">
          <button
            onClick={() => handleNavigate("explore")}
            className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-[#EAE3D5] bg-[#FFFCF5]"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>

          <span className="text-xs font-semibold uppercase tracking-[2px] text-[#174735]">
            A word for you
          </span>

          <h1 className="mt-3 font-serif text-4xl text-[#1D211D]">
            {selectedFeeling.name}
          </h1>

          <div className="my-5 h-[2px] w-9 bg-[#D8AD55]" />

          <div className="rounded-[22px] border border-[#EAE3D5] bg-[#FFFCF5] p-6">
            <p className="text-sm leading-relaxed text-[#77766E]">
              Let's explore what's behind this feeling and find comfort
              through Scripture.
            </p>
          </div>

          <button
            onClick={() => handleNavigate("explore")}
            className="mt-6 w-full rounded-full bg-[#174735] py-4 text-sm font-semibold text-white"
          >
            Explore other feelings
          </button>
        </main>
      );
    }

    // Profile or fallback
    return (
      <HomePage
        user={user}
        onNavigate={handleNavigate}
      />
    );
  };

  return (
    <>
      {renderPage()}

      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}
    </>
  );
}

export default App;
