<template>
  <div class="resource-management">
    <h1 class="centered-title">Resources for Classroom {{ classroomName }}</h1>
    <div class="resource-cards">
      <div
          v-for="resource in resources"
          :key="resource.id"
          class="resource-card"
          style="width: 250px; margin-bottom: 20px;"
      >
        <h2 class="resource-title">{{ resource.name || 'No name available' }}</h2>
        <p class="resource-kind">Kind: {{ resource.kind_of_resource || 'No kind available' }}</p>
        <div class="button-container">
          <pv-button
              label="Report Resource"
              @click="goToReport(resource.id)"
              class="report-resource-button"
          />
        </div>
      </div>
    </div>
    <p v-if="resources.length === 0">No resources available for this classroom.</p>
  </div>
</template>

<script>
import { ResourceService } from "../services/resource.service.js";
import { ClassroomService } from "../services/classroom.service.js"; // Asegúrate de importar el servicio de aulas

export default {
  name: 'ResourceManagement',
  data() {
    return {
      resources: [],
      classroomId: this.$route.params.classroomId,
      classroomName: '', // Propiedad para almacenar el nombre del aula
    };
  },
  created() {
    this.loadResources();
    this.loadClassroomName(); // Cargar el nombre del aula
  },
  methods: {
    async loadResources() {
      const resourceService = new ResourceService();
      try {
        const response = await resourceService.findByClassroom(this.classroomId);
        this.resources = response.data;
      } catch (error) {
        console.error("Error loading resources", error);
      }
    },
    async loadClassroomName() {
      const classroomService = new ClassroomService(); // Crear instancia del servicio de aulas
      try {
        const response = await classroomService.getById(this.classroomId); // Obtener el aula por ID
        this.classroomName = response.data.name; // Almacenar el nombre del aula
      } catch (error) {
        console.error("Error loading classroom name", error);
      }
    },
    goToReport(resourceId) {
      this.$router.push({ name: 'report-resource', params: { resourceId } });
    }
  }
};
</script>

<style scoped>
.resource-management {
  padding: 20px;
}

.centered-title {
  text-align: center; /* Centrar el título */
  margin-bottom: 20px; /* Espacio inferior para separar del contenido */
}

.resource-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Centrar el contenido dentro del contenedor */
}

.resource-card {
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px; /* Añadir padding para mejorar el espacio interno */
  transition: transform 0.2s; /* Transición suave al pasar el mouse */
}

.resource-card:hover {
  transform: scale(1.05); /* Aumentar el tamaño al pasar el mouse */
}

.resource-title {
  color: black;
  margin: 0;
  text-align: center; /* Centrar el título del recurso */
}

.resource-kind {
  color: black;
  text-align: center; /* Centrar el tipo de recurso */
}

.button-container {
  display: flex;
  justify-content: center; /* Centrar el botón */
  margin-top: 10px; /* Espacio entre el contenido y el botón */
}
</style>
