<script>
import TeacherInformation from "./teacher-management/components/teacher-information.vue";

export default {
  name: 'App',
  components: {
    TeacherInformation
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Teacher Management</h1>
    <TeacherInformation />
  </div>
</template>



<style>

@import 'primeicons/primeicons.css';
</style>