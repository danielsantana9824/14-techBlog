const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (req.session.logged_in || req.path === '/signup') {
    return next();
  }
  res.redirect('/login');
};

module.exports = withAuth;
