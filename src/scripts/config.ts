export enum Resource {
    Posts = 'posts',
    Users = 'users',
    PostsViewed = 'posts-viewed',
}

export interface IFilter {
    enable: boolean,
    field: Resource,
    search: string,
    idArr: number[]
}