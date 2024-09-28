<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import { defineComponent } from "vue";
import PayrollManagement from "./payroll-management/pages/payroll-management.component.vue";

export default defineComponent({
  name: 'app',
  components: { LanguageSwitcher, PayrollManagement },
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Meet', to: '/events-scheduling/meet' }
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Teacher Management</h1>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>