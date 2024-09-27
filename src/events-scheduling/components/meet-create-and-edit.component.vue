<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import {TeachersService} from "../services/teachers.service.js";

export default {
  name: "meet-create-and-edit-dialog",
  components: {CreateAndEdit},
  props: {
    item: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false,
      teachers: [],
      selectedTeachers: []
    }
  },
  created() {
    this.loadTeachers();
  },
  methods: {
    loadTeachers() {
      const teacherService = new TeachersService();
      teacherService.getAllTeachers().then(response => {
        this.teachers = response.data.map(teacher => ({
          id: teacher.id,
          name: teacher.name,
          lastname: teacher.lastname,
          username: teacher.username
        }));
        console.log("Teachers loaded:", this.teachers);
      }).catch(error => {
        console.error("Error loading teachers:", error);
      });
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },
    formatTime(time) {
      const d = new Date(time);
      return d.toTimeString().split(' ')[0].substring(0, 5);
    },
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      if (this.item.day && this.item.hour) {
        this.item.day = this.formatDate(this.item.day);
        this.item.hour = this.formatTime(this.item.hour);

        const selectedTeachers = this.teachers.filter(teacher =>
            this.item.teachers.includes(teacher.id)
        ).map(teacher => ({
          id: teacher.id,
          name: teacher.name,
          lastname: teacher.lastname,
          username: teacher.username
        }));

        this.item.teachers = selectedTeachers;

        this.$emit('save-requested', this.item);
      }
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Meet"
                   @cancelled="onCancelRequested" @saved="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }" />
          </pv-float-label>
          <pv-float-label>
            <label for="day">Day</label>
            <pv-date-picker
                v-model="item.day"
                showIcon
                fluid
                :showOnFocus="false"
                date-format="yy-mm-dd"
                :class="{ 'p-invalid': submitted && !item.day }"
                placeholder="Select a day"
            />
          </pv-float-label>

          <pv-float-label>
            <label for="hour">Hour</label>
            <pv-date-picker
                v-model="item.hour"
                showIcon
                fluid
                timeOnly
                iconDisplay="input"
                :class="{ 'p-invalid': submitted && !item.hour }"
                placeholder="Select a time"
            >
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback" />
              </template>
            </pv-date-picker>
          </pv-float-label>

          <pv-float-label>
            <label for="invite">Invite</label>
            <pv-multi-select
                id="invite"
                v-model="item.teachers"
            :options="teachers"
            option-label="name"
            option-value="id"
            placeholder="Select teachers"
            :class="{ 'p-invalid': submitted && !item.teachers }"
            />
          </pv-float-label>

          <pv-float-label>
            <label for="location">Location</label>
            <pv-input-text id="location" v-model="item.location" :class="{ 'p-invalid': submitted && !item.location }" />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>
<style scoped>
</style>