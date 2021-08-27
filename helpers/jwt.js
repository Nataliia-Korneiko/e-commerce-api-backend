const expressJwt = require('express-jwt');
require('dotenv').config();

const { JWT_SECRET_KEY, API_URL } = process.env;
const api = API_URL;

// unless - исключает роуты, на которые можно заходить без токена
function authJwt() {
  return expressJwt({
    secret: JWT_SECRET_KEY,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // for User
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/auth/register`,
      `${api}/auth/login`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  // User
  if (!payload.isAdmin) {
    done(null, true);
  }

  // Admin
  done();
}

module.exports = authJwt;
