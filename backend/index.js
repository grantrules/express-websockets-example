import express from 'express';
import { WebSocketServer } from "ws";

const app = express();
const server = app.listen(4111, () => {
    console.log('Server is running on port 3000');
    }
);


const wss = new WebSocketServer({ server: server });

//receive ws connection for wss://localhost:3000/doink


const connections = [];

// serve static files
wss.on('connection', (ws) => {
    connections.push(ws);

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
        connections.forEach((con) => {
            con.send(message);
        })

    });

    ws.send('Hello! Message From Server!!');
}
);

