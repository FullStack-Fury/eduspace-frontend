<template>
  <div class="payroll-management">
    <h1>Payroll Management</h1>

    <pv-button
        label="Register New"
        icon="pi pi-plus"
        @click="createPayroll"
        class="create-button"
    ></pv-button>

    <pv-data-table :value="payrolls" :responsiveLayout="'scroll'" class="payroll-table" show-gridlines>
      <pv-column field="series" header="Nº" sortable=""></pv-column>
      <pv-column field="formattedDate" header="Pay Date"></pv-column>
      <pv-column field="teacherName" header="Employee"></pv-column>
      <pv-column field="salaryAmount" header="Devengado"></pv-column>
      <pv-column field="salaryNet" header="Liquido"></pv-column>
      <pv-column field="pensionContribution" header="SS Empresa"></pv-column>
      <pv-column field="totalCost" header="Coste Salarial"></pv-column>
      <pv-column field="paymentMethod" header="F. de Pago"></pv-column>
      <pv-column field="isPayed" header="Payed">
        <template #body="{ data }">
          <span :class="['status-indicator', data.isPayed ? 'green' : 'red']"></span>
        </template>
      </pv-column>
      <pv-column header="Actions">
        <template #body="{ data }">
          <div class="action-buttons">
            <pv-button
                label="Edit"
                icon="pi pi-pencil"
                @click="editPayroll(data)"
                class="p-button-sm p-button-warning"
            />
            <pv-button
                label="Delete"
                icon="pi pi-trash"
                @click="deletePayroll(data.id)"
                class="p-button-sm p-button-danger"
            />
          </div>
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script>
import http from "../../shared/services/http-common.js";

export default {
  data() {
    return {
      payrolls: [],
      teachers: [],
    };
  },
  methods: {
    async loadPayrolls() {
      try {
        const response = await http.get("/payroll");
        this.payrolls = response.data.map((payroll) => ({
          ...payroll,
          teacherName: this.getTeacherName(payroll.teacherId),
          totalCost: payroll.salaryAmount + payroll.pensionContribution,
          series: `A/${payroll.teacherId}`,
          formattedDate: this.formatDate(payroll.datePayment),
          salaryNet: this.calculateNetSalary(payroll), // Cálculo del líquido
        }));
      } catch (error) {
        console.error("Error loading payrolls:", error);
      }
    },
    async loadTeachers() {
      try {
        const response = await http.get("/teachers");
        this.teachers = response.data;
      } catch (error) {
        console.error("Error loading teachers:", error);
      }
    },
    getTeacherName(id) {
      const teacher = this.teachers.find((teacher) => teacher.id === id);
      return teacher ? teacher.name : "Unknown Teacher";
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    calculateNetSalary(payroll) {
      const { salaryAmount, salaryBonus, pensionContribution, otherDeductions } = payroll;
      const totalDeductions = pensionContribution + otherDeductions;
      return salaryAmount + salaryBonus - totalDeductions;
    },
    createPayroll() {
      this.$router.push({ name: "create-payroll" });
    },
    editPayroll(data) {
      this.$router.push({ name: "edit-payroll", params: { id: data.id } });
    },
    async deletePayroll(id) {
      try {
        await http.delete(`/payroll/${id}`);
        this.loadPayrolls();
      } catch (error) {
        console.error("Error deleting payroll:", error);
      }
    },
  },
  mounted() {
    this.loadTeachers();
    this.loadPayrolls();
  },
};
</script>

<style scoped>
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}
</style>
