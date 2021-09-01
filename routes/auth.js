const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../controllers');
const { createAccountLimiter } = require('../helpers/rate-limit');

router.post('/register', createAccountLimiter, ctrl.register);
router.post('/login', ctrl.login);

module.exports = router;
