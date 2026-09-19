import http from 'node:http'
import {WebSocketServer} from 'ws'
import {redisPublish, redisSubscribe} from './connection.js'
import fs from 'node:fs/promises'
import path from 'path';

const PORT = process.env.PORT ?? 9000;
const REDIS_CHANNEL = 'ws-messages'

const httpServer = http.createServer(async function (req, res) {
    const indexFile = await fs.readFile(path.resolve('./index.html'),'utf-8')
    res.setHeader('Content-Type','text/html');
    return res.end(indexFile);
})
const wsServer = new WebSocketServer({server: httpServer})
redisSubscribe.subscribe(REDIS_CHANNEL);
redisSubscribe.on('message',(channel, message) => {
    if(channel == REDIS_CHANNEL) {
        // Broadcast the message to all of your connected clinets
        wsServer.clients.forEach(client => {
            client.send(message.toString())
        })
    }
})
wsServer.on('connection',(WebSocket) => {
    console.log("WebSocket Connection")

    WebSocket.on('message',async (data) => {
        console.log("WebSocket message recv.",data.toString())
        // RELY the message to the broker(Redis)
        console.log(`Relaying message to Redis Broker...`)
        await redisPublish.publish(REDIS_CHANNEL,data.toString());
    })
})
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})