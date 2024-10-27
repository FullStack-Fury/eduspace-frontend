<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import { mapActions, mapGetters } from "vuex";

// Importar los SVG desde las rutas especificadas
import HomeIcon from "/src/assets/admin/Home.svg";
import ClassroomIcon from "/src/assets/admin/Clasroom.svg";
import EnviromentIcon from "/src/assets/admin/Enviroment.svg";
import PersonalDIcon from "/src/assets/admin/Personal_Data.svg";
import PersonalMIcon from "/src/assets/admin/Personal_Management.svg";
import SalaryIcon from "/src/assets/admin/Salary_Calculation.svg";

// Íconos específicos para la vista del "teacher"
import BreakdownIcon from "/src/assets/teacher/Breakdown_Reports.svg";
import NotificationIcon from "/src/assets/teacher/Notification.svg";
import PagesIcon from "/src/assets/teacher/Pages.svg";
import ReservationIcon from "/src/assets/teacher/Reservation.svg";
import SpaceIcon from "/src/assets/teacher/Space_Availability.svg";

export default {
  name: 'app',
  components: { LanguageSwitcher },
  title: 'EduSpace',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Home', to: '/home', svg: HomeIcon },
        { label: 'Meet', to: '/events-scheduling/meet' },
        { label: 'Reservation', to: '/reservation-scheduling' },
        { label: 'Login', to: '/login' },
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['userId', 'userRole'])
  },
  methods: {
    ...mapActions('user', ['setUser', 'clearUser']),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    handleLogOut() {
      this.clearUser();
      console.log('user cleared', this.userId, this.userRole);

      this.$router.push({ name: 'login' });
    },
    changeToolbar() {
      if (this.userRole === 1) {
        console.log('welcome admin');
        this.items = [
          { label: 'Home', to: '/dashboard-admin/home-admin', svg: HomeIcon },
          { label: 'Environments and Equipment', to: '/dashboard-admin/environments-equipment', svg: EnviromentIcon },
          { label: 'Classroom Changes and Meetings', to: '/dashboard-admin/classroom-changes-meetings', svg: ClassroomIcon },
          { label: 'Personal Data', to: '/dashboard-admin/personal-data', svg: PersonalDIcon },
          { label: 'Personnel Management', to: '/dashboard-admin/personnel-management', svg: PersonalMIcon },
          { label: 'Salary Calculation', to: '/dashboard-admin/salary-calculation', svg: SalaryIcon }
        ];
      } else if (this.userRole === 2) {
        console.log('welcome teacher');

        this.items = [
          { label: 'Home', to: '/dashboard-teacher/home-teacher', svg: HomeIcon },
          { label: 'Notifications', to: '/dashboard-teacher/notifications', svg: NotificationIcon },
          { label: 'Reservations', to: '/dashboard-teacher/reservations', svg: ReservationIcon },
          { label: 'Breakdown Reports', to: '/dashboard-teacher/breakdown-reports', svg: BreakdownIcon },
          { label: 'Wages', to: '/dashboard-teacher/wages', svg: PagesIcon },
          { label: 'Space Availability', to: '/dashboard-teacher/space-availability', svg: SpaceIcon }
        ];
      } else {
        this.items = [
          { label: 'Home', to: '/home', svg: HomeIcon },
          { label: 'Login', to: '/login' }
        ];
      }
    }
  },
  created() {
    this.changeToolbar();
  },
  watch: {
    userRole(newRole) {
      this.changeToolbar();
    }
  }
}
</script>

<template>
  <pv-toast/>
  <header>
    <div :class="['sidenav', { 'admin-sidenav': userRole === 1, 'teacher-sidenav': userRole === 2 }]">
      <h2>EduSpace</h2>
      <div class="drawer-content">
        <div v-for="item in items" :key="item.label" class="menu-item">
          <router-link
              v-if="item.to"
              :to="item.to"
              class="nav-link"
              active-class="router-link-active"
              exact-active-class="router-link-exact-active"
          >
            <pv-button :class="['p-button-text', { 'admin-hover-active': userRole === 1, 'teacher-hover-active': userRole === 2 }]">
              <img v-if="item.svg" :src="item.svg" alt="icon" style="width: 16px; height: 16px; margin-right: 8px;" />
              {{ item.label }}
            </pv-button>
          </router-link>
          <pv-button class="pv-button" v-else
                     @click="item.onClick">
            <img v-if="item.svg" :src="item.svg" alt="icon" style="width: 16px; height: 16px; margin-right: 8px;" />
            {{ item.label }}
          </pv-button>
        </div>
      </div>
      <div class="footer-section">
        <div class="logout-container">
          <pv-button
              class="pv-button log-out logout-hover"
              :class="[{ 'admin-hover-active': userRole === 1, 'teacher-hover-active': userRole === 2 }]"
              @click="handleLogOut"
          >
            <img src="./assets/Logo%20sidebar.png" alt="Logo" class="logout-icon" />
            <span>Log out</span>
          </pv-button>
        </div>
        <div class="copyright-text">
          Copyright EduSpace team
        </div>
      </div>
    </div>
  </header>
  <main class="main-content">
    <router-view/>
  </main>
</template>

<style scoped>
.sidenav {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-shadow: 2px 0 25px rgba(0, 0, 0, 0.13);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admin-sidenav {
  background: linear-gradient(160deg,
  rgba(147, 227, 241, 1) 0%,
  rgba(255, 255, 255, 1) 24%,
  rgba(246, 246, 246, 1) 34%,
  rgba(255, 255, 255, 1) 52%,
  rgba(255, 255, 255, 1) 71%,
  rgba(255, 255, 255, 1) 85%,
  rgba(255, 231, 120, 1) 100%);
}

.teacher-sidenav {
  background: linear-gradient(160deg,
rgba(255, 231, 120, 1) 0%,
rgba(255, 255, 255, 1) 24%,
rgba(246, 246, 246, 1) 34%,
rgba(255, 255, 255, 1) 52%,
rgba(255, 255, 255, 1) 71%,
rgba(255, 255, 255, 1) 85%,
rgba(147, 227, 241, 1) 100%);
}

.drawer-content {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.menu-item {
  margin-bottom: 10px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea los elementos a la izquierda */
  margin-top: auto;
  padding-top: 20px;
  width: 100%;
}

.logout-container {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 0px;
}

.log-out {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
  color: #000;
  font-weight: 300;
  text-align: left;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.logout-icon {
  width: 30px;
  height: 30px;
  margin-right: 8px;
  transition: none; /* Asegura que no haya ninguna transición aplicada */
}

.log-out {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
  color: #000;
  font-weight: 300;
  text-align: left;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.sidenav .log-out:hover{
  border: none;
}

.admin-hover-active.logout-hover:hover {
  background-color: rgba(12, 192, 223, 0.28) !important;
}

.teacher-hover-active.logout-hover:hover {
  background-color: rgba(255, 210, 0, 0.28) !important;
}

.router-link-active .admin-hover-active.logout-hover,
.router-link-exact-active .admin-hover-active.logout-hover {
  background-color: rgba(12, 192, 223, 0.28) !important;
}

.router-link-active .teacher-hover-active.logout-hover,
.router-link-exact-active .teacher-hover-active.logout-hover {
  background-color: rgba(255, 210, 0, 0.28) !important;
}


.copyright-text {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #777;
  text-align: left;
  padding-left: 20px; /* Alinea el texto con el contenido del sidebar */
}

.p-button-text {
  color: #000 !important;
  text-align: left;
}

.admin-hover-active:hover,
.router-link-active .admin-hover-active,
.router-link-exact-active .admin-hover-active {
  background-color: rgba(12, 192, 223, 0.28) !important;
  color: #000 !important;
}

.teacher-hover-active:hover,
.router-link-active .teacher-hover-active,
.router-link-exact-active .teacher-hover-active {
  background-color: rgba(255, 210, 0, 0.28) !important;
  color: #000 !important;
}

.pv-button {
  display: flex;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  padding: 0.5rem 0.7rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.pv-button:hover {
  background-color: #ffdb4d;
}

.main-content {
  margin-left: 250px;
  padding: 20px;
  overflow: auto;
}

@media (max-width: 768px) {
  .sidenav {
    width: 200px;
  }

  .main-content {
    margin-left: 200px;
  }
}
</style>
