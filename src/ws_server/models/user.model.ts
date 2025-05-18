export interface BaseUser {
    name: string
    password: string
    winCount?: number
}

export interface User extends BaseUser {
    index: number
}

export interface Users {
    users: User[]
}

export interface UserByIdResponse {
    user: User
}