const noLoginRequired = [
  '/',
  '/main.css',
  '/api/signup',
  '/api/login',
  '/api/user',
  '/api/logout',
  '/bundles.js',
  '/fonts/Billabong.ttf'
];

const loggedOutRedirect = (req, res, next) => {
  // return next(); // uncomment to turn off redirect while developing
  if (req.user || noLoginRequired.includes(req.url)) {
    return next();
  } else {
    res.redirect('/');
  }
};

module.exports = loggedOutRedirect;