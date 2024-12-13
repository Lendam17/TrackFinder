<template>
  <div class="main-container">
    <h1>Liste des circuits dans le département {{ departmentName || "..." }}</h1>
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
    fetchDepartmentName(departmentId) {
      // Récupérer tous les départements et rechercher le bon
      axios
        .get("http://localhost:5000/departments") // Route existante pour tous les départements
        .then((response) => {
          const department = response.data.find(
            (d) => d.id === parseInt(departmentId)
          );
          if (department) {
            this.departmentName = department.name; // Définir le nom
          } else {
            this.error = "Département non trouvé.";
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des départements :", error);
          this.error = "Impossible de charger le nom du département.";
        });
    },
    fetchCircuits(departmentId) {
      // Récupérer les circuits pour le département donné
      axios
        .get(`http://localhost:5000/tracks?department_id=${departmentId}`)
        .then((response) => {
          this.circuits = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des circuits :", error);
          this.error = "Impossible de charger les circuits.";
        });
    },
  },
  mounted() {
    const departmentId = this.$route.params.id;
    if (!departmentId) {
      this.error = "Aucun département sélectionné.";
      return;
    }

    this.fetchDepartmentName(departmentId); // Récupérer le nom du département
    this.fetchCircuits(departmentId); // Récupérer les circuits
  },
};
</script>

<style scoped>

.main-container {
  text-align: center;
}

h1 {
  font-size: 3rem;
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
  text-align: center; /* Alignement du texte */
}




/* === Responsive === */

/* Écran de bureau ou grand écran */
@media (min-width: 1200px) {
}

/* Écran d'ordinateur portable (appareils moyens à larges) */
@media (max-width: 1024px) {
  h1 {
  font-size: 2.5rem;
}
}

/* Écran de tablette (petits à moyens appareils) */
@media (max-width: 768px) {
  h1 {
  font-size: 2rem;
}
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
