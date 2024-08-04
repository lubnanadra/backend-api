const Sensor = require('../models/sensor');

const datasensor = async (req, res) => {
    const { berat_badan } = req.body;

    if (!berat_badan) {
        return res.status(400).json({ message: 'Masukkan data berat badan dari sensor.' });
    }

    try {
        const result = await Sensor.datasensor(berat_badan);
        res.json({ message: 'Data sensor berhasil disimpan.' });
    } catch (error) {
        console.error('Gagal menyimpan data sensor:', error);
        res.status(500).json({ message: 'Gagal menyimpan data sensor.' });
    }
};

const getSensorData = async (req, res) => {
    try {
        const data = await Sensor.getData();
        res.json(data);
    } catch (error) {
        console.error('Gagal Mengambil data', error);
        res.status(500).json({message: 'Gagal Mengambil data'});
    }
};

const getGrafikSensorData = async (req, res) => {
    try {
        const data = await Sensor.getAllData();
        res.json(data);
    } catch (error) {
        console.error('Gagal Mengambil data Sensor:', error);
        res.status(500).json({message: 'Gagal mengambil data sensor'});
    }
};
module.exports = { datasensor, getSensorData, getGrafikSensorData };
