export interface SnippetForm {
    id?: number
    title?: string
    snippet?: string
    type?: number
    categoryId?: string
}

export interface SnippetUploadImageForm {
    file: File
}

export interface ReceiveSnippetForm {
    type: number
    snippetId: number
    uid: number
}