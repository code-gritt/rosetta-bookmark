import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData) => {
    const { token, email, userId } = userData;
    localStorage.setItem("token", token);
    set({ user: { email, userId }, token });
    console.log("User set:", { email, userId }); // Debug
  },

  initialize: () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // Attempt to restore user data (mock for now, adjust if you have a user object)
      set({
        token: savedToken,
        user: {
          email: localStorage.getItem("email") || "unknown",
          userId: localStorage.getItem("userId") || "unknown",
        },
      });
      console.log("Initialized with token:", savedToken);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

// Initialize on app load
useAuthStore.getState().initialize();

export default useAuthStore;
