const dbPool = require('../config/database');
const bcrypt = require('bcrypt');

const createNewUser = (userData) => {
    const {username, password, nama, tanggal_lahir, tinggi_badan, jenis_kelamin} = userData
    const SQLQuery = 'INSERT INTO users (username, password, nama, tanggal_lahir, tinggi_badan, jenis_kelamin) VALUES (? ,? ,?, ? ,? ,?)';

    return dbPool.execute(SQLQuery, [username, password, nama, tanggal_lahir, tinggi_badan, jenis_kelamin]);

};

const findUserByUsername = (username) => {
    const SQLQuery = 'SELECT * FROM users WHERE username =?';
    return dbPool.execute(SQLQuery,[username]);
};

const verifyUser = async (username, password) => {
    try {
        const SQLQuery = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await dbPool.execute(SQLQuery, [username]);
        const user = rows[0];

        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Password tidak cocok');
        }

        return user;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createNewUser,
    findUserByUsername,
    verifyUser
}