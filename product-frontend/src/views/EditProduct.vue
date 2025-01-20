<template>
  <div>
    <h1>Új termék hozzáadása</h1>
    <p v-if="loading">🔄 Betöltés...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <form v-if="product" @submit.prevent="updateProduct">
      <label for="code">Kód:</label>
      <input v-model="product.code" required />

      <label for="name">Név:</label>
      <input v-model="product.name" required />

      <label for="description">Leírás:</label>
      <input v-model="product.description" required />

      <label for="price">Ár:</label>
      <input v-model="product.price" type="number" required />

      <button type="submit">Mentés</button>
      <button @click.prevent="cancelEdit">Mégse</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
      loading: true,
      errorMessage: null,
    };
  },
  async created() {
    const productId = this.$route.params.id; // 🔹 ID az URL-ből
    console.log("Lekérdezett termék ID:", productId);

    if (!productId) {
      this.errorMessage = "Hiba: A termék ID nem található!";
      this.loading = false;
      return;
    }

    try {
      const response = await axios.get(
        `https://product-api.azurewebsites.net/api/Product/${productId}`
      );
      this.product = response.data; // 🔹 Betöltjük az adatokat
      console.log("Termék betöltve:", this.product);
    } catch (error) {
      console.error("Hiba a termék lekérdezésekor:", error);
      this.errorMessage = "Nem sikerült betölteni az adatokat.";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async updateProduct() {
      try {
        await axios.put(
          `https://product-api.azurewebsites.net/api/Product/${this.product.id}`,
          this.product
        );
        this.$router.push("/products"); // 🔹 Visszairányítás a listához
      } catch (error) {
        console.error("Hiba a termék módosításakor:", error);
      }
    },
    cancelEdit() {
      this.$router.push("/products"); // 🔹 Ha a felhasználó mégsem akar módosítani
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
  border: 1px solid #e5e1da;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f1f0e8;
}
/* Gombok stílusa */
button {
  background-color: #89a8b2;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-right: 10px;
}

button:hover {
  background-color: #b3c8cf;
}

/* Hozzáadás űrlap */
form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #89a8b2;
  border-radius: 5px;
  background-color: #e5e1da;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

input {
  padding: 8px;
  border: 1px solid #e5e1da;
  border-radius: 5px;
}

/* Hozzáadás gomb külön szín */
button[type="submit"] {
  background-color: #89a8b2;
}

button[type="submit"]:hover {
  background-color: #b3c8cf;
}
.error {
  color: red;
}
</style>
