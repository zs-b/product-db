<template>
  <div>
    <h1>PRÓBAFELADAT</h1>
    <nav>
      <router-link to="/">Kezdőoldal</router-link> |
      <router-link to="/products">Terméklista</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    goToProducts() {
      window.location.href = "/products";
    },
  },
};
</script>

<style>
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
</style>
