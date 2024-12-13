<template>
  <div>
    <h1>Liste des circuits</h1>
    <table v-if="circuits.length > 0">
      <thead>
        <tr>
          <th>Nom</th>
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
          <td>{{ track.name }}</td>
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
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-row:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
