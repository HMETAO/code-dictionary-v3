import {AxiosResponseHeaders} from "axios";

// Result类型
export interface Result<T = any> {
    code: number
    data: T
    success: boolean
    header?: AxiosResponseHeaders
    message: string
}

export interface PageInfo<T> {
    pageNum?: number
    pages?: number
    total?: number
    list?: Array<T>
}