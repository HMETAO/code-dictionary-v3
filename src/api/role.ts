import {PageInfo, Result} from "@/result";
import request from "@/utils/request";
import {Role} from "@/type/roleType";
import {BaseQueryForm} from "@/form/base";
import {RolePermissionForm} from "@/form/role";

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
export function getRolesPage(query: BaseQueryForm): Promise<Result<PageInfo<Role[]>>> {
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
