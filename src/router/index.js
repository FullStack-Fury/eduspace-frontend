import {createRouter, createWebHistory} from "vue-router";
import MeetManagementComponent from "../events-scheduling/pages/meet-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/events-scheduling/meet', name: 'meet', component: MeetManagementComponent, meta: {title: 'Meeting Management'}}
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'EduSpace';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;