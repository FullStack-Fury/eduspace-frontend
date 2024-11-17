<template>
  <div class="dashboard-layout">
    <!-- Información del Administrador -->
    <div v-if="admin" class="admin-info">
      <div class="admin-avatar">
        <pv-avatar
            :label="initials"
            size="xlarge"
            style="background-color: #2196F3; color: white; font-size: 30px;"
        ></pv-avatar>
      </div>
      <div class="admin-details">
        <p><strong>Name:</strong> {{ admin.firstName }}</p>
        <p><strong>Last Name:</strong> {{ admin.lastName }}</p>
        <p><strong>Birthdate:</strong> 03-03-1956</p>
        <p><strong>Cell Phone:</strong> {{ admin.phone }}</p>
        <p><strong>Status:</strong> Admin</p>
        <p><strong>Email:</strong> {{ admin.email }}</p>
      </div>
    </div>

    <!-- Tarjeta de Profesores -->
    <pv-card class="teachers-card scrollable-card">
      <template #header>
        <h3 class="teachers-title">Teachers Created</h3>
      </template>
      <template #content>
        <div v-if="teachers.length">
          <ul class="teachers-list">
            <li v-for="(teacher, index) in teachers" :key="index">
              <p><strong>Name:</strong> {{ teacher.firstName }} {{ teacher.lastName }}</p>
              <p><strong>Email:</strong> {{ teacher.email }}</p>
              <p><strong>DNI:</strong> {{ teacher.dni }}</p>
              <p><strong>Phone:</strong> {{ teacher.phone }}</p>
              <p><strong>Working Days:</strong> {{ teacher.workingDays }}</p>
              <p><strong>Field:</strong> {{ teacher.field }}</p>
              <hr v-if="index < teachers.length - 1" />
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No teachers created by this administrator.</p>
        </div>
      </template>
    </pv-card>

    <!-- Tarjeta de Reuniones -->
    <pv-card class="meet-card scrollable-card">
      <template #header>
        <h3 class="meet-title">Meetings in Charge</h3>
      </template>
      <template #content>
        <div v-if="meetings.length">
          <ul class="meetings-list">
            <li v-for="(meeting, index) in meetings" :key="index">
              <p><strong>Classroom:</strong> {{ meeting.classroom }}</p>
              <p><strong>Date:</strong> {{ meeting.day }}</p>
              <p><strong>Start:</strong> {{ meeting.start }}</p>
              <p><strong>End:</strong> {{ meeting.end }}</p>
              <p><strong>Title:</strong> {{ meeting.title }}</p>
              <p><strong>Description:</strong> {{ meeting.description }}</p>
              <p><strong>Teachers:</strong></p>
              <ul class="teacher-list">
                <li v-for="(teacher, tIndex) in meeting.teachers" :key="tIndex">
                  {{ teacher.firstName }} {{ teacher.lastName }}
                </li>
              </ul>
              <hr v-if="index < meetings.length - 1" />
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No meetings assigned to this administrator.</p>
        </div>
      </template>
    </pv-card>

    <!-- Tarjeta de Reports -->
    <pv-card class="reports-card scrollable-card">
      <template #header>
        <h3 class="reports-title">Reports</h3>
      </template>
      <template #content>
        <div v-if="reports.length">
          <ul class="reports-list">
            <li v-for="(report, index) in reports" :key="index">
              <p><strong>Type:</strong> {{ report.kind_of_report }}</p>
              <p><strong>Description:</strong> {{ report.description }}</p>
              <p><strong>Resource ID:</strong> {{ report.resourceId }}</p>
              <p><strong>Created At:</strong> {{ report.created_at }}</p>
              <p><strong>Status:</strong> {{ report.status }}</p>
              <hr v-if="index < reports.length - 1" />
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No reports have been created.</p>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "../../shared/services/http-common.js";

export default {
  name: "AdminDashboard",
  data() {
    return {
      admin: null,
      meetings: [],
      teachers: [],
      reports: [],
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    initials() {
      const [firstName, lastName] = [
        this.admin?.firstName || "",
        this.admin?.lastName || "",
      ];
      return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
    },
  },
  async mounted() {
    try {
      if (!this.userId) return;

      const adminResponse = await http.get("/administrators");
      this.admin = adminResponse.data.find((a) => String(a.id) === String(this.userId));

      const meetingsResponse = await http.get("/meet");
      this.meetings = meetingsResponse.data.filter(
          (meeting) =>
              meeting.administrator?.name === `${this.admin.firstName} ${this.admin.lastName}`
      );

      const teachersResponse = await http.get("/teachers");
      this.teachers = teachersResponse.data.filter(
          (teacher) => String(teacher.administratorId) === String(this.userId)
      );

      const reportsResponse = await http.get("/reports");
      this.reports = reportsResponse.data;
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  },
};
</script>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  gap: 20px;
  padding: 20px;
}

.admin-info {
  grid-column:span 3; /* Ocupa todo el ancho */
  background-color: #fff176; /* Fondo amarillo */
  padding: 20px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto 1fr auto; /* Avatar, información y botón */
  align-items: center;
  gap: 20px;
}

.admin-avatar {
  grid-column: 1 / 2;
}

.admin-details {
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Información en dos columnas */
  gap: 10px;
}


.scrollable-card {
  height: 400px; /* Altura fija */
  overflow-y: auto; /* Scroll interno */
}

.teachers-card {
  background-color: #e3f2fd;
}

.meet-card {
  background-color: #e8f5e9;
}

.reports-card {
  background-color: #f3e5f5;
}

.teachers-title,
.meet-title,
.reports-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
</style>
