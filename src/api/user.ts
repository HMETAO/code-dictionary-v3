import request from '../utils/request'
import {BaseUserInfoForm, LoginForm, UserRoleUpdateForm} from "@/form/user";
import {PageInfo, Result} from "@/result";
import {UserInfo, UserRole} from "@/type/userType";
import TUIKit from "../plugin/tuikit";
import {UseFetchReturn} from "@vueuse/core";
import {MenusType} from "@/type/menusType";
import {useMyFetch} from "@/utils/requestFetch";
import {BaseQueryForm} from "@/form/base";

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

/**
 * 用户注册
 * @param data 用户数据
 */
export function registry(data: FormData): Promise<Result> {
    return request({
        url: '/api/v1/user/registry',
        method: 'post',
        data
    })
}

/**
 * 登录IM
 * @param userID userID
 * @param userSig
 */
export function loginIM(userID: string, userSig: string): Promise<any> {
    // login TUIKit
    return TUIKit.login({
        userID: userID,
        userSig: userSig, // The password with which the user logs in to IM. It is the ciphertext generated by encrypting information such as userID.For the detailed generation method, see Generating UserSig
    });
}


/**
 * 登出IM
 */
export function logoutIM(): Promise<any> {
    // login TUIKit
    return TUIKit.logout();
}


/**
 * 获取用户列表
 * @param query 请求参数
 */
export function getUsers(query: BaseQueryForm): Promise<Result<PageInfo<UserRole>>> {
    return request({
        url: `/api/v1/admin/user`,
        method: 'get',
        params: query
    })
}

/**
 * 删除用户
 * @param userId 用户ID
 */
export function deleteUser(userId: string): Promise<Result> {
    return request({
        url: `/api/v1/admin/user/` + userId,
        method: 'delete',
    })
}

/**
 * 查询用户
 * @param userId 用户ID
 */
export function getUser(userId: string): Promise<Result<UserRole>> {
    return request({
        url: `/api/v1/user/` + userId,
        method: 'get',
    })
}

export function updateUser(data: UserRoleUpdateForm | BaseUserInfoForm): Promise<Result<UserRole>> {
    return request({
        url: `/api/v1/user/`,
        method: 'put',
        data
    })
}