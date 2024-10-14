<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import {mapGetters} from "vuex";

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
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    changeToolbar() {
      if(this.userRole === 1) {
       console.log('welcome admin')
        this.items = [
          { label: 'Home', to: '/home' },
          { label: 'Meet', to: '/events-scheduling/meet' },
          { label: 'Reservation', to: '/reservation-scheduling'},
          { label: 'Wages', to: '/payroll-management'},
        ]

      }
      else {
        console.log('welcome my bro')

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
        <div class="flex-column">
          <router-link v-for="item in items" :key="item.label" v-slot="{navigate, href}" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text" @click="navigate">{{ item.label }}</pv-button>
          </router-link>
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
