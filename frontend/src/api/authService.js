import apiClient from "./apiClient";

/**
 * Auth Service for manual API calls using Axios
 */
export const authService = {
  // Example: Manual login if not using Redux Toolkit Query
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/user/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Example: Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get("/user/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Example: Logout (Client-side)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Refresh to clear state
  }
};
