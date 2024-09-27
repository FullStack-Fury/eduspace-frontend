<script>
import TeacherInformation from "./teacher-management/components/teacher-information.vue";
import PersonnelList from "./teacher-management/components/personnel-list.vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'app',
  components: {LanguageSwitcher,TeacherInformation,
    PersonnelList},
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
    <h1 class="text-3xl font-bold mb-6">Teacher Management</h1>
    <PersonnelList />
  </div>
</template>

<style scoped>

</style>
