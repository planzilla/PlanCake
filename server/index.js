const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const path = require('path');
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

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('chatMessage', (message) => {
    console.log('Server message is:', message);
    io.emit('chatMessage', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.emit('chatMessage', 'connected'); //  emits `connected` to chatMessage
});


server.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
module.exports = app;
