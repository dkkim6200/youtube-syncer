const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));
// app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

var numUsers = 0;
var numBufferedUsers = 0;

io.on('connection', (socket) => {
  console.log('a user connected');
  numUsers++;
  
  socket.on('disconnect', () => {
    numUsers--;
    console.log('user disconnected');
  });

  socket.on('ping req', () => {
    console.log('incoming ping');
    socket.emit('pong res');
  }); 

  socket.on('move to', (seconds) => {
    console.log(`move to ${ seconds } seconds`);
    io.emit('move to', seconds);
  });

  socket.on('play', () => {
    console.log('play');
    io.emit('play');
  });

  socket.on('pause', (seconds) => {
    console.log(`pause at ${seconds} seconds`);
    io.emit('pause', seconds);
  });

  socket.on('video cued', () => {
    console.log('video cued');
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});
