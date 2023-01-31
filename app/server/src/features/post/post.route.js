const express = require('express');
const verifyToken = require('../../middleware/verifyJWT');

const router = express.Router();
const postController = require('./post.controller');

router.get('/', verifyToken, postController.getAll);
router.post('/', verifyToken, postController.addPost);
router.put('/', verifyToken, postController.edit);
router.delete('/', verifyToken, postController.deletePost);
router.post('/reaction', verifyToken, postController.addReaction);
router.get('/reaction', verifyToken, postController.getReactions);
router.delete('/reaction', verifyToken, postController.deleteReaction);
router.put('/reaction', verifyToken, postController.editReaction);

module.exports = router;
