
const WebSocket = require('ws');

const createChatServer = server => {
    const wsServer = new WebSocket.Server({server});
    const map = new Map();

    wsServer.on('connection', (ws, req)=>{
        console.log(wsServer.clients); // Set 類型
        map.set(ws, {name: ''});
        ws.on('message', (message, isBinary)=>{
            const mObj = map.get(ws);
            let msg; // 要廣播的訊息
            if(! mObj.name){
                //如果沒有名字,第一次進來 把剛剛輸入的轉成名字
                mObj.name = message.toString();
                msg = `${mObj.name} 進到聊天室，共 ${wsServer.clients.size} 人`;
            } else {
                msg = `${mObj.name}: ${message.toString()}`;
            }

            wsServer.clients.forEach(c => {
                if(c.readyState === WebSocket.OPEN){
                    c.send(msg);
                }
            });

        });


    });
};

module.exports = createChatServer;





                
