import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../containers/identity/Login.vue';
import Register from '../containers/identity/Register.vue';
import Identity from '../views/Identity.vue'
import BloodDonateIndex from '../containers/blood-donate/Index.vue';
import BloodDonateDetails from '../containers/blood-donate/Details.vue';
import BloodDonateCreate from '../containers/blood-donate/Create.vue';
import Privacy from '../containers/Privacy.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '/privacy', name: 'privacy', component: Privacy },
            { path: '/blooddonate', name: 'blooddonate-index', component: BloodDonateIndex },
            { path: '/blooddonate/:id', name: 'blooddonate-details', component: BloodDonateDetails, props: true },
            { path: '/blooddonate/create', name: 'blooddonate-create', component: BloodDonateCreate },
        ]
    },
    {
        path: '/Identity',
        name: 'Identity',
        component: Identity,
        children: [
            { path: '/Identity/Login', name: 'identity-login', component: Login },
            { path: '/Identity/Register', name: 'identity-register', component: Register },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
