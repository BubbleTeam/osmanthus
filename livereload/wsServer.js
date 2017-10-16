const { Server } = require('ws');

module.exports = class WSServer {
    constructor({ server }) {
        this.server = server;
    }

    createWebSocket({ server }) {
        const wss = new Server({ port: 9110 });

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
        this.wss = this.createWebSocket({ server: this.server });
        console.log(this.wss, 'wsswss');

        this.wss.on('connection', (ws, req) => {
            console.log('connected, 1111111111111111111111111111111111');

            ws.on('message', (message) => {
                console.log('received: %s', message);
            });
            ws.send('something');
        });
    }
}