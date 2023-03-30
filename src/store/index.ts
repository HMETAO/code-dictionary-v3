import {defineStore} from "pinia";
import {Names} from "./store-name";
import {UserInfo} from "../type/userType";

export const useBaseStore = defineStore(Names.BASE, {

    state() {
        return {
            user: <UserInfo>{},
            token: "",
            loading: false
        }
    },
    getters: {},
    actions: {}
})
export const useStateStore = defineStore(Names.STATE, {

    state() {
        return {
            loading: false
        }
    },
    getters: {},
    actions: {}
})