<template>
  <div>
    <h2>Ez egy próbafeladat</h2>
    <p></p>

    <h3>Mini termékkezelő alkalmazás</h3>
    <p>
      A fenti menü vagy az alsó gomb segítségével elérhető a terméklista, ahol
      új termékeket lehet létrehozni, vagy a meglévőekből törölni.
    </p>
    <router-link to="/login">
      <button>🔐 Bejelentkezés</button>
    </router-link>
    <button @click="$router.push('/products')">Ugrás a Terméklistára</button>
  </div>
</template>
