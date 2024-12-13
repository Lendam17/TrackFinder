<template>
  <div id="title-container" class="container">
    <h1>Contactez-nous</h1>
  </div>
  <div class="container contact-page">
    <form @submit.prevent="submitForm">
      <div class="input-field">
        <input id="name" type="text" v-model="name" required />
        <label for="name">Nom</label>
      </div>
      <div class="input-field">
        <input id="email" type="email" v-model="email" required />
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <textarea
          id="message"
          class="materialize-textarea"
          v-model="message"
          required
        ></textarea>
        <label for="message">Message</label>
      </div>
      <button type="submit" id="btn-envoyer" class="btn blue">Envoyer</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Contact",
  setup() {
    const name = ref("");
    const email = ref("");
    const message = ref("");

    const submitForm = () => {
      alert(
        `Message envoyé !\nNom: ${name.value}\nEmail: ${email.value}\nMessage: ${message.value}`
      );
      name.value = "";
      email.value = "";
      message.value = "";
    };

    return { name, email, message, submitForm };
  },
};
</script>

<style scoped>
input:focus + label[for="name"] {
  color: #ff3b34 !important;
}
input:focus + label[for="email"] {
  color: #ff3b34 !important;
}
textarea:focus + label[for="message"] {
  color: #ff3b34 !important;
}

input {
  color: #ffffff;
}

input:focus {
  border-bottom: 1px solid #ff3b34 !important; /* Couleur de la barre */
  box-shadow: 0 1px 0 0 #ff3b34 !important; /* Supprime l'effet vert par défaut */
  color: #ffffff;
}

#message {
  color: #ffffff;
}

/* Boutton Connexion */
#btn-envoyer {
  background-color: #ff3b34 !important;
  font-weight: 500;
  border-radius: 2px;
}

</style>
