import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Index from '../views/index/index.vue';
import Login from '../views/auth/login.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: '登录',
        component: Login
    },
    {
        path: "/",
        name: "Index",
        component: Index,
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: '首页',
                component: Home
            },
            {
                path: 'menu',
                name: '菜单管理',
                component: () => import('../views/main/systemManagement/menuManagement.vue'),
            },
            {
                path: 'role',
                name: '角色管理',
                component: () => import('../views/main/systemManagement/roleManagement.vue'),
            },
            {
                path: 'user',
                name: '用户管理',
                component: () => import('../views/main/systemManagement/userManagement.vue'),
            },

            {
                path: '/2020AutumnExhibitorList',
                name: '2020秋季参展商列表',
                component: () => import('../views/main/exhibitorManagement/2020AutumnExhibitorList.vue'),
            },
            {
                path: '/exhibitorList',
                name: '参展商列表',
                component: () => import('../views/main/exhibitorManagement/exhibitorList.vue'),
            },
        ]
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
