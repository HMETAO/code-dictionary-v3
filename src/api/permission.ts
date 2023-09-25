import {Result} from "@/result";
import request from "@/utils/request";
import {Permission} from "@/type/permissionType";

/**
 * 查询用户的permission
 */
export function getPermission(): Promise<Result<Permission[]>> {
    return request({
        url: `/api/v1/permission`,
        method: 'get',
    })
}
