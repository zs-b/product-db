import axios from "axios";

const API_URL = "https://product-api.azurewebsites.net/api/";

export const api = {
  fetchProducts: async () => axios.get(`${API_URL}Product`),
  addProduct: async (product) => axios.post(`${API_URL}Product`, product),
  deleteProduct: async (id) => axios.delete(`${API_URL}Product/${id}`),
  fetchProductById: async (id) => axios.get(`${API_URL}Product/${id}`), // 🔹 ÚJ: egy termék lekérése ID alapján
  updateProduct: async (id, product) =>
    axios.put(`${API_URL}Product/${id}`, product), // 🔹 ÚJ: termék módosítása
};
