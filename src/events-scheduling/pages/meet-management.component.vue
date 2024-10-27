<script>
import {Meet} from "../model/meet.entity.js";
import DataManager from "../../shared/components/data-meet.component.vue";
import MeetCreateAndEditDialog from "../components/meet-create-and-edit.component.vue";
import {MeetService} from "../services/meet.service.js";
export default {
  name: "meet-management",
  components: {MeetCreateAndEditDialog, DataManager},
  data() {
    return {
      title: { singular: 'Meet', plural: 'Meetings' },
      meetings: [],
      meet: new Meet({}),
      selectedMeetings: [],
      meetService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },
  methods: {

    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    findIndexById(id) {
      return this.meetings.findIndex(meet => meet.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.meet = new Meet({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.meet = new Meet(item);
      this.isEdit = true;
      this.submitted = false;

      // Asegurarse de que item.teachers sea un array de IDs
      if (Array.isArray(this.meet.teachers) && this.meet.teachers.length > 0) {
        this.meet.teachers = this.meet.teachers.map(teacher => teacher.id ? teacher.id : teacher);
      } else {
        this.meet.teachers = [];
      }

      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.meet = new Meet(item);
      this.deleteMeet();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedMeetings = selectedItems;
      this.deleteSelectedMeetings();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.meet.name.trim()) {
        if (item.id) {
          this.updateMeet();
        } else {
          this.createMeet();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    //#endregion

    //#region Action Methods
    createMeet() {
      this.meetService.create(this.meet).then(response => {
        let meet = new Meet(response.data);
        this.meetings.push(meet);
        this.notifySuccessfulAction('Meet Created');
      }).catch(error => console.error(error));
    },
    updateMeet() {
      this.meetService.update(this.meet.id, this.meet).then(response => {
        let index = this.findIndexById(this.meet.id);
        this.meetings[index] = new Meet(response.data);
        this.notifySuccessfulAction('Meet Updated');
      }).catch(error => console.error(error));
    },
    deleteMeet() {
      this.meetService.delete(this.meet.id).then(() => {
        let index = this.findIndexById(this.meet.id);
        this.meetings.splice(index, 1);
        this.notifySuccessfulAction('Meet Deleted');
      }).catch(error => console.error(error));
    },
    deleteSelectedMeetings() {
      this.selectedMeetings.forEach((meet) => {
        this.meetService.delete(meet.id).then(() => {
          this.meetings = this.meetings.filter((t) => t.id !== meet.id);
        });
      });
      this.notifySuccessfulAction('Meetings Deleted');
    },
    getTeacherNames(teacherIds) {
      return teacherIds.map(id => {
        const teacher = this.teachers.find(t => t.id === id);
        return teacher ? `${teacher.name} ${teacher.lastname}` : '';
      }).join(', ');
    },
    //#endregion
  },
  //#region Lifecycle Hooks
  created() {
    this.meetService = new MeetService();
    this.meetService.getAll().then(response => {
      this.meetings = response.data.map(meet => new Meet(meet));
      console.log(this.meetings);
    }).catch(error => console.error(error));
  }

  //#endregion
}
</script>

<template>
  <div class="w-full">
    <data-manager :title="title"
                  v-bind:items="meetings"
                  v-on:new-item-requested="onNewItem"
                  v-on:edit-item-requested="onEditItem($event)"
                  v-on:delete-item-requested="onDeleteItem($event)"
                  v-on:delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="day" header="Day" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="hour" header="Hour" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="location" header="Location" style="min-width: 24rem"/>
        <pv-column header="Invite" style="min-width: 24rem">
          <template #body="slotProps">
    <span v-if="slotProps.data.teachers && slotProps.data.teachers.length">
      {{ slotProps.data.teachers.map(teacher => teacher.name + ' ' + teacher.lastname).join(', ') }}
    </span>
            <span v-else>
      No teachers invited
    </span>
          </template>
        </pv-column>
      </template>
    </data-manager>
    <meet-create-and-edit-dialog
        :edit="isEdit"
        :item="meet"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"
        @update:visible="value => createAndEditDialogIsVisible = value"/>
  </div>
</template>

<style scoped>

</style>