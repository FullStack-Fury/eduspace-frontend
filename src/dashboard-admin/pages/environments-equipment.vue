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

  <h2>Environments and Equipment</h2>

  <div class="p-grid p-align-center p-justify-center">
    <!-- Card 1: Environments -->
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h3>Environments</h3>
          <p>
            Management and registration of the different educational environments available within the infrastructure.
            These environments include classrooms, laboratories, and any other space used for teaching or school activities.
          </p>
        </template>
        <template #footer>
          <pv-button  class = "pv-button" label="Go" @click="goToEnvironments" />
        </template>
      </pv-card>
    </div>

    <!-- Card 2: Sports facilities -->
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h3>Sports facilities</h3>
          <p>
            Management and registration of spaces designated for sports activities within the institution.
            This includes gyms, courts, and other spaces dedicated to sports.
          </p>
        </template>

        <template #footer>
          <pv-button  class = "pv-button" label="Go" @click="goToSports" />
        </template>
      </pv-card>
    </div>

    <!-- Card 3: Equipment -->
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h3>Equipment</h3>
          <p>
            Detailed record of the equipment available in each environment and sports space.
          </p>
        </template>
        <template #footer>
          <pv-button class = "pv-button" label="Go" @click="goToEquipment" />
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: left;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #000;
}

.pv-card {
  width: 100%;
  background-color: #fff;
  border: 2px solid #e0f7fa;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
  transition: transform 0.2s ease-in-out;
}

.pv-card:hover {
  transform: translateY(-10px);
}

h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.pv-button {
  display: inline-block;
  background-color: #ffcc00;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;
}

.pv-button:hover {
  background-color: #ffdb4d;
}



.p-col-12 {
  flex: 0 0 100%;
}

.p-md-6 {
  flex: 0 0 calc(50% - 1.5rem);
}
</style>
