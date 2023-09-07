import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from "vue-router"
import {useBaseStore, useStateStore} from "@/store";
// 导入进度条
import {start, close} from "@/utils/nporgress";
import {infoMessage} from "@/utils/baseMessage";

let baseStore: any = null
let stateStore: any = null
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: 'login',
        component: () => import('../view/Login.vue')
    },
    {
        path: "/home",
        name: "home",
        redirect: "/snippet",
        component: () => import('../view/Home.vue'),
        children: [
            {
                path: "/snippet",
                name: "snippet",
                component: () => import('../components/snippet/Snippet.vue')
            },
            {
                path: "/tool",
                name: "tool",
                component: () => import('../components/tool/Tool.vue')
            },
            {
                path: "/other",
                name: 'other',
                component: () => import('../components/other/Other.vue')
            },
            {
                path: "/term",
                name: 'term',
                component: () => import('../components/other/Term.vue')
            },
            {
                path: "/calendar",
                name: 'calendar',
                component: () => import('../components/calendar/Calendar.vue')
            },
            {
                path: "/communicate",
                name: 'communicate',
                component: () => import('../components/communicate/TK.vue')
            }, {
                path: "/community",
                name: 'community',
                component: () => import('../components/community/Community.vue')
            },
            {
                path: "/ide",
                name: 'ide',
                component: () => import('../components/ide/IDE.vue')
            },
            {
                path: "/user",
                name: 'user',
                component: () => import('../components/user/User.vue')
            }
        ]
    }

]
const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 前置守卫
router.beforeEach((to, from, next) => {
    start()
    if (baseStore === null) {
        baseStore = useBaseStore()
        stateStore = useStateStore()
    }
    if (to.name !== 'login' && !baseStore.token) {
        infoMessage("请重新登录后在进行访问。。。")
        next({name: 'login'})
    } else {
        next()
    }
})
// 后置守卫
router.afterEach(async (to, from, failure) => {
    close()
    stateStore.menuActive = to.name
})

export default router