<script>
export default {
  name: "classroom-card",
  props: {
    classroom: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteClassroom() {
      try {
        await this.$emit('delete', this.classroom.id);
      } catch (error) {
        console.error("Error deleting classroom:", error);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="card border-round-xl shadow-2 p-3 h-full">
      <div class="text-xl font-semibold mb-2">{{ classroom.name }}</div>
      <div class="mb-2">
        <span class="font-medium text-600">Description: {{ classroom.description }}</span>
      </div>
      <div class="text-md text-gray-700">
        Teacher: {{ classroom.teacherName }}
      </div>
      <div class="flex align-items-center gap-2 mb-3">
        <i class="pi pi-box text-yellow-500"></i>
        <span>Classroom</span>
      </div>
      <pv-button label="Delete" severity="danger" text raised class="w-full" @click="deleteClassroom"/>
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
