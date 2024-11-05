<template>
  <form @submit.prevent="submitForm">
    <pv-input-text v-model="formData.firstName" placeholder="First Name" required />
    <pv-input-text v-model="formData.lastName" placeholder="Last Name" required />
    <pv-input-text v-model="formData.email" placeholder="Email" required />
    <pv-input-text v-model="formData.dni" placeholder="DNI" required />
    <pv-input-text v-model="formData.phone" placeholder="Phone" required />
    <pv-dropdown v-model="formData.workingDays" :options="days" placeholder="Working Days" />
    <pv-dropdown v-model="formData.field" :options="fields" placeholder="Field" />

    <pv-button label="Save" type="submit" />
    <pv-button label="Cancel" @click="cancel" />
  </form>
</template>

<script>
export default {
  name: 'add-teacher-form',
  props: {
    administratorId: Number
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        dni: '',
        phone: '',
        workingDays: '',
        field: '',
        administratorId: this.administratorId,
        password: '' // Campo para la contraseña
      },
      days: ['Monday - Friday', 'Saturday - Sunday'],
      fields: ['Math', 'Science', 'Literature'] // Agrega los campos necesarios
    };
  },
  methods: {
    setPasswordAsDNI() {
      // Asigna el valor del DNI como contraseña automáticamente
      this.formData.password = this.formData.dni;
    },
    submitForm() {
      this.$emit('save', this.formData);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
