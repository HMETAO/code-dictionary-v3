export interface RoleForm {
    roleName?: string
    roleSign?: string
}

export interface RolePermissionForm extends RoleForm {
    perms?: Array<string>
}