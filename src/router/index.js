import { createRouter, createWebHistory } from 'vue-router';
import MeetManagementComponent from '../events-scheduling/pages/meet-management.component.vue';
import ReservationManagementComponent from '../reservation-scheduling/pages/reservation-management.component.vue';
import HomeComponent from '../public/pages/home.component.vue';
import LoginComponent from '../public/pages/login.component.vue';
import PayrollManagementComponent from '../payroll-management/pages/payroll-management.component.vue';
import PayrollCreateAndEdit from '../payroll-management/pages/payroll-create-wrapper.component.vue';
import ClassroomManagementComponent from "../breakdown-management/pages/classroom-management.component.vue";
import ResourceManagementComponent from "../breakdown-management/pages/resource-management.component.vue";
import ReportResourceComponent from "../breakdown-management/pages/report-resource.component.vue";
import PayrollSummaryComponent from '../payroll-management/pages/payroll-summary.component.vue'; // Nueva importación

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/events-scheduling/meet', name: 'meet', component: MeetManagementComponent, meta: {title: 'Meeting Management'} },
        { path: '/reservation-scheduling', name: 'reservation', component: ReservationManagementComponent, meta: {title: 'Reservation Management'} },
        { path: '/salary-calculation', name: 'salary-calculation', component: PayrollSummaryComponent, meta: { title: 'Salary Summary' } }, // Ruta al Summary
        { path: '/salary-calculation/management', name: 'payroll-management', component: PayrollManagementComponent, meta: { title: 'Payroll Management' } }, // Ruta a Payroll Management
        { path: '/salary-calculation/create', name: 'create-payroll', component: PayrollCreateAndEdit, meta: { title: 'Create Payroll' } },
        { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home' } },
        { path: '/login', name: 'login', component: LoginComponent, meta: { title: 'Login' } },
        { path: '/classrooms', name: 'classrooms', component: ClassroomManagementComponent, meta: {title: 'Classroom Management'} },
        { path: '/classroom/:classroomId/resources', name: 'resource-management', component: ResourceManagementComponent, meta: { title: 'Resource Management' }, props: true },
        { path: '/classroom/:classroomId/resources/:resourceId/reports', name: 'report-resource', component: ReportResourceComponent, meta: { title: 'Report Resource' } },
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})

export default router;
