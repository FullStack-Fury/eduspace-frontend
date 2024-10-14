<template>
  <div class="resource-management">
    <h2>Resources for Classroom {{ classroomId }}</h2>
    <div v-for="resource in resources" :key="resource.id" class="resource-card">
      <h3>{{ resource.name }}</h3>
      <p>Kind: {{ resource.kind_of_resource }}</p>
      <button @click="goToReport(resource.id)">Report Resource</button>
    </div>
  </div>
</template>

<script>
import { ResourceService } from "../services/resource.service.js";

export default {
  data() {
    return {
      classroomId: null,
      resources: [],
      resourceService: new ResourceService(),
    };
  },
  created() {
    this.classroomId = this.$route.params.classroomId;
    this.loadResources();
  },
  methods: {
    loadResources() {
      this.resourceService.findByClassroom(this.classroomId).then((response) => {
        this.resources = response.data;
      });
    },
    goToReport(resourceId) {
      this.$router.push({
        name: "report-resource",
        params: {classroomId: this.classroomId, resourceId: resourceId},
      });
    },
  },
};
</script>
