<script>
export default {
  name: "classroom-changes-meetings",
  methods: {
    goToClassroomChanges() {
      this.$router.push('/');
    },
    goToMeetingManagement() {
      this.$router.push('/');
    }
  }
}
</script>

<template>

  <h2>Classroom Changes and Meetings</h2>

  <div class="p-grid p-align-center p-justify-center">
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h3>Classroom Changes</h3>
          <p>
            Provide essential details such as the date and time the change was made, the original classroom and the new classroom assigned, the reason behind the change, and the person who made the change.
          </p>
        </template>
        <template #footer>
          <pv-button  class = "pv-button" label="Go" @click="goToClassroomChanges" />
        </template>
      </pv-card>
    </div>
    <div class="p-col-12 p-md-6">
      <pv-card class="pv-card">
        <template #header>
          <h3>Meeting Management</h3>
          <p>
            The meeting list presents a timeline of upcoming scheduled meetings, along with relevant details about each. Each entry in the list includes the date and time of the meeting, the reserved room, the participants involved, the purpose of the meeting, and any important additional notes, such as materials that need to be brought or special instructions.
          </p>
        </template>

        <template #footer>
          <pv-button  class = "pv-button" label="Go" @click="goToMeetingManagement" />
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