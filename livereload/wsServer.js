const { Server } = require('ws');

module.exports = class WSServer {
    constructor({ port }) {
        this.port = port;
    }

    createWebSocket({ port }) {
        const wss = new Server({ port });

        wss.broadcast = data => {
            data = JSON.stringify(data);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        };
        return wss;
    }

    start() {
        this.wss = this.createWebSocket({ port: this.port });
        console.log(this.wss, 'wsswss');

        this.wss.on('connection', (ws, req) => {
            console.log('connected');

            ws.on('message', (message) => {
                console.log('received: %s', message);
            });
            ws.send('something');
        });
    }
}