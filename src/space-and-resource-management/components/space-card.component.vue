<script>
export default {
  name: "space-card",
  methods: {
    goToAdd() {
      this.$router.push('/dashboard-admin/environments-equipment/sport-facilities/add');
    }
  }
}
</script>

<template>
  <div class="grid" style="width: 90rem;" >
    <!-- Card para Agregar Nueva Instalación -->
    <div class="col-12 md:col-6 lg:col-4 xl:col-3">
      <div class="surface-card border-round-xl shadow-2 p-3 h-full">
        <div class="relative">
          <div class="bg-gray-100 border-round-xl flex align-items-center justify-content-center" style="height: 200px;">
            <i class="pi pi-plus text-4xl text-cyan-500"/>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-xl font-semibold mb-2">Title</div>
          <div class="mb-2">
            <span class="font-medium text-600">Capacity:</span>
          </div>
          <div class="mb-3">
            <span class="font-medium text-600">Location:</span>
          </div>
          <div class="flex align-items-center gap-2 mb-3">
            <i class="pi pi-box text-yellow-500"></i>
            <span>Equipment</span>
          </div>
          <pv-button label="Add" severity="warning" text raised class="w-full" @click="goToAdd"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>