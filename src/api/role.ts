import {PageInfo, Result} from "@/result";
import request from "@/utils/request";
import {Role, RolePermission} from "@/type/roleType";
import {BaseQueryForm} from "@/form/base";
import {RolePermissionForm, UpdateRoleForm} from "@/form/role";

/**
 * 获取角色列表
 */
export function getRoles(): Promise<Result<Role[]>> {
    return request({
        url: `/api/v1/role`,
        method: 'get',
    })
}

/**
 * 获取角色列表(返回分页对象)
 */
export function getRolesPage(query: BaseQueryForm): Promise<Result<PageInfo<RolePermission[]>>> {
    return request({
        url: `/api/v1/role/page`,
        method: 'get',
        params: query
    })
}


/**
 * 插入角色
 * @param data 角色数据
 */
export function insertRole(data: RolePermissionForm): Promise<Result> {
    return request({
        url: `/api/v1/role`,
        method: 'post',
        data
    })
}

/**
 * 删除角色
 * @param roleId 角色ID
 */
export function deleteRole(roleId: string): Promise<Result> {
    return request({
        url: `/api/v1/role/${roleId}`,
        method: 'delete',
    })
}


/**
 * '查询单个角色
 * @param roleId
 */
export function getRole(roleId: string): Promise<Result<RolePermission>> {
    return request({
        url: `/api/v1/role/${roleId}`,
        method: 'get',
    })
}

/**
 * 更新角色
 * @param data 角色数据
 */
export function updateRole(data: UpdateRoleForm): Promise<Result> {
    return request({
        url: `/api/v1/role/`,
        method: 'put',
        data
    })
}

/**
 * 更新校色状态
 * @param data 状态数据
 */
export function updateStatusRole(data: any): Promise<Result> {
    return request({
        url: `/api/v1/role/status`,
        method: 'put',
        data
    })
}

