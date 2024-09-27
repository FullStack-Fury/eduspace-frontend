<script setup>
import { ref, onMounted } from 'vue';
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";

const teachers = ref([]);
const roles = {
  1: 'Educational',
  2: 'Auxiliary',
  3: 'Concierge'
};

onMounted(async () => {
  try {
    const data = await TeacherService.getAll();
    teachers.value = data.map(t => new Teacher(t));
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
});

const getTeachersByRole = (roleValue) => {
  return teachers.value.filter(t => t.rol.value === roleValue);
};
</script>

<template>
  <div class="personnel-list">
    <div v-for="(roleName, roleValue) in roles" :key="roleValue" class="role-column">
      <h2>{{ roleName }}</h2>
      <div v-for="teacher in getTeachersByRole(Number(roleValue))" :key="teacher.id" class="teacher-card">
        <div class="teacher-info">
          <h3>{{ teacher.name }} {{ teacher.lastName }}</h3>
          <p>Email: {{ teacher.email }}</p>
          <p>DNI: {{ teacher.dni }}</p>
          <p>Cell phone: {{ teacher.cellphone }}</p>
          <p>Status: <span class="certified-label">Certified</span></p> <!-- Muestra el estado de certificado -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personnel-list {
  display: flex;
  flex-wrap: wrap; /* Permitir que los elementos se envuelvan si no hay espacio */
  gap: 20px; /* Espacio entre las columnas */
  justify-content: center; /* Centrar columnas */
  padding: 20px; /* Agregar un poco de relleno */
}

.role-column {
  flex: 1;
  min-width: 250px; /* Ancho mínimo para cada columna */
  max-width: 300px; /* Ancho máximo para cada columna */
  background-color: #f9f9f9; /* Color de fondo más suave */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada */
  transition: transform 0.2s; /* Efecto de transformación suave */
}

.role-column:hover {
  transform: scale(1.02); /* Efecto de hover para resaltar */
}

.teacher-card {
  background-color: #ffffff; /* Fondo blanco para tarjetas */
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más suave */
  transition: box-shadow 0.2s; /* Transición de sombra */
}

.teacher-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra más fuerte en hover */
}

.teacher-info {
  margin-bottom: 10px;
}

.certified-label {
  color: green; /* Color para indicar que está certificado */
  font-weight: bold; /* Resaltar el texto */
}

h2 {
  margin-bottom: 15px;
  color: #333; /* Color para el encabezado h2 */
  text-align: center; /* Centrar el texto */
}

h3 {
  margin: 0 0 10px 0;
  color: #444; /* Color para el encabezado h3 */
}

p {
  margin: 5px 0;
  color: #555; /* Color para los párrafos */
}
</style>
