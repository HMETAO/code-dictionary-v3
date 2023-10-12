import {PageInfo, Result} from "@/result";
import request from "@/utils/request";
import {Permission} from "@/type/permissionType";
import {BaseQueryForm} from "@/form/base";
import {UpdatePermissionForm} from "@/form/permission";

/**
 * 查询用户的permission
 */
export function getPermissions(query: BaseQueryForm = {
    pageNum: 1,
    pageSize: 65535
}): Promise<Result<PageInfo<Permission>>> {
    return request({
        url: `/api/v1/permission`,
        method: 'get',
        params: query
    })
}


export function getPermission(permissionId: string): Promise<Result<Permission>> {
    return request({
        url: `/api/v1/permission/${permissionId}`,
        method: 'get'
    })
}

export function updatePermission(data: UpdatePermissionForm): Promise<Result> {
    return request({
        url: `/api/v1/permission`,
        method: 'put',
        data
    })
}



