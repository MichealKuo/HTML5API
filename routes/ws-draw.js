
const WebSocket = require('ws');

const createDrawServer = server => {
    const wsServer = new WebSocket.Server({server});
    const map = new Map();

    wsServer.on('connection', (ws, req)=>{
        ws.on('message', (message, isBinary)=>{
            let msg = message.toString(); // 要廣播的訊息
            wsServer.clients.forEach(c => {
                if(c.readyState === WebSocket.OPEN){
                    c.send(msg);
                }
            });
        });
    });
};

module.exports = createDrawServer;

