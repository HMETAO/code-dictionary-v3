import {UseFetchReturn} from "@vueuse/core";
import {useMyFetch} from "../utils/requestFetch";
import {Result} from "../result";
import {CategoryMenusType} from "../type/categoryType";

/**
 * 通过useFetch的方式请求category但是为手动触发
 */
export function getCategory(immediate: boolean = true): UseFetchReturn<CategoryMenusType[]> {
    return useMyFetch<Result<CategoryMenusType>>("/api/v1/category/menus", immediate).json();
}