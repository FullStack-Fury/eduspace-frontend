<script>


import http from "../../shared/services/http-common.js";
import PayrollCreateAndEdit from "../components/payroll-create-and-edit.component.vue";

export default {
  name: "PayrollManagement",
  components: { PayrollCreateAndEdit },
  data() {
    return {
      payrolls: [],
      teachers: [],
      availableTeachers: [],
      selectedPayroll: null,
      showForm: false,
    };
  },
  mounted() {
    this.loadPayrolls();
    this.loadTeachers();
  },
  methods: {
    async loadPayrolls() {
      try {
        const response = await http.get("/payroll");
        this.payrolls = response.data;
        this.filterAvailableTeachers();
      } catch (error) {
        console.error("Error fetching payrolls:", error);
      }
    },
    async loadTeachers() {
      try {
        const response = await http.get("/teachers");
        this.teachers = response.data;
        this.filterAvailableTeachers();
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    },
    filterAvailableTeachers() {
      const assignedTeacherIds = this.payrolls.map((payroll) => payroll.teacherId);
      this.availableTeachers = this.teachers.filter(
          (teacher) => !assignedTeacherIds.includes(teacher.id)
      );
    },
    createPayroll() {
      this.selectedPayroll = {
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
        salaryNet: 0
      };
      this.showForm = true;
    },
    calculateNetSalary(payroll) {
      const { salaryAmount, salaryBonus, pensionContribution } = payroll;
      return salaryAmount + salaryBonus - pensionContribution;
    },
    async savePayroll(payroll) {
      try {
        payroll.salaryNet = this.calculateNetSalary(payroll); // Calcula el Net Salary

        const serviceCall = payroll.id
            ? http.put(`/payroll/${payroll.id}`, payroll)
            : http.post("/payroll", payroll);

        await serviceCall;
        this.loadPayrolls();
        this.showForm = false;
      } catch (error) {
        console.error("Error saving payroll:", error);
      }
    },
    async deletePayroll(id) {
      try {
        await http.delete(`/payroll/${id}`);
        this.loadPayrolls();
      } catch (error) {
        console.error("Error deleting payroll:", error);
      }
    },
    cancelEdit() {
      this.showForm = false;
    }
  }
};
</script>


<template>
  <div class="payroll-management">
    <h1>Payroll Management</h1>

    <pv-button
        label="Create Payroll"
        icon="pi pi-plus"
        @click="createPayroll"
        class="create-button"
    ></pv-button>

    <pv-data-table
        :value="payrolls"
        :responsiveLayout="'scroll'"
        class="payroll-table"
    >
      <pv-column field="teacherId" header="Teacher ID"></pv-column>
      <pv-column field="salaryAmount" header="Amount"></pv-column>
      <pv-column field="salaryBonus" header="Bonus"></pv-column>
      <pv-column field="salaryNet" header="Net Salary"></pv-column>
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

    <payroll-create-and-edit
        v-if="showForm"
        :payroll="selectedPayroll"
        :availableTeachers="availableTeachers"
        @save="savePayroll"
        @cancel="cancelEdit"
        class="payroll-form"
    />
  </div>
</template>

<style scoped>
.payroll-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* Espaciado entre elementos verticalmente */
  padding: 40px; /* Aumentamos el padding para más espacio interior */
  width: 1080px;
}

.create-button {
  margin-bottom: 30px;
}

.payroll-table {
  width: 90%; /* Ancho más amplio */
  max-width: 1200px; /* Limitar el tamaño máximo */
  margin-bottom: 30px; /* Espacio entre la tabla y el formulario */
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.payroll-form {
  width: 90%;
  max-width: 600px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
