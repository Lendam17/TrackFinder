<template>
    <div class="container contact-page">
      <h1>Contactez-nous</h1>
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
          <textarea id="message" class="materialize-textarea" v-model="message" required></textarea>
          <label for="message">Message</label>
        </div>
        <button type="submit" class="btn blue">Envoyer</button>
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
        alert(`Message envoyé !\nNom: ${name.value}\nEmail: ${email.value}\nMessage: ${message.value}`);
        name.value = "";
        email.value = "";
        message.value = "";
      };
  
      return { name, email, message, submitForm };
    },
  };
  </script>
  
  <style scoped>
  .contact-page {
    margin-top: 20px;
  }
  
  input, textarea {
    margin-bottom: 20px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  