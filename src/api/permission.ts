import {PageInfo, Result} from "@/result";
import request from "@/utils/request";
import {Permission} from "@/type/permissionType";
import {BaseQueryForm} from "@/form/base";

/**
 * 查询用户的permission
 */
export function getPermission(query: BaseQueryForm = {
    pageNum: 1,
    pageSize: 65535
}): Promise<Result<PageInfo<Permission>>> {
    return request({
        url: `/api/v1/permission`,
        method: 'get',
        params: query
    })
}
