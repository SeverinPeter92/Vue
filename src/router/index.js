import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/components/MainPage.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'Main',
        component: Main
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/components/SettingsBase.vue')
    },
    {
        path: '/transaction',
        name: 'Transaction',
        component: () => import('@/components/TransactionBase.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
