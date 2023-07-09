import {Result} from "@/result";
import request from "../utils/request";
import {SSHForm} from "@/form/other";

export const SSH = import.meta.env.VITE_BASE_SW + "/api/v1/ssh"

/**
 * 设置ssh
 * @param data sshForm
 */
export function setSSH(data: SSHForm): Promise<Result> {
    return request({
        url: `/api/v1/other/ssh`,
        method: 'post',
        data
    })
}

export function githubTrend(data:any): Promise<Result> {
    return request({
        url: '/api/v1/other/github',
        method: 'get',
        params: data
    })
}