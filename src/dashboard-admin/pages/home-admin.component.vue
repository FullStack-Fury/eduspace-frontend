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
        <div class="admin-row">
          <p><strong>Name:</strong> {{ admin.firstName }}</p>
          <p><strong>Last Name:</strong> {{ admin.lastName }}</p>
        </div>
        <div class="admin-row">
          <p><strong>Birthdate:</strong> 03-03-1956</p>
          <p><strong>Cell Phone:</strong> {{ admin.phone }}</p>
        </div>
        <div class="admin-row">
          <p><strong>Status:</strong> Admin</p>
          <p><strong>Email:</strong> {{ admin.email }}</p>
        </div>
      </div>
      <button class="edit-button">Edit</button>
    </div>

    <!-- Tarjeta de Profesores -->
    <pv-card class="teachers-card">
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
    <pv-card class="meet-card">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "../../shared/services/http-common.js";

export default {
  name: "AdminDashboard",
  data() {
    return {
      admin: null, // Datos del administrador
      meetings: [], // Datos de las reuniones asignadas
      teachers: [], // Datos de los profesores creados por este administrador
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    fullName() {
      return `${this.admin?.firstName || ""} ${this.admin?.lastName || ""}`;
    },
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
      console.log("User ID desde Vuex:", this.userId);

      // Verificación de existencia de userId
      if (!this.userId) {
        console.error("El userId no está definido.");
        return;
      }

      // Obtener datos del administrador
      const adminResponse = await http.get("/administrators");
      const admins = adminResponse.data;
      console.log("Datos de Administradores:", admins);

      // Encontrar al administrador logueado
      this.admin = admins.find((a) => String(a.id) === String(this.userId));
      console.log("Administrador encontrado:", this.admin);

      if (!this.admin) {
        console.warn("No se encontró información del administrador logueado.");
        return;
      }

      // Obtener reuniones asignadas
      const meetingsResponse = await http.get("/meet");
      const allMeetings = meetingsResponse.data;
      console.log("Datos de Meetings:", allMeetings);

      // Filtrar reuniones asignadas al administrador logueado
      this.meetings = allMeetings.filter(
          (meeting) =>
              meeting.administrator?.name &&
              meeting.administrator.name === `${this.admin.firstName} ${this.admin.lastName}`
      );
      console.log("Reuniones asignadas:", this.meetings);

      // Obtener profesores creados por el administrador
      const teachersResponse = await http.get("/teachers");
      const allTeachers = teachersResponse.data;
      console.log("Datos de Profesores:", allTeachers);

      // Filtrar profesores creados por el administrador logueado
      this.teachers = allTeachers.filter(
          (teacher) => String(teacher.administratorId) === String(this.userId)
      );
      console.log("Profesores creados por este administrador:", this.teachers);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  },
};
</script>

<style scoped>
/* Layout Principal */
.dashboard-layout {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Dos columnas */
  grid-template-rows: auto auto; /* Filas automáticas */
  gap: 20px;
  padding: 20px;
}

/* Información del Administrador */
.admin-info {
  grid-column: 1 / 3; /* Ocupa todo el ancho */
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

.admin-row {
  display: flex;
  justify-content: space-between;
}

.edit-button {
  grid-column: 3 / 4;
  align-self: end;
  background-color: #fdd835;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #fbc02d;
}

/* Tarjeta de Profesores */
.teachers-card {
  grid-column: 1 / 2; /* Primera columna */
  grid-row: 2 / 3; /* Segunda fila */
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
}

.teachers-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.teachers-list {
  list-style: none;
  padding: 0;
}

/* Tarjeta de Reuniones */
.meet-card {
  grid-column: 2 / 3; /* Segunda columna */
  grid-row: 2 / 3; /* Segunda fila */
  padding: 20px;
  border-radius: 8px;
}
</style>
