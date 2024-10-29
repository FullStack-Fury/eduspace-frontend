<script>

import SpaceCard from "../components/space-card.component.vue";

export default {
  name: "sports-facilities",
  components: {SpaceCard},
}
</script>

<template>

  <div class="card">
    <div class="flex align-items-center gap-2 mb-4">
      <h1 class="text-900 text-2xl my-0">Environments and Equipment</h1>
      <i class="pi pi-chevron-right text-500"></i>
      <div class="flex align-items-center">
        <h2 class="text-900 text-2xl my-0">Sports facilities</h2>
        <i class="pi pi-heart ml-2 text-yellow-500"></i>
      </div>
    </div>
  </div>

    <space-card/>

</template>

<style scoped>

</style>