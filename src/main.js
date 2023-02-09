import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
import router from "./router.js"
router.beforeEach((to, from, next) => {
    console.log("Before Each")
    console.log(to, from);
    if (to.needsAuth) {
        console.log("Needs Authentication")
        next();
    }
    next(true);
    //we can also write like this instead of writing as above
    //next('/users') or next({name : 'teamMembers',params : {teamId : 't2'}})
});
router.afterEach((to, from) => {
    console.log("Global AfterEach");
    console.log(to, from);
});
app.use(router);
app.mount('#app');
