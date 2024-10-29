import { createRouter, createWebHistory } from 'vue-router';
import MeetManagementComponent from '../events-scheduling/pages/meet-management.component.vue';
import ReservationManagementComponent from '../reservation-scheduling/pages/reservation-management.component.vue';
import HomeComponent from '../public/pages/home.component.vue';
import LoginComponent from '../public/pages/login.component.vue';
import PayrollManagementComponent from '../payroll-management/pages/payroll-management.component.vue';
import PayrollCreateAndEdit from '../payroll-management/pages/payroll-create-wrapper.component.vue'; // Asegúrate de importar correctamente
import ClassroomManagementComponent from "../breakdown-management/pages/classroom-management.component.vue";
import ResourceManagementComponent from "../breakdown-management/pages/resource-management.component.vue";
import ReportResourceComponent from "../breakdown-management/pages/report-resource.component.vue";
import ClassroomChangesMeetingsComponent from "../dashboard-admin/pages/classroom-changes-meetings.component.vue";
import EnvironmentsEquipment from "../dashboard-admin/pages/environments-equipment.vue";
import HomeAdminComponent from "../dashboard-admin/pages/home-admin.component.vue";
import PersonalDataComponent from "../dashboard-admin/pages/personal-data.component.vue";
import PersonnelManagementComponent from "../dashboard-admin/pages/personnel-management.component.vue";
import SalaryCalculationComponent from "../dashboard-admin/pages/salary-calculation.component.vue";
import HomeTeacherComponent from "../dashboard-teacher/pages/home-teacher.component.vue";
import NotificationsComponent from "../dashboard-teacher/pages/notifications.component.vue";
import ReservationsComponent from "../dashboard-teacher/pages/reservations.component.vue";
import BreakdownReportsComponent from "../dashboard-teacher/pages/breakdown-reports.component.vue";
import WagesComponent from "../dashboard-teacher/pages/wages.component.vue";
import PayrollSummaryComponent from "../payroll-management/pages/payroll-summary.component.vue";
import SportsFacilities from "../space-and-resource-management/pages/sports-facilities.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/dashboard-admin/classroom-changes-meetings/meeting-management', name: 'meet', component: MeetManagementComponent, meta: {title: 'Meeting Management'} },
        { path: '/reservation-scheduling', name: 'reservation', component: ReservationManagementComponent, meta: {title: 'Reservation Management'} },
        { path: '/salary-calculation', name: 'salary-calculation', component: PayrollManagementComponent, meta: { title: 'Payroll Management' } },
        { path: '/salary-calculation/create', name: 'create-payroll', component: PayrollCreateAndEdit, meta: { title: 'Create Payroll' } }, // Nueva ruta para crear payroll
        { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home' } },
        { path: '/login', name: 'login', component: LoginComponent, meta: { title: 'login' } },
        { path: '/classrooms', name: 'classrooms', component: ClassroomManagementComponent, meta: {title: 'Classroom Management'} },
        { path: '/classroom/:classroomId/resources', name: 'resource-management', component: ResourceManagementComponent, meta: { title: 'Resource Management' }, props: true },
        { path: '/classroom/:classroomId/resources/:resourceId/reports', name: 'report-resource', component: ReportResourceComponent, meta: { title: 'Report Resource' } },

        /**
         * Dashboard-Admin
         */

        { path: '/dashboard-admin/classroom-changes-meetings', name: 'classroom-changes-meetings', component: ClassroomChangesMeetingsComponent, meta: {title: 'Classroom Changes and Meetings'}},
        { path: '/dashboard-admin/environments-equipment', name: 'environments-equipment', component: EnvironmentsEquipment, meta: {title: 'Environments and Equipment'} },
        { path: '/dashboard-admin/home-admin', name: 'home-admin', component: HomeAdminComponent, meta: {title: 'Home Admin'} },
        { path: '/dashboard-admin/personal-data', name: 'personal-data', component: PersonalDataComponent, meta: {title: 'Personal Data'} },
        { path: '/dashboard-admin/personal-management', name: 'personal-management', component: PersonnelManagementComponent, meta: {title: 'Personal Management'} },
        { path: '/dashboard-admin/salary-calculation', name: 'salary-calculation', component: PayrollSummaryComponent, meta: {title: 'Breakdown Reports'}},
        { path: '/dashboard-admin/salary-calculation/management', name: 'payroll-management', component: PayrollManagementComponent, meta: { title: 'Payroll Management' } }, // Ruta a Payroll Management
        { path: '/dashboard-admin/salary-calculation/create', name: 'create-payroll', component: PayrollCreateAndEdit, meta: { title: 'Create Payroll' } },
        {path: '/dashboard-admin/environments-equipment/sport-facilities', name: 'sport-facilities', component: SportsFacilities, meta: {title: 'Sport Facilities'}},
        /**
         *  Dashboard-teacher
         */

        { path: '/dashboard-teacher/home-teacher', name:'home-teacher', component: HomeTeacherComponent, meta: {title: 'Home Teacher'}},
        { path: '/dashboard-teacher/notifications', name: 'notifications', component: NotificationsComponent, meta: {title: 'Notifications'}},
        { path: '/dashboard-teacher/reservations', name: 'reservations', component: ReservationsComponent, meta: {title: 'Reservations'}},
        { path: '/dashboard-teacher/reservations/reservation-scheduling', name: 'reservation', component: ReservationManagementComponent, meta: {title: 'Reservation of spaces'} },
        { path: '/dashboard-teacher/breakdown-reports', name: 'breakdown-reports', component: BreakdownReportsComponent, meta: {title: 'Breakdown Reports'}},
        { path: '/dashboard-teacher/wages', name: 'wages', component: WagesComponent, meta:{title: 'Wages'}},
        { path: '/dashboard-teacher/space-availability', component: ReservationManagementComponent, meta: {title: 'Space Availability'} },

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;