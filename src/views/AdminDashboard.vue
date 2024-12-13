<template>
    <div class="admin-dashboard">
      <h1>Tableau de bord Administrateur</h1>
      <p>Bienvenue dans l'espace administrateur. Vous pouvez gérer les circuits ici.</p>
      <!-- Ajoutez ici le contenu spécifique pour l'administrateur -->
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminDashboard",
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: var(--surface-color);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  p {
    color: var(--text-primary);
    font-size: 1.2rem;
    text-align: center;
  }
  </style>
  