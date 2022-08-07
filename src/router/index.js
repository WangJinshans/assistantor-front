import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: import('@/layout/Frame'),
        redirect: '/dashboard',
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                key: 1,
                component: import('@/pages/home/Dashboard')
            },
            {
                path: "/stockMark",
                name: "mark",
                key: 2,
                component: import('@/pages/home/StockMarkDashBoard')
            },
            {
                path: "/addStockMark",
                name: "addMark",
                key: 3,
                component: import('@/pages/home/AddStockMark')
            },
            {
                path: "/eventCalendar",
                name: "eventCalendar",
                key: 4,
                component: import('@/pages/home/EventCalendar')
            },
        ],
    },
    {
        path: "/user",
        name: "user",
        component: import('@/layout/Frame'),
        children: [
            {
                path: "setting",
                name: "setting",
                component: import('@/pages/Setting')
            },
            {
                path: "profile",
                name: "profile",
                component: import('@/pages/user/UserProfile')
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        key: 10,
        component: import('@/pages/login/Login')
    },
    {
        path: "/register",
        name: "register",
        key: 11,
        component: import('@/pages/login/Register')
    },
    {
        path: "/qrcode",
        name: "qrcode",
        key: 12,
        component: import('@/pages/login/QrCode')
    },
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export { routes }
export default router