import { createApp } from "vue";
import App from "./App.vue";

// Import Pinia
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";

// Import Vuetify
import { createVuetify } from "vuetify";
import "vuetify/styles";

// Import CSS
import "./assets/style.css";

// Import Materialize
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Import Vue Router
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CircuitList from "./views/CircuitList.vue";
import TrackDetails from "./views/TrackDetails.vue";
import Contact from "./views/Contact.vue";
import Login from "./views/Login.vue";
import AdminDashboard from "./views/AdminDashboard.vue";

// Initialisation de Vuetify
const vuetify = createVuetify();

// Définition des routes
const routes = [
  { path: "/", component: HomePage },
  { path: "/departments/:id", component: CircuitList },
  { path: "/track/:id", component: TrackDetails },
  { path: "/contact", component: Contact },
  { path: "/login", component: Login },
  {
    path: "/admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAdmin: true }, // Protection spécifique pour les administrateurs
  },
];

// Initialisation du routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAdmin && authStore.role !== "admin") {
    // Si la route nécessite un admin et que l'utilisateur n'est pas admin
    next("/login"); // Rediriger vers la page de connexion
  } else {
    next(); // Autoriser la navigation
  }
});

// Création de l'application Vue
const app = createApp(App);

// Initialisation de Pinia
const pinia = createPinia();
app.use(pinia);

// Initialisation du store d'authentification
const authStore = useAuthStore(pinia);
authStore.initializeAuth();

// Utilisation de Vuetify et du routeur
app.use(vuetify);
app.use(router);

// Montage de l'application
app.mount("#app");
