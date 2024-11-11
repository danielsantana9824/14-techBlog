const router = require('express').Router();
const userRoutes = require('./userRoutes');
const post = require('./post');

router.use('/users', user);
router.use('/posts', post);

module.exports = router;
