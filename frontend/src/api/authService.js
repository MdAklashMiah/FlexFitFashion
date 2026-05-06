import apiClient from "./apiClient";

/**
 * Auth Service for manual API calls using Axios
 */
export const authService = {
  // Manual login if not using Redux Toolkit Query
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile (verify user session)
  getProfile: async () => {
    try {
      const response = await apiClient.get("/auth/verifyuser");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout (Client-side)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Refresh to clear state
  }
};
