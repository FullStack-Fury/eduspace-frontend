<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'app',
  components: {LanguageSwitcher},
  title: 'EduSpace',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Home', to: '/home' },
        { label: 'Meet', to: '/events-scheduling/meet' },
        { label: 'Reservation', to: '/reservation-scheduling'},
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
      console.log('user cleared', this.userId, this.userRole)

      this.$router.push({ name: 'login' });
    },
    changeToolbar() {
      if(this.userRole === 1) {
       console.log('welcome admin')
        this.items = [
          { label: 'Home', to: '/dashboard-admin/home-admin' },
          { label: 'Environments and Equipment', to: '/dashboard-admin/environments-equipment'},
          { label: 'Classroom Changes and Meetings', to: '/dashboard-admin/classroom-changes-meetings'},
          { label: 'Personal Data', to: '/dashboard-admin/personal-data'},
          { label: 'Personnel Management', to: '/dashboard-admin/personnel-management'},
          { label: 'Salary Calculation', to: '/dashboard-admin/salary-calculation'},
          { label: 'Log out', onClick: this.handleLogOut },
        ]

      }
      else if(this.userRole === 2) {
        console.log('welcome teacher')

        this.items = [
          { label: 'Home', to: '/dashboard-teacher/home-teacher' },
          { label: 'Notifications', to: '/dashboard-teacher/notifications'},
          { label: 'Reservations', to: '/dashboard-teacher/reservations'},
          { label: 'Breakdown Reports', to: '/dashboard-teacher/breakdown-reports'},
          { label: 'Wages', to: '/dashboard-teacher/wages'},
          { label: 'Space Availability', to: '/dashboard-teacher/space-availability'},
          { label: 'Log out', onClick: this.handleLogOut },
        ]
      }
      else {
        this.items = [
          { label: 'Home', to: '/home' },
          { label: 'Login', to: '/login' }
        ]
      }
    }
  },
  created(){
    this.changeToolbar()
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
    <div class="sidenav">
      <h2>EduSpace</h2>
      <div class="drawer-content">
        <div v-for="item in items" :key="item.label">
          <router-link v-if="item.to"
                       :to="item.to"
          >
            <pv-button class="p-button-text">
              {{ item.label}}
            </pv-button>
          </router-link>
          <pv-button class="pv-button" v-else
                     @click="item.onClick">
            {{ item.label }}
          </pv-button>
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
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.13);
  background: rgb(12,192,223);
  background: linear-gradient(150deg, rgba(12,192,223,1) 0%, rgba(147,227,241,1) 6%, rgba(255,255,255,1) 24%, rgba(246,246,246,1) 34%, rgba(255,255,255,1) 52%, rgba(255,255,255,1) 71%, rgba(255,255,255,1) 79%, rgba(255,231,120,1) 97%, rgba(255,210,0,1) 100%);
  text-align: left;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.main-content {
  margin-left: 250px;
  padding: 20px;
}


.p-button-text {
  color: #000;
  text-align: left;
}

.pv-button {
  display: inline-block;
  background-color: #ffcc00;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.pv-button:hover {
  background-color: #ffdb4d;
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
