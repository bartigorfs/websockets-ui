import {RawData, WebSocketServer} from 'ws';
import { handleIncomingMessage } from "./controller/index.js";

const wss = new WebSocketServer({ port: 3000 });

wss.on('listening', () => {
    console.log("Listening on port 3000");
})

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', async function message(data: RawData) {
        try {
            const message = JSON.parse(data.toString());
            const resp = await handleIncomingMessage(message);

            ws.send(JSON.stringify(resp));
        } catch (e) {
            console.error(e);
        }
    });
});