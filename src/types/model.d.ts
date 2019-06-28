declare namespace Model {
    export interface User {
        id: string,
        username: string,
        displayName: string,
        photoURL: string,
        timeZone: string,
    }
    type ID = string
    export interface CreateStoryInput {
        title: string,
        text: string,
        validateOnly: boolean,
        clientMutationId: string,
    }
    export interface LikeStoryInput {
        id: ID,
        clientMutationId?: string,
    }
}