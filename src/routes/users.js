const express = require("express");
const UserController = require('../controller/users');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/registrasi', UserController.createNewUser);
router.post('/login', UserController.loginUser);
router.get('/profil/:username', UserController.getUserProfil);
router.get('/greet/:username', UserController.greetUser);

module.exports = router; 