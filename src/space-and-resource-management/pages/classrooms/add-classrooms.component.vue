<script>
import http from "../../../shared/services/http-common.js";
import ClassroomCreateAndEdit from "../../components/classrooms/classroom-create-and-edit.component.vue";

export default {
  name: "add-classroom",
  components: {ClassroomCreateAndEdit},
  data() {
    return {
      classroom: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    async saveClassroom(classroom) {
      try {
        const response = await http.post("/classrooms", classroom);
        console.log("Classroom saved:", response.data);
        this.$router.push("/dashboard-admin/classrooms-shared-spaces/classrooms");
      } catch (error) {
        console.error("Error saving classrooms:", error);
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/classrooms-shared-spaces/classrooms");
    },
  },
}
</script>

<template>
  <classroom-create-and-edit 
      :classroom="classroom"
      :isCreateMode="true"
      @save="saveClassroom"
      @cancel="cancel"/>
</template>

<style scoped>

</style>