import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import("../views/Index.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("../views/Register.vue")
    },
    {
        path: '/user',
        name: 'user',
        component: () => import("../views/User.vue")
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import("../views/Logout.vue")
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("../views/Dashboard.vue")
    },
    {
        path: '/outlet',
        name: 'outlet',
        component: () => import("../views/Outlet.vue")
    },
    {
        path: '/paket',
        name: 'paket',
        component: () => import("../views/Paket.vue")
    },
    {
        path: '/pengguna',
        name: 'pengguna',
        component: () => import("../views/Pengguna.vue")
    },
    {
        path: '/transaksi',
        name: 'transaksi',
        component: () => import("../views/Transaksi.vue")
    },
    {
        path: '/laporan',
        name: 'laporan',
        component: () => import("../views/Laporan.vue")
    },
    {
        path: '/history',
        name: 'history',
        component: () => import("../views/History.vue")
    },
    {
        path: '/payment',
        name: 'payment',
        component: () => import("../views/Payment.vue")
    },
];


const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;