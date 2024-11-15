const router = require('express').Router();
const { Post, User,Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'], 
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            }
          ]
        }
      ],
    });

    const projects = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard',withAuth, async (req, res) => {

  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const postArray = postData.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      postArray, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup',withAuth, (req, res) => {
  res.render('signup');
});


module.exports = router;
