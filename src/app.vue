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
  name: "app",
  components: { LanguageSwitcher },
  data() {
    return {
      drawer: false,
      items: [] // Inicializa vacío, se actualizará en changeToolbar según el rol
    };
  },
  computed: {
    ...mapGetters(['userId', 'userRole', 'userName']) // Obtén el rol y el ID desde Vuex
  },
  methods: {
    ...mapActions(['clearUser']),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    handleLogOut() {
      this.clearUser(); // Limpia el estado del usuario en Vuex
      this.$store.dispatch('clearUser');
      this.$router.push({ name: 'login' });
    },
    changeToolbar() {
      // Configura los ítems de la barra lateral según el rol
      if (this.userRole === 1) { // Si es administrador
        this.items = [
          {label: 'Home', to: '/dashboard-admin/home', svg: HomeIcon},
          {label: 'Environments and Equipment', to: '/dashboard-admin/environments-equipment', svg: EnviromentIcon},
          {label: 'Classroom Changes and Meetings', to: '/dashboard-admin/classroom-changes-meetings', svg: ClassroomIcon},
          {label: 'Personal Data', to: '/dashboard-admin/personal-data', svg: PersonalDIcon},
          {label: 'Personal Management', to: '/dashboard-admin/personal-management', svg: PersonalMIcon},
          {label: 'Salary Calculation', to: '/dashboard-admin/salary-calculation', svg: SalaryIcon}
        ];
      } else if (this.userRole === 2) { // Si es profesor
        this.items = [
          {label: 'Home', to: '/dashboard-teacher/home', svg: HomeIcon},
          {label: 'Notifications', to: '/dashboard-teacher/notifications', svg: NotificationIcon},
          {label: 'Reservations', to: '/dashboard-teacher/reservations', svg: ReservationIcon},
          {label: 'Breakdown Reports', to: '/dashboard-teacher/breakdown-reports', svg: BreakdownIcon},
          {label: 'Wages', to: '/dashboard-teacher/wages', svg: PagesIcon},
          {label: 'Space Availability', to: '/dashboard-teacher/space-availability', svg: SpaceIcon}
        ];
      } else {
        // Opciones disponibles cuando no está autenticado
        this.items = [
          { label: 'Home', to: '/home' },
          { label: 'Login', to: '/login' }
        ];
      }
    }
  },
  created() {
    // Redirige a la página de login si no está autenticado
    if (!this.userRole) {
      this.$router.push({ name: 'login' });
    } else {
      this.changeToolbar(); // Actualiza el toolbar si ya está autenticado
    }
  },
  watch: {
    // Observa cambios en el rol de usuario y actualiza el toolbar
    userRole(newRole) {
      this.changeToolbar();
    }
  }
};
</script>



<template>
  <pv-toast />
  <div class="app-container">
    <header v-if="userRole" class="sidenav-wrapper">
      <div :class="['sidenav', { 'admin-sidenav': userRole === 1, 'teacher-sidenav': userRole === 2 }]">
<!--        <h2>EduSpace</h2> >-->

        <!-- Información del usuario autenticado -->
        <div class="user-info" >
          <pv-avatar image="/src/assets/default-avatar.png" class="mr-2" size="xlarge" shape="circle"></pv-avatar>
          <div class="info">
            <p class="info" :style="{ color: userRole === 1 ? '#064C58' : '#584F06' }">{{ userRole === 1 ? 'Administrator' : 'Teacher' }}</p> <!-- Mostrar el rol del usuario con color condicional -->
            <p class="info">{{ userName }}</p> <!-- Mostrar el nombre del usuario -->

          </div>

        </div>


        <div class="drawer-content">
          <div v-for="item in items" :key="item.label" class="menu-item">
            <router-link
                v-if="item.to"
                :to="item.to"
                class="nav-link"
                active-class="router-link-active"
                exact-active-class="router-link-exact-active"
            >
              <pv-button
                  :class="['p-button-text', { 'admin-hover-active': userRole === 1, 'teacher-hover-active': userRole === 2 }]">
                <img v-if="item.svg" :src="item.svg" alt="icon" style="width: 20px; height: 20px; margin-right: 8px;" />
                {{ item.label }}
              </pv-button>
            </router-link>
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
          <div class="copyright-text">Copyright EduSpace team</div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>




<style scoped>
.user-info {
  padding: 15px 0;
  font-size: 1rem;
  color: #333;
  text-align: left;
  display: flex;
}

.user-info p {
  margin: 0;
  font-weight: 550;
}

.info{
  margin: auto 0;
}

.app-container {
  display: flex; /* Hace que el contenedor principal sea flex para alinear los elementos en fila */

  height: 100vh; /* Altura completa para que el sidebar ocupe toda la pantalla */
}

.sidenav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidenav {
  width: 350px;
  height: 100%;
  box-shadow: 2px 0 25px rgba(0, 0, 0, 0.13);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
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
  align-items: flex-start;
  margin-top: auto;
  padding-top: 20px;
  width: 100%;
}

.logout-container {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 0;
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
}

.copyright-text {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #777;
  text-align: left;
  padding-left: 20px;
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

.sidenav .pv-button:hover {
  border: none;
}

.main-content {
  flex: 1;
  height: 100vh;
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .sidenav {
    width: 200px;
  }

  .main-content {
    margin-left: 0;
  }
}
</style>
