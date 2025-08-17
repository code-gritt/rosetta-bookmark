import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData) => {
    const { token, email, userId } = userData;
    localStorage.setItem("auth", JSON.stringify({ token, email, userId }));
    set({ user: { email, userId }, token });
    console.log("User set:", { email, userId });
  },

  initialize: () => {
    if (typeof window === "undefined") return; // only run in client
    const saved = localStorage.getItem("auth");
    if (saved) {
      try {
        const { token, email, userId } = JSON.parse(saved);
        set({ token, user: { email, userId } });
        console.log("Initialized with token:", token);
      } catch (err) {
        console.error("Failed to parse auth from localStorage:", err);
      }
    }
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
