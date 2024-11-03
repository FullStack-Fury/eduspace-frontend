<script>
import EnvironmentCard from "../../components/classrooms/environment-card.component.vue";
import http from "../../../shared/services/http-common.js";

export default {
  name: "environment-facilities",
  components: {EnvironmentCard},
  data() {
    return {
      environments: []
    };
  },
  mounted() {
    this.loadEnvironment();
  },
  methods: {
    async loadEnvironment() {
      try {
        const response = await http.get("/shared-area");
        this.environments = response.data;
      } catch (error) {
        console.error("Error loading environments:", error);
      }
    },
    async deleteEnvironment(id) {
      try {
        await http.delete(`/classrooms/${id}`);
        this.environments = this.environments.filter(environment => environment.id !== id);
      } catch (error) {
        console.error("Error deleting environment:", error);
      }
    },
    editEnvironment(id) {
      this.$router.push({name: "edit-environment", params: {id}});
    },
    goToAdd() {
      this.$router.push('/dashboard-admin/environments-equipment/environment/add');
    }
  }
}
</script>

<template>
  <div style="display: flex; align-items: center">
    <h4 style="margin-right: 20px">Environments and Equipment</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">Environment</h4>
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
      <environment-card v-for="environment in environments" :key="environment.id" :space="environment" @delete="deleteEnvironment" @edit="editEnvironment"/>
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
</style>