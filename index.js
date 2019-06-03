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

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('move to', (seconds) => {
    console.log(`move to ${ seconds } seconds`);
    io.emit('move to', seconds);
  });

  socket.on('play', () => {
    console.log('play');
    io.emit('play');
  });

  socket.on('pause', () => {
    console.log('pause');
    io.emit('pause');
  });

  socket.on('video cued', () => {
    console.log('video cued');
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});
