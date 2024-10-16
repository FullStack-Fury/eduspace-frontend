<template>
  <div class="resource-management">
    <h1>Resources for Classroom {{ classroomId }}</h1>
    <div class="resource-cards">
      <pv-card
          v-for="resource in resources"
          :key="resource.id"
          class="resource-card"
          style="width: 250px; margin-bottom: 20px;"
      >
        <template #header>
          <h2 class="resource-title">{{ resource.name || 'No name available' }}</h2>
        </template>
        <template #content>
          <p class="resource-kind">Kind: {{ resource.kind_of_resource || 'No kind available' }}</p>
          <div class="card-actions">
            <pv-button
                label="Report Resource"
                @click="goToReport(resource.id)"
                class="report-resource-button"
            />
          </div>
        </template>
      </pv-card>
    </div>
    <p v-if="resources.length === 0">No resources available for this classroom.</p>
  </div>
</template>

<script>
import { ResourceService } from "../services/resource.service.js";

export default {
  name: 'ResourceManagement',
  data() {
    return {
      resources: [],
      classroomId: this.$route.params.classroomId,
    };
  },
  created() {
    this.loadResources();
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

.resource-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.resource-card {
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.resource-title {
  color: black;
  margin: 0;
}

.resource-kind {
  color: black;
}

.card-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
