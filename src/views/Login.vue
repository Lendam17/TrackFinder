<template>
  <div id="title-container" class="container">
    <h3>Connexion</h3>
  </div>
  <div id="input-container" class="container">
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email :</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input class="input" v-model="password" type="password" required />
      </div>
      <button id="btn-connexion" type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const error = ref("");

    const handleLogin = async () => {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          error.value = data.message;
          return;
        }

        authStore.login(data.username, data.role);
        if (data.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        error.value = "Une erreur est survenue.";
      }
    };

    return { email, password, error, handleLogin };
  },
};
</script>

<style>
#title-container {
  text-align: center;
  padding: 20px 0;
}

#input-container {
  width: 500px;
}

/* Change la couleur de la barre focus sous les inputs */
input:focus {
  border-bottom: 1px solid #ff3b34 !important; /* Couleur de la barre */
  box-shadow: 0 1px 0 0 #ff3b34 !important; /* Supprime l'effet vert par défaut */
}

/* Boutton Connexion */
#btn-connexion {
  background-color: #ff3b34;
  padding: 8px;
  font-weight: 500;
  border-radius: 2px;
}

/* === Responsive === */

@media (max-width: 992px) {
  #input-container {
  width: 40vw;
}
}

@media (max-width: 768px) {
  #input-container {
  width: 50vw;
}
}

@media (max-width: 600px) {
  #input-container {
  width: 60vw;
}
}
</style>
