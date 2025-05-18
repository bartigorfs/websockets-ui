import {GameRequest} from "../models/server.model.js";
import {userMemoryInstance} from "../database/memory.js";
import {User} from "../models/user.model.js";
import {hashPassword} from "../util/hash.js";

export const loginCreateUser = async (message: GameRequest) => {
    let user: User | null = null;

    try {
        user = userMemoryInstance.getUserByName(message.data.name);
    } catch (e) {
        try {
            const newUser: User =  userMemoryInstance.addUser(message.data);
            return {
                name: newUser.name,
                index:newUser.index,
                error: false,
                errorText: "",
            }
        } catch (e) {
            return {
                name: message.data.name,
                index: -1,
                error: true,
                errorText: e || "Unable to register user",
            }
        }
    }

    if (hashPassword(user?.password) === message.data.password) {
        return {
            name: user?.name,
            index: user?.index,
            error: false,
            errorText: "",
        }
    } else {
        return {
            name: user?.name,
            index: user?.index,
            error: true,
            errorText: "Passwords don't match",
        }
    }
}