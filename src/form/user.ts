// 登录表单类型
export interface LoginForm {
    username?: string
    password?: string
}

export interface RegistryForm {
    //用户名
    username?: string
    //手机号
    mobile?: string
    //密码
    password?: string
    checkPassword?: string
    email?: string
    file?: object
}
