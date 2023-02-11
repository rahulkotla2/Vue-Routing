import { createRouter, createWebHistory } from 'vue-router';


import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue'
import TeamFooter from "./pages/TeamFooter.vue"
import UserFooter from "./pages/UserFooter.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'teams',
            path: '/teams',
            meta: { needsAuth: true, },
            beforeEnter(to, from, next) {
                console.log("Before enter from teams Route");
                console.log(to, from);
                next();
            },
            components: { default: TeamsList, footer: TeamFooter },
            children: [
                { name: 'teamMembers', path: ':teamId', component: TeamMembers, props: true, }
            ],
        },
        {
            path: '/users', components: {
                default: UsersList,
                footer: UserFooter,
            }
        },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {
            top: 0,
            left: 0
        }
    },
});

export default router