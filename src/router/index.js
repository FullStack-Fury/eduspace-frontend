import {createRouter, createWebHistory} from "vue-router";
import MeetManagementComponent from "../events-scheduling/pages/meet-management.component.vue";
import ReservationManagementComponent from "../reservation-scheduling/pages/reservation-management.component.vue";
import PersonnelList from "../teacher-management/components/personnel-list.vue";
import TeacherInformation from "../teacher-management/components/teacher-information.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/events-scheduling/meet', name: 'meet', component: MeetManagementComponent, meta: {title: 'Meeting Management'} },
        { path: '/reservation-scheduling', name: 'reservation', component: ReservationManagementComponent, meta: {title: 'Reservation Management'} },
        { path: '/teacher-data', name: 'teacher', component: PersonnelList, meta: {title: 'Personnel List'} },
        {path: '/add-personnel', name: 'AddPersonnel', component: TeacherInformation, meta: {title: 'Add Personnel'}}

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;