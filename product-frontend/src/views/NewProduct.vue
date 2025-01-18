<template>
  <div>
    <h1>Termék módosítása</h1>

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
import axios from "axios";

export default {
  data() {
    return {
      newProduct: {
        code: "",
        name: "",
        description: "",
        price: null,
      },
    };
  },
  methods: {
    async addProduct() {
      try {
        console.log("📤 Új termék küldése:", this.newProduct);
        await axios.post("http://localhost:5019/api/Product", this.newProduct);
        this.$router.push("/products"); // 🔹 Sikeres hozzáadás után visszatérés a listára
      } catch (error) {
        console.error("❌ Hiba a termék hozzáadásakor:", error);
      }
    },
    cancelAdd() {
      this.$router.push("/products"); // 🔹 Ha a felhasználó mégsem akar hozzáadni
    },
  },
};
</script>

<style scoped>
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
button[type="submit"] {
  background-color: #574964;
}

button[type="submit"]:hover {
  background-color: #574964;
}
.error {
  color: red;
}
</style>
