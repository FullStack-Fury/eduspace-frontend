<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import { TeachersService } from "../services/teachers.service.js";
import { mapGetters } from "vuex";
import {ClassroomsService} from "../services/classroom.service.js";

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
      classrooms: [],
      selectedTeachers: [],
      selectedClassroom: null
    };
  },
  computed: {
    // Obtener el nombre del administrador logueado desde Vuex
    ...mapGetters(["userName"])
  },
  created() {
    this.loadTeachers();
    this.loadClassrooms();
    this.formatTeachersForEdit();
  },
  methods: {
    loadTeachers() {
      const teacherService = new TeachersService();
      teacherService.getAllTeachers()
          .then(response => {
            this.teachers = response.data.map(teacher => ({
              id: teacher.id,
              name: `${teacher.firstName} ${teacher.lastName}`
            }));
            console.log("Teachers loaded:", this.teachers);
          })
          .catch(error => {
            console.error("Error loading teachers:", error);
          });
    },
    loadClassrooms() {
      const classroomsService = new ClassroomsService();
      classroomsService.getAllClassrooms()
          .then(response => {
            this.classrooms = response.data.map(classroom => ({
              id: classroom.id,
              name: classroom.name
            }));
            console.log("Classrooms loaded:", this.classrooms);
          })
          .catch(error => {
            console.error("Error loading classrooms:", error);
          });
    },
    formatTeachersForEdit() {
      if (Array.isArray(this.item.teachers) && this.item.teachers.length > 0 && typeof this.item.teachers[0] === 'object') {
        this.item.teachers = this.item.teachers.map(teacher => teacher.id);
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
      if (this.item.day && this.item.start && this.item.end) {
        this.item.day = this.formatDate(this.item.day);
        this.item.start = this.formatTime(this.item.start);
        this.item.end = this.formatTime(this.item.end);

        // Formatear los teachers seleccionados
        this.item.teachers = this.teachers
            .filter(teacher => this.item.teachers.includes(teacher.id))
            .map(teacher => ({
              id: teacher.id,
              firstName: teacher.name.split(" ")[0],
              lastName: teacher.name.split(" ")[1]
            }));

        // Asignar el administrador logueado al campo `administrator`
        this.item.administrator = {
          name: this.userName
        };

        const selectedClassroom = this.classrooms.find(
            classroom => classroom.id === this.selectedClassroom
        );
        if (selectedClassroom) {
          this.item.classroom = selectedClassroom.name;
        }


        // Eliminar `administrators` para evitar que se guarde un arreglo vacío
        delete this.item.administrators;

        // Emitir el evento con el objeto actualizado
        this.$emit("save-requested", this.item);
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
          <!-- Nombre del Administrador Logueado -->
          <pv-float-label class="p-float-label">
            <label for="admin-name">Administrator</label>
            <pv-input-text
                id="admin-name"
                :value="userName"
                class="p-inputtext p-readonly"
                readonly
            />
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="title">Title</label>
            <pv-input-text
                class="p-inputtext"
                id="title"
                v-model="item.title"
                :class="{ 'p-invalid': submitted && !item.title }"
            />
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="description">Description</label>
            <pv-input-text
                class="p-inputtext"
                id="description"
                v-model="item.description"
                :class="{ 'p-invalid': submitted && !item.description }"
            />
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
            <label for="start">Start Time</label>
            <pv-date-picker
                class="p-datapicker"
                v-model="item.start"
                showIcon
                fluid
                timeOnly
                iconDisplay="input"
                :class="{ 'p-invalid': submitted && !item.start }"
                placeholder="Select a start time"
            >
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback" />
              </template>
            </pv-date-picker>
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="end">End Time</label>
            <pv-date-picker
                class="p-datapicker"
                v-model="item.end"
                showIcon
                fluid
                timeOnly
                iconDisplay="input"
                :class="{ 'p-invalid': submitted && !item.end }"
                placeholder="Select a end time"
            >
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback" />
              </template>
            </pv-date-picker>
          </pv-float-label>

          <pv-float-label class="p-float-label">
            <label for="invite">Invite</label>
            <pv-multi-select
                class="p-multiselect"
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
            <label for="classroom">Classroom</label>
            <pv-dropdown
                id="classroom"
                v-model="selectedClassroom"
                :options="classrooms"
                option-label="name"
                option-value="id"
                placeholder="Select a classroom"
                :class="{ 'p-invalid': submitted && !selectedClassroom }"
            />
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