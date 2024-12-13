<template>
  <div class="container">
    <form @submit.prevent="handleLogin">
      <h3>Connexion</h3>
      <div>
        <label for="email">Email :</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Se connecter</button>
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
          body: JSON.stringify({ email: email.value, password: password.value }),
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
.error {
  color: red;
}
</style>
