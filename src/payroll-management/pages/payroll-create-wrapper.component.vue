<script>
import http from "../../shared/services/http-common.js";
import PayrollCreateAndEdit from "../components/payroll-create-and-edit.component.vue";

export default {
  name: "PayrollCreateWrapper",
  components: { PayrollCreateAndEdit },
  data() {
    return {
      availableTeachers: [], // Asegúrate de que sea un array vacío al inicializar
      payroll: {
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
        salaryNet: 0,
      },
    };
  },
  async created() {
    await this.loadTeachers(); // Cargar los profesores al montar el componente
  },
  methods: {
    async loadTeachers() {
      try {
        const response = await http.get("/teachers");
        this.availableTeachers = response.data || []; // Asigna un array vacío si la respuesta es indefinida
        console.log("Teachers loaded:", this.availableTeachers); // Para depurar y confirmar que se cargaron los datos
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    },
    calculateNetSalary(payroll) {
      const { salaryAmount, salaryBonus, pensionContribution } = payroll;
      return salaryAmount + salaryBonus - pensionContribution;
    },
    async savePayroll(payroll) {
      payroll.salaryNet = this.calculateNetSalary(payroll);

      try {
        const response = await http.post("/payrolls", payroll);
        console.log("Payroll saved:", response.data);
        this.$router.push("/dashboard-admin/salary-calculation/management");
      } catch (error) {
        console.error("Error saving payroll:", error);
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/salary-calculation/management");
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
