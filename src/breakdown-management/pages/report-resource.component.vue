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
.report-resource {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  position: relative;
}

h2::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #28a745;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
  border-radius: 4px;
}

.report-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
}

.pv-input-text,
.pv-textarea,
.pv-date-picker {
  width: calc(100% - 20px);
  max-width: 800px;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.pv-input-text:focus,
.pv-textarea:focus,
.pv-date-picker:focus {
  border-color: #28a745;
  box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
}

.float-label {
  position: absolute;
  left: 12px;
  top: 12px;
  font-size: 18px;
  color: #555;
  transition: 0.2s ease all;
  pointer-events: none;
}

.pv-input-text:focus + .float-label,
.pv-input-text:not(:placeholder-shown) + .float-label,
.pv-textarea:focus + .float-label,
.pv-textarea:not(:placeholder-shown) + .float-label {
  top: -10px;
  font-size: 0.9rem;
  color: #28a745;
}

.fixed-label {
  position: absolute;
  top: -20px;
  left: 12px;
  font-size: 1.2rem;
  color: #28a745;
}

.p-button-success {
  width: 100%;
  padding: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: #28a745;
  border: none;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.p-button-success:hover {
  background-color: #218838;
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>

