
function auth(dst) {
  return function auth(req, res, next) {
    if (!req.session.loggedin) {
      req.session.redirectTo = dst
      req.session.param = req.params.id;
      res.redirect(`/reserve/login`);
      return;
    }
    next();
  }
}

// exports
module.exports = auth;
