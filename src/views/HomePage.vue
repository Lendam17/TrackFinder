<template>
  <div class="homepage-container">
    <h1 class="title">
      Bienvenue sur TrackFinder, votre guide des circuits de motocross
    </h1>
    <div class="select-container">
      <div class="custom-select">
        <div class="select-trigger" @click="toggleOptions">
          {{ selectedDepartmentLabel || "Sélectionnez un département" }}
        </div>
        <ul v-if="showOptions" class="options">
          <li
            v-for="department in departments"
            :key="department.id"
            @click="selectDepartment(department.id, department.label)"
            class="option"
          >
            {{ department.code }} - {{ department.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  setup() {
    const departments = ref([]); // Liste des départements
    const selectedDepartment = ref(""); // Département sélectionné (ID)
    const selectedDepartmentLabel = ref(""); // Texte du département sélectionné
    const showOptions = ref(false); // État pour afficher/masquer les options
    const router = useRouter();

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/departments");
        departments.value = response.data; // Assigner les données reçues
      } catch (error) {
        console.error("Erreur lors du chargement des départements :", error);
      }
    };

    const toggleOptions = () => {
      showOptions.value = !showOptions.value;
    };

    const selectDepartment = (id, label) => {
      selectedDepartment.value = id;
      selectedDepartmentLabel.value = label;
      showOptions.value = false;
      router.push(`/departments/${id}`); // Redirige vers le département sélectionné
    };

    onMounted(() => {
      fetchDepartments();
    });

    return {
      departments,
      selectedDepartment,
      selectedDepartmentLabel,
      showOptions,
      toggleOptions,
      selectDepartment,
    };
  },
};
</script>

<style scoped>
/* Container principal */
.homepage-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement */
  padding: 20px;
  padding-top: 50px;
  gap: 20px; /* Espacement entre les éléments */
  min-height: 80vh; /* S'assurer que le contenu est centré sur la page */
}

/* Style pour le titre */
.title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
}

/* Container pour le menu déroulant personnalisé */
.custom-select {
  position: relative;
  width: 500px; /* Définissez explicitement une largeur fixe */
  text-align: center;
}

.select-trigger {
  width: 100%; /* Utilise toute la largeur de .custom-select */
  padding: 10px;
  border-radius: 10px;
  background-color: #272b2f;
  color: #eeeeee;
  font-size: 1rem;
  border: 1px solid #ff3b34;
  cursor: pointer;
  text-align: center;
  
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #272b2f;
  border: 1px solid #ff3b34;
  border-radius: 10px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  width: 100%; /* Correspond exactement à la largeur du conteneur */
}

.option {
  padding: 10px;
  color: #eeeeee;
  cursor: pointer;
  white-space: nowrap; /* Empêche les retours à la ligne */
  overflow: hidden;
  text-overflow: ellipsis; /* Ajoute "..." si le texte dépasse */
}

.option:hover {
  background-color: #ff3b34;
  color: #ffffff;
}

/* === Responsive === */

/* Écran de bureau ou grand écran */
@media (min-width: 1200px) {
}

/* Écran d'ordinateur portable (appareils moyens à larges) */
@media (max-width: 1024px) {
  .custom-select {
    max-width: 100%; /* Réduit la largeur maximale */
    width: 40vw;
  }
}

/* Écran de tablette (petits à moyens appareils) */
@media (max-width: 768px) {
  .custom-select {
    max-width: 100%; /* Réduit la largeur maximale */
    width: 60vw;
  }
}

/* Écran de téléphone mobile (petits appareils) */
@media (max-width: 600px) {
  .title {
    font-size: 2rem; /* Réduction de la taille du titre */
  }
  .custom-select {
    max-width: 100%; /* Réduit la largeur maximale */
    width: 60vw;
  }
  .select-trigger {
    font-size: 0.9rem; /* Taille du texte réduite */
  }
}
</style>
