import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3002 });

wss.on('listening', () => {
    console.log("Listening on port 3002");
})

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});