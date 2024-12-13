<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">TrackFinder</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger right">
        <i class="material-icons">menu</i>
      </a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li v-if="isAuthenticated && isAdmin">
          <router-link to="/admin-dashboard">Dashboard</router-link>
        </li>
        <li v-if="isAuthenticated">
          <a id="btn-connexion-pc" @click="logout">Déconnexion</a>
        </li>
        <li v-else>
          <router-link id="btn-connexion-pc" to="/login">Connexion</router-link>
        </li>
      </ul>
    </div>
    <!-- Menu mobile -->
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li v-if="isAuthenticated && isAdmin">
        <router-link to="/admin-dashboard">Dashboard</router-link>
      </li>
      <li v-if="isAuthenticated">
        <a id="btn-connexion-mobile" @click="logout">Déconnexion</a>
      </li>
      <li v-else>
        <router-link id="btn-connexion-mobile" to="/login">Connexion</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import M from "materialize-css";

export default {
  name: "Navbar",
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
      window.location.href = "/"; // Redirige après déconnexion
    };

    return {
      isAuthenticated: authStore.isAuthenticated,
      isAdmin: authStore.isAdmin,
      logout,
    };
  },
  mounted() {
    // Initialiser le menu mobile Materialize
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  },
};
</script>

<style scoped>
/* Navbar principale */
.nav-wrapper {
  background-color: #25282B; /* Couleur principale */
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

/* Logo */
.brand-logo {
  font-size: 1.5rem;
  color: #ff3b34; 
  text-transform: uppercase;
  font-weight: bold;
}

/* Menu desktop */
ul.hide-on-med-and-down li a {
  color: #eeeeee; /* Couleur des liens */
  font-size: 1rem;
  padding: 0 15px;
  font-weight: 600;
}


#btn-connexion-pc {
  background-color: #ff3b34; /* Couleur principale */
  color: #ffffff !important; /* Couleur du texte */
  border: none; /* Supprime toute bordure par défaut */
  border-radius: 1px; /* Coins légèrement arrondis */
  font-size: 1rem; /* Taille du texte */
  font-weight: bold; /* Texte en gras */
  cursor: pointer; /* Change le curseur en mode pointeur */
  text-align: center; /* Centrer le texte */
  text-decoration: none; /* Supprime le soulignement */
}

#btn-connexion-pc:hover {
  background-color: #fd221b; /* Couleur au survol */
  transition: background-color 0.3s ease; /* Transition fluide */
}


/* Hover pour les liens */
ul.hide-on-med-and-down li a:hover,
.sidenav li a:hover {
  color: #ff3b34;
  transition: color 0.3s ease;
}

/* Menu Mobile */
.sidenav li a {
  text-align: center;
  font-size: 1rem;
}

#btn-connexion-mobile {
  background-color: #ff3b34; /* Couleur principale */
  color: #ffffff !important; /* Couleur du texte */
}
#btn-connexion-mobile:hover {
  background-color: #fd221b; /* Couleur principale */
  transition: background-color 0.3s ease; /* Transition fluide */
}

/* Icône hamburger du menu mobile */
.sidenav-trigger {
  display: none; /* Caché par défaut */
}

/* Afficher uniquement l'icone hamburger sur mobile et tablette */
@media (max-width: 992px) {
  .sidenav-trigger {
    display: block; /* Affiché uniquement sur les écrans <= 992px */
    color: var(--surface-color);
    font-size: 2rem;
  }
}

</style>
