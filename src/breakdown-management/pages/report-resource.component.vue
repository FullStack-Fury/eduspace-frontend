<template>
  <div class="report-resource">
    <h2>Report Resource</h2>
    <form @submit.prevent="submitForm" class="report-form">
      <div class="form-group">
        <label for="kind_of_report">Kind of Report:</label>
        <input type="text" id="kind_of_report" v-model="form.kind_of_report" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="created_at">Created At:</label>
        <input type="date" id="created_at" v-model="form.created_at" required />
      </div>
      <pv-button type="submit" class="submit-button">Create Report</pv-button>
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
        created_at: new Date().toISOString().slice(0, 10)
      },
      reportService: new ReportService()
    };
  },
  created() {
    this.form.resourceId = this.$route.params.resourceId;
  },
  methods: {
    submitForm() {
      this.reportService.create(this.form).then(() => {
        this.$router.push(`/classroom/${this.form.resourceId}/resources`);
      });
    }
  }
};
</script>

<style scoped>
.report-resource {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.report-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}



.submit-button:hover {
  background-color: #0056b3;
}
</style>
