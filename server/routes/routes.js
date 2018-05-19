const router = require('express').Router();
const controller = require('../controller.js');

// ACCOUNT RELATED ROUTES
router.post('/api/signup', controller.post.signup);
router.post('/api/login', controller.post.login);
router.get('/api/logout', controller.get.logout);
// router.get('/api/user', controller.get.user);

// EVENT RELATED ROUTES
// router.patch('/api/vote', controller.patch.vote);
router.get('/api/userEvents', controller.get.userEvents);
router.get('/api/topicBoard', controller.get.topicBoard);
router.post('/api/createEvent', controller.post.createEvent);
router.get('/api/todos', controller.get.todos);
router.post('/api/todos', controller.post.todos);

router.post('/api/addUserToEvent', controller.post.addUserToEvent);
router.post('/api/addTopicBoard', controller.post.addTopicBoard);

// INVITE RELATED ROUTES
router.get('/api/invitesByEmail', controller.get.invitesByEmail);
router.get('/api/invitesByUserId', controller.get.invitesByUserId);
router.post('/api/sendEmailInvites', controller.post.sendEmailInvites);
router.patch('/api/acceptInvite', controller.patch.acceptInvite);
router.patch('/api/ignoreInvite', controller.patch.ignoreInvite);

module.exports = router;
