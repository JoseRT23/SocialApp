const router = require('express').Router();
const authController = require('../controllers/authController');

    //Registrar usuario
    router.post("/social/auth/register", authController.registerUser);

    //Login
    router.post("/social/auth/login", authController.loginUser);

module.exports = router