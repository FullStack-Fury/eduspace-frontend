<script>
import http from "../../../shared/services/http-common.js";
import EnvironmentCreateAndEdit from "../../components/classrooms/environments-create-and-edit.component.vue";

export default {
  name: "add-environment",
  components: {EnvironmentCreateAndEdit},
  data() {
    return {
      environment: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    async saveEnvironment(environment) {
      try {
        const response = await http.post("/classrooms", environment);
        console.log("Environment saved:", response.data);
        this.$router.push("/dashboard-admin/environments-equipment/environments");
      } catch (error) {
        console.error("Error saving environment:", error);
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/environments-equipment/environments");
    },
  },
}
</script>

<template>
  <environment-create-and-edit
      :environment="environment"
      :isCreateMode="true"
      @save="saveEnvironment"
      @cancel="cancel"/>
</template>

<style scoped>

</style>