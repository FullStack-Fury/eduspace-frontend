import {createRouter, createWebHistory} from "vue-router";
import payrollManagementComponent from "../payroll-management/pages/payroll-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/payroll-management', name: 'payroll', component: payrollManagementComponent , meta: {title: 'Payroll Management'}},
        { path: '/',                        redirect: '/home'}
    ]
})

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;