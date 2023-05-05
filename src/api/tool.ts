import {Result} from "../result";
import {PageInfo} from "../type/toolType";
import {ToolQueryForm} from "../form/tool";
import request from "../utils/request";

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
