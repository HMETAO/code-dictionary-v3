import {Result} from "../result";
import {PageInfo} from "../type/toolType";
import {ToolQueryForm} from "../form/tool";
import request from "../utils/request";
import qs from "qs";

/**
 * 获取tool列表
 * @param query 请求参数
 */
export function getTool(query: ToolQueryForm): Promise<Result<PageInfo>> {
    return request({
        url: '/api/v1/tool',
        method: 'get',
        params: query
    })
}

/**
 * 删除tool
 * @param id toolId
 */
export function delTool(id: number): Promise<Result<PageInfo>> {
    return request({
        url: '/api/v1/tool/' + id,
        method: 'delete',
    })
}


/**
 * 下载工具
 * @param ids toolIds
 */
export function downloadTools(ids: Array<number>) {
    return request({
        url: '/api/v1/tool/download',
        method: 'get',
        params: {ids: ids},
        paramsSerializer: {
            serialize: params => qs.stringify(params, {indices: false}),
        },
        responseType: "blob"
    })
}

