<script>
export default {
  name: "shared-space-card",
  props: {
    shared_space: {
      type: Object,
      required: true
    }
  },
  methods: {
    async deleteSharedSpace() {
      try {
        await this.$emit('delete', this.shared_space.id);
      } catch (error) {
        console.error("Error deleting shared space:", error);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="card border-round-xl shadow-2 p-3 h-full">
      <div class="text-xl font-semibold mb-2">{{ shared_space.name }}</div>
      <div class="mb-2">
        <span class="font-medium text-600">Capacity: {{ shared_space.capacity }}</span>
      </div>
      <div class="mb-2">
        <span class="font-medium text-600">Description: {{ shared_space.description }}</span>
      </div>
      <div class="mb-3">
        <span class="font-medium text-600">Location: {{ shared_space.location }}</span>
      </div>
      <div class="flex align-items-center gap-2 mb-3">
        <i class="pi pi-box text-yellow-500"></i>
        <span>equipment</span>
      </div>
        <pv-button label="Delete" severity="danger" text raised class="w-full" @click="deleteSharedSpace"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  align-content: space-between;
}

.card {
  width: 300px;
}
</style>