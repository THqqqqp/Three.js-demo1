import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
    {
        path: '/',
        alias: '/index',// 别名
        component: () => import('@/views/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
