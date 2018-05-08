const session = require('express-session');

module.exports = session({
  secret: 'pancakesareawesome',
  resave: true,
  saveUninitialized: true
});