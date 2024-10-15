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
          { label: 'Home', to: '/home' },
          { label: 'Meet', to: '/events-scheduling/meet' },
          { label: 'Salary Calculation', to: '/salary-calculation'},
          { label: 'Log out', onClick: this.handleLogOut },
        ]

      }
      else if(this.userRole === 2) {
        console.log('welcome teacher')

        this.items = [
          { label: 'Home', to: '/home' },
          { label: 'Reservation', to: '/reservation-scheduling'},
          { label: 'Classrooms', to: '/classrooms'},
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
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <h2>EduSpace</h2>
      </template>
      <template #center>
        <div class=" flex flex-row">
          <div v-for="item in items" :key="item.label">
            <router-link v-if="item.to"
                         :to="item.to"
            >
              <pv-button class="p-button-text">
                {{ item.label}}
              </pv-button>
            </router-link>
            <pv-button v-else
                       @click="item.onClick">
              {{ item.label }}
            </pv-button>
          </div>

        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>

</style>
