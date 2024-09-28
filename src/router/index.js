import {createRouter, createWebHistory} from "vue-router";
import payrollManagementComponent from "../payroll-management/pages/payroll-management.component.vue";
import { createRouter, createWebHistory } from 'vue-router';
import PersonnelList from '../teacher-management/components/personnel-list.vue';
import TeacherInformation from '../teacher-management/components/teacher-information.vue';
import MeetManagementComponent from '../events-scheduling/pages/meet-management.component.vue';

const routes = [
    { path: '/', redirect: '/personnel-list' }, // Ruta por defecto
    { path: '/personnel-list', name: 'PersonnelList', component: PersonnelList },
    { path: '/add-personnel', name: 'AddPersonnel', component: TeacherInformation },
    { path: '/events-scheduling/meet', name: 'meet', component: MeetManagementComponent, meta: { title: 'Meeting Management' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/payroll-management', name: 'payroll', component: payrollManagementComponent , meta: {title: 'Payroll Management'}},
        { path: '/',                        redirect: '/home'}
    ]
})
    routes
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;