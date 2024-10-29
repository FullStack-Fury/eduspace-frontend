<template>
  <div class="classroom-management">
    <h1>Classroom Management</h1>
    <div class="classroom-cards">
      <pv-card
          v-for="classroom in filteredClassrooms"
          :key="classroom.id"
          class="classroom-card"
          style="width: 250px; margin-bottom: 20px;"
      >
        <template #header>
          <h2>{{ classroom.name || 'No name available' }}</h2>
        </template>
        <template #content>
          <p>{{ classroom.description || 'No description available' }}</p>
          <pv-button
              label="View Resources"
              @click="goToClassroomResources(classroom.id)"
              class="view-resources-button"
          />
        </template>
      </pv-card>
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
  border-radius: 8px;
}
</style>