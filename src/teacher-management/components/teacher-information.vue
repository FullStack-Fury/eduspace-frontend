<script>
import { useToast } from 'primevue/usetoast';
import TeacherAccessInformation from "./teacher-access-information.vue";
import TeacherService from '../services/teacher.service.js';
import { Teacher } from "../model/teacher.entity.js";
import Dialog from 'primevue/dialog';

export default {
  name: "teacher-information",
  components: {
    TeacherAccessInformation,
    Dialog
  },
  data() {
    return {
      teacher: new Teacher(),
      showAccessInfo: false,
      showDialog: false,
      dialogMessage: '',
      toast: useToast()
    }
  },
  methods: {
    async submitForm() {
      try {
        const teacherData = {
          name: this.teacher.name,
          lastName: this.teacher.lastName,
          email: this.teacher.email,
          cellphone: this.teacher.cellphone,
          address: this.teacher.address,
          dni: this.teacher.dni
        };

        const response = await TeacherService.create(teacherData);
        if (response && response.id) {
          this.teacher = new Teacher({ ...response });
          this.dialogMessage = 'Teacher added successfully';
          this.showDialog = true;
          this.showAccessInfo = true;
        } else {
          throw new Error('No ID returned from the server');
        }
      } catch (error) {
        this.handleError(error, 'Failed to add teacher');
      }
    },
    async submitAccessInfo(accessInfo) {
      try {
        Object.assign(this.teacher, accessInfo);
        const updatedTeacher = await TeacherService.update(this.teacher);
        this.teacher = new Teacher({ ...updatedTeacher });
        this.dialogMessage = 'Access Information Saved';
        this.showDialog = true;
      } catch (error) {
        this.handleError(error, 'Failed to save access information');
      }
    },
    handleError(error, defaultMessage) {
      console.error(error);
      this.dialogMessage = error.response?.data?.message || error.message || defaultMessage;
      this.showDialog = true;
      this.toast.add({ severity: 'error', summary: 'Error', detail: this.dialogMessage, life: 3000 });
    },
    closeDialog() {
      this.showDialog = false;
    }
  }
}
</script>

<template>
  <div class="card" v-if="!showAccessInfo">
    <h2 class="text-2xl font-bold mb-4">Add Personal Data</h2>
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