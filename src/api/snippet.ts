import request from "../utils/request";
import {SnippetType} from "../type/snippetType";
import {Result} from "../result";

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