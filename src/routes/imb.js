const express = require("express");
const router = express.Router();
const IMBController =require('../controller/imb');

router.post('/kalkulator_imb', IMBController.IMBManual);
router.get('/imbotomatis', IMBController.IMBotomatis);

module.exports = router;