<template>
  <div class="homepage-container">
    <h1 class="title">Bienvenue sur TrackFinder, votre guide des circuits de motocross</h1>
    <div class="select-container">
      <select
        id="departments"
        v-model="selectedDepartment"
        @change="goToDepartment"
        class="browser-default"
      >
        <option disabled value="">Sélectionnez un département</option>
        <option
          v-for="department in departments"
          :key="department.id"
          :value="department.id"
        >
          {{ department.code }} - {{ department.name }}
        </option>
      </select>
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
    const selectedDepartment = ref(""); // Département sélectionné
    const router = useRouter();

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/departments");
        departments.value = response.data; // Assigner les données reçues
      } catch (error) {
        console.error("Erreur lors du chargement des départements :", error);
      }
    };

    const goToDepartment = () => {
  if (selectedDepartment.value) {
    // Redirige vers l'URL correcte
    router.push(`/departments/${selectedDepartment.value}`);
  }
};


    onMounted(() => {
      fetchDepartments();
    });

    return { departments, selectedDepartment, goToDepartment };
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
  color: var(--text-primary);
  text-align: center;
  margin: 0;
}

/* Container pour le select */
.select-container {
  width: 100%;
  max-width: 400px; /* Largeur maximale pour le champ select */
}

/* Style pour le champ select */
select.browser-default {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: var(--surface-color);
  font-size: 1rem;
  color: var(--text-primary);
}

#departments {
  text-align: center;
}

/* Responsive */
@media (max-width: 600px) {
  .title {
    font-size: 2rem; /* Réduction de la taille du titre sur mobile */
  }
  select.browser-default {
    font-size: 0.9rem; /* Taille du texte réduite sur mobile */
  }
}
</style>
