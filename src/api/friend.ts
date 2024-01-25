import request from '../utils/request'
import {Result} from "@/result";
import {FriendInformationType, FriendType} from "@/type/friendType";
import {UseFetchReturn} from "@vueuse/core";
import {useMyFetch} from "@/utils/requestFetch";

/**
 * 获取好友列表
 */
export function getFriends(): UseFetchReturn<FriendType[]> {
    return useMyFetch<Result<FriendType[]>>("/api/v1/friend").json();
}

/**
 * 查询聊天记录
 * @param id 查询对象
 */
export function getFriendInformation(id: number): Promise<Result<Array<FriendInformationType>>> {
    return request({
        url: `/api/v1/information/` + id,
        method: 'get'
    })
}