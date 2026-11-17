
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");

// Build API URLs
export const apiUrl = (endpoint) => {
  return `${API_BASE_URL}/${endpoint.replace(/^\/+/, "")}`;
};

// Share one refresh request across simultaneous API calls
let refreshPromise = null;

// Get a new access token
const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    throw new Error("No refresh token available.");
  }

  if (!refreshPromise) {
    refreshPromise = fetch(apiUrl("token/refresh/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok || !data.access) {
          throw new Error(data.detail || "Token refresh failed.");
        }

        localStorage.setItem("access", data.access);

        if (data.refresh) {
          localStorage.setItem("refresh", data.refresh);
        }

        return data.access;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// Authenticated requests with automatic token refresh
export const apiFetch = async (endpoint, options = {}) => {
  const makeRequest = (token) => {
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(apiUrl(endpoint), {
      ...options,
      headers,
    });
  };

  let access = localStorage.getItem("access");
  let response = await makeRequest(access);

  // Return immediately if authentication is successful
  if (response.status !== 401) {
    return response;
  }

  try {
    // Refresh the expired access token
    access = await refreshAccessToken();

    // Retry the original request
    response = await makeRequest(access);

    if (response.status === 401) {
      throw new Error("Authentication failed after token refresh.");
    }

    return response;
  } catch (error) {
    console.error("Authentication refresh failed:", error);

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth:expired"));

    throw new Error("Your session has expired. Please sign in again.");
  }
};
