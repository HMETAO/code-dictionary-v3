import {useMyFetch} from "@/utils/requestFetch";
import {MenusType} from "@/type/menusType";
import {UseFetchReturn} from "@vueuse/core";
import {Result} from "@/result";


export function getMenus():UseFetchReturn<MenusType[]>{
    return useMyFetch<Result<MenusType>>("/api/v1/menus").json();
}