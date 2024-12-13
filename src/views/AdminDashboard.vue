<template>
  <div class="dashboard-container">
    <h1>Gestion des circuits</h1>

    <!-- Liste des circuits -->
    <table v-if="circuits.length > 0" id="table-circuits">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Ville</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="circuit in circuits"
          :key="circuit.id"
          @click="selectCircuit(circuit)"
          class="clickable-row"
        >
          <td>{{ circuit.name }}</td>
          <td>{{ circuit.city }}</td>
          <td>
            <button @click.stop="selectCircuit(circuit)">Modifier</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun circuit trouvé.</p>

    <!-- Formulaire de modification -->
    <div v-if="selectedCircuit" class="form-container">
      <h2>Modifier le circuit : {{ selectedCircuit.name }}</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Informations générales -->
        <fieldset>
          <legend>Informations générales</legend>
          <label for="name">Nom :</label>
          <input v-model="selectedCircuit.name" id="name" type="text" required />

          <label for="description">Description :</label>
          <textarea
            v-model="selectedCircuit.description"
            id="description"
            required
          ></textarea>
        </fieldset>

        <!-- Localisation -->
        <fieldset>
          <legend>Localisation</legend>
          <label for="city">Ville :</label>
          <input v-model="selectedCircuit.city" id="city" type="text" required />

          <label for="street_address">Adresse :</label>
          <input
            v-model="selectedCircuit.street_address"
            id="street_address"
            type="text"
            required
          />

          <label for="gps_coordinates">Coordonnées GPS :</label>
          <input
            v-model="selectedCircuit.gps_coordinates"
            id="gps_coordinates"
            type="text"
          />
        </fieldset>

        <!-- Sauvegarde -->
        <div class="actions">
          <button type="submit" class="save-button">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      circuits: [], // Liste simplifiée des circuits
      selectedCircuit: null, // Détails du circuit sélectionné
    };
  },
  mounted() {
    // Charger tous les circuits (Nom et Ville uniquement)
    axios
      .get("http://localhost:5000/admin-tracks")
      .then((response) => {
        this.circuits = response.data; // Stocker les circuits
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des circuits :", error);
        alert("Impossible de charger les circuits.");
      });
  },
  methods: {
    selectCircuit(circuit) {
      // Charger les détails complets du circuit sélectionné
      axios
        .get(`http://localhost:5000/track/${circuit.id}`)
        .then((response) => {
          this.selectedCircuit = response.data; // Pré-remplir les champs
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails du circuit :", error);
          alert("Impossible de charger les détails du circuit.");
        });
    },
    handleSubmit() {
      const id = this.selectedCircuit.id;

      // Sauvegarder les modifications
      axios
        .put(`http://localhost:5000/track/${id}`, this.selectedCircuit)
        .then(() => {
          alert("Modifications sauvegardées avec succès !");
          // Mettre à jour la liste principale (optionnel)
          const index = this.circuits.findIndex((c) => c.id === id);
          if (index !== -1) {
            this.circuits[index].name = this.selectedCircuit.name;
            this.circuits[index].city = this.selectedCircuit.city;
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la sauvegarde :", error);
          alert("Une erreur s'est produite lors de la sauvegarde.");
        });
    },
  },
};
</script>
<style>
#table-circuits {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

#table-circuits th,
#table-circuits td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

#table-circuits th {
  background-color: #ff3b34;
  color: white;
}

button {
  background-color: #ff3b34;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #e0322e;
}

</style>