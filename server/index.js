const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('./middleware/morgan');
const passport = require('./middleware/passport');
const session = require('./middleware/session.js');
const loggedOutRedirect = require('./middleware/loggedOutRedirect.js');
const router = require('./routes/routes.js');
// const reactRoutes = require('./routes/reactRoutes.js');

const app = express();
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
app.get('*',  express.static(`${__dirname}/../client/dist`))

// reactRoutes.forEach(route => app.use(route, reactApp));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening to port ${PORT}!`); });


module.exports = app;
