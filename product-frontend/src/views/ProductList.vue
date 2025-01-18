<template>
  <div>
    <h1>Terméklista</h1>
    <button @click="logout">Kijelentkezés</button>
    <!-- Kijelentkezés gomb -->
    <router-link to="/products/new">
      <button>Új termék hozzáadása</button>
    </router-link>

    <!-- 🔹 Terméklista táblázat -->
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kód</th>
          <th>Név</th>
          <th>Leírás</th>
          <th>Ár</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.code }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }} Ft</td>
          <td>
            <button @click="deleteProduct(product.id)">🗑 Törlés</button>
            <button @click="$router.push(`/products/edit/${product.id}`)">
              Szerkesztés
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      newProduct: {
        code: "",
        name: "",
        description: "",
        price: null,
      },
      editingProduct: null,
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedInUser");
      this.$router.push("/login"); // Kijelentkezés után login oldalra irányít
    },
    async fetchProducts() {
      try {
        console.log("🔍 API lekérdezés indul...");
        const response = await axios.get("http://localhost:5019/api/Product");
        console.log("✅ API válasz:", response.data);
        this.products = response.data;
      } catch (error) {
        console.error("❌ Hiba az API hívásban:", error);
      }
    },

    async addProduct() {
      try {
        console.log("📤 Új termék küldése:", this.newProduct);
        await axios.post("http://localhost:5019/api/Product", this.newProduct);
        await this.fetchProducts(); // 🔹 Lista frissítése
        this.newProduct = { code: "", name: "", description: "", price: null }; // 🔹 Form ürítése
      } catch (error) {
        console.error("❌ Hiba a termék hozzáadásakor:", error);
      }
    },

    async deleteProduct(productId) {
      try {
        console.log("🗑 Termék törlése, ID:", productId);
        await axios.delete(`http://localhost:5019/api/Product/${productId}`);
        await this.fetchProducts(); // 🔹 Lista frissítése törlés után
      } catch (error) {
        console.error("❌ Hiba a termék törlésekor:", error);
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #ffdab3;
}
/* Gombok stílusa */
button {
  background-color: #574964;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-right: 10px;
}

button:hover {
  background-color: #9f8383;
}

/* Hozzáadás űrlap */
form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ffdab3;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

input {
  padding: 8px;
  border: 1px solid #c8aaaa;
  border-radius: 5px;
}

/* Hozzáadás gomb külön szín */
button[type="submit"] {
  background-color: #574964;
}

button[type="submit"]:hover {
  background-color: #574964;
}
</style>
