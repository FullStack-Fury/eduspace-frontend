<script>
export default {
  name: "login"
}
</script>

<template>
  <div class="w-full">
    <h1>Welcome</h1>
  </div>
  <div class="login-container">
    <pv-card style="width: 25rem; overflow: hidden">
      <template #header>
        <img alt="admin" src="./../../assets/admin.jpeg" class="card-image" />
      </template>
      <template #title>Admin</template>
      <template #content>
        <p class="m-0">
          Start now
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <pv-button label="Login" class="w-full" />
        </div>
      </template>
    </pv-card>

    <pv-card style="width: 25rem; overflow: hidden">
      <template #header>
        <img alt="teacher" src="./../../assets/teacher.jpeg" class="card-image" />
      </template>
      <template #title>Teacher</template>
      <template #content>
        <p class="m-0">
          Start now
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <pv-button label="Login" class="w-full" />
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 2rem;
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
</style>
