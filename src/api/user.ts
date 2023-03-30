import request from '../utils/request'
import {LoginFormType} from "../form/user";
import {Result} from "../result";
import {UserInfo} from "../type/userType";
export function login(data: LoginFormType): Promise<Result<UserInfo>> {
    return request({
        url: '/api/v1/user/login',
        method: 'post',
        data
    })
}

export function logout(): Promise<Result> {
    return request({
        url: '/api/v1/user/logout',
        method: 'get',
    })
}


export function registry(data: LoginFormType): Promise<Result> {
    return request({
        url: '/api/v1/user/registry',
        method: 'post',
        data
    })
}
