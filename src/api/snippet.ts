import request from "../utils/request";
import {SnippetType, SnippetUploadImagesType} from "@/type/snippetType";
import {Result} from "@/result";
import {ReceiveSnippetForm, SnippetForm, SnippetUploadImageForm} from "@/form/snippet";

/**
 * markdown上传图片
 * @param data
 */
export function uploadImg(data: FormData): Promise<Result<SnippetUploadImagesType>> {
    return request({
        url: `/api/v1/snippet/img/upload`,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data
    })
}

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
 * @param data 插入数据
 */
export function insertSnippet(data: SnippetForm): Promise<Result> {
    return request({
        url: `/api/v1/snippet`,
        method: 'post',
        data
    })
}

/**
 * 删除snippet
 * @param id snippetId
 */
export function deleteSnippet(id: string): Promise<Result> {
    return request({
        url: `/api/v1/snippet/` + id,
        method: 'delete'
    })
}

/**
 * 接收用户的Snippet
 * @param data receiveSnippet信息
 */
export function receiveSnippet(data: ReceiveSnippetForm): Promise<Result> {
    return request({
        url: `/api/v1/snippet/receive`,
        method: 'post',
        data
    })
}