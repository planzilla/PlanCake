const router = require('express').Router();
const controller = require('../controller.js');

// ACCOUNT RELATED ROUTES
// router.post('/api/signup', controller.post.signup);
// router.post('/api/login', controller.post.login);
// router.get('/api/logout', controller.get.logout);
// router.post('/api/user', controller.post.user);

// EVENT RELATED ROUTES
// router.patch('/api/vote', controller.patch.vote);
// router.get('/api/events', controller.get.events);
// router.get('/api/board', controller.get.board);
// router.post('/api/events', controller.post.events);

router.post('/api/signup', controller.post.signup);

router.post('/api/login', controller.post.login);

router.get('/api/user', controller.get.user);

router.get('/api/logout', controller.get.logout);

module.exports = router;
