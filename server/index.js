const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const path = require('path');
const db = require('../database/models/index.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('./middleware/morgan');
const passport = require('./middleware/passport');
const session = require('./middleware/session.js');
const loggedOutRedirect = require('./middleware/loggedOutRedirect.js');
const router = require('./routes/routes.js');

const PORT = process.env.PORT || 3000;

const io = require('socket.io').listen(server);

const reactApp = express.static(path.join(__dirname, '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan);
app.use(reactApp);
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(loggedOutRedirect);
app.use(router);
app.get('*', express.static(`${__dirname}/../client/dist`));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
});

io.on('connection', (socket) => {
  let room;
  socket.on('room', (user) => {
    room = (17 << 2).toString().concat(user.boardId + ' ' + user.roomname);
    io.emit('room', room);
    socket.join(room);
    io.sockets.in(room).emit('enterRoom', user);
  });
  socket.on('chatMessage', (user) => {
    db.addChat(user.userId, user.boardId, user.text);
    io.sockets.in(room).emit('chatMessage', user);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const ioEvents = io.of('/events');

ioEvents.on('connection', (socket) => {
  let event;
  socket.on('events', (event) => {
    event = (28 << 3).toString().concat(`${event.title} ${event.id}`)
    console.log('in event room', event)
  })

});

server.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
module.exports = app;

