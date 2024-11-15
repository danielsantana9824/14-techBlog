const router = require('express').Router();
const userRoutes = require('./userRoutes');
const post = require('./post');
const comments = require('./comment');

router.use('/users', userRoutes);
router.use('/posts', post);
router.use('/comments', comments);

module.exports = router;
