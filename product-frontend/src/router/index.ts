import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductList from "../views/ProductList.vue";
import EditProduct from "../views/EditProduct.vue";
import NewProduct from "../views/NewProduct.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/products",
    name: "products",
    component: ProductList,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/edit/:id",
    name: "editProduct",
    component: EditProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/new",
    name: "newProduct",
    component: NewProduct,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Bejelentkezés ellenőrzése minden útvonalnál
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("loggedInUser");

  if (to.meta.requiresAuth && !loggedIn) {
    next("/login"); // Ha nincs bejelentkezve, menjen a login oldalra
  } else {
    next(); // Engedélyezzük a navigációt
  }
});

export default router;
