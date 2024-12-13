<template>
  <nav class="navbar">
    <div class="nav-wrapper container">
      <!-- Logo -->
      <a href="#" class="brand-logo">TrackFinder</a>

      <!-- Bouton Hamburger pour mobile -->
      <a href="#" data-target="mobile-menu" class="sidenav-trigger right">
        <i class="material-icons">menu</i>
      </a>

      <!-- Menu Desktop -->
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li v-if="!authStore.isAuthenticated">
          <router-link to="/login" id="btn-connexion-pc" class="btn btn-flat">Connexion</router-link>
        </li>
        <li v-else>
          <button @click="logout" id="btn-connexion-pc" class="btn btn-flat">Déconnexion</button>
        </li>
      </ul>
    </div>

    <!-- Menu Mobile -->
    <ul class="sidenav right" id="mobile-menu">
      <li><router-link to="/" @click="closeMenu">Accueil</router-link></li>
      <li><router-link to="/contact" @click="closeMenu">Contact</router-link></li>
      <li v-if="!authStore.isAuthenticated">
        <router-link to="/login" id="btn-connexion-mobile" class="btn btn-flat" @click="closeMenu">Connexion</router-link>
      </li>
      <li v-else>
        <button @click="logout" id="btn-connexion-mobile" class="btn btn-flat">Déconnexion</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
      window.location.href = "/";
    };

    const closeMenu = () => {
      const sidenavInstance = M.Sidenav.getInstance(document.querySelector(".sidenav"));
      if (sidenavInstance) {
        sidenavInstance.close();
      }
    };

    onMounted(() => {
      const elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, { edge: "right" }); // Positionné à droite
    });

    return { authStore, logout, closeMenu };
  },
};
</script>

<style scoped>
/* Navbar principale */
.navbar {
  background-color: var(--primary-color); /* Couleur principale de la navbar */
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

/* Logo */
.brand-logo {
  font-size: 1.5rem;
  color: var(--surface-color); /* Couleur blanche */
  text-transform: uppercase;
  font-weight: bold;
}

/* Positionnement du bouton hamburger */
.sidenav-trigger {
  position: absolute;
  right: 20px; /* Positionné à droite */
  color: var(--surface-color); /* Icône blanche */
  cursor: pointer;
}

/* Liens du menu desktop */
ul.hide-on-med-and-down li a {
  color: var(--surface-color); /* Couleur des liens */
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0 15px;
  font-weight: 500;
}

/* Bouton Connexion */
#btn-connexion-pc {
  background-color: var(--surface-color); /* Fond blanc */
  color: var(--primary-color) !important; /* Texte bleu */
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: 600;
}

/* Menu mobile */
.sidenav {
  background-color: var(--primary-color); /* Fond bleu */
  color: var(--surface-color); /* Texte blanc */
  text-align: center;
}

.sidenav.right {
  transform: translateX(100%); /* Par défaut caché à droite */
}

.sidenav li a {
  text-align: center;
  color: var(--surface-color); /* Couleur des liens */
  font-size: 1rem;
  text-transform: uppercase;
}

#btn-connexion-mobile {
  background-color: var(--surface-color); /* Fond blanc */
  color: var(--primary-color);
}
</style>
