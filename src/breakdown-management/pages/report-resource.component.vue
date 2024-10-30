<template>
  <div class="report-resource">
    <h2>Report Resource</h2>
    <form @submit.prevent="submitForm" class="report-form">
      <div class="form-group">
        <pv-float-label>
          <pv-input-text
              id="kind_of_report"
              v-model="form.kind_of_report"
              required
              placeholder=" "
          />
          <label for="kind_of_report" class="float-label">Kind of Report</label>
        </pv-float-label>
      </div>
      <div class="form-group">
        <pv-float-label>
          <pv-textarea
              id="description"
              v-model="form.description"
              autoResize
              rows="5"
              required
              placeholder=" "
          />
          <label for="description" class="float-label">Description</label>
        </pv-float-label>
      </div>
      <div class="form-group">
        <pv-date-picker
            id="created_at"
            v-model="form.created_at"
            dateFormat="yy-mm-dd"
            showIcon
        />
        <label for="created_at" class="fixed-label">Created At</label>
      </div>
      <pv-button
          type="submit"
          label="Create Report"
          icon="pi pi-check"
          class="p-button-success"
      />
    </form>
  </div>
</template>

<script>
import { ReportService } from "../services/report.service.js";

export default {
  data() {
    return {
      form: {
        kind_of_report: '',
        description: '',
        resourceId: null,
        created_at: new Date().toISOString().slice(0, 10), // Verifica el formato requerido por tu API
        status: 'en proceso',
      },
      reportService: new ReportService(),
    };
  },
  created() {
    this.form.resourceId = this.$route.params.resourceId; // Asegúrate de que resourceId esté presente en la ruta
  },
  methods: {
    async submitForm() {
      const reportData = {
        kind_of_report: this.form.kind_of_report,
        description: this.form.description,
        resourceId: this.form.resourceId,
        created_at: this.form.created_at,
        status: this.form.status,
      };

      console.log("Datos del reporte:", reportData); // Agrega esto para depuración

      try {
        await this.reportService.create(reportData);
        this.$router.push('/classrooms');
      } catch (error) {
        console.error("Error creating report:", error.response.data || error); // Asegúrate de capturar el mensaje de error
        alert("Error creating report. Please check the console for details.");
      }
    },
  },
};
</script>

<style scoped>
/* Tu estilo permanece igual */
</style>
