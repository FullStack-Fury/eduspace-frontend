<template>
  <div class="classroom-management">
    <h1 class="centered-title">Classroom Management</h1>
    <div class="classroom-cards">
      <div
          v-for="classroom in filteredClassrooms"
          :key="classroom.id"
          class="classroom-card"
          style="width: 250px; margin-bottom: 20px;"
      >
        <h2 class="classroom-name">{{ classroom.name || 'No name available' }}</h2>
        <p>{{ classroom.description || 'No description available' }}</p>
        <div class="button-container">
          <pv-button
              label="View Resources"
              @click="goToClassroomResources(classroom.id)"
              class="view-resources-button"
          />
        </div>
      </div>
    </div>
    <p v-if="filteredClassrooms.length === 0">No classrooms available for this teacher.</p>
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
        console.log("Classrooms loaded:", this.classrooms);
      } catch (error) {
        console.error("Error loading classrooms", error);
      }
    },
    goToClassroomResources(classroomId) {
      this.$router.push({ name: 'resource-management', params: { classroomId } });
    }
  }
};
</script>

<style scoped>
.classroom-management {
  padding: 20px;
}

.centered-title {
  text-align: center;
  margin-bottom: 20px;
}

.classroom-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.classroom-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.classroom-card:hover {
  transform: scale(1.05);
}

.classroom-name {
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
}

.view-resources-button {
  margin-top: 10px;
}
</style>
