<template>
  <div class="payroll-summary">
    <h1>Breakdown Reports</h1>

    <pv-data-table :value="summaryData" :responsiveLayout="'scroll'" class="summary-table" show-gridlines>
      <pv-column field="netPay" header="EMPLOYEES' NET PAY"></pv-column>
      <pv-column field="paymentDate" header="PAYMENT DATE"></pv-column>
      <pv-column field="employeeCount" header="NO. OF EMPLOYEES"></pv-column>
      <pv-column>
        <template #body="{ data }">
          <pv-button
              label="View Details & Pay"
              icon="pi pi-arrow-right"
              @click="viewDetailsAndPay"
              class="p-button-success"
          />
        </template>
      </pv-column>
    </pv-data-table>

    <!-- Deduction Summary -->
    <div class="deduction-summary">
      <div class="deduction-item">
        <h3>Deduction Summary</h3>
        <p>EPF</p>
        <h4>S/. 11,97,553.00</h4>
        <router-link to="/deductions/epf">View Details</router-link>
      </div>
      <div class="deduction-item">
        <p>TDS DEDUCTION</p>
        <h4>S/. 8,16,543.00</h4>
        <router-link to="/deductions/tds">View Details</router-link>
      </div>
    </div>

    <!-- Employee Summary -->
    <div class="employee-summary">
      <h3>Active Employee</h3>
      <h2>{{ employeeCount }}</h2> <!-- Mostramos el número de empleados registrados -->
      <router-link to="/employees">View Details</router-link>
    </div>

    <!-- To Do Tasks -->
    <div class="to-do-tasks">
      <h3>To do Tasks</h3>
      <p>SALARY REVISION(S)</p>
      <h2>55 PENDING APPROVAL</h2>
      <pv-button label="Approve" class="approve-button" />
    </div>

    <!-- Pay Roll Cost Summary -->
    <div class="payroll-cost-summary">
      <h3>Pay Roll Cost Summary</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayrollSummaryComponent",
  data() {
    return {
      summaryData: [
        {
          netPay: 'S/. 1,25,23,651.00',
          paymentDate: '30/09/2024',
          employeeCount: 0, // Se actualizará después de cargar los empleados
        }
      ],
      employeeCount: 0, // Inicializamos con 0 empleados
    };
  },
  methods: {
    viewDetailsAndPay() {
      this.$router.push({ name: "payroll-management" }); // Redirige a Payroll Management
    },
    loadEmployeeData() {
      // Simulación de carga de datos desde la base de datos proporcionada
      const payrollData = [
        { teacherId: 1, salaryAmount: 2000 },
        { teacherId: 2, salaryAmount: 2000 }
      ];
      // Contamos el número de registros de payroll
      this.employeeCount = payrollData.length;

      // Actualizamos el summaryData con el número de empleados
      this.summaryData[0].employeeCount = this.employeeCount;
    },
  },
  mounted() {
    this.loadEmployeeData(); // Cargar los datos de empleados al montar el componente
  }
};
</script>

<style scoped>
.payroll-summary {
  padding: 20px;
}

.summary-table {
  margin-bottom: 20px;
}

.deduction-summary {
  display: flex;
  justify-content: space-between;
}

.deduction-item {
  flex: 1;
  margin-right: 10px;
  text-align: center;
}

.employee-summary,
.to-do-tasks,
.payroll-cost-summary {
  margin-top: 20px;
  text-align: center;
}

.approve-button {
  background-color: #4caf50;
  color: white;
}

.payroll-cost-summary img {
  width: 100%;
}
</style>
