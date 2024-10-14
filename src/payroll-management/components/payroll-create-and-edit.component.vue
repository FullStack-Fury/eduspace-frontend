<script>
export default {
  name: "PayrollCreateAndEdit",
  props: {
    payroll: {
      type: Object,
      required: true,
      default: () => ({
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
      }),
    },
    availableTeachers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.payroll },
    };
  },
  methods: {
    save() {
      if (!this.form.teacherId) {
        alert('Please select a teacher.');
        return;
      }
      this.$emit("save", this.form);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<template>
  <div class="payroll-create-form">
    <h2>{{ form.id ? 'Edit Payroll' : 'Create Payroll' }}</h2>
    <form @submit.prevent="save" class="form-container">
      <pv-float-label class="form-field">
        <pv-dropdown
            v-model="form.teacherId"
            :options="availableTeachers"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a teacher"
        />
        <label for="teacherId">Teacher</label>
      </pv-float-label>

      <pv-float-label class="form-field">
        <pv-input-number
            v-model.number="form.salaryAmount"
            id="salaryAmount"
            :min="0"
            required
        />
        <label for="salaryAmount">Salary Amount</label>
      </pv-float-label>

      <pv-float-label class="form-field">
        <pv-input-number
            v-model.number="form.pensionContribution"
            id="pensionContribution"
            :min="0"
            required
        />
        <label for="pensionContribution">Pension Contribution</label>
      </pv-float-label>

      <pv-float-label class="form-field">
        <pv-input-number
            v-model.number="form.salaryBonus"
            id="salaryBonus"
            :min="0"
            required
        />
        <label for="salaryBonus">Bonus</label>
      </pv-float-label>

      <div class="form-actions">
        <pv-button
            type="submit"
            label="Save"
            icon="pi pi-check"
            class="p-button-success"
        />
        <pv-button
            type="button"
            label="Cancel"
            icon="pi pi-times"
            class="p-button-secondary"
            @click="cancel"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.payroll-create-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #fff;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaciado entre los campos */
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
