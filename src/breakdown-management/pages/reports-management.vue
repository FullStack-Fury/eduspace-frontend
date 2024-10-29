<template>
  <div class="reports-management">
    <h2>Reports Management</h2>
    <pv-data-table :value="reports" :paginator="true" :rows="10">
      <pv-column field="kind_of_report" header="Kind of Report"></pv-column>
      <pv-column field="description" header="Description"></pv-column>
      <pv-column field="resourceId" header="Resource ID"></pv-column>
      <pv-column field="created_at" header="Created At"></pv-column>
      <pv-column header="Actions">
        <template v-slot:body="{ data }">
          <button @click="deleteReport(data.id)">Delete</button>
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script>
import { ReportService } from "../services/report.service.js";

export default {
  name: "ReportsManagement",
  data() {
    return {
      reports: []
    };
  },
  created() {
    this.loadReports();
  },
  methods: {
    async loadReports() {
      const reportService = new ReportService();
      try {
        const response = await reportService.getAll();
        this.reports = response.data; // Asume que los datos están en response.data
      } catch (error) {
        console.error("Error loading reports:", error);
      }
    },
    async deleteReport(id) {
      const reportService = new ReportService();
      try {
        await reportService.delete(id);
        this.reports = this.reports.filter(report => report.id !== id); // Actualiza la lista de informes
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  }
};
</script>

<style scoped>
.reports-management {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>