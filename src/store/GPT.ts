import {defineStore} from "pinia";
import {Names} from "@/store/store-name";

export const useGPTStore = defineStore(Names.GPT, {

    state() {
        return {
            speechMessage: '',
            ai: false,
            speechStart: false,
            outputStream: <any>{}
        }
    },
    getters: {},
    actions: {}
})