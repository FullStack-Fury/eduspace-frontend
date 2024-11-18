<script>
import http from "../../../shared/services/http-common.js";
import ClassroomCard from "../../components/classrooms/classroom-card.component.vue";
import { TeacherService } from "../../../payroll-management/services/teacher.service.js";

export default {
  name: "classroom",
  components: { ClassroomCard },
  data() {
    return {
      classrooms: [],
      teachers: [], // Lista de profesores
    };
  },
  mounted() {
    this.loadClassroom();
    this.loadTeachers();
  },
  methods: {
    async loadClassroom() {
      try {
        const response = await http.get("/classrooms");
        this.classrooms = response.data;
        this.assignTeacherNames(); // Asignar nombres de profesores a los classrooms
      } catch (error) {
        console.error("Error loading classrooms:", error);
      }
    },
    async loadTeachers() {
      try {
        const response = await TeacherService.getAll();
        this.teachers = response.data;
        this.assignTeacherNames(); // Asignar nombres de profesores a los classrooms si los classrooms ya están cargados
      } catch (error) {
        console.error("Error loading teachers:", error);
      }
    },
    assignTeacherNames() {
      if (this.teachers.length > 0 && this.classrooms.length > 0) {
        this.classrooms = this.classrooms.map(classroom => {
          const teacher = this.teachers.find(t => t.id === classroom.teacherId);
          return {
            ...classroom,
            teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No Teacher Assigned'
          };
        });
      }
    },
    async deleteClassroom(id) {
      console.log("Deleting classroom with ID:", id);
      try {
        await http.delete(`/classrooms/${id}`);
        this.classrooms = this.classrooms.filter(classroom => classroom.id !== id);
      } catch (error) {
        console.error("Error deleting classroom:", error);
      }
    },
    goToAdd() {
      this.$router.push('/dashboard-admin/classrooms-shared-spaces/classrooms/add');
    },
  },
};
</script>

<template>
  <div style="display: flex; align-items: center">
    <h4 style="margin-right: 20px">Classrooms and Shared Spaces</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">Classrooms</h4>
  </div>

  <div class="container">
    <!-- Card para Agregar nuevo environment -->
    <div class="card border-round-xl shadow-2 p-3 h-full">
      <div class="text-xl font-semibold mb-2">Title</div>
      <div class="mb-2">
        <span class="font-medium text-600">Description:</span>
      </div>
      <div class="flex align-items-center gap-2 mb-3">
        <i class="pi pi-box text-yellow-500"></i>
        <span>Environment</span>
      </div>
      <pv-button label="Add" severity="warning" text raised class="w-full" @click="goToAdd"/>
    </div>

    <div class="cards-container">
      <classroom-card
          v-for="classroom in classrooms"
          :key="classroom.id"
          :classroom="classroom"
          @delete="deleteClassroom"
      >
        <!-- Mostrar el nombre del profesor en la tarjeta del aula -->
        <template #teacher-info>
          <div class="teacher-info">
            Teacher: {{ classroom.teacherName }}
          </div>
        </template>
      </classroom-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  align-content: space-between;
  gap: 20px;
}

.cards-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.card {
  width: 300px;
}

.teacher-info {
  margin-top: 10px;
  color: #555;
}
</style>
