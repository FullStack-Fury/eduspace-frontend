<script>
export default {
  name: "environments-equipment",
  methods: {
    goToEnvironments() {
      this.$router.push('/');
    },
    goToSports() {
      this.$router.push('/');
    },
    goToEquipment() {
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="p-grid p-align-center p-justify-center">
    <!-- Card 1: Environments -->
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h2>Environments</h2>
        </template>
        <p>
          Management and registration of the different educational environments available within the infrastructure.
          These environments include classrooms, laboratories, and any other space used for teaching or school activities.
        </p>
        <template #footer>
          <pv-button label="Go" @click="goToEnvironments" />
        </template>
      </pv-card>
    </div>

    <!-- Card 2: Sports facilities -->
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h2>Sports facilities</h2>
        </template>
        <p>
          Management and registration of spaces designated for sports activities within the institution.
          This includes gyms, courts, and other spaces dedicated to sports.
        </p>
        <template #footer>
          <pv-button label="Go" @click="goToSports" />
        </template>
      </pv-card>
    </div>

    <!-- Card 3: Equipment -->
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h2>Equipment</h2>
        </template>
        <p>
          Detailed record of the equipment available in each environment and sports space.
        </p>
        <template #footer>
          <pv-button label="Go" @click="goToEquipment" />
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

.pv-card {
  width: 100%;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  color: #1a1a1a;
}
</style>
