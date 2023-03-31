export interface MenusType {
    id: number
    menusName: string
    path: string
    pid: number
    children?: Array<MenusType>
}