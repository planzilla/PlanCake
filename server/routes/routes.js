const router = require('express').Router();
const controller = require('../controller.js');

// ACCOUNT RELATED ROUTES
router.post('/api/signup', controller.post.signup);
router.post('/api/login', controller.post.login);
router.get('/api/logout', controller.get.logout);
router.get('/api/user', controller.get.user);

// EVENT RELATED ROUTES
// router.patch('/api/vote', controller.patch.vote);
router.get('/api/userEvents', controller.get.userEvents);
router.get('/api/topicBoards', controller.get.topicBoards);
router.post('/api/createEvent', controller.post.createEvent);
router.post('/api/addUserToEvent', controller.post.addUserToEvent);
router.post('/api/addTopicBoard', controller.post.addTopicBoard);

// router.post('/api/signup', controller.post.signup);

// router.post('/api/login', controller.post.login);

// router.get('/api/user', controller.get.user);

// router.get('/api/logout', controller.get.logout);

module.exports = router;
