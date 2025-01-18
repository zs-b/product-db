import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.css";
import store from "./store";

console.log("App elindult!");

const app = createApp(App);

app.use(router);
app.mount("#app");
