export interface CategoryMenusType {
    id: string
    parentId: number
    label: string
    children?: CategoryMenusType[]
    snippet: boolean
}