import {createRouter, createWebHistory} from "vue-router";
import MeetManagementComponent from "../events-scheduling/pages/meet-management.component.vue";
import ReservationManagementComponent from "../reservation-scheduling/pages/reservation-management.component.vue";
import HomeComponent from "../public/pages/home.component.vue";
import LoginComponent from "../public/pages/login.component.vue";
import PayrollManagementComponent from "../payroll-management/pages/payroll-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/events-scheduling/meet', name: 'meet', component: MeetManagementComponent, meta: {title: 'Meeting Management'} },
        { path: '/reservation-scheduling', name: 'reservation', component: ReservationManagementComponent, meta: {title: 'Reservation Management'} },
        { path: '/payroll-management', name: 'payroll', component: PayrollManagementComponent, meta: {title: 'Payroll Management'} },
        { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home' } },
        { path: '/login', name: 'login', component: LoginComponent, meta: { title: 'login' } }
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;