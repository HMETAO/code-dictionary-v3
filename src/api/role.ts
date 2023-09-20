import {Result} from "@/result";
import request from "@/utils/request";
import {Role} from "@/type/roleType";

/**
 * 获取角色列表
 */
export function getRoles(): Promise<Result<Role[]>> {
    return request({
        url: `/api/v1/role`,
        method: 'get',
    })
}