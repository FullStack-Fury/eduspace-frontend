<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";

export default {
  name: 'TeacherForm',
  components: {
    InputText,
    InputNumber,
    MultiSelect,
    Button
  },
  setup() {
    const toast = useToast();

    const teacher = ref(new Teacher(null, '', '', '', [], '', '', 0, 0, '', ''));

    const daysOptions = [
      {label: 'Monday', value: 'Monday'},
      {label: 'Tuesday', value: 'Tuesday'},
      {label: 'Wednesday', value: 'Wednesday'},
      {label: 'Thursday', value: 'Thursday'},
      {label: 'Friday', value: 'Friday'},
      {label: 'Saturday', value: 'Saturday'},
      {label: 'Sunday', value: 'Sunday'}
    ];

    const submitForm = async () => {
      try {
        await TeacherService.create(teacher.value);
        toast.add({severity: 'success', summary: 'Success', detail: 'Teacher added successfully', life: 3000});
        // Reset form
        teacher.value = new Teacher(null, '', '', '', [], '', '', 0, 0, '', '');
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

<template>
  <div class="card">
    <h2 class="text-2xl font-bold mb-4">Add New Teacher</h2>
    <form @submit.prevent="submitForm" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model="teacher.name" required />
      </div>
      <div class="field">
        <label for="lastName">Last Name</label>
        <InputText id="lastName" v-model="teacher.lastName" required />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" v-model="teacher.email" required type="email" />
      </div>
      <div class="field">
        <label for="days">Working Days</label>
        <MultiSelect id="days" v-model="teacher.days" :options="daysOptions" optionLabel="label" optionValue="value" display="chip" />
      </div>
      <div class="field">
        <label for="cellphone">Cellphone</label>
        <InputText id="cellphone" v-model="teacher.cellphone" required />
      </div>
      <div class="field">
        <label for="field">Field</label>
        <InputText id="field" v-model="teacher.field" required />
      </div>
      <div class="field">
        <label for="workingHours">Working Hours</label>
        <InputNumber id="workingHours" v-model="teacher.workingHours" required />
      </div>
      <div class="field">
        <label for="age">Age</label>
        <InputNumber id="age" v-model="teacher.age" required />
      </div>
      <div class="field">
        <label for="dni">DNI</label>
        <InputText id="dni" v-model="teacher.dni" required />
      </div>
      <div class="field">
        <label for="role">Role</label>
        <InputText id="role" v-model="teacher.role" required />
      </div>
      <Button type="submit" label="Add Teacher" class="mt-4" />
    </form>
  </div>
</template>

