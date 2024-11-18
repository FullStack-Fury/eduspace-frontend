<script>
import http from "../../../shared/services/http-common.js";
import ClassroomCreateAndEdit from "../../components/classrooms/classroom-create-and-edit.component.vue";
import { TeacherService } from "../../../payroll-management/services/teacher.service.js";

export default {
  name: "add-classroom",
  components: { ClassroomCreateAndEdit },
  data() {
    return {
      classroom: {
        name: '',
        description: '',
        teacherId: null, // Añadimos teacherId
      },
      teachers: [], // Lista de profesores
    };
  },
  mounted() {
    this.loadTeachers();
  },
  methods: {
    async loadTeachers() {
      try {
        const response = await TeacherService.getAll();
        this.teachers = response.data;
      } catch (error) {
        console.error("Error loading teachers:", error);
      }
    },
    async saveClassroom(classroom) {
      try {
        const response = await http.post("/classrooms", classroom);
        console.log("Classroom saved:", response.data);
        this.$router.push("/dashboard-admin/classrooms-shared-spaces/classrooms");
      } catch (error) {
        console.error("Error saving classroom:", error);
      }
    },
    Cancel() {
      this.$router.push("/dashboard-admin/classrooms-shared-spaces/classrooms");
    },
  },
};
</script>

<template>
  <div>
    <!-- Formulario para crear/editar aula -->
    <classroom-create-and-edit
        :classroom="classroom"
        :teachers="teachers"
        :isCreateMode="true"
        @save="saveClassroom"
        @cancel="Cancel"
    />

    <!-- Lista de profesores -->
    <div v-if="teachers.length > 0" class="teachers-list">
      <h3>Available Teachers</h3>
      <ul>
        <li v-for="teacher in teachers" :key="teacher.id">
          {{ teacher.firstName }} {{ teacher.lastName }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading teachers...</p>
    </div>
  </div>
</template>

<style scoped>
.teachers-list {
  margin-top: 20px;
}

.teachers-list h3 {
  color: #333;
  margin-bottom: 10px;
}

.teachers-list ul {
  list-style-type: none;
  padding: 0;
}

.teachers-list li {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
}
</style>
