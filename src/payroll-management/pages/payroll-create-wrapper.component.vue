<script>
import http from "../../shared/services/http-common.js";
import PayrollCreateAndEdit from "../components/payroll-create-and-edit.component.vue";

export default {
  name: "PayrollCreateWrapper",
  components: { PayrollCreateAndEdit },
  data() {
    return {
      availableTeachers: [], // Lista de profesores
      payroll: {
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
        salaryNet: 0, // Calculamos este valor antes de enviar
      },
    };
  },
  async created() {
    await this.loadTeachers(); // Cargar los profesores
  },
  methods: {
    async loadTeachers() {
      try {
        const response = await http.get("/teachers");
        this.availableTeachers = response.data;
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    },
    calculateNetSalary(payroll) {
      const { salaryAmount, salaryBonus, pensionContribution } = payroll;
      return salaryAmount + salaryBonus - pensionContribution;
    },
    async savePayroll(payroll) {
      payroll.salaryNet = this.calculateNetSalary(payroll); // Calcular el salario neto

      try {
        const response = await http.post("/payroll", payroll); // Hacer la llamada POST
        console.log("Payroll saved:", response.data); // Confirmar que se guarda
        this.$router.push("/dashboard-admin/salary-calculation/management"); // Redirigir después de guardar
      } catch (error) {
        console.error("Error saving payroll:", error); // Capturar errores
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/salary-calculation/management"); // Redirigir al cancelar
    },
  },
};
</script>

<template>
  <div>
    <payroll-create-and-edit
        :payroll="payroll"
        :availableTeachers="availableTeachers"
        :isCreateMode="true"
        @save="savePayroll"
        @cancel="cancel"
    />
  </div>
</template>

<style scoped>
/* Estilos opcionales */
</style>
