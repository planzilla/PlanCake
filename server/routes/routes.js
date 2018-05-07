const router = require('express').Router();
// const controller = require('../controller.js');

// router.post('/api/signup', controller.post.signup);

// router.post('/api/login', controller.post.login);

// router.get('/api/logout', controller.get.logout);

router.post('/api/user', controller.post.user);
module.exports = router;
