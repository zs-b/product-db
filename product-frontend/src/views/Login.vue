<template>
  <div>
    <h1>Bejelentkezés</h1>
    <form @submit.prevent="login">
      <table>
        <tr>
          <td><label for="username">Felhasználónév:</label></td>
          <td><input v-model="username" required /></td>
        </tr>
        <tr>
          <td><label for="password">Jelszó:</label></td>
          <td><input v-model="password" type="password" required /></td>
        </tr>
      </table>
      <button type="submit">Bejelentkezés</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    login() {
      console.log("🔐 Bejelentkezés próbálkozás:", this.username);

      // 🔹 Egyszerű hardcoded "adatbázis"
      const users = [
        { username: "admin", password: "admin123" },
        { username: "user", password: "user123" },
      ];

      // 🔹 Felhasználó keresése
      const user = users.find(
        (u) => u.username === this.username && u.password === this.password
      );

      if (user) {
        localStorage.setItem("loggedInUser", this.username); // 🔹 Bejelentkezés mentése
        this.$router.push("/products"); // 🔹 Átirányítás a terméklistára
      } else {
        this.errorMessage = "Hibás felhasználónév vagy jelszó!";
      }
    },
  },
};
</script>
