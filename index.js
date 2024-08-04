require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const UserRoutes = require('./src/routes/users');
const SensorRoutes = require('./src/routes/sensor');
const IMBRoutes = require('./src/routes/imb');
const middlewareLogRequest = require('./src/middleware/logs');

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware untuk memparsing JSON dan urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk logging request
app.use(middlewareLogRequest);

// Menyertakan routing
app.use('/users', UserRoutes);
app.use('/sensor', SensorRoutes);
app.use('/imb', IMBRoutes);

// Memulai server
app.listen(PORT, () => {
    console.log(`Server Berhasil Running di Port ${PORT}`);
});
