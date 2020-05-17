const http = require('http');
const app = require('./app');
const { InjectSocketIO }  = require('./SocketIO/index.js');

const port  = process.env.PORT || 5000;
const server = http.createServer(app);
InjectSocketIO(server);


server.listen(port,()=> console.log(`Connected to ${port}`))