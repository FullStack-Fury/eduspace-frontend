<script>
import { ref } from 'vue';

export default {
  name: 'TeacherAccessInformation',
  props: ['teacher'],
  setup(props, { emit }) {
    const rol = ref(null);
    const username = ref('');
    const password = ref('');


    const roleOptions = [
      { label: 'Teacher', value: 1 },
      { label: 'Admin', value: 2 }
    ];

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
      roleOptions,
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
        <pv-dropdown
            id="rol"
            v-model="rol"
            :options="roleOptions"
            option-label="label"
            placeholder="Select a Role"
            required />
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
