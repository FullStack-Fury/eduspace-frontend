<template>
  <div class="classroom-management">
    <h1>Classroom Management</h1>
    <div class="classroom-cards">
      <div v-for="classroom in filteredClassrooms" :key="classroom.id" class="classroom-card">
        <h2>{{ classroom.name }}</h2>
        <p>{{ classroom.description }}</p>
        <button @click="goToClassroomResources(classroom.id)">View Resources</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ClassroomService } from "../services/classroom.service.js";
import { mapGetters } from "vuex";

export default {
  name: 'ClassroomManagement',
  data() {
    return {
      classrooms: []
    };
  },
  computed: {
    ...mapGetters('user', ['userId']),
    filteredClassrooms() {
      return this.classrooms.filter(classroom => classroom.teacherId === this.userId);
    }
  },
  created() {
    this.loadClassrooms();
  },
  methods: {
    async loadClassrooms() {
      const classroomService = new ClassroomService();
      try {
        const response = await classroomService.getAll();
        this.classrooms = response.data;
      } catch (error) {
        console.error("Error loading classrooms", error);
      }
    },
    goToClassroomResources(classroomId) {
      this.$router.push({name: 'resource-management', params: {classroomId}});
    }
  }
};
</script>

<style scoped>
.classroom-management {
  padding: 20px;
}

.classroom-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.classroom-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
}
</style>
