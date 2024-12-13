<template>
  <div>
    <div v-if="track">
      <h1>{{ track.name }}</h1>
      <p><strong>Ville :</strong> {{ track.city }}</p>
      <p><strong>Adresse :</strong> {{ track.street_address }}</p>
      <p><strong>Description :</strong> {{ track.description }}</p>
      <p><strong>Coordonnées GPS :</strong> {{ track.gps_coordinates }}</p>
      <p><strong>Email :</strong> <a :href="`mailto:${track.owner_email}`">{{ track.owner_email }}</a></p>
      <p><strong>Téléphone :</strong> <a :href="`tel:${track.owner_phone}`">{{ track.owner_phone }}</a></p>
      <p><strong>Longueur :</strong> {{ track.length }} m</p>
      <p><strong>Largeur :</strong> {{ track.width }} m</p>
      <p><strong>Type de terrain :</strong> {{ track.terrain_type }}</p>
      <p><strong>Types de piste :</strong> {{ track.track_types }}</p>
      <p><strong>Véhicules autorisés :</strong> {{ track.vehicles_allowed }}</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TrackDetails",
  data() {
    return {
      track: null,
      error: null,
    };
  },
  mounted() {
    const trackId = this.$route.params.id;
    axios
      .get(`http://localhost:5000/track/${trackId}`)
      .then((response) => {
        this.track = response.data;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails :", error);
        this.error = "Impossible de charger les détails du circuit.";
      });
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 20px;
}
</style>
