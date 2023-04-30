import request from '../utils/request'
import {LoginForm} from "../form/user";
import {Result} from "../result";
import {UserInfo} from "../type/userType";
export function login(data: LoginForm): Promise<Result<UserInfo>> {
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


export function registry(data: LoginForm): Promise<Result> {
    return request({
        url: '/api/v1/user/registry',
        method: 'post',
        data
    })
}
