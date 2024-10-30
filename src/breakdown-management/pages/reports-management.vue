<template>
  <div class="report-table">
    <h2>Reports</h2>
    <table>
      <thead>
      <tr>
        <th>Resource Name</th>
        <th>Kind of Report</th>
        <th>Description</th>
        <th>Created At</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="report in reports" :key="report.id">
        <td>{{ report.resourceName || 'Unknown Resource' }}</td>
        <td>{{ report.kind_of_report }}</td>
        <td>{{ report.description }}</td>
        <td>{{ report.created_at }}</td>
        <td>{{ report.status }}</td>
        <td>
          <i
              class="pi pi-refresh status-icon"
              @click="toggleStatus(report)"
              :class="{'in-progress': report.status === 'en proceso', 'completed': report.status === 'completado'}"
          ></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ReportService } from "../services/report.service.js";
import { ResourceService } from "../services/resource.service.js";

export default {
  data() {
    return {
      reports: [],
      reportService: new ReportService(),
      resourceService: new ResourceService(),
    };
  },
  created() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const response = await this.reportService.getAll();
        const reports = response.data || [];
        for (let report of reports) {
          const resource = await this.resourceService.getById(report.resourceId);
          report.resourceName = resource.data.name; // Add resource name to report
        }
        this.reports = reports;
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },
    async toggleStatus(report) {
      const { resourceName, ...reportToUpdate } = report;
      const updatedReport = { ...reportToUpdate, status: report.status === "en proceso" ? "completado" : "en proceso" };

      try {
        await this.reportService.update(report.id, updatedReport);
        report.status = updatedReport.status;
      } catch (error) {
        console.error("Error updating report status:", error);
      }
    },
  },
};
</script>

<style scoped>
.report-table {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.status-icon {
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
}

.in-progress {
  color: #28a745;
}

.completed {
  color: #007bff;
}
</style>
