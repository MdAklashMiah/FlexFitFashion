import apiClient from "./apiClient";

/**
 * Product Service for fetching catalog data
 */
export const productService = {
  // Get all products
  getAllProducts: async (params = {}) => {
    try {
      const response = await apiClient.get("/product", { params });
      return response.data;
    } catch (error) {
      // Error is already handled by the global interceptor's toast
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
