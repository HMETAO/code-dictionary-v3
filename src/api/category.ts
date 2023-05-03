import {UseFetchReturn} from "@vueuse/core";
import {useMyFetch} from "../utils/requestFetch";
import {Result} from "../result";
import {CategoryMenusType} from "../type/categoryType";
import {SnippetForm} from "../form/snippet";
import request from "../utils/request";
import {CategoryInsertForm} from "../form/category";

/**
 * 通过useFetch的方式请求category但是为手动触发
 */
export function getCategory(immediate: boolean = true, snippet?: boolean): UseFetchReturn<CategoryMenusType[]> {
    return useMyFetch<Result<CategoryMenusType>>("/api/v1/category/menus?snippet=" + (snippet ?? true), immediate).get().json();
}

/**
 * 新增category
 * @param data 表单数据
 */
export function insertCategory(data: CategoryInsertForm): Promise<Result<CategoryMenusType>> {
    return request({
        url: `/api/v1/category`,
        method: 'post',
        data
    })
}

/**
 * 删除category
 * @param id categoryId
 */
export function deleteCategory(id: string): Promise<Result> {
    return request({
        url: `/api/v1/category/` + id,
        method: 'delete',
    })
}