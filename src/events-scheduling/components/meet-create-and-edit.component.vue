<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import { TeachersService } from "../services/teachers.service.js";
import {NotificationMService} from "../services/notificationM.service.js";
 // Importar el servicio de notificación

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
      selectedTeachers: []
    };
  },
  created() {
    this.loadTeachers().then(() => {
      this.formatTeachersForEdit();
    });
  },
  methods: {
    async loadTeachers() {
      try {
        const teacherService = new TeachersService();
        const response = await teacherService.getAllTeachers(); // Asegúrate de que esto retorne datos correctamente
        this.teachers = response.data.map(teacher => ({
          id: teacher.id,
          name: `${teacher.firstName} ${teacher.lastName}`,
          username: teacher.username
        }));
        console.log("Teachers loaded:", this.teachers); // Confirma que los teachers se cargan y formatean correctamente
      } catch (error) {
        console.error("Error loading teachers:", error);
      }
    },
    formatTeachersForEdit() {
      // Convertir item.teachers a IDs si es necesario
      if (Array.isArray(this.item.teachers) && this.item.teachers.length > 0 && typeof this.item.teachers[0] === 'object') {
        this.item.teachers = this.item.teachers.map(teacher => teacher.id);
      }
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
      console.log("Cancel button clicked in child component"); // Log para confirmar el clic
      this.$emit('update:visible', false); // Emitir el evento para actualizar la visibilidad en el padre
      this.$emit('cancel-requested'); // Emitir el evento de cancelación
    },
    async onSaveRequested() {
      this.submitted = true;
      if (this.item.day && this.item.hour) {
        this.item.day = this.formatDate(this.item.day);
        this.item.hour = this.formatTime(this.item.hour);

        // Asegúrate de que item.teachers esté en el formato correcto
        this.item.teachers = this.teachers
            .filter(teacher => this.item.teachers.includes(teacher.id)) // Solo los seleccionados
            .map(teacher => ({
              id: teacher.id,
              name: teacher.name, // Utilizar el nombre completo si es necesario
              username: teacher.username
            }));

        // Emitir el evento para guardar
        this.$emit('save-requested', this.item);

        // Enviar las notificaciones después de guardar la reunión
        await this.sendNotifications();
      }
    },

    async sendNotifications() {
      const notificationService = new NotificationMService();


      const adminId = this.$store.getters.userId;


      for (const teacher of this.item.teachers) {
        const notification = {
          title: "Aviso de Meeting",
          description: `Fue invitado a una reunión: ${this.item.name} el ${this.item.day} a las ${this.item.hour}.`,
          type: 3,
          adminId: adminId,
          teacherId: teacher.id,
          teacherName: teacher.name,
        };

        try {
          await notificationService.createNotification(notification);  // Enviar la notificación
          console.log(`Notificación enviada a: ${teacher.name}`);
        } catch (error) {
          console.error("Error al enviar notificación:", error);
        }
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
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }"/>
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
                <i class="pi pi-clock" @click="slotProps.clickCallback"/>
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
            <pv-input-text id="location" v-model="item.location" :class="{ 'p-invalid': submitted && !item.location }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
/* Estilos específicos */
</style>
