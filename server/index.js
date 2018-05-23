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
app.get('*', function (req, res) {
  res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
});
// app.get('*', express.static(`${__dirname}/../client/dist`));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
});

const ioRoom = io.of('/room');

ioRoom.on('connection', (socket) => {
  let room;
  socket.on('room', (user) => {
    room = (17 << 2).toString().concat(user.boardId + ' ' + user.roomname);
    ioRoom.emit('room', room);
    socket.join(room);
    ioRoom.in(room).emit('enterRoom', user);
  });
  socket.on('chatMessage', (user) => {
    db.addChat(user.userId, user.boardId, user.text);
    ioRoom.in(room).emit('chatMessage', user);
  });
  socket.on('pinMessage', (user) => {
    db.addPin(user.userId, user.boardId, user.text)
    .then(() => {
      return db.findPins(user.boardId)
    })
    .then((pins) => {
      ioRoom.in(room).emit('pinMessage', pins);
    })
    .catch((err) => {
      console.error(err)
    });
  }); 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const ioEvents = io.of('/events');

let activeEventsUsers = {};

ioEvents.on('connection', (socket) => {
  let eventTag;

  socket.on('events', (event, name) => {
    eventTag = (28 << 3).toString().concat(`${event.title} ${event.id}`);
    if (activeEventsUsers[eventTag]) {
      activeEventsUsers[eventTag][name] = null;
    } else {
      activeEventsUsers[eventTag] = { [name]: null };
    }
    socket.join(eventTag);
    ioEvents.in(eventTag).emit('activeUsers', event.id, activeEventsUsers[eventTag]);
  });

  socket.on('logout', (event, name) => {
    eventTag = (28 << 3).toString().concat(`${event.title} ${event.id}`);
    delete activeEventsUsers[eventTag][name];
    ioEvents.in(eventTag).emit('activeUsers', event.id, activeEventsUsers[eventTag]);
  });

  socket.on('disconnect', () => {
    console.log('disconnected from events');
  });
});

server.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
module.exports = app;

