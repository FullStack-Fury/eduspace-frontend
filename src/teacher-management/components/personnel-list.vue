<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";

const teachers = ref([]);
const roles = {
  1: 'Educational',
  2: 'Auxiliary',
  3: 'Concierge'
};

const router = useRouter();

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

const goToAddPersonnel = () => {
  router.push({ name: 'AddPersonnel' });
};
</script>

<template>
  <div class="personnel-list">
    <h1>Personal Data</h1>
    <button @click="goToAddPersonnel" class="add-personnel-button">Add Personnel</button>
    <div class="roles-container">
      <div v-for="(roleName, roleValue) in roles" :key="roleValue" class="role-column">
        <h2>{{ roleName }}</h2>
        <div v-for="teacher in getTeachersByRole(Number(roleValue))" :key="teacher.id" class="teacher-card">
          <div class="teacher-info">
            <h3>{{ teacher.name }} {{ teacher.lastName }}</h3>
            <p>Email: {{ teacher.email }}</p>
            <p>DNI: {{ teacher.dni }}</p>
            <p>Cell phone: {{ teacher.cellphone }}</p>
            <p>Status: <span class="certified-label">Certified</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personnel-list {
  display: flex;
  flex-direction: column; /* Vertical layout for the title and button */
  align-items: center; /* Center align content */
  padding: 20px;
}

.roles-container {
  display: flex; /* Horizontal layout for roles */
  flex-wrap: wrap; /* Allow wrapping */
  gap: 20px; /* Gap between role columns */
  justify-content: center; /* Center roles */
}

.role-column {
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.role-column:hover {
  transform: scale(1.02);
}

.teacher-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.teacher-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.teacher-info {
  margin-bottom: 10px;
}

.certified-label {
  color: green;
  font-weight: bold;
}

h2 {
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

h3 {
  margin: 0 0 10px 0;
  color: #444;
}

p {
  margin: 5px 0;
  color: #555;
}

.add-personnel-button {
  background-color: #ffd700;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
