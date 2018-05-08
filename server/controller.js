const db = require('../database/models/index.js');

const post = {};
const get = {};
const patch = {};

// get and post functions go here

post.user = (req, res) => {
  // console.log('Recieved post for user', req.body);
  res.status(200);
  res.end();
};

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;