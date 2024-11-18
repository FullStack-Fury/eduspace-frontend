<script>
import {TeacherService} from "../../../payroll-management/services/teacher.service.js";

export default {
  name: "classroom-create-and-edit",
  props: {
    classroom: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        description: '',
        teacherId: null,
      }),
    },
    isCreateMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: { ...this.classroom },
      teachers: [],
      loadingTeachers: true, // Indicador de carga para los profesores
    };
  },
  mounted() {
    this.loadTeachers();
  },
  methods: {
    async loadTeachers() {
      try {
        const response = await TeacherService.getAll();
        this.teachers = response.data; // Asegúrate de que `response.data` contenga un array de profesores
      } catch (error) {
        console.error("Error loading teachers:", error);
      } finally {
        this.loadingTeachers = false; // Termina el estado de carga
      }
    },
    save() {
      if (!this.form.name || !this.form.description || !this.form.teacherId) {
        alert("Please fill in all fields.");
        return;
      }
      this.$emit("save", this.form);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<template>
  <div class="breadcrumb" style="display: flex; align-items: center">
    <h4 style="margin-right: 20px">Classrooms and Shared Spaces</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">Classrooms</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">{{ isCreateMode ? 'Add Classroom' : 'Edit Classroom' }}</h4>
  </div>

  <div class="classroom-create-form">
    <div class="form-header">
      <h2>{{ isCreateMode ? 'Create Classroom' : 'Edit Classroom' }}</h2>
    </div>
    <form @submit.prevent="save" class="form-grid">
      <div class="form-field">
        <pv-float-label>Name:</pv-float-label>
        <pv-input-text v-model="form.name" placeholder="Enter name"/>
      </div>

      <div class="form-field">
        <pv-float-label>Description:</pv-float-label>
        <pv-input-text v-model="form.description" placeholder="Enter description"/>
      </div>

      <div class="form-field">
        <pv-float-label>Teacher:</pv-float-label>
        <div v-if="loadingTeachers">
          <span>Loading teachers...</span>
        </div>
        <div v-else>
          <select v-model="form.teacherId" class="teacher-select">
            <option disabled value="">Select a teacher</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.firstName }} {{ teacher.lastName }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <pv-button
            type="submit"
            label="Save"
            class="p-button-success"
            :disabled="loadingTeachers || !form.name || !form.description || !form.teacherId"
        />
        <pv-button
            type="button"
            label="Cancel"
            class="p-button-secondary"
            @click="cancel"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.classroom-create-form {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  margin-top: 50px;
  color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.form-header {
  color: black;
  font-weight: bold;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.teacher-select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
