const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./routes/routes.js');
const reactRoutes = require('./routes/reactRoutes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const reactApp = express.static(path.join(__dirname, '/../client/dist'));
reactRoutes.forEach(route => app.use(route, reactApp));

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening to port ${PORT}!`); });

module.exports = app;
