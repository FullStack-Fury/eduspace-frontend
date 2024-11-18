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
    deleteClassroom() {
      if (confirm(`Are you sure you want to delete the classroom "${this.classroom.name}"?`)) {
        this.$emit('delete', this.classroom.id);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="card border-round-xl shadow-2 p-3 h-full">
      <!-- Nombre del Aula -->
      <div class="text-xl font-semibold mb-2">{{ classroom.name }}</div>

      <!-- Descripción del Aula -->
      <div class="mb-2">
        <span class="font-medium text-600">Description: {{ classroom.description }}</span>
      </div>

      <!-- Nombre del Profesor -->
      <div class="teacher-info mb-2">
        <span class="font-medium text-600">Teacher: </span>{{ classroom.teacherName || 'No Teacher Assigned' }}
      </div>

      <!-- Tipo de Aula -->
      <div class="flex align-items-center gap-2 mb-3">
        <i class="pi pi-box text-yellow-500"></i>
        <span>Classroom</span>
      </div>

      <!-- Botón de Eliminar -->
      <pv-button
          label="Delete"
          severity="danger"
          text
          raised
          class="w-full"
          @click="deleteClassroom"
          aria-label="Delete classroom"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.card {
  max-width: 300px;
  width: 100%;
}

.teacher-info {
  color: #555;
  margin-bottom: 10px;
}
</style>
