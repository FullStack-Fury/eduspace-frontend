<script>
import { SpaceAreaService } from "../services/spaceArea.service.js";

export default {
  name: 'add',
  data() {
    return {
      space: {
        name: '',
        capacity: null,
        location: '',
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await SpaceAreaService.create(this.space);
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Space created successfully!',
          life: 3000
        });
        this.clearForm();
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error creating the space',
          life: 3000
        });
        console.error("Error creating space:", error);
      }
    },
    clearForm() {
      this.space.name = '';
      this.space.capacity = null;
      this.space.location = '';
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="card mb-6 p-4">
      <div class="flex align-items-center gap-2">
        <h1 class="text-2xl font-semibold text-900">Environments and Equipment</h1>
        <i class="pi pi-chevron-right text-500"></i>
        <h2 class="text-2xl font-semibold text-900">Sports facilities</h2>
        <i class="pi pi-chevron-right text-500"></i>
        <h2 class="text-2xl font-semibold text-900">Add</h2>
      </div>
    </div>

    <div class="card p-6">
      <form @submit.prevent="handleSubmit">
        <div class="field mb-4">
          <label for="name" class="block text-lg font-medium text-700 mb-2">
            Title
          </label>
          <pv-input-text
              id="name"
              v-model="space.name"
              class="w-full p-2"
              required
          />
        </div>

        <div class="field mb-4">
          <label for="capacity" class="block text-lg font-medium text-700 mb-2">
            Capacity
          </label>
          <pv-input-number
              id="capacity"
              v-model="space.capacity"
              class="w-full"
              required
          />
        </div>

        <div class="field mb-4">
          <label for="location" class="block text-lg font-medium text-700 mb-2">
            Location
          </label>
          <pv-input-text
              id="location"
              v-model="space.location"
              class="w-full p-2"
              required
          />
        </div>

        <div class="flex justify-content-end pt-4">
          <pv-button
              type="submit"
              class="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg"
              style="border-radius: 9999px;"
          >
            Save
          </pv-button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ajustes adicionales de estilo si son necesarios */
.p-button {
  background-color: #fbbf24 !important; /* yellow-400 */
  border: none !important;
  color: black !important;
}

.p-button:hover {
  background-color: #f59e0b !important; /* yellow-500 */
}

.p-inputtext:enabled:focus {
  border-color: #fbbf24 !important;
  box-shadow: 0 0 0 1px #fbbf24 !important;
}

.p-inputnumber:enabled:focus {
  border-color: #fbbf24 !important;
  box-shadow: 0 0 0 1px #fbbf24 !important;
}
</style>