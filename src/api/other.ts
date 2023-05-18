import {Result} from "../result";
import request from "../utils/request";
import {SSHForm} from "../form/other";

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