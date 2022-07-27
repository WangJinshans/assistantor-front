import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        key: 1,
        component: import('@/layout/Frame'),
        children: [
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
            {
                path: "/userProfile",
                name: "user",
                key: 5,
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
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export { routes }
export default router