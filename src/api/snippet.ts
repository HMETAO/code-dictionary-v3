import request from "../utils/request";
import {SnippetType} from "../type/snippetType";
import {Result} from "../result";
import {SnippetForm} from "../form/snippet";

/**
 * 请求获取Snippet
 * @param id snippetId
 */
export function getSnippet(id: string): Promise<Result<SnippetType>> {
    return request({
        url: `/api/v1/snippet/${id}`,
        method: 'get',
    })
}

/**
 * 更新Snippet
 * @param data snippet数据
 */
export function updateSnippet(data: SnippetForm): Promise<Result> {
    return request({
        url: `/api/v1/snippet`,
        method: 'put',
        data
    })
}

/**
 * 插入snippet
 * @param data
 */
export function insertSnippet(data: SnippetForm): Promise<Result> {
    return request({
        url: `/api/v1/snippet`,
        method: 'post',
        data
    })
}