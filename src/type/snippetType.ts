export interface SnippetType {
    id?: number
    title?: string
    snippet?: string
    type?: number
    categoryId?: string
}

export interface SnippetUploadImagesType {
    urls: Array<string>
}
