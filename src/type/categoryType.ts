export interface CategoryMenusType {
    id: string
    parentId: string
    label: string
    children?: CategoryMenusType[]
    snippet: boolean
    type: number
}