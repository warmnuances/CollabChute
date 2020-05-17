const io = require('socket.io')

function SocketIO(server){
  const _io = io(server);

  _io.on('connection', (socket) => {
    const cookie = socket.handshake.headers.cookie;

    console.log("Connected!");
    socket.emit('news', "From Server");
    socket.on('my other event', (data) => {
      console.log(data);
    });
    
  });

}

exports.InjectSocketIO = SocketIO;