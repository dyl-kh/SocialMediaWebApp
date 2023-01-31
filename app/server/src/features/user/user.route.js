const express = require('express');
const verifyToken = require('../../middleware/verifyJWT');

const router = express.Router();
const userController = require('./user.controller');

router.get('/', verifyToken, userController.getUser); // use verify token middleware first
router.delete('/', verifyToken, userController.deleteUser); // use verify token middleware first
router.put('/', verifyToken, userController.updateUser); // use verify token middleware first
router.post('/follow', verifyToken, userController.followUser); // use verify token middleware first
router.get('/followers', verifyToken, userController.getFollowers); // use verify token middleware first
router.get('/following', verifyToken, userController.getFollowing); // use verify token middleware first
router.get('/postCount', verifyToken, userController.getPostCount); // use verify token middleware first')
router.post('/visit-user', verifyToken, userController.visitUser); // use verify token middleware first')
router.post('/page-view', userController.pageView);

module.exports = router;
