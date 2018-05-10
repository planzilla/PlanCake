const db = require('../models/index.js');

const addUser = (userQuery) => {
  db.User.findOne(userQuery)
  .then("yay")
}

exports.addUser = addUser;