<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

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
  <div class="container mx-auto p-4">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>