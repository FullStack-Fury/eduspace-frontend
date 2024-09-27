<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";

export default {
  name: 'TeacherForm',
  setup() {
    const toast = useToast();

    const teacher = ref(new Teacher());

    const submitForm = async () => {
      try {
        await TeacherService.create(teacher.value);
        toast.add({severity: 'success', summary: 'Success', detail: 'Teacher added successfully', life: 3000});
        teacher.value = new Teacher(); // Reset del formulario
      } catch (error) {
        console.error('Error adding teacher:', error);
        toast.add({severity: 'error', summary: 'Error', detail: 'Failed to add teacher', life: 3000});
      }
    };

    return {
      teacher,
      submitForm
    };
  }
};
</script>

<template>
  <div class="card">
    <h2 class="text-2xl font-bold mb-4">Add New Teacher</h2>
    <form @submit.prevent="submitForm" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <pv-input-text id="name" v-model="teacher.name" required />
      </div>
      <div class="field">
        <label for="lastName">Last Name</label>
        <pv-input-text id="lastName" v-model="teacher.lastName" required />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <pv-input-text id="email" v-model="teacher.email" required type="email" />
      </div>
      <div class="field">
        <label for="cellphone">Cellphone</label>
        <pv-input-text id="cellphone" v-model="teacher.cellphone" required />
      </div>
      <div class="field">
        <label for="address">Address</label>
        <pv-input-text id="address" v-model="teacher.address" required />
      </div>
      <div class="field">
        <label for="dni">DNI</label>
        <pv-input-text id="dni" v-model="teacher.dni" required />
      </div>
      <pv-button type="submit" label="Add Teacher" class="mt-4" />
    </form>
  </div>
</template>



<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.field {
  margin-bottom: 1rem;
}
</style>
