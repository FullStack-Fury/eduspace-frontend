<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "meet-create-and-edit-dialog",
  components: {CreateAndEdit},
  props: {
    item: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
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
            <pv-calendar id="day" v-model="item.day" date-format="yy-mm-dd" show-icon
                         :class="{ 'p-invalid': submitted && !item.day }"
                         placeholder="Select a day"
                         show-button-bar />
          </pv-float-label>
          <pv-float-label>
            <label for="hour">Hour</label>
            <pv-calendar id="hour" v-model="item.hour" time-only hour-format="24"
                         :class="{ 'p-invalid': submitted && !item.hour }"
                         placeholder="Select a time"
                         show-button-bar />
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