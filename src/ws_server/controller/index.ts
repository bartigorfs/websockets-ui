import {GameRequest} from "../models/server.model.js";
import {loginCreateUser} from "./user.js";

export const handleIncomingMessage = async (message: GameRequest) => {
    console.log("Incoming message: ", message);

    let parsedData;
    if (message.data) {
        try {
            parsedData = JSON.parse(message.data);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            return {
                type: message.type,
                data: JSON.stringify({ error: true, errorText: "Invalid JSON format" }),
                id: message.id ?? 0,
            };
        }
    }

    const jsonMessage = {
        type: message.type,
        data: parsedData,
        id: 0,
    }

    switch (jsonMessage.type) {
        case "reg": {
            const data = await loginCreateUser(jsonMessage);
            return {
                type: jsonMessage.type,
                data: JSON.stringify(data),
                id: 0,
            }
        }
    }
}