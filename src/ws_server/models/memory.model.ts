import {BaseUser, User} from "./user.model.js";

export interface IUserStorage {
    addUser(user: BaseUser): User;

    getAllUsers(): User[];

    getUserById(userId: string): User;

    getUserByName(name: string): User;
}

export class MemNotFound extends Error {
    constructor() {
        super('User or users not found!')
        this.name = 'MemNotFound'
    }
}

export class MemInvalidArgs extends Error {
    constructor() {
        super('Invalid arguments!')
        this.name = 'MemInvalidArgs'
    }
}