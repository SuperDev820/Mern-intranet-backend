const express = require('express');

const AuthRouter = express.Router();

const AuthController = require('../controllers/auth/authController');


/**
 * Register new user route
 */
AuthRouter.post('/login', (req, res) => {
    AuthController.login(req, res);
});

/**
 * Login an existant user
 */
AuthRouter.post('/register', (req, res, next) => {
  AuthController.register(req, res, next);
});


AuthRouter.post('/check/subdomain', (req, res, next) => {
  AuthController.checkSubdomain(req, res, next);
});

module.exports = AuthRouter;