import {PageInfo, Result} from "@/result";
import request from "../utils/request";
import {CommunityType} from "@/type/communityType";
import {BaseQueryForm} from "@/form/base";


export function getCommunities(query:BaseQueryForm): Promise<Result<PageInfo<CommunityType>>> {
    return request({
        url: '/api/v1/community',
        method: 'get',
        data:query
    })
}
