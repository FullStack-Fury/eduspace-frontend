<template>
  <div v-if="teacher" class="dashboard-container">
    <!-- Información del Teacher -->
    <div class="teacher-info-card">
      <div class="teacher-avatar">
        <pv-avatar
            :label="initials"
            size="large"
            style="background-color: #42a5f5; color: #ffffff; font-size: 30px;"
        ></pv-avatar>
      </div>
      <div class="teacher-details">
        <h2>{{ fullName }}</h2>
        <p><strong>Status:</strong> Teacher</p>
        <p><strong>Email:</strong> {{ teacher.email }}</p>
        <p><strong>Phone:</strong> {{ teacher.phone }}</p>
        <p><strong>DNI:</strong> {{ teacher.dni }}</p>
      </div>
    </div>

    <!-- Cards en Bloques -->
    <div class="cards-section">
      <!-- Classroom Reservations -->
      <pv-card class="dashboard-card">
        <template #header>
          <h3>Classroom Reservations</h3>
        </template>
        <template #content>
          <ul>
            <li v-for="(reservation, index) in classroomReservations" :key="index">
              <p><strong>Classroom:</strong> {{ reservation.name }}</p>
              <p>{{ reservation.description }}</p>
            </li>
            <p v-if="classroomReservations.length === 0">
              No classroom reservations made by this teacher.
            </p>
          </ul>
        </template>
      </pv-card>

      <!-- Shared Area Reservations -->
      <pv-card class="dashboard-card">
        <template #header>
          <h3>Shared Area Reservations</h3>
        </template>
        <template #content>
          <ul>
            <li v-for="(reservation, index) in sharedAreaReservations" :key="index">
              <p><strong>Title:</strong> {{ reservation.title }}</p>
              <p><strong>Start:</strong> {{ reservation.start }}</p>
              <p><strong>End:</strong> {{ reservation.end }}</p>
              <p>
                <strong>Area:</strong>
                {{
                  sharedAreas.find((area) => area.id === reservation.areaId)?.name || 'Unknown'
                }}
              </p>
            </li>
            <p v-if="sharedAreaReservations.length === 0">
              No shared area reservations made by this teacher.
            </p>
          </ul>
        </template>
      </pv-card>

      <!-- Meetings -->
      <pv-card class="dashboard-card">
        <template #header>
          <h3>Meetings</h3>
        </template>
        <template #content>
          <ul>
            <li v-for="(meeting, index) in meetings" :key="index">
              <p><strong>Classroom:</strong> {{ meeting.classroom }}</p>
              <p><strong>Date:</strong> {{ meeting.day }}</p>
              <p><strong>Start:</strong> {{ meeting.start }}</p>
              <p><strong>End:</strong> {{ meeting.end }}</p>
              <p><strong>Title:</strong> {{ meeting.title }}</p>
              <p><strong>Description:</strong> {{ meeting.description }}</p>
            </li>
            <p v-if="meetings.length === 0">No meetings scheduled for this teacher.</p>
          </ul>
        </template>
      </pv-card>
    </div>
  </div>
  <p v-else>Loading teacher information...</p>
</template>

<script>
import { mapGetters } from "vuex";
import http from "../../shared/services/http-common.js";

export default {
  name: "TeacherDashboard",
  data() {
    return {
      teacher: null, // Información del Teacher
      classroomReservations: [], // Reservas de aulas
      sharedAreaReservations: [], // Reservas de áreas comunes
      sharedAreas: [], // Lista de áreas compartidas
      meetings: [], // Reuniones del Teacher
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    fullName() {
      return `${this.teacher?.firstName || ""} ${this.teacher?.lastName || ""}`;
    },
    initials() {
      const [firstName, lastName] = [
        this.teacher?.firstName || "",
        this.teacher?.lastName || "",
      ];
      return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
    },
  },
  async mounted() {
    try {
      console.log("Teacher ID desde Vuex:", this.userId);

      // Obtener información del Teacher
      const teacherResponse = await http.get("/teachers");
      const allTeachers = teacherResponse.data;
      this.teacher = allTeachers.find((t) => String(t.id) === String(this.userId));

      if (!this.teacher) {
        console.warn("No se encontró información del profesor logueado.");
        return;
      }

      // Obtener reservaciones de aulas
      const classroomResponse = await http.get("/classrooms");
      const allClassrooms = classroomResponse.data;
      this.classroomReservations = allClassrooms.filter(
          (classroom) => classroom.teacherId === this.userId
      );

      // Obtener reservaciones de áreas comunes
      const sharedAreaReservationResponse = await http.get("/shared-area-reservation");
      this.sharedAreaReservations = sharedAreaReservationResponse.data.filter(
          (reservation) => reservation.teacherId === this.userId
      );

      // Obtener áreas compartidas
      const sharedAreaResponse = await http.get("/shared-area");
      this.sharedAreas = sharedAreaResponse.data;

      // Obtener reuniones
      const meetResponse = await http.get("/meet");
      this.meetings = meetResponse.data.filter((meet) =>
          meet.teachers.some((teacher) => teacher.id === this.userId)
      );
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  },
};
</script>


<style scoped>
/* Contenedor Principal */
.dashboard-container {
  padding: 20px;
}

/* Card Principal del Teacher */
.teacher-info-card {
  display: flex;
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.teacher-avatar {
  margin-right: 20px;
}

.teacher-details h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.teacher-details p {
  margin: 5px 0;
}

/* Cards de Contenido */
.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.dashboard-card {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.dashboard-card h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
