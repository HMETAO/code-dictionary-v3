import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {useBaseStore} from "../store";
// 导入进度条
import {start, close} from "../utils/nporgress";

let baseStore: any = null
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: 'Login',
        component: () => import('../view/Login.vue')
    },
    {
        path: "/home",
        name: "Home",
        component: () => import('../view/Home.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    start()
    if (baseStore === null) {
        baseStore = useBaseStore();
    }

    if (to.name !== 'Login' && !baseStore.token) next({name: 'Login'})
    else {
        next()
    }
})
router.afterEach(async (to, from, failure) => {
    close()
})

export default router