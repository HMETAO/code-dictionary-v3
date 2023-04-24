import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router"
import {useBaseStore} from "../store";
// 导入进度条
import {start, close} from "../utils/nporgress";
import {infoMessage} from "../utils/baseMessage";

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
        redirect: "/snippet",
        component: () => import('../view/Home.vue'),
        children: [
            {
                path: "/snippet",
                name: "Snippet",
                component: () => import('../components/snippet/Snippet.vue')
            }
        ]
    }
]
const router: Router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    start()

    if (baseStore === null) {
        baseStore = useBaseStore();
    }

    if (to.name !== 'Login' && !baseStore.token) {
        infoMessage("请重新登录后在进行访问。。。")
        next({name: 'Login'})
    } else {
        next()
    }
})
router.afterEach(async (to, from, failure) => {
    close()
})

export default router