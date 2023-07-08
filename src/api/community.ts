import {PageInfo, Result} from "@/result";
import request from "../utils/request";
import {CommunityType} from "@/type/communityType";
import {BaseQueryForm} from "@/form/base";


/**
 * 获取社区列表
 * @param query 请求参数
 */
export function getCommunities(query: BaseQueryForm): Promise<Result<PageInfo<CommunityType>>> {
    return request({
        url: '/api/v1/community',
        method: 'get',
        data: query
    })
}

/**
 * 发布内容
 * @param snippetId 发布snippetId
 */
export function insertCommunity(snippetId: number): Promise<Result> {
    return request({
        url: '/api/v1/community/' + snippetId,
        method: 'post',
    })
}