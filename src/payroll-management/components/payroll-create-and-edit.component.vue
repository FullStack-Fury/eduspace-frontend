<script>
import { TeacherService } from "../services/teacher.service.js";

export default {
  name: "PayrollCreateAndEdit",
  props: {
    payroll: {
      type: Object,
      required: true,
      default: () => ({
        serie: "A", // Aquí agregamos la serie
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
        otherDeductions: 0,
        paymentMethod: "",
        account: "",
        observation: "",
        salaryNet: 0,
        datePayment: null,
      }),
    },
  },
  data() {
    return {
      form: { ...this.payroll }, // Iniciamos el formulario con los valores del payroll
      availableTeachers: [], // Almacenará los profesores disponibles
    };
  },
  computed: {
    totalDeductions() {
      return (
          (this.form.pensionContribution || 0) +
          (this.form.otherDeductions || 0)
      );
    },
    netSalary() {
      return (
          (this.form.salaryAmount || 0) +
          (this.form.salaryBonus || 0) -
          this.totalDeductions
      );
    },
  },
  watch: {
    form: {
      handler() {
        this.form.salaryNet = this.netSalary;
        this.form.totalDeductions = this.totalDeductions;
      },
      deep: true,
    },
  },
  created() {
    // Cargar los profesores disponibles al crear el componente
    const teacherService = new TeacherService();
    teacherService.getAll() // Cambié a getAll en lugar de getAllTeachers
        .then(teachers => {
          this.availableTeachers = teachers;
        })
        .catch(error => {
          console.error("Error fetching teachers:", error);
        });
  },
  methods: {
    save() {
      if (!this.form.teacherId) {
        alert("Please select a teacher.");
        return;
      }
      console.log("Saving form:", this.form); // Debugging
      this.$emit("save", this.form); // Emitimos el formulario completo al guardarlo
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<template>
  <div class="payroll-create-form">
    <div class="form-header">
      <h2>Payment Register</h2>
      <h2>Nomina</h2>
    </div>
    <form @submit.prevent="save" class="form-grid">
      <div class="left-column">
        <div class="form-field">
          <label>Serie Automatica:</label>
          <pv-input-text v-model="form.serie" value="A" disabled/>
        </div>

        <div class="form-field">
          <label>Employee:</label>
          <pv-select
              v-model="form.teacherId"
              :options="availableTeachers"
              option-label="name"
              option-value="id"
              placeholder="Select a teacher"
          />
        </div>

        <div class="form-field">
          <label>Date Payment:</label>
          <pv-date-picker
              v-model="form.datePayment"
              :show-icon="true"
              date-format="dd/mm/yy"
              placeholder="Select a date"
          />
        </div>

        <div class="form-field">
          <label>Forma pago:</label>
          <pv-input-text v-model="form.paymentMethod" placeholder="Method payment"/>
        </div>

        <div class="form-field">
          <label>Cuenta:</label>
          <pv-input-text v-model="form.account" placeholder="Cuenta"/>
        </div>

        <div class="form-field">
          <label>Observation:</label>
          <pv-input-text v-model="form.observation" placeholder="Observation"/>
        </div>
      </div>

      <div class="right-column">
        <div class="form-field">
          <label>Devengado:</label>
          <pv-input-number v-model.number="form.salaryAmount" :min="0"/>
        </div>

        <div class="form-field">
          <label>Aportacion al trabajador:</label>
          <pv-input-number v-model.number="form.salaryBonus" :min="0"/>
        </div>

        <div class="form-field">
          <label>Anticipos:</label>
          <pv-input-number v-model.number="form.pensionContribution" :min="0"/>
        </div>

        <div class="form-field">
          <label>Otras deducciones:</label>
          <pv-input-number v-model.number="form.otherDeductions" :min="0"/>
        </div>

        <div class="form-field">
          <label>Total Deducir:</label>
          <pv-input-number :value="totalDeductions" disabled/>
        </div>

        <div class="form-field">
          <label>Total Pay:</label>
          <pv-input-number :value="netSalary" disabled/>
        </div>
      </div>

      <div class="form-actions">
        <pv-button type="submit" label="Save" class="p-button-success"/>
        <pv-button
            type="button"
            label="Cancel"
            class="p-button-secondary"
            @click="cancel"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.payroll-create-form {
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
  color: white;
}

.form-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: #00bcd4;
  font-weight: bold;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
