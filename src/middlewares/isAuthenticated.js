const { statusMap, generalErrorMap } = require('../constants/internalMessageMaps');

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  }
  return res.status(401).json({
    status: statusMap.error,
    error: generalErrorMap['auth/unauthorized'],
  });
}

module.exports = isAuthenticated;
