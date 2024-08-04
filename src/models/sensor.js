const dbPool = require('../config/database');

const datasensor = async (berat_badan) => {
    const SQLQuery = 'INSERT INTO sensor_data (berat_badan) VALUES (?)';
    const [rows] = await dbPool.execute(SQLQuery, [berat_badan]);
    return rows;
};

const getData = async() => {
    const SQLQuery = 'SELECT * FROM sensor_data ORDER BY waktu DESC LIMIT 1';
    const [rows] = await dbPool.execute(SQLQuery);
    return rows;
}

const getAllData = async() => {
    const SQLQuery = 'SELECT * FROM sensor_data';
    const [rows] = await dbPool.execute(SQLQuery);
    return rows;
}
module.exports = { datasensor, getData, getAllData };
