import {PageInfo, Result} from "@/result";
import request from "../utils/request";
import {CommunityType} from "@/type/communityType";


export function getCommunities(): Promise<Result<PageInfo<CommunityType>>> {
    return request({
        url: '/api/v1/community',
        method: 'get',
    })
}
