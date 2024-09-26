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
        <label for="days">Working Days</label>
        <pv-multiselect id="days" v-model="teacher.days" :options="daysOptions" optionLabel="label" optionValue="value" display="chip" />
      </div>
      <div class="field">
        <label for="cellphone">Cellphone</label>
        <pv-input-text id="cellphone" v-model="teacher.cellphone" required />
      </div>
      <div class="field">
        <label for="field">Field</label>
        <pv-input-text id="field" v-model="teacher.field" required />
      </div>
      <div class="field">
        <label for="workingHours">Working Hours</label>
        <pv-input-number id="workingHours" v-model="teacher.workingHours" required />
      </div>
      <div class="field">
        <label for="age">Age</label>
        <pv-input-number id="age" v-model="teacher.age" required />
      </div>
      <div class="field">
        <label for="dni">DNI</label>
        <pv-input-text id="dni" v-model="teacher.dni" required />
      </div>
      <div class="field">
        <label for="role">Role</label>
        <pv-input-text id="role" v-model="teacher.role" required />
      </div>
      <pv-button type="submit" label="Add Teacher" class="mt-4" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";

export default {
  name: 'TeacherForm',
  setup() {
    const toast = useToast();

    // Usamos el nuevo constructor que acepta un objeto
    const teacher = ref(new Teacher());

    const daysOptions = [
      { label: 'Monday', value: 'Monday' },
      { label: 'Tuesday', value: 'Tuesday' },
      { label: 'Wednesday', value: 'Wednesday' },
      { label: 'Thursday', value: 'Thursday' },
      { label: 'Friday', value: 'Friday' },
      { label: 'Saturday', value: 'Saturday' },
      { label: 'Sunday', value: 'Sunday' }
    ];

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
      daysOptions,
      submitForm
    };
  }
};
</script>

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
