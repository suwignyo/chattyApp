// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1')
const randomColor = require('random-color')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let clients = {}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on("message", handleMessage, ws);
  clientConnected(ws);
  ws.send(JSON.stringify({
      type:'userColor', 
      color: randomColor().hexString()
    }))
  console.log(randomColor().hexString())
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientDisconnected()
    console.log('Client disconnected')
  });
});

wss.broadcast = data => {
  wss.clients.forEach(client =>{
    if (client && client.readyState === client.OPEN){
      client.send(data)
    }
  })
}

function handleMessage(incoming, client){
  const clientId = uuid();
  msg = JSON.parse(incoming)
  
  console.log('msg',msg)
  switch(msg.type){
    case "userNewMessage":
      const incomingMessage = {
        username: msg.username,
        content: msg.content,
        type: 'incomingMessage',
        id: clientId,
        color: msg.color
      }
      wss.broadcast(JSON.stringify(incomingMessage))
      console.log('incoming message:',incomingMessage)
      break;
  
    case "userNotification":
      const incomingNotification = {
        username: msg.username,
        type: 'incomingNotification',
        id: clientId,
        content: msg.content 
      }
      wss.broadcast(JSON.stringify(incomingNotification))
      console.log('incoming notif:',incomingNotification)
      break;
      
    }
}

function clientConnected(client){
  let onlineUsers = wss.clients.size
  let connectionMessage = {
    type: 'userOnline',
    count: onlineUsers,
  }
  console.log(client.readyState,'readystate')
  console.log(client.OPEN,'clientopen')
  if (client.readyState === client.OPEN){
     wss.broadcast(JSON.stringify(connectionMessage))
  }
}

function clientDisconnected() {
  let onlineUsers = wss.clients.size
  let disconnectionMessage = {
    type: 'userOffline',
    count: onlineUsers
  }
  wss.broadcast(JSON.stringify(disconnectionMessage))
  console.log('disM', disconnectionMessage)

}