const express = require("express");
const router = express.Router();
const SensorController= require('../controller/sensor');

router.post('/sensor', SensorController.datasensor);
router.get('/datasensor', SensorController.getSensorData);
router.get('/grafik', SensorController.getGrafikSensorData);

module.exports = router;