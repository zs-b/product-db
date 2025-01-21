<template>
  <div>
    <h1>Termék módosítása</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <form @submit.prevent="addProduct">
      <label for="code">Kód:</label>
      <input v-model="newProduct.code" required />

      <label for="name">Név:</label>
      <input v-model="newProduct.name" required />

      <label for="description">Leírás:</label>
      <input v-model="newProduct.description" required />

      <label for="price">Ár:</label>
      <input v-model="newProduct.price" type="number" required />

      <button type="submit">Hozzáadás</button>
      <button @click.prevent="cancelAdd">Mégse</button>
    </form>
  </div>
</template>

<script>
import { api } from "../api";

export default {
  data() {
    return {
      newProduct: {
        code: "",
        name: "",
        description: "",
        price: null,
      },
      errorMessage: "",
    };
  },
  methods: {
    async addProduct() {
      try {
        console.log("📤 Új termék küldése:", this.newProduct);
        await api.addProduct(this.newProduct);
        this.$router.push("/products"); // Sikeres hozzáadás után visszatérés a listára
        this.errorMessage = "";
      } catch (error) {
        console.error("❌ Hiba a termék hozzáadásakor:", error);
        this.errorMessage =
          "Nem sikerült a termék hozzáadása. Kérlek, próbáld újra!";
      }
    },
    cancelAdd() {
      this.$router.push("/products"); // Ha a felhasználó mégsem akar hozzáadni
    },
  },
};
</script>

<style scoped>
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
button[type="submit"] {
  background-color: #89a8b2;
}

button[type="submit"]:hover {
  background-color: #b3c8cf;
}
.error {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
