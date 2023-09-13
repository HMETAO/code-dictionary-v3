import {Role} from "@/type/roleType";

export interface UserInfo {
    username?: string
    token?: string
    email?: string
    id?: string
    avatar?: string
    lastLoginTime?: string
    mobile?: string
    userSig?: string
}

export interface UserRole extends UserInfo {
    roles?: Role[]
}
