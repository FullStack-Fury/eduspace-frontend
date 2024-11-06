<template>
  <div>
    <h2 class="title">Personnel Management</h2>
    <div class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          @input="filterTeachers"
          placeholder="Search teachers by name..."
          class="search-input"
      />
    </div>

    <pv-data-table :value="filteredTeachers" v-if="filteredTeachers.length" class="teacher-table">
      <pv-column field="workingDays" header="Working Days" class="table-column"></pv-column>
      <pv-column field="field" header="Field" class="table-column"></pv-column>
      <pv-column field="firstName" header="First Name" class="table-column"></pv-column>
      <pv-column field="lastName" header="Last Name" class="table-column"></pv-column>

      <pv-column header="Actions" class="table-column">
        <template #body="slotProps">
          <div class="action-buttons">
            <!-- Botón para ver reemplazos -->
            <pv-button label="View Replacements" @click="openReplacementDialog(slotProps.data)" class="replacement-button" />

            <!-- Botón de notificación -->
            <pv-button icon="pi pi-bell" label="Notify" @click="sendNotification(slotProps.data)" class="notify-button" />
          </div>
        </template>
      </pv-column>
    </pv-data-table>

    <p v-else class="no-teachers-message">No teachers found for this administrator.</p>

    <pv-dialog header="Possible Replacements" v-model:visible="isReplacementDialogVisible" :modal="true" :closable="true" class="replacement-dialog">
      <ul v-if="possibleReplacements.length" class="replacement-list">
        <li v-for="replacement in possibleReplacements" :key="replacement.id" class="replacement-item">
          <span class="replacement-name">{{ replacement.firstName }} {{ replacement.lastName }} - {{ replacement.workingDays }}</span>
          <pv-button label="Swap Working Days" @click="swapWorkingDays(currentTeacher.id, replacement.id)" class="swap-button" />
        </li>
      </ul>
      <p v-else>No replacements found.</p>
    </pv-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { TeacherService } from "../services/teacher.service.js";

export default {
  data() {
    return {
      teachers: [],
      filteredTeachers: [],
      searchQuery: "",
      possibleReplacements: [],
      isReplacementDialogVisible: false,
      currentTeacher: null,
    };
  },
  computed: {
    ...mapGetters(['userId', 'userRole'])
  },
  methods: {
    async fetchTeachers() {
      const teacherService = new TeacherService();
      this.teachers = await teacherService.getByAdministratorId(this.userId);
      this.filteredTeachers = this.teachers;
    },
    async openReplacementDialog(teacher) {
      const teacherService = new TeacherService();
      this.currentTeacher = teacher;
      const replacements = await teacherService.findByField(teacher.field);
      this.possibleReplacements = replacements.filter(
          replacement => replacement.workingDays !== teacher.workingDays && replacement.id !== teacher.id
      );
      this.isReplacementDialogVisible = true;
    },
    async swapWorkingDays(teacherId1, teacherId2) {
      const teacherService = new TeacherService();
      await teacherService.swapWorkingDays(teacherId1, teacherId2);
      await this.fetchTeachers();
      this.isReplacementDialogVisible = false;
    },
    filterTeachers() {
      this.filteredTeachers = this.teachers.filter(teacher => {
        const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
    sendNotification(teacher) {
      alert(`Notification sent to ${teacher.firstName} ${teacher.lastName}`);
    }
  },
  mounted() {
    this.fetchTeachers();
  }
};
</script>

<style scoped>
.title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Styling for the search input */
.search-container {
  margin: 20px 0;
  text-align: center;
}

.search-input {
  padding: 8px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.teacher-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table-column {
  text-align: left;
  padding: 12px;
  font-weight: bold;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

.replacement-button {
  background-color: #008cba;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.replacement-button:hover {
  background-color: #00789e;
}

.notify-button {
  background-color: #ffc107;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: bold;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.notify-button:hover {
  background-color: #e0a800;
}

.no-teachers-message {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.replacement-dialog {
  max-width: 450px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.replacement-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.replacement-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  padding: 12px;
  background-color: #f1f1f1;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.replacement-item:hover {
  background-color: #e0e0e0;
}

.replacement-name {
  font-size: 1.1rem;
  color: #333;
}

.swap-button {
  background-color: #28a745;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.swap-button:hover {
  background-color: #218838;
}
</style>
