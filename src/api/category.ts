import {UseFetchReturn} from "@vueuse/core";
import {useMyFetch} from "../utils/requestFetch";
import {Result} from "../result";
import {CategoryMenusType} from "../type/categoryType";

export function getCategory():UseFetchReturn<CategoryMenusType[]>{
    return useMyFetch<Result<CategoryMenusType>>("/api/v1/category/menus").json();
}