import {Permission} from "@/type/permissionType";

export interface Role {
    id: string
    roleName: string
    roleSign: string
}

export interface RolePermission extends Role {
    status: boolean
    createTime: string
    perms: Array<Permission>
}