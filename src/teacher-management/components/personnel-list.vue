<script>
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import Tag from 'primevue/tag';

export default {
  name: "personnel-list",
  components: {
    Button,
    DataView,
    Card,
    Tag
  },
  data() {
    return {
      teachers: [],
      roles: {
        2: 'Educational'
      }
    }
  },
  methods: {
    getTeachersByRole(roleValue) {
      return this.teachers.filter(t => t.rol === roleValue);
    },
    goToAddPersonnel() {
      this.$router.push({ name: 'AddPersonnel' });
    }
  },
  created() {
    TeacherService.getAll().then(data => {
      this.teachers = data.map(t => new Teacher(t));
    }).catch(error => {
      console.error('Error fetching teachers:', error);
    });
  }
}
</script>

<template>
  <div class="personnel-list">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="text-3xl font-bold">Personal Data</h1>
      <Button label="Add Personnel" icon="pi pi-plus" @click="goToAddPersonnel" />
    </div>
    <div v-for="(roleName, roleValue) in roles" :key="roleValue" class="mb-4">
      <h2 class="text-2xl font-semibold mb-3">{{ roleName }}</h2>
      <DataView :value="getTeachersByRole(Number(roleValue))" :layout="'grid'" :paginator="true" :rows="8">
        <template #grid="slotProps">
          <div class="grid">
            <div v-for="teacher in slotProps.items" :key="teacher.id" class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
              <Card>
                <template #header>
                  <img alt="teacher" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style="width: 100%; height: 120px; object-fit: cover;" />
                </template>
                <template #title>
                  {{ teacher.name }} {{ teacher.lastName }}
                </template>
                <template #content>
                  <p><strong>Email:</strong> {{ teacher.email }}</p>
                  <p><strong>DNI:</strong> {{ teacher.dni }}</p>
                  <p><strong>Cell phone:</strong> {{ teacher.cellphone }}</p>
                  <p><strong>Status:</strong> <Tag severity="success" value="Certified" /></p>
                </template>
              </Card>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<style scoped>
.personnel-list {
  padding: 2rem;
}
</style>