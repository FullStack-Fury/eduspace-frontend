<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TeacherAccessInformation from "./teacher-access-information.vue";
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";
import Dialog from 'primevue/dialog';

const toast = useToast();
const teacher = ref(new Teacher());
const showAccessInfo = ref(false);
const showDialog = ref(false);
const dialogMessage = ref('');

const submitForm = async () => {
  try {
    const teacherData = {
      name: teacher.value.name,
      lastName: teacher.value.lastName,
      email: teacher.value.email,
      cellphone: teacher.value.cellphone,
      address: teacher.value.address,
      dni: teacher.value.dni
    };

    const response = await TeacherService.create(teacherData);
    if (response && response.id) {
      teacher.value = new Teacher({ ...response }); // Create a new Teacher instance with the response data
      dialogMessage.value = 'Teacher added successfully';
      showDialog.value = true;
      showAccessInfo.value = true;
    } else {
      throw new Error('No ID returned from the server');
    }
  } catch (error) {
    handleError(error, 'Failed to add teacher');
  }
};

const submitAccessInfo = async (accessInfo) => {
  try {
    Object.assign(teacher.value, accessInfo);
    const updatedTeacher = await TeacherService.update(teacher.value);
    teacher.value = new Teacher({ ...updatedTeacher }); // Update the teacher with the response data
    dialogMessage.value = 'Access Information Saved';
    showDialog.value = true;
  } catch (error) {
    handleError(error, 'Failed to save access information');
  }
};

const handleError = (error, defaultMessage) => {
  console.error(error);
  dialogMessage.value = error.response?.data?.message || error.message || defaultMessage;
  showDialog.value = true;
  toast.add({ severity: 'error', summary: 'Error', detail: dialogMessage.value, life: 3000 });
};

const closeDialog = () => {
  showDialog.value = false;
};
</script>

<template>
  <div class="card" v-if="!showAccessInfo">
    <h2 class="text-2xl font-bold mb-4">Add New Teacher</h2>
    <form @submit.prevent="submitForm" class="p-fluid">
      <div v-for="field in ['name', 'lastName', 'email', 'cellphone', 'address', 'dni']" :key="field" class="field">
        <label :for="field">{{ field.charAt(0).toUpperCase() + field.slice(1) }}</label>
        <pv-input-text :id="field" v-model="teacher[field]" required :type="field === 'email' ? 'email' : 'text'" />
      </div>
      <pv-button type="submit" label="Add Teacher" class="mt-4" />
    </form>
  </div>

  <TeacherAccessInformation v-else :teacher="teacher" @submit-access-info="submitAccessInfo" />

  <Dialog header="Information" v-model:visible="showDialog" :modal="true" :closable="false">
    <p>{{ dialogMessage }}</p>
    <template #footer>
      <pv-button label="OK" @click="closeDialog" />
    </template>
  </Dialog>
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