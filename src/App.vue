<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

import {defineComponent} from "vue";
import PayrollManagement from "./payroll-management/pages/payroll-management.component.vue";

export default defineComponent({
  components: {PayrollManagement}
})
export default {
  name: 'app',
  components: { LanguageSwitcher },
  title: 'EduSpace',
  data() {
    return {
      drawer: false,
      items: [
        {label: 'Meet', to: '/events-scheduling/meet'}
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<template>
  <payroll-management></payroll-management>
  <div class="container mx-auto p-4">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>