<script>
import { ref } from 'vue';

export default {
  name: 'TeacherAccessInformation',
  props: ['teacher'],
  setup(props, { emit }) {
    const rol = ref('');
    const username = ref('');
    const password = ref('');

    const submitForm = () => {
      emit('submitAccessInfo', {
        rol: rol.value,
        username: username.value,
        password: password.value
      });
    };

    return {
      rol,
      username,
      password,
      submitForm
    };
  }
};
</script>

<template>
  <div class="card">
    <h2 class="text-2xl font-bold mb-4">Access Information</h2>
    <form @submit.prevent="submitForm" class="p-fluid">
      <div class="field">
        <label for="rol">Rol</label>
        <pv-input-number id="rol" v-model="rol" required />
      </div>
      <div class="field">
        <label for="username">Username</label>
        <pv-input-text id="username" v-model="username" required />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <pv-input-password id="password" v-model="password" required />
      </div>

      <pv-button type="submit" label="Submit Access Info" class="mt-4" />
    </form>
  </div>
</template>



<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.field {
  margin-bottom: 1rem;
}
</style>
