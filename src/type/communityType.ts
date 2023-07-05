// community基本type
export interface CommunityType {
    id?: number
    userInfo?: CommunityUserType
    snippetInfo?: CommunitySnippetType
    createTime?: string
}

interface CommunitySnippetType {
    id?: number
    type?: number
    title?: string
    snippet?: string
}

interface CommunityUserType {
    id?: number
    username?: string
    avatar?: string

}