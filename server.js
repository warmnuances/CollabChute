const http = require('http');
const app = require('./app');

const port  = process.env.PORT || 5000;

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.emit('news', "From Server");
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

server.listen(port,()=> console.log(`Connected to ${port}`))