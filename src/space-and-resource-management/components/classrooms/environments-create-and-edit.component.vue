<script>
export default {
  name: "environment-create-and-edit",
  props: {
    environment: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        description: ''
      }),
    },
    isCreateMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: { ...this.environment }
    };
  },
  methods: {
    save() {
      if (!this.form.name || !this.form.description) {
        alert("Please fill in all fields.");
        return;
      }
      this.$emit("save", this.form);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<template>
  <div class="breadcrumb" style="display: flex; align-items: center">
    <h4 style="margin-right: 20px">Environments and Equipment</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">Environments</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">{{ isCreateMode ? 'Add Environment' : 'Edit Environment' }}</h4>
  </div>

  <div class="environment-create-form">
    <div class="form-header">
      <h2>{{ isCreateMode ? 'Create Environment' : 'Edit Environment' }}</h2>
    </div>
    <form @submit.prevent="save" class="form-grid">
      <div class="form-field">
        <pv-float-label>Name:</pv-float-label>
        <pv-input-text v-model="form.name" placeholder="Enter name"/>
      </div>

      <div class="form-field">
        <pv-float-label>Description:</pv-float-label>
        <pv-input-text v-model="form.description" placeholder="Enter description"/>
      </div>

      <div class="form-actions">
        <pv-button type="submit" label="Save" class="p-button-success"/>
        <pv-button
          type="button"
          label="Cancel"
          class="p-button-secondary"
          @click="cancel"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.environment-create-form {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
  color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.form-header {
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>