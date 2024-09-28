<script>
import WeeklyCalendar from "../components/weekly-calendar.component.vue";
import ReservationToolbar from "../components/reservation-toolbar.component.vue";
import {SpaceReservationService} from "../services/space-reservation.service.js";
import {SharedAreaService} from "../../shared/services/shared-area.service.js";
import {SharedArea} from "../../shared/model/shared-area.entity.js";

export default {
  name: "reservation-management",
  components: {ReservationToolbar, WeeklyCalendar},
  data() {
    return {
      areas: [],
      areaId: null,
      reservationService: null,
      sharedAreaService: null,
      loading: true
    }
  },
  methods: {

    //#region EventHandlers

    onSharedSpaceSelected(item) {
      this.areaId = item.id;
      console.log(this.areaId)
    },


    //#endregion

    //#region Action Methods

    getSharedAreas() {
      this.sharedAreaService.getAll().then(response => {
        this.areas = response.data.map(area => new SharedArea(area))
        console.log(this.areas);
        this.loading = false;
      }).catch(error => {
        console.error(error)
        this.loading = false;
      });
    }

    //#endregion
  },
  created() {
    this.reservationService = new SpaceReservationService();
    this.sharedAreaService = new SharedAreaService();

    this.getSharedAreas();
  }
}
</script>

<template>
  <div v-if="loading">
    Loading shared areas...
  </div>
  <div v-else>
  <reservation-toolbar
      :sharedAreas="areas"
      v-on:shared-space-selected="onSharedSpaceSelected($event)"/>
<weekly-calendar/>
  </div>
</template>

<style scoped>

</style>