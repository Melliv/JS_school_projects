import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue';
import Identity from '../views/Identity.vue'
import BloodTransfusionIndex from '../views/blood-transfusion/Index.vue';
import BloodTransfusionDetails from '../views/blood-transfusion/Details.vue';
import BloodTransfusionCreate from '../views/blood-transfusion/Create.vue';
import BloodDonateIndex from '../views/blood-donate/Index.vue';
import BloodDonateDetails from '../views/blood-donate/Details.vue';
import BloodDonateCreate from '../views/blood-donate/Create.vue';
import BloodTestIndex from '../views/blood-test/Index.vue';
import BloodTestDetails from '../views/blood-test/Details.vue';
import BloodTestCreate from '../views/blood-test/Create.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        props: true,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '/bloodtransfusion', name: 'bloodtransfusion-index', component: BloodTransfusionIndex },
            { path: '/bloodtransfusion/details/:id', name: 'bloodtransfusion-details', component: BloodTransfusionDetails, props: true },
            { path: '/bloodtransfusion/create', name: 'bloodtransfusion-create', component: BloodTransfusionCreate },
            { path: '/blooddonate', name: 'blooddonate-index', component: BloodDonateIndex },
            { path: '/blooddonate/details/:id', name: 'blooddonate-details', component: BloodDonateDetails, props: true },
            { path: '/blooddonate/create', name: 'blooddonate-create', component: BloodDonateCreate },
            { path: '/bloodtest', name: 'bloodtest-index', component: BloodTestIndex },
            { path: '/bloodtest/details/:id', name: 'bloodtest-details', component: BloodTestDetails, props: true },
            { path: '/bloodtest/create', name: 'bloodtest-create', component: BloodTestCreate },
        ]
    },
    {
        path: '/identity',
        name: 'Identity',
        component: Identity,
        children: [{ path: 'login', name: 'identity-login', component: Login }]
    },
    // { path: '/contacttypes/details/:id', name: 'contacttypes-details', component: ContactTypeDetails, props: true },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
