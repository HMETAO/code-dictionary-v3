import {ElMessage} from "element-plus";

export function successMessage(msg: string) {
    ElMessage({
        message: msg,
        type: 'success',
    })
}

export function warningMessage(msg: string) {
    ElMessage({
        message: msg,
        type: 'warning',
    })
}

export function infoMessage(msg: string) {
    ElMessage({
        message: msg,
        type: 'info',
    })
}

export function errorMessage(msg: string) {
    ElMessage({
        message: msg,
        type: 'error',
    })
}
