const express = require('express');
const router = express.Router();

const { signupController } = require('../controllers/authControllers');

router.post('/signup', signupController);

// router.post('/signin', signinController);

// router.post('/signout', signoutController, isAuthenticated);

module.exports = router;
