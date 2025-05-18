
import {hashPassword} from "../util/hash.js";
import {IUserStorage, MemInvalidArgs, MemNotFound} from "../models/memory.model.js";
import {BaseUser, User} from "../models/user.model.js";

export class Memory implements IUserStorage {
    static #mem: Memory
    private _users: User[] = []

    private constructor() {
    }

    public static get instance(): Memory {
        if (!Memory.#mem) {
            Memory.#mem = new Memory()
        }

        return Memory.#mem
    }

    public addUser(user: BaseUser): User {
        if (!user) throw new MemInvalidArgs()

        const newUser: User = {
            index: this._users.length + 1,
            ...user,
            password: hashPassword(user.password),
        }

        this._users.push(newUser)
        return newUser
    }

    public getAllUsers(): User[] {
        if (!this._users || this._users.length <= 0) throw new MemNotFound()

        return this._users
    }

    public getUserById(userId: string | number): User {
        if (this._users && this._users.length > 0) {
            const result: User | undefined = this._users.find((user: User) => user.index == userId)

            if (!result) {
                throw new MemNotFound()
            }

            return result
        } else {
            throw new MemNotFound()
        }
    }

    public getUserByName(name: string): User {
        if (this._users && this._users.length > 0) {
            const result: User | undefined = this._users.find((user: User) => user.name == name)

            if (!result) {
                throw new MemNotFound()
            }

            return result
        } else {
            throw new MemNotFound()
        }
    }
}

export const userMemoryInstance: IUserStorage = Memory.instance