const WebSocket = require('ws');

const { Server } = WebSocket;

module.exports = class WSServer {
    constructor({ server }) {
        this.server = server;
    }

    createWebSocket({ server }) {
        const wss = new Server({ server });

        wss.broadcast = (data) => {
            data = JSON.stringify(data);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        };
        return wss;
    }

    start() {
        this.wss = this.createWebSocket({ server: this.server });

        this.wss.on('connection', (ws, req) => {
            ws.on('message', (message) => {
                console.log('WebSocket server received: %s', message);
            });
        });
    }

    broadcast(payload) {
        this.wss.broadcast(payload);
    }
};
