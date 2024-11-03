<script>
import http from "../../../shared/services/http-common.js";
import SharedAreaCreateAndEdit from "../../components/shared-spaces/shared-area-create-and-edit.component.vue";

export default {
  name: "add-sports-facilities",
  components: { SharedAreaCreateAndEdit },
  data() {
    return {
      sharedArea: {
        name: '',
        capacity: 0,
        description: '',
        location: '',
      }
    };
  },
  methods: {
    async saveSharedArea(sharedArea) {
      try {
        const response = await http.post("/shared-area", sharedArea); // Hacer la llamada POST
        console.log("Shared area saved:", response.data); // Confirmar que se guarda
        this.$router.push("/dashboard-admin/environments-equipment/sport-facilities"); // Redirigir después de guardar
      } catch (error) {
        console.error("Error saving shared area:", error); // Capturar errores
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/environments-equipment/sport-facilities"); // Redirigir al cancelar
    },
  },
};
</script>

<template>
    <shared-area-create-and-edit
        :sharedArea="sharedArea"
        :isCreateMode="true"
        @save="saveSharedArea"
        @cancel="cancel"
    />
</template>

<style scoped>

</style>