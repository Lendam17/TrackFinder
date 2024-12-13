<template>
  <div class="main-container">
    <h1>Liste des circuits dans le département </h1>
    <table id="table-circuit" v-if="circuits.length > 0">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Ville</th>
          <th>Type</th>
          <th>Terrain</th>
          <th>Véhicules autorisés</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="track in circuits"
          :key="track.id"
          class="clickable-row"
          @click="goToDetails(track.id)"
        >
          <td>{{ track.name || "Non spécifié" }}</td>
          <td>{{ track.city || "Non spécifié" }}</td>
          <td>{{ track.track_types || "Non spécifié" }}</td>
          <td>{{ track.terrain_type || "Non spécifié" }}</td>
          <td>{{ track.vehicles_allowed || "Non spécifié" }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun circuit trouvé pour ce département.</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CircuitList",
  data() {
    return {
      circuits: [], // Liste des circuits
      departmentName: "", // Nom du département
      error: null, // Message d'erreur
    };
  },
  methods: {
    goToDetails(id) {
      this.$router.push(`/track/${id}`); // Redirection vers la page des détails
    },
  },
  mounted() {
    const departmentId = this.$route.params.id; // Utilisation de params au lieu de query
    console.log("Department ID:", departmentId); // Debugging
    if (!departmentId) {
      this.error = "Aucun département sélectionné.";
      return;
    }

    axios
      .get(`http://localhost:5000/tracks?department_id=${departmentId}`)
      .then((response) => {
        console.log("Données API reçues :", response.data); // Debugging
        this.circuits = response.data;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des circuits :", error);
        this.error = "Impossible de charger les circuits.";
      });
  },
};
</script>

<style scoped>

.main-container {
  text-align: center;
}

/* === Tableau === */
#table-circuit th {
  color: #ff3b34;
  text-align: center;
  font-weight: 700;
}
#table-circuit td {
  text-align: center;
  cursor: pointer;
}
/* Change la couleur des bordures des cellules */
th, td {
  border-bottom: 1px solid #94969855; /* Couleur des bordures des cellules */
  padding: 8px; /* Espacement interne pour améliorer la lisibilité */
  text-align: left; /* Alignement du texte */
}




/* === Responsive === */

/* Écran de bureau ou grand écran */
@media (min-width: 1200px) {
}

/* Écran d'ordinateur portable (appareils moyens à larges) */
@media (max-width: 1024px) {
  
}

/* Écran de tablette (petits à moyens appareils) */
@media (max-width: 768px) {
  
}

/* Écran de téléphone mobile (petits appareils) */
@media (max-width: 600px) {
  #table-circuit th {
    font-size: 12px;
}
#table-circuit td {
  font-size: 12px;
}
}


</style>
