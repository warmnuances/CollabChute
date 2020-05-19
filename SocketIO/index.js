const io = require('socket.io');
const Project = require("../api/models/project.models.js");

const db = [];

function SocketIO(server){
  const _io = io(server);

  _io.on('connection', (socket) => {
    const cookie = socket.handshake.headers.cookie;

    socket.emit("status","Connected");
    

    socket.on("in:room", (roomName) => {
      populateMessage(roomName)
      _io.emit("list:message", db);
    })

    socket.on('forceDisconnect', () => {
      socket.disconnect();
    })

    socket.on("send:message", (data) => {
      console.log("HERE!!", data);
      pushToDB(data)
      emitMessagesBuffer(socket);
    })

  });
}

function populateMessage(roomName){
  Project.findOne({project_name: roomName},(err,project) => {
    const chats = project.chatGroups[0].chats;
    db.push(...chats);
  })
}

function pushToDB(data){

  Project.findOneAndUpdate(
    {project_name: data.roomName}, 
    {$push: {"chatGroups.0.chats": data.message}},
    {new:true},
    (err, project) => {
  })
  db.push(data.message)
}

function emitMessagesBuffer(socket){
  socket.emit("messages", db[db.length - 1])
}

exports.InjectSocketIO = SocketIO;