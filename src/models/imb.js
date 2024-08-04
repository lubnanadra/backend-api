const dbPool = require('../config/database');

const getIMB = async() => {
    const SQLQuery = 'SELECT berat_badan, tinggi_badan FROM imb_data';
    const[rows] = await dbPool.execute(SQLQuery);
    return rows;
};

module.exports = {getIMB};