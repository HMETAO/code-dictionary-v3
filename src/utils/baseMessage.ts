import {ElMessage, ElMessageBox} from "element-plus";

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

export function infoMessageBox(title?: string, content?: string) {
    return ElMessageBox.confirm(
        content ?? "内容",
        title ?? "消息提示",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'info',
        }
    )
}

export function warningMessageBox(title?: string, content?: string) {
    return ElMessageBox.confirm(
        content ?? "内容",
        title ?? "消息提示",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
}