import {defineStore} from "pinia";
import {Names} from "./store-name";
import {UserInfo} from "@/type/userType";
import {SnippetForm} from "@/form/snippet";
import {BASE_SNIPPET} from "@/constants/baseConstants";

export const useBaseStore = defineStore(Names.BASE, {

    state() {
        return {
            // 用户信息
            user: <UserInfo>{},
            // token
            token: "",
            // 展示面板
            isMarkDown: false
        }
    },
    getters: {},
    actions: {}
})

// 此store是非缓存对象用来存储不需要缓存的状态变量
export const useStateStore = defineStore(Names.STATE, {

    state() {
        return {
            loading: false,
            snippetForm: <SnippetForm>JSON.parse(BASE_SNIPPET),
            snippetDialogVisible: false,
            menuActive: "snippet"
        }
    },
    getters: {},
    actions: {}
})