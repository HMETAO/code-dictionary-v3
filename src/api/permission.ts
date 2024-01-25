import {PageInfo, Result} from "@/result";
import request from "@/utils/request";
import {Permission} from "@/type/permissionType";
import {BaseQueryForm} from "@/form/base";
import {InsertPermissionForm, UpdatePermissionForm} from "@/form/permission";

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

/**
 * 获取单个权限
 * @param permissionId 权限ID
 */

export function getPermission(permissionId: string): Promise<Result<Permission>> {
    return request({
        url: `/api/v1/permission/${permissionId}`,
        method: 'get'
    })
}

/**
 * 更新权限
 * @param data 更新表单
 */
export function updatePermission(data: UpdatePermissionForm): Promise<Result> {
    return request({
        url: `/api/v1/permission`,
        method: 'put',
        data
    })
}

/**
 * 删除权限
 * @param permissionId 权限ID
 */
export function deletePermission(permissionId: string): Promise<Result> {
    return request({
        url: `/api/v1/permission/${permissionId}`,
        method: 'delete',
    })
}


/**
 * 新增权限
 * @param data 权限数据
 */
export function insertPermission(data: InsertPermissionForm): Promise<Result> {
    return request({
        url: `/api/v1/permission`,
        method: 'post',
        data
    })
}


