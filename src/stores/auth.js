import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    role: null,
  }),
  actions: {
    initializeAuth() {
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");
      if (storedUser && storedRole) {
        this.user = storedUser;
        this.role = storedRole;
      }
    },
    login(user, role) {
      this.user = user;
      this.role = role;
      localStorage.setItem("user", user);
      localStorage.setItem("role", role);
    },
    logout() {
      this.user = null;
      this.role = null;
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
  getters: {
    isAdmin: (state) => state.role === "admin",
    isAuthenticated: (state) => !!state.user,
  },
});
