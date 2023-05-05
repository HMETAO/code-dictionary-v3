export interface ToolType {
    id: number
    toolName: string
    toolType: string
    toolSize: string
    url: string
    createTime: Date
}

export interface PageInfo {
    pageNum?: number
    pages?: number
    total?: number
    list?: Array<ToolType>
}