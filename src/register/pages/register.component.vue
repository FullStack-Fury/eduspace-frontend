<script>
import RegisterForm from "../components/register-form.component.vue";
import { RegisterAdmin } from "../model/register-admin.entity.js";
import RegisterService from "../services/register.services.js";

export default {
  name: "register",
  components: { RegisterForm },
  methods: {
    async handleSubmit(formData) {
      try {
        const command = new RegisterAdmin(formData);
        await RegisterService.registerAdministrator(command);
        console.log("Administrator registered successfully");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  }
};
</script>

<template>
  <div>
    <RegisterForm :onSubmit="handleSubmit"/>
  </div>
</template>

<style scoped>
</style>
