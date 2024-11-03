<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import { TeachersService } from "../services/teachers.service.js";
import {AdministratorsService} from "../services/administrators.service.js";

export default {
  name: "meet-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      submitted: false,
      teachers: [],
      selectedTeachers: [],
      administrators: [],
      selectedAdministrators: [],
    };
  },
  created() {
    this.loadTeachers();
    this.loadAdministrators();
    this.formatTeachersForEdit();
    this.formatAdministratorsForEdit();
  },
  methods: {
    loadTeachers() {
      const teacherService = new TeachersService();
      teacherService.getAllTeachers()
          .then(response => {
            this.teachers = response.data.map(teacher => ({
              id: teacher.id,
              name: `${teacher.name} ${teacher.lastname}`
            }));
            console.log("Teachers loaded:", this.teachers);
          })
          .catch(error => {
            console.error("Error loading teachers:", error);
          });
    },
    loadAdministrators() {
      const administratorService = new AdministratorsService();
      administratorService.getAllAdministrators()
          .then(response => {
            this.administrators = response.data.map(administrator => ({
              id: administrator.id,
              name: `${administrator.name} ${administrator.lastname}`
          }));
            console.log("Administrators loaded:", this.administrators);
          })
          .catch(error => {
            console.error("Error loading administrators:", error);
          });
    },
    formatTeachersForEdit() {
      if (Array.isArray(this.item.teachers) && this.item.teachers.length > 0 && typeof this.item.teachers[0] === 'object') {
        this.item.teachers = this.item.teachers.map(teacher => teacher.id);
      }
    },
    formatAdministratorsForEdit() {
      if (Array.isArray(this.item.administrators) && this.item.administrators.length > 0 && typeof this.item.administrators[0] === 'object') {
        this.item.administrators = this.item.administrators.map(administrator => administrator.id);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },
    formatTime(time) {
      if (!time || isNaN(Date.parse(time))) {
        return 'Invalid';
      }

      const d = new Date(time);

      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    onCancelRequested() {
      console.log("Cancel button clicked in child component");
      this.$emit('update:visible', false);
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      if (this.item.day && this.item.hour) {
        this.item.day = this.formatDate(this.item.day);
        this.item.hour = this.formatTime(this.item.hour);

        this.item.teachers = this.teachers
            .filter(teacher => this.item.teachers.includes(teacher.id))
            .map(teacher => ({
              id: teacher.id,
              name: teacher.name.split(" ")[0],
              lastname: teacher.name.split(" ")[1]
            }));

        this.item.administrators = this.administrators
            .filter(administrator => this.item.administrators.includes(administrator.id))
            .map(administrator => ({
              id: administrator.id,
              name: administrator.name.split(" ")[0],
              lastname: administrator.name.split(" ")[1]
            }));



        this.$emit('save-requested', this.item);
      }
    }
  }
};
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Meet"
      @update:visible="(value) => $emit('update:visible', value)"
      @cancelled="onCancelRequested"
      @saved="onSaveRequested"
  >
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label  class="p-float-label">
            <label for="name">Name</label>
            <pv-input-text class="p-inputtext" id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }"/>
          </pv-float-label>

          <pv-float-label class="p-float-label">
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

          <pv-float-label class="p-float-label">
            <label for="hour">Hour</label>
            <pv-date-picker class="p-datapicker"
                v-model="item.hour"
                showIcon
                fluid
                timeOnly
                iconDisplay="input"
                :class="{ 'p-invalid': submitted && !item.hour }"
                placeholder="Select a time"
            >
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback"/>
              </template>
            </pv-date-picker>
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="invite">Invite</label>
            <pv-multi-select class="p-multiselect"
                id="invite"
                v-model="item.teachers"
                :options="teachers"
                option-label="name"
                option-value="id"
                placeholder="Select teachers"
                :class="{ 'p-invalid': submitted && !item.teachers }"
            />
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="responsible">Persons in charge</label>
            <pv-multi-select class="p-multiselect"
                id="responsible"
                v-model="item.administrators"
                :options="administrators"
                option-label="name"
                option-value="id"
                placeholder="Select Administrators"
                :class="{ 'p-invalid': submitted && !item.administrators }"
            />
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="location">Location</label>
            <pv-input-text class="p-inputtext" id="location" v-model="item.location" :class="{ 'p-invalid': submitted && !item.location }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.p-fluid {
  margin: 1.5rem 0;
}

.p-float-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem; /* Espacio entre el título y el campo */
}

.p-float-label label {
  font-size: 1rem;
  margin-bottom: 0.5rem; /* Espacio entre el título y el campo */
  transition: all 0.2s;
  color: #6c757d; /* Color de etiqueta */
}


.p-invalid {
  border-color: red; /* Borde rojo para entradas inválidas */
}
</style>