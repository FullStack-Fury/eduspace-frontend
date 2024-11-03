<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'app',
  components: { LanguageSwitcher },
  computed: {
    ...mapGetters(['userId', 'userRole']), // Obtén el rol y el ID desde Vuex
  },
  methods: {
    ...mapActions(['clearUser']),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    handleLogOut() {
      this.clearUser(); // Limpia el estado del usuario en Vuex
      this.$router.push({ name: 'login' });
    },
    changeToolbar() {
      if (this.userRole === 1) {
        this.items = [
          { label: 'Home', to: '/dashboard-admin/home-admin' },
          { label: 'Environments and Equipment', to: '/dashboard-admin/environments-equipment' },
          { label: 'Classroom Changes and Meetings', to: '/dashboard-admin/classroom-changes-meetings' },
          { label: 'Personal Data', to: '/dashboard-admin/personal-data' },
          { label: 'Personnel Management', to: '/dashboard-admin/personnel-management' },
          { label: 'Salary Calculation', to: '/dashboard-admin/salary-calculation' }
        ];
      } else if (this.userRole === 2) {
        this.items = [
          { label: 'Home', to: '/dashboard-teacher/home-teacher' },
          { label: 'Notifications', to: '/dashboard-teacher/notifications' },
          { label: 'Reservations', to: '/dashboard-teacher/reservations' },
          { label: 'Breakdown Reports', to: '/dashboard-teacher/breakdown-reports' },
          { label: 'Wages', to: '/dashboard-teacher/wages' },
          { label: 'Space Availability', to: '/dashboard-teacher/space-availability' }
        ];
      } else {
        this.items = [
          { label: 'Home', to: '/home' },
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
      this.changeToolbar(); // Actualiza el toolbar cuando userRole cambia
    }
  }
};
</script>


<template>
  <pv-toast />
  <div class="app-container">
    <!-- Contenedor principal flex -->
    <header class="sidenav-wrapper">
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
              <pv-button
                  :class="[
                  'p-button-text',
                  { 'admin-hover-active': userRole === 1, 'teacher-hover-active': userRole === 2 },
                ]"
              >
                <img v-if="item.svg" :src="item.svg" alt="icon" style="width: 20px; height: 20px; margin-right: 8px;" />
                {{ item.label }}
              </pv-button>
            </router-link>
            <pv-button class="pv-button" v-else @click="item.onClick">
              <img v-if="item.svg" :src="item.svg" alt="icon" style="width: 20px; height: 20px; margin-right: 8px;" />
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
